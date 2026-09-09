/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: P1.25 — Trigger Registry
 * Status: ACTIVE
 * Version: 1.0.0
 */

import type {
  TriggerDefinition,
  TriggerId,
} from "./TriggerDefinition";

export const triggerDefinitions = {
  fixed: {
    id: "fixed",
    name: "Fixed",
    description:
      "Executes at a predetermined scene position or activation point.",
    category: "schedule",
    repeatable: false,
    interruptible: true,
    parameters: [
      {
        name: "startAtMs",
        type: "number",
        description: "Absolute scene time in milliseconds.",
        required: false,
      },
      {
        name: "enabled",
        type: "boolean",
        description: "Whether the trigger is active.",
        required: false,
      },
    ],
    defaults: {
      startAtMs: 0,
      enabled: true,
    },
  },

  time: {
    id: "time",
    name: "Time",
    description:
      "Executes after a relative delay from the moment the trigger becomes active.",
    category: "schedule",
    repeatable: true,
    interruptible: true,
    parameters: [
      {
        name: "delayMs",
        type: "number",
        description: "Delay before activation.",
        required: false,
      },
      {
        name: "repeatCount",
        type: "number",
        description: "Number of activations after the initial activation.",
        required: false,
      },
      {
        name: "repeatDelayMs",
        type: "number",
        description: "Delay between repeated activations.",
        required: false,
      },
    ],
    defaults: {
      delayMs: 0,
      repeatCount: 0,
      repeatDelayMs: 0,
    },
  },

  event: {
    id: "event",
    name: "Event",
    description:
      "Executes when a named runtime event is emitted.",
    category: "event",
    repeatable: true,
    interruptible: true,
    parameters: [
      {
        name: "eventName",
        type: "string",
        description: "Runtime event identifier.",
        required: true,
      },
      {
        name: "once",
        type: "boolean",
        description: "Whether the trigger should fire only once.",
        required: false,
      },
    ],
    defaults: {
      eventName: "",
      once: false,
    },
  },

  manual: {
    id: "manual",
    name: "Manual",
    description:
      "Executes only when explicitly activated by the application or user interaction.",
    category: "interaction",
    repeatable: true,
    interruptible: true,
    parameters: [
      {
        name: "command",
        type: "string",
        description: "Manual activation command identifier.",
        required: false,
      },
      {
        name: "once",
        type: "boolean",
        description: "Whether the trigger can only be manually activated once.",
        required: false,
      },
    ],
    defaults: {
      command: "activate",
      once: false,
    },
  },

  sequence: {
    id: "sequence",
    name: "Sequence",
    description:
      "Executes after one or more preceding runtime actions, animations, or stages complete.",
    category: "composition",
    repeatable: true,
    interruptible: true,
    parameters: [
      {
        name: "after",
        type: "string",
        description: "Identifier of the preceding action or animation.",
        required: true,
      },
      {
        name: "delayMs",
        type: "number",
        description: "Additional delay after the preceding action.",
        required: false,
      },
      {
        name: "once",
        type: "boolean",
        description: "Whether the sequence trigger fires only once.",
        required: false,
      },
    ],
    defaults: {
      after: "",
      delayMs: 0,
      once: true,
    },
  },

  loop: {
    id: "loop",
    name: "Loop",
    description:
      "Repeats activation according to a configured cycle count or indefinitely.",
    category: "composition",
    repeatable: true,
    interruptible: true,
    parameters: [
      {
        name: "count",
        type: "number",
        description:
          "Number of repetitions. Use 0 for indefinite looping.",
        required: false,
      },
      {
        name: "delayMs",
        type: "number",
        description: "Delay between loop activations.",
        required: false,
      },
      {
        name: "infinite",
        type: "boolean",
        description: "Whether looping continues indefinitely.",
        required: false,
      },
    ],
    defaults: {
      count: 0,
      delayMs: 0,
      infinite: true,
    },
  },
} satisfies Record<TriggerId, TriggerDefinition>;

export const registeredTriggerDefinitions: readonly TriggerDefinition[] =
  Object.values(triggerDefinitions);