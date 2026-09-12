export type TriggerCategory = "schedule" | "event" | "interaction" | "composition" | "system";
export type TriggerId = "fixed" | "time" | "event" | "manual" | "sequence" | "loop" | string;

export type TriggerParameterType = "string" | "number" | "boolean" | "object" | "array" | "any";
export type TriggerParameterValue = string | number | boolean | object | any[] | any;

export interface TriggerParameterDefinition {
  name: string;
  type: TriggerParameterType;
  description: string;
  required: boolean;
  options?: any[];
}

export interface TriggerDefinition {
  id: TriggerId;
  name: string;
  description: string;
  category: TriggerCategory;
  repeatable: boolean;
  interruptible: boolean;
  parameters: TriggerParameterDefinition[];
  defaults: Record<string, TriggerParameterValue>;
}

export interface TriggerParameters {
  [key: string]: TriggerParameterValue;
}

export interface AnimationTriggerDefinition {
  type: TriggerId;
  params?: TriggerParameters;
}
