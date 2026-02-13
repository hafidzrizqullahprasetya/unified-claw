/**
 * AI Agent Service
 * Core agent implementation with agentic loop (think, act, observe)
 */
import type { AgentConfig, AgentMessage, AgentResponse } from "@/lib/agent.types";
export declare class AgentService {
    private config;
    private memory;
    private orderService;
    constructor(config: AgentConfig);
    /**
     * Main agentic loop: Think -> Act -> Observe -> Repeat
     */
    executeAgentic(conversationId: string, customerId: number, storeId: number, userMessage: string, maxIterations?: number): Promise<AgentResponse>;
    /**
     * THINK: Generate response from LLM
     */
    private think;
    /**
     * ACT: Execute tool calls
     */
    private act;
    /**
     * Tool implementations
     */
    private toolCreateOrder;
    private toolGetProductInfo;
    private toolCheckOrderStatus;
    private toolListProducts;
    /**
     * Memory management
     */
    private getOrCreateMemory;
    private saveMemory;
    getConversationHistory(conversationId: string): Promise<AgentMessage[]>;
    clearConversation(conversationId: string): Promise<void>;
}
export declare function createAgentService(config: AgentConfig): AgentService;
//# sourceMappingURL=agent.service.d.ts.map