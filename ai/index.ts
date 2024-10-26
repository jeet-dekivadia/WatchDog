import { anthropic } from '@ai-sdk/anthropic';
import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';
import { type Model } from '@/lib/model';
import { customMiddleware } from './custom-middleware';

export const customModel = (modelName: Model['name']) => {
  return wrapLanguageModel({
    model: anthropic("claude-3-haiku-20240307"),
    prompt: (text) => `Analyze this statement for truthfulness and detect any misinformation: "${text}". Provide the percentage of factual content, misinformation, and justification for findings.`,
    middleware: customMiddleware,
  });
};
