import { anthropic } from '@ai-sdk/anthropic';
import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';
import { type Model } from '@/lib/model';
import { customMiddleware } from './custom-middleware';

// Define the finish reason type
type FinishReason = 'stop' | 'length' | 'tool_calls' | 'content_filter' | 'error';

// Define the log probabilities type
type LogProbs = {
  textOffset?: number[];
  tokenLogprobs?: number[];
  tokens?: string[];
  topLogprobs?: Array<Record<string, number>>;
};

// Define the custom model response type
type CustomModelResponse = {
  text?: string;
  toolCalls?: Array<{
    id: string;
    type: string;
    function: {
      name: string;
      arguments: string;
    };
  }>;
  finishReason: FinishReason;
  logprobs?: LogProbs;
  warnings?: Array<{
    type: "unsupported-tool";
    tool: {
      name: string;
      parameters: Record<string, unknown>;
    };
    details?: string;
  }>;
};

export const customModel = (modelName: Model['name']) => {
  return wrapLanguageModel({
    model: anthropic(modelName),
    prompt: (text) => `Analyze this statement for truthfulness and detect any misinformation: "${text}". Provide the percentage of factual content, misinformation, and justification for findings.`,
    middleware: customMiddleware,
  });
};
