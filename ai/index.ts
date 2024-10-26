import { anthropic } from '@ai-sdk/anthropic';
import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';
import { type Model } from '@/lib/model';
import { customMiddleware } from './custom-middleware';

export const customModel = (modelName: Model['name']) => {
  // Create the model instance first
  const modelInstance = anthropic(modelName);
  
  // Type assertion to ensure compatibility
  return wrapLanguageModel({
    model: modelInstance,
    prompt: (text) => `Analyze this statement for truthfulness and detect any misinformation: "${text}". Provide the percentage of factual content, misinformation, and justification for findings.`,
    middleware: customMiddleware,
  });
};
