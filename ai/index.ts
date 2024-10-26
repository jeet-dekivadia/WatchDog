import { anthropic } from '@ai-sdk/anthropic';
import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';
import { type Model } from '@/lib/model';
import { customMiddleware } from './custom-middleware';
import type { 
  LanguageModelV1CallSettings,
  LanguageModelV1FunctionTool,
  LanguageModelV1ProviderDefinedTool,
  LanguageModelV1FunctionToolCall
} from '@ai-sdk/provider';

// Define the call settings warning type
type UnsupportedSettingWarning = {
  type: "unsupported-setting";
  setting: keyof LanguageModelV1CallSettings;
  details?: string;
};

// Define the tool warning type
type UnsupportedToolWarning = {
  type: "unsupported-tool";
  tool: LanguageModelV1FunctionTool | LanguageModelV1ProviderDefinedTool;
  details?: string;
};

// Combined warning type
type LanguageModelV1CallWarning = UnsupportedSettingWarning | UnsupportedToolWarning;

// Define the finish reason type
type FinishReason = 'stop' | 'length' | 'tool_calls' | 'content_filter' | 'error';

// Define the log probabilities type
type LogProbs = {
  textOffset?: number[];
  tokenLogprobs?: number[];
  tokens?: string[];
  topLogprobs?: Array<Record<string, number>>;
};

// Define the complete response type
type CustomModelResponse = {
  text?: string;
  toolCalls?: LanguageModelV1FunctionToolCall[];
  finishReason: FinishReason;
  logprobs?: LogProbs;
  warnings?: LanguageModelV1CallWarning[];
};

export const customModel = (modelName: Model['name']) => {
  return wrapLanguageModel<CustomModelResponse>({
    model: anthropic(modelName),
    prompt: (text) => `Analyze this statement for truthfulness and detect any misinformation: "${text}". Provide the percentage of factual content, misinformation, and justification for findings.`,
    middleware: customMiddleware,
  });
};
