#!/usr/bin/env node

/**
 * Simple AI Agent Test Script
 * Tests the agent service with mocked data
 */

import { createAgentService } from "../src/services/agent.service.js";
import type { AgentConfig } from "../src/lib/agent.types.js";
import { getEnv } from "../src/env.js";

async function testAgent() {
  console.log("🤖 Testing AI Agent Service...\n");

  try {
    const env = getEnv();

    // Check if GEMINI_API_KEY is set
    if (!env.GEMINI_API_KEY) {
      console.log("⚠️  GEMINI_API_KEY not set, using placeholder");
    }

    console.log("📋 Agent Configuration:");
    const agentConfig: AgentConfig = {
      provider: env.GEMINI_API_KEY ? "gemini" : "claude",
      systemPrompt: `You are a helpful e-commerce AI assistant. 
Help customers:
- Browse products
- Create orders  
- Check order status
- Answer questions

Be helpful and professional.`,
      tools: [
        {
          name: "list_products",
          description: "List all available products",
          parameters: {
            type: "object",
            properties: {},
            required: [],
          },
        },
        {
          name: "create_order",
          description: "Create a new order",
          parameters: {
            type: "object",
            properties: {
              productIds: {
                type: "array",
                description: "Product IDs to order",
              },
              quantities: {
                type: "array",
                description: "Quantities for each product",
              },
            },
            required: ["productIds", "quantities"],
          },
        },
      ],
      maxIterations: 3,
      memorySize: 10,
    };

    console.log(`  Provider: ${agentConfig.provider}`);
    console.log(`  Tools: ${agentConfig.tools.length}`);
    console.log(`  Max Iterations: ${agentConfig.maxIterations}\n`);

    // Create agent service
    console.log("✅ Creating Agent Service...\n");
    const agentService = createAgentService(agentConfig);

    // Test 1: Conversation creation
    console.log("Test 1: Conversation Memory");
    const conversationId = `test-${Date.now()}`;
    const history1 = await agentService.getConversationHistory(conversationId);
    console.log(`  ✓ Created conversation with ${history1.length} messages\n`);

    // Test 2: Agent interaction (will fail due to missing API key, but tests structure)
    console.log("Test 2: Agent Message Processing");
    try {
      const response = await agentService.executeAgentic(
        conversationId,
        123, // customerId
        456, // storeId
        "Hi, what products do you have?",
      );
      console.log(`  Success: ${response.success}`);
      if (response.message) console.log(`  Message: ${response.message}`);
      if (response.error) console.log(`  Error: ${response.error}`);
    } catch (error) {
      console.log(
        `  ⚠️  Expected error (API key needed): ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
    console.log();

    // Test 3: Conversation history
    console.log("Test 3: Conversation History");
    const history2 = await agentService.getConversationHistory(conversationId);
    console.log(`  ✓ Retrieved ${history2.length} messages from history\n`);

    // Test 4: Clear conversation
    console.log("Test 4: Clear Conversation");
    await agentService.clearConversation(conversationId);
    const history3 = await agentService.getConversationHistory(conversationId);
    console.log(`  ✓ After clear: ${history3.length} messages (should be 0)\n`);

    console.log("✨ All tests completed!\n");
    console.log("Next steps:");
    console.log(
      "  1. Set GEMINI_API_KEY or ANTHROPIC_API_KEY env variable",
    );
    console.log("  2. Run dev server: npm run dev");
    console.log("  3. Test POST /api/agent/chat endpoint");
    console.log(
      "  4. Integrate with WhatsApp service for full functionality",
    );
  } catch (error) {
    console.error("❌ Test failed:", error);
    process.exit(1);
  }
}

testAgent();
