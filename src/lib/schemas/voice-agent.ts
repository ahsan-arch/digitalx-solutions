import { z } from "zod";

export const voiceAgentRoles = [
  "Book qualified appointments and collect contact info",
  "Qualify the lead and route to the right person",
  "Answer common questions and take a message",
] as const;

export const voiceAgentTones = ["Friendly", "Professional", "Casual"] as const;

export const voiceAgentSurveySchema = z.object({
  businessName: z
    .string()
    .trim()
    .min(2, "Business name is required")
    .max(80, "Keep it under 80 characters"),
  industry: z.string().trim().min(2, "Pick or enter an industry").max(80),
  whatYouDo: z
    .string()
    .trim()
    .min(20, "Add a sentence or two so the agent knows what to say")
    .max(800, "Keep it under 800 characters"),
  agentRole: z.enum(voiceAgentRoles),
  tone: z.enum(voiceAgentTones),
});

export type VoiceAgentSurveyData = z.infer<typeof voiceAgentSurveySchema>;

export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

export const chatRequestSchema = z.object({
  systemPrompt: z.string().min(20).max(4000),
  messages: z.array(chatMessageSchema).min(1).max(40),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;

export const ttsRequestSchema = z.object({
  text: z.string().min(1).max(800),
  voiceId: z.string().min(1).max(64),
});
