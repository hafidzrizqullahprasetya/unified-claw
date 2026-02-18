/**
 * Baileys WhatsApp Integration Service
 * Lightweight, open-source WhatsApp connection via Baileys library
 */

import {
  default as makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  WAMessage,
  proto,
  isJidBroadcast,
} from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import { getDb } from "@/db/config";
import { customer_messages, orders, orders_items, products } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { getEnv } from "@/env";

export interface WhatsAppMessage {
  from: string;
  to: string;
  text: string;
  timestamp: number;
  messageId: string;
  isOutgoing: boolean;
}

class BaileysWhatsAppService {
  private sock: ReturnType<typeof makeWASocket> | null = null;
  private isConnected = false;
  private authDir = "./whatsapp_auth";

  /**
   * Initialize WhatsApp connection using Baileys
   */
  async initialize() {
    try {
      console.log("🔧 Initializing Baileys WhatsApp connection...");

      const { state, saveCreds } = await useMultiFileAuthState(this.authDir);

      this.sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        logger: {
          level: "silent" as const,
          log: console.log,
          error: console.error,
          warn: console.warn,
        },
      });

      // Handle connection updates
      this.sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
          console.log("📱 Scan this QR code with WhatsApp:");
          // In production, expose QR code via API endpoint
        }

        if (connection === "close") {
          const shouldReconnect =
            (lastDisconnect?.error as Boom)?.output?.statusCode !==
            DisconnectReason.loggedOut;

          console.log(
            `❌ Connection closed. Reconnect: ${shouldReconnect ? "Yes" : "No"}`,
          );

          if (shouldReconnect) {
            this.initialize();
          }
        } else if (connection === "open") {
          console.log("✅ WhatsApp connected!");
          this.isConnected = true;
        }
      });

      // Handle messages
      this.sock.ev.on("messages.upsert", async (m) => {
        await this.handleIncomingMessage(m);
      });

      // Save credentials
      this.sock.ev.on("creds.update", saveCreds);

      return this.sock;
    } catch (error) {
      console.error("❌ Baileys initialization failed:", error);
      throw error;
    }
  }

  /**
   * Handle incoming WhatsApp messages
   */
  private async handleIncomingMessage(m: {
    messages: WAMessage[];
    type: string;
  }) {
    try {
      const messages = m.messages;

      for (const msg of messages) {
        if (msg.key.fromMe) continue; // Ignore outgoing messages
        if (isJidBroadcast(msg.key.remoteJid!)) continue; // Ignore broadcasts

        const text =
          msg.message?.conversation ||
          msg.message?.extendedTextMessage?.text ||
          "";

        if (!text) continue;

        const from = msg.key.remoteJid!;
        const db = getDb();

        // Save message to database
        await db.insert(customer_messages).values({
          id: crypto.randomUUID(),
          customer_jid: from,
          message_text: text,
          direction: "inbound",
          message_id: msg.key.id,
          created_at: new Date(),
        });

        console.log(`📨 Message from ${from}: ${text}`);

        // Process message with AI Agent (if configured)
        await this.processMessageWithAgent(from, text);
      }
    } catch (error) {
      console.error("Error handling message:", error);
    }
  }

  /**
   * Process message with AI agent
   */
  private async processMessageWithAgent(from: string, text: string) {
    try {
      // This will be implemented in agent service
      // For now, just log
      console.log(`🤖 Processing with agent: ${text}`);

      // Send auto-reply
      await this.sendMessage(from, "Terima kasih! Kami akan merespons segera.");
    } catch (error) {
      console.error("Error processing message:", error);
    }
  }

  /**
   * Send WhatsApp message
   */
  async sendMessage(to: string, text: string): Promise<void> {
    try {
      if (!this.sock || !this.isConnected) {
        throw new Error("WhatsApp not connected");
      }

      await this.sock.sendMessage(to, { text });

      const db = getDb();
      await db.insert(customer_messages).values({
        id: crypto.randomUUID(),
        customer_jid: to,
        message_text: text,
        direction: "outbound",
        message_id: crypto.randomUUID(),
        created_at: new Date(),
      });

      console.log(`✉️ Sent to ${to}: ${text}`);
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }

  /**
   * Get connection status
   */
  isReady(): boolean {
    return this.isConnected && this.sock !== null;
  }

  /**
   * Disconnect WhatsApp
   */
  async disconnect(): Promise<void> {
    try {
      if (this.sock) {
        await this.sock.end();
        this.isConnected = false;
        console.log("👋 WhatsApp disconnected");
      }
    } catch (error) {
      console.error("Error disconnecting:", error);
    }
  }
}

export const baileysService = new BaileysWhatsAppService();
