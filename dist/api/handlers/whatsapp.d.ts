import { Context } from "hono";
/**
 * GET /api/webhooks/whatsapp
 * Webhook verification endpoint for Meta
 * Meta sends a GET request with verify_token, challenge parameters
 */
export declare function whatsappWebhookVerify(c: Context): Promise<Response & import("hono").TypedResponse<string, import("hono/utils/http-status").ContentfulStatusCode, "text">>;
/**
 * POST /api/webhooks/whatsapp
 * Handle incoming WhatsApp messages from Meta
 */
export declare function whatsappWebhookReceive(c: Context): Promise<(Response & import("hono").TypedResponse<"Signature verification failed", 403, "text">) | (Response & import("hono").TypedResponse<{
    success: true;
}, 200, "json">) | (Response & import("hono").TypedResponse<{
    success: false;
    error: string;
}, 400, "json">) | (Response & import("hono").TypedResponse<{
    success: false;
    error: string;
}, 200, "json">)>;
//# sourceMappingURL=whatsapp.d.ts.map