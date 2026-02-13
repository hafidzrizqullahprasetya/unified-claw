/**
 * AI Agent API Handlers
 * HTTP endpoints for agent interaction
 */
import { Context } from "hono";
/**
 * POST /api/agent/chat
 * Chat with the AI agent
 */
export declare function agentChat(c: Context): Promise<Response & import("hono").TypedResponse<{
    success: boolean;
    message: string;
    toolCalls?: {
        id: string;
        type: "tool_use";
        name: string;
        input: {
            [x: string]: any;
        };
    }[] | undefined;
    metadata?: {
        tokensUsed?: number | undefined;
        executionTime?: number | undefined;
        provider?: import("@/lib/agent.types").LLMProvider | undefined;
    } | undefined;
}, 200 | 400, "json">>;
/**
 * GET /api/agent/history/:conversationId
 * Get conversation history
 */
export declare function getConversationHistory(c: Context): Promise<Response & import("hono").TypedResponse<{
    success: true;
    conversationId: string;
    messages: {
        role: "user" | "assistant" | "system";
        content: string;
        toolCalls?: {
            id: string;
            type: "tool_use";
            name: string;
            input: {
                [x: string]: any;
            };
        }[] | undefined;
        toolResults?: {
            toolUseId: string;
            content: string;
        }[] | undefined;
    }[];
}, import("hono/utils/http-status").ContentfulStatusCode, "json">>;
/**
 * DELETE /api/agent/conversation/:conversationId
 * Clear conversation memory
 */
export declare function clearConversation(c: Context): Promise<Response & import("hono").TypedResponse<{
    success: true;
    message: string;
}, import("hono/utils/http-status").ContentfulStatusCode, "json">>;
//# sourceMappingURL=agent.d.ts.map