import type { ChatMessage } from "@/lib/schemas/voice-agent";

export type PromptContext = {
  agentName: string;
  businessName: string;
  industry: string;
  role: string;
  whatYouDo: string;
};

export function parseSystemPrompt(prompt: string): PromptContext {
  const agentMatch = prompt.match(/You are ([^,]+),\s*the AI voice receptionist for ([^.\n]+)/i);
  const industryMatch = prompt.match(/Industry:\s*([^\n]+)/i);
  const roleMatch = prompt.match(/Your job on this call:\s*([^\n]+)/i);
  const whatMatch = prompt.match(/About the business:\s*([\s\S]*?)(?=\nIndustry:|$)/i);

  return {
    agentName: agentMatch?.[1]?.trim() || "Aria",
    businessName: agentMatch?.[2]?.trim() || "our business",
    industry: industryMatch?.[1]?.trim() || "service business",
    role: roleMatch?.[1]?.trim() || "scheduling and inquiries",
    whatYouDo: whatMatch?.[1]?.trim() || "",
  };
}

export function generateReceptionistReply(
  systemPrompt: string,
  messages: ChatMessage[]
): string {
  const ctx = parseSystemPrompt(systemPrompt);
  const userMessages = messages.filter((m) => m.role === "user");
  const latestMessage = userMessages[userMessages.length - 1]?.content.trim().toLowerCase() || "";
  const assistantCount = messages.filter((m) => m.role === "assistant").length;

  // Turn 0 / Opener
  const isGreeting =
    latestMessage.includes("live test call") ||
    latestMessage.includes("greet me") ||
    latestMessage === "hi" ||
    latestMessage === "hello" ||
    latestMessage === "hey" ||
    latestMessage === "";

  if (isGreeting || (assistantCount === 0 && latestMessage.length < 15)) {
    return `Hi, thank you for calling ${ctx.businessName}! This is ${ctx.agentName}. How can I help you today?`;
  }

  // Gratitude / goodbye
  if (
    latestMessage.includes("thank") ||
    latestMessage.includes("bye") ||
    latestMessage.includes("that's all") ||
    latestMessage.includes("thats all") ||
    latestMessage.includes("nothing else")
  ) {
    return `You're very welcome! Thanks for calling ${ctx.businessName}, and have a wonderful day. Goodbye!`;
  }

  // Emergency / urgent
  if (
    latestMessage.includes("emergency") ||
    latestMessage.includes("urgent") ||
    latestMessage.includes("leak") ||
    latestMessage.includes("broken") ||
    latestMessage.includes("flood") ||
    latestMessage.includes("stopped working") ||
    latestMessage.includes("burst")
  ) {
    return `I understand this is urgent, and we can prioritize dispatching someone to you right away. What is your street address so I can get a technician headed your way?`;
  }

  // Pricing / cost inquiry
  if (
    latestMessage.includes("how much") ||
    latestMessage.includes("cost") ||
    latestMessage.includes("price") ||
    latestMessage.includes("pricing") ||
    latestMessage.includes("rate") ||
    latestMessage.includes("quote") ||
    latestMessage.includes("estimate")
  ) {
    return `Our rates depend on the exact scope of the job, but we always provide transparent, upfront pricing before starting. I can schedule a free estimate for you tomorrow morning between 9 and 11 AM if that works?`;
  }

  // Booking / scheduling request
  if (
    latestMessage.includes("book") ||
    latestMessage.includes("schedule") ||
    latestMessage.includes("appointment") ||
    latestMessage.includes("come out") ||
    latestMessage.includes("available") ||
    latestMessage.includes("inspection") ||
    latestMessage.includes("consultation")
  ) {
    return `I'd be glad to get that scheduled for you! We have openings tomorrow morning between 9 AM and 11 AM, or Thursday afternoon between 2 and 4 PM. Which of those works better for you?`;
  }

  // Time / date agreement or selection
  if (
    latestMessage.includes("tomorrow") ||
    latestMessage.includes("morning") ||
    latestMessage.includes("afternoon") ||
    latestMessage.includes("thursday") ||
    latestMessage.includes("friday") ||
    latestMessage.includes("monday") ||
    latestMessage.includes("works") ||
    latestMessage.includes("sounds good") ||
    latestMessage.includes("perfect") ||
    latestMessage.includes("let's do that") ||
    latestMessage.includes("yes") ||
    latestMessage.includes("yeah") ||
    latestMessage.includes("sure")
  ) {
    if (assistantCount >= 2) {
      return `Perfect, you're all set! I've reserved that slot for you and sent a text confirmation. Is there anything else I can help with before we wrap up?`;
    }
    return `Great, I've got that time penciled in. Could you please share your full name and phone number so I can confirm the booking?`;
  }

  // Address or name provided
  if (
    latestMessage.match(/\b\d{1,5}\s+\w+/) ||
    latestMessage.includes("my name is") ||
    latestMessage.includes("i'm ") ||
    latestMessage.includes("im ") ||
    latestMessage.includes("phone")
  ) {
    return `Got it, thank you! I've confirmed your appointment and texted the details over to you. Is there anything else I can take care of today?`;
  }

  // Services inquiry
  if (
    latestMessage.includes("what do you do") ||
    latestMessage.includes("service") ||
    latestMessage.includes("offer") ||
    latestMessage.includes("can you") ||
    latestMessage.includes("help with")
  ) {
    return `At ${ctx.businessName}, we handle full ${ctx.industry} services including installations, diagnostics, repairs, and routine maintenance. What specific project or issue can we assist you with?`;
  }

  // General fallback
  return `Understood! We can definitely help you with that at ${ctx.businessName}. Would you like me to schedule a specialist to take a look for you, or is there a specific question I can answer?`;
}

/**
 * Creates a streaming response that mimics Groq SSE delta tokens.
 */
export function createFallbackStream(reply: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const words = reply.split(" ");

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      for (let i = 0; i < words.length; i++) {
        const chunk = (i === 0 ? "" : " ") + words[i];
        controller.enqueue(encoder.encode(chunk));
        // Small 25ms delay between words to simulate natural streaming speech cadence
        await new Promise((r) => setTimeout(r, 25));
      }
      controller.close();
    },
  });
}
