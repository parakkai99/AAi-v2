import { AnimationFactory } from "../factory/AnimationFactory";
import { AnimationTargetRegistry } from "./AnimationTargetRegistry";

export class AnimationRuntime {
  private factory: AnimationFactory;
  private targets: AnimationTargetRegistry;

  constructor(config: { factory: AnimationFactory; targets: AnimationTargetRegistry }) {
    this.factory = config.factory;
    this.targets = config.targets;
  }

  public startMany(requests: any[]): void {
    // implementation
  }

  public start(request: any): void {
    // implementation
  }

  public stopAll(): void {
    // implementation
  }
}
