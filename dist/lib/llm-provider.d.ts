/**
 * LLM Provider Abstraction
 * Unified interface for Claude, GPT, Llama, Gemini
 */
import { LanguageModel } from "ai";
import type { LLMProvider, LLMProviderConfig } from "@/lib/agent.types";
export declare class LLMProviderFactory {
    static createProvider(provider: LLMProvider, config?: LLMProviderConfig): LanguageModel;
}
//# sourceMappingURL=llm-provider.d.ts.map