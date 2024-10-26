// Define available Claude models and their configurations
export const models = [
  {
    label: 'Claude 3 Opus',
    name: 'claude-3-opus-20240229',
    description: 'Most capable model for complex tasks requiring deep analysis',
  },
  {
    label: 'Claude 3 Sonnet',
    name: 'claude-3-sonnet-20240229',
    description: 'Balanced model for most tasks, offering strong performance and speed',
  },
  {
    label: 'Claude 3 Haiku',
    name: 'claude-3-haiku-20240307',
    description: 'Fastest model for straightforward tasks and quick responses',
  },
] as const;

// Set the default model
export const DEFAULT_MODEL_NAME: Model['name'] = 'claude-3-haiku-20240307';

// Type definition for the model
export type Model = (typeof models)[number];

// Type guard to check if a string is a valid model name
export function isValidModelName(name: string): name is Model['name'] {
  return models.some(model => model.name === name);
}
