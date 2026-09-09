/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: P1.27 — Universal Animation Target
 * Status: ACTIVE
 * Version: 2.0.0
 *
 * A render target is one independently animatable surface belonging to an
 * animation object. The framework is intentionally DOM/SVG agnostic beyond
 * requiring an Element, so a target may be a div, SVG element, SVG group,
 * image, path, or any other browser Element.
 */

export interface AnimationTarget {
  readonly id: string;
  readonly element: Element;
  readonly enabled: boolean;
  readonly metadata?: Readonly<Record<string, string>>;
}

export function createAnimationTarget(
  id: string,
  element: Element,
  options?: {
    readonly enabled?: boolean;
    readonly metadata?: Readonly<Record<string, string>>;
  },
): AnimationTarget {
  return {
    id,
    element,
    enabled: options?.enabled ?? true,
    metadata: options?.metadata,
  };
}
