export interface AnimationRuntime {
  startMany?: any;
  start?: any;
  stopAll?: any;
}

export function createAnimationRuntime(...args: any[]) { return { runtime: {} as any }; }
