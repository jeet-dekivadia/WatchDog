import { anthropic } from '@ai-sdk/anthropic';
import { experimental_wrapLanguageModel as wrapLanguageModel, LanguageModelV1FunctionToolCall, LanguageModelV1FinishReason, LanguageModelV1LogProbs } from 'ai';

import { type Model } from '@/lib/model';
import { customMiddleware } from './custom-middleware';

type CustomModelResponse = {
  text?: string;
  toolCalls?: LanguageModelV1FunctionToolCall[];
  finishReason: LanguageModelV1FinishReason;
  logprobs?: LanguageModelV1LogProbs;
  warnings?: { type: "unsupported-tool"; tool: LanguageModelV1FunctionToolCall | LanguageModelV1ProviderDefinedTool; details?: string }[];
};

export const customModel = (modelName: Model['name']) => {
  return wrapLanguageModel({
    model: anthropic(modelName),
    prompt: (text) => `Analyze this statement for truthfulness and detect any misinformation: "${text}". Provide the percentage of factual content, misinformation, and justification for findings.`,
    middleware: customMiddleware,
  });
};
