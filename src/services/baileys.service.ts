/**
 * Baileys WhatsApp Integration Service
 * Uses WhatsApp Web to send/receive messages
 * No official API needed - just login with QR code
 */

import { makeWASocket, useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import { eq } from 'drizzle-orm';
import { getDb } from '@/db/config';
import { customer_messages, orders } from '@/db/schema';

export interface WhatsAppMessage {
  from: string; // Phone number
  to: string; // Bot phone number
  text: string;
  timestamp: number;
  messageId: string;
}

export class BaileysWhatsAppService {
  private socket: ReturnType<typeof makeWASocket> | null = null;
  private isConnected = false;

  async initialize() {
    try {
      console.log('🔌 Initializing Baileys WhatsApp service...');

      // Load auth state from file
      const { state, saveCreds } = await useMultiFileAuthState('./whatsapp_auth');

      // Create socket
      this.socket = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        syncFullHistory: false,
      });

      // Handle events
      this.socket.ev.on('creds.update', saveCreds);

      // Connection state changes
      this.socket.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'close') {
          const shouldReconnect =
            (lastDisconnect?.error as Boom)?.output?.statusCode !==
            DisconnectReason.loggedOut;
          console.log(
            'Connection closed. Reconnecting...',
            shouldReconnect
          );
          if (shouldReconnect) {
            this.initialize();
          }
        } else if (connection === 'open') {
          this.isConnected = true;
          console.log('✅ WhatsApp connected via Baileys');
        }
      });

      // Message handler
      this.socket.ev.on('messages.upsert', async (m) => {
        console.log('New message from WhatsApp:', m);
        if (m.type === 'notify') {
          for (const msg of m.messages) {
            await this.handleIncomingMessage(msg);
          }
        }
      });

      return true;
    } catch (error) {
      console.error('❌ Baileys initialization failed:', error);
      return false;
    }
  }

  private async handleIncomingMessage(msg: any) {
    try {
      const phoneNumber = msg.key.remoteJid?.replace('@s.whatsapp.net', '') || '';
      const text = msg.message?.conversation || '';

      if (!text) return;

      const db = getDb();

      // Save message to database
      await db.insert(customer_messages).values({
        customerId: phoneNumber, // Use phone as identifier for now
        storeId: null, // To be matched based on conversation
        message: text,
        messageType: 'incoming',
        channel: 'whatsapp',
        externalId: msg.key.id,
      });

      // Process command
      await this.processCommand(phoneNumber, text);
    } catch (error) {
      console.error('❌ Error handling message:', error);
    }
  }

  private async processCommand(phoneNumber: string, text: string) {
    const lowerText = text.toLowerCase().trim();

    // Check order status
    if (lowerText.startsWith('/status')) {
      const orderId = lowerText.split(' ')[1];
      if (!orderId) {
        await this.sendMessage(phoneNumber, '❌ Format: /status <ORDER_ID>');
        return;
      }

      const db = getDb();
      const order = await db
        .select()
        .from(orders)
        .where(eq(orders.id, parseInt(orderId)));

      if (order.length === 0) {
        await this.sendMessage(phoneNumber, `❌ Order ${orderId} tidak ditemukan`);
        return;
      }

      const o = order[0];
      await this.sendMessage(
        phoneNumber,
        `📦 Order ${o.id}\n` +
          `Status: ${o.status}\n` +
          `Total: Rp ${o.totalPrice.toLocaleString('id-ID')}\n` +
          `Waktu: ${new Date(o.createdAt!).toLocaleString('id-ID')}`
      );
    }

    // Help command
    if (lowerText === '/help' || lowerText === 'help') {
      await this.sendMessage(
        phoneNumber,
        '📋 *Available Commands:*\n' +
          '/status <ID> - Check order status\n' +
          '/help - Show this message'
      );
    }
  }

  async sendMessage(phoneNumber: string, text: string) {
    try {
      if (!this.socket || !this.isConnected) {
        throw new Error('WhatsApp not connected');
      }

      const jid = `${phoneNumber}@s.whatsapp.net`;
      await this.socket.sendMessage(jid, { text });

      const db = getDb();
      await db.insert(customer_messages).values({
        customerId: phoneNumber,
        storeId: null,
        message: text,
        messageType: 'outgoing',
        channel: 'whatsapp',
      });

      return true;
    } catch (error) {
      console.error('❌ Failed to send message:', error);
      return false;
    }
  }

  async getStatus() {
    return {
      connected: this.isConnected,
      phoneNumber: this.socket?.user?.id || null,
    };
  }

  async disconnect() {
    if (this.socket) {
      await this.socket.logout();
      this.isConnected = false;
    }
  }
}

// Singleton instance
let whatsappService: BaileysWhatsAppService | null = null;

export async function getWhatsAppService() {
  if (!whatsappService) {
    whatsappService = new BaileysWhatsAppService();
    await whatsappService.initialize();
  }
  return whatsappService;
}
