/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: P1.27 — Animation Runtime
 * Status: ACTIVE
 * Version: 1.0.0
 */

import type {
  TriggerDefinition,
  TriggerParameters,
} from "../triggers/TriggerDefinition";

export interface TriggerExecutionContext {
  readonly execute: () => Animation | void;
  readonly resolveSequence?: (
    identifier: string,
  ) => Promise<void> | void;
}

export class TriggerExecutor {
  execute(
    trigger: TriggerDefinition,
    parameters: TriggerParameters,
    context: TriggerExecutionContext,
  ): Promise<void> | void {
    switch (trigger.id) {
      case "fixed":
        return this.fixed(parameters, context);

      case "time":
        return this.time(parameters, context);

      case "event":
        return this.event(parameters, context);

      case "manual":
        return this.manual(parameters, context);

      case "sequence":
        return this.sequence(parameters, context);

      case "loop":
        return this.loop(parameters, context);
    }
  }

  private fixed(
    parameters: TriggerParameters,
    context: TriggerExecutionContext,
  ): void {
    const startAtMs =
      typeof parameters.startAtMs === "number"
        ? parameters.startAtMs
        : 0;

    window.setTimeout(
      () => {
        context.execute();
      },
      Math.max(0, startAtMs),
    );
  }

  private time(
    parameters: TriggerParameters,
    context: TriggerExecutionContext,
  ): void {
    const delayMs =
      typeof parameters.delayMs === "number"
        ? parameters.delayMs
        : 0;

    const repeatCount =
      typeof parameters.repeatCount === "number"
        ? parameters.repeatCount
        : 0;

    const repeatDelayMs =
      typeof parameters.repeatDelayMs === "number"
        ? parameters.repeatDelayMs
        : 0;

    let count = 0;

    const run = () => {
      context.execute();

      if (count >= repeatCount) {
        return;
      }

      count += 1;

      window.setTimeout(
        run,
        Math.max(0, repeatDelayMs),
      );
    };

    window.setTimeout(
      run,
      Math.max(0, delayMs),
    );
  }

  private event(
    parameters: TriggerParameters,
    context: TriggerExecutionContext,
  ): void {
    const eventName =
      typeof parameters.eventName === "string"
        ? parameters.eventName
        : "";

    const once =
      typeof parameters.once === "boolean"
        ? parameters.once
        : false;

    if (!eventName) {
      throw new Error(
        "Event trigger requires an eventName.",
      );
    }

    const handler = () => {
      context.execute();

      if (once) {
        window.removeEventListener(
          eventName,
          handler,
        );
      }
    };

    window.addEventListener(
      eventName,
      handler,
    );
  }

  private manual(
    parameters: TriggerParameters,
    context: TriggerExecutionContext,
  ): void {
    const command =
      typeof parameters.command === "string"
        ? parameters.command
        : "activate";

    window.addEventListener(
      `aa-animation:${command}`,
      () => {
        context.execute();
      },
    );
  }

  private async sequence(
    parameters: TriggerParameters,
    context: TriggerExecutionContext,
  ): Promise<void> {
    const after =
      typeof parameters.after === "string"
        ? parameters.after
        : "";

    const delayMs =
      typeof parameters.delayMs === "number"
        ? parameters.delayMs
        : 0;

    if (
      !after ||
      !context.resolveSequence
    ) {
      context.execute();
      return;
    }

    await context.resolveSequence(after);

    if (delayMs > 0) {
      await new Promise<void>((resolve) => {
        window.setTimeout(
          resolve,
          delayMs,
        );
      });
    }

    context.execute();
  }

  private loop(
    parameters: TriggerParameters,
    context: TriggerExecutionContext,
  ): void {
    const infinite =
      typeof parameters.infinite === "boolean"
        ? parameters.infinite
        : true;

    const count =
      typeof parameters.count === "number"
        ? parameters.count
        : 0;

    const delayMs =
      typeof parameters.delayMs === "number"
        ? parameters.delayMs
        : 0;

    if (infinite) {
      const run = () => {
        context.execute();

        window.setTimeout(
          run,
          Math.max(0, delayMs),
        );
      };

      run();
      return;
    }

    for (
      let index = 0;
      index < Math.max(0, count);
      index += 1
    ) {
      window.setTimeout(
        () => {
          context.execute();
        },
        index * Math.max(0, delayMs),
      );
    }
  }
}