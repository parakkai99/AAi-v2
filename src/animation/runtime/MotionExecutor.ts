/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: P1.27 — Animation Runtime
 * Status: ACTIVE
 * Version: 1.0.0
 */

import type {
  MotionDefinition,
  MotionEasing,
  MotionParameters,
} from "../motion/MotionDefinition";

const easingMap: Record<
  MotionEasing,
  string
> = {
  linear: "linear",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  smooth: "ease-in-out",
  natural: "cubic-bezier(0.22, 1, 0.36, 1)",
};

function numberParameter(
  parameters: MotionParameters,
  key: string,
  fallback: number,
): number {
  const value = parameters[key];

  return typeof value === "number"
    ? value
    : fallback;
}

function stringParameter(
  parameters: MotionParameters,
  key: string,
  fallback: string,
): string {
  const value = parameters[key];

  return typeof value === "string"
    ? value
    : fallback;
}

function booleanParameter(
  parameters: MotionParameters,
  key: string,
  fallback: boolean,
): boolean {
  const value = parameters[key];

  return typeof value === "boolean"
    ? value
    : fallback;
}

export class MotionExecutor {
  execute(
    target: Element,
    motion: MotionDefinition,
    parameters: MotionParameters,
  ): Animation {
    const duration = motion.defaultDurationMs;
    const easing = easingMap[motion.defaultEasing];

    const frames = this.buildKeyframes(
      motion,
      parameters,
    );

    const animation = target.animate(
      frames,
      {
        duration,
        easing,
        fill: "both",
      },
    );

    return animation;
  }

  private buildKeyframes(
    motion: MotionDefinition,
    parameters: MotionParameters,
  ): Keyframe[] {
    switch (motion.id) {
      case "BLOOM":
        return this.bloom(parameters);

      case "FLIGHT":
        return this.flight(parameters);

      case "SWAY":
        return this.sway(parameters);

      case "FLOW":
        return this.flow(parameters);

      case "RISE":
        return this.rise(parameters);

      case "RADIATE":
        return this.radiate(parameters);

      case "DRIFT":
        return this.drift(parameters);

      case "ORBIT":
        return this.orbit(parameters);

      case "TRAVEL":
        return this.travel(parameters);

      case "REVEAL":
        return this.reveal(parameters);
    }
  }

  private bloom(
    parameters: MotionParameters,
  ): Keyframe[] {
    return [
      {
        opacity: numberParameter(
          parameters,
          "fromOpacity",
          0,
        ),
        transform: `scale(${numberParameter(
          parameters,
          "fromScale",
          0.92,
        )})`,
      },
      {
        opacity: numberParameter(
          parameters,
          "toOpacity",
          1,
        ),
        transform: `scale(${numberParameter(
          parameters,
          "toScale",
          1,
        )})`,
      },
    ];
  }

  private flight(
    parameters: MotionParameters,
  ): Keyframe[] {
    const x = numberParameter(
      parameters,
      "distanceX",
      160,
    );

    const y = numberParameter(
      parameters,
      "distanceY",
      -30,
    );

    const arc = numberParameter(
      parameters,
      "arc",
      40,
    );

    const rotation = numberParameter(
      parameters,
      "rotation",
      2,
    );

    return [
      {
        transform: "translate3d(0, 0, 0) rotate(0deg)",
      },
      {
        transform: `translate3d(${x / 2}px, ${
          y + arc
        }px, 0) rotate(${rotation / 2}deg)`,
      },
      {
        transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg)`,
      },
    ];
  }

  private sway(
    parameters: MotionParameters,
  ): Keyframe[] {
    const angle = numberParameter(
      parameters,
      "angle",
      4,
    );

    const distance = numberParameter(
      parameters,
      "distance",
      3,
    );

    return [
      {
        transform: "translate3d(0, 0, 0) rotate(0deg)",
      },
      {
        transform: `translate3d(${distance}px, 0, 0) rotate(${angle}deg)`,
      },
      {
        transform: `translate3d(-${distance}px, 0, 0) rotate(-${angle}deg)`,
      },
      {
        transform: "translate3d(0, 0, 0) rotate(0deg)",
      },
    ];
  }

  private flow(
    parameters: MotionParameters,
  ): Keyframe[] {
    const x = numberParameter(
      parameters,
      "distanceX",
      12,
    );

    const y = numberParameter(
      parameters,
      "distanceY",
      2,
    );

    return [
      {
        transform: "translate3d(0, 0, 0)",
      },
      {
        transform: `translate3d(${x}px, ${y}px, 0)`,
      },
      {
        transform: "translate3d(0, 0, 0)",
      },
    ];
  }

  private rise(
    parameters: MotionParameters,
  ): Keyframe[] {
    const distance = numberParameter(
      parameters,
      "distance",
      40,
    );

    const fromOpacity = numberParameter(
      parameters,
      "fromOpacity",
      0.4,
    );

    const toOpacity = numberParameter(
      parameters,
      "toOpacity",
      1,
    );

    return [
      {
        opacity: fromOpacity,
        transform: `translate3d(0, ${distance}px, 0)`,
      },
      {
        opacity: toOpacity,
        transform: "translate3d(0, 0, 0)",
      },
    ];
  }

  private radiate(
    parameters: MotionParameters,
  ): Keyframe[] {
    const fromScale = numberParameter(
      parameters,
      "fromScale",
      0.98,
    );

    const toScale = numberParameter(
      parameters,
      "toScale",
      1.04,
    );

    const pulse = booleanParameter(
      parameters,
      "pulse",
      true,
    );

    if (!pulse) {
      return [
        {
          transform: `scale(${fromScale})`,
        },
        {
          transform: `scale(${toScale})`,
        },
      ];
    }

    return [
      {
        transform: `scale(${fromScale})`,
      },
      {
        transform: `scale(${toScale})`,
      },
      {
        transform: `scale(${fromScale})`,
      },
    ];
  }

  private drift(
    parameters: MotionParameters,
  ): Keyframe[] {
    const x = numberParameter(
      parameters,
      "distanceX",
      20,
    );

    const y = numberParameter(
      parameters,
      "distanceY",
      -12,
    );

    const variance = numberParameter(
      parameters,
      "variance",
      0.35,
    );

    return [
      {
        transform: "translate3d(0, 0, 0)",
      },
      {
        transform: `translate3d(
          ${x * variance}px,
          ${y * variance}px,
          0
        )`,
      },
      {
        transform: `translate3d(
          ${x}px,
          ${y}px,
          0
        )`,
      },
      {
        transform: "translate3d(0, 0, 0)",
      },
    ];
  }

  private orbit(
    parameters: MotionParameters,
  ): Keyframe[] {
    const radiusX = numberParameter(
      parameters,
      "radiusX",
      20,
    );

    const radiusY = numberParameter(
      parameters,
      "radiusY",
      10,
    );

    const direction = stringParameter(
      parameters,
      "direction",
      "clockwise",
    );

    const sign =
      direction === "counter-clockwise"
        ? -1
        : 1;

    const points = 8;
    const frames: Keyframe[] = [];

    for (let index = 0; index <= points; index += 1) {
      const angle =
        ((Math.PI * 2) / points) *
        index *
        sign;

      frames.push({
        transform: `translate3d(
          ${Math.cos(angle) * radiusX}px,
          ${Math.sin(angle) * radiusY}px,
          0
        )`,
      });
    }

    return frames;
  }

  private travel(
    parameters: MotionParameters,
  ): Keyframe[] {
    const x = numberParameter(
      parameters,
      "distanceX",
      100,
    );

    const y = numberParameter(
      parameters,
      "distanceY",
      0,
    );

    const rotation = numberParameter(
      parameters,
      "rotation",
      0,
    );

    return [
      {
        transform: "translate3d(0, 0, 0) rotate(0deg)",
      },
      {
        transform: `translate3d(
          ${x}px,
          ${y}px,
          0
        ) rotate(${rotation}deg)`,
      },
    ];
  }

  private reveal(
    parameters: MotionParameters,
  ): Keyframe[] {
    const fromOpacity = numberParameter(
      parameters,
      "fromOpacity",
      0,
    );

    const toOpacity = numberParameter(
      parameters,
      "toOpacity",
      1,
    );

    const offsetX = numberParameter(
      parameters,
      "offsetX",
      0,
    );

    const offsetY = numberParameter(
      parameters,
      "offsetY",
      20,
    );

    const fromScale = numberParameter(
      parameters,
      "fromScale",
      0.98,
    );

    return [
      {
        opacity: fromOpacity,
        transform: `translate3d(
          ${offsetX}px,
          ${offsetY}px,
          0
        ) scale(${fromScale})`,
      },
      {
        opacity: toOpacity,
        transform:
          "translate3d(0, 0, 0) scale(1)",
      },
    ];
  }
}