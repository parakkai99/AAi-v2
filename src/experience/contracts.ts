export interface ExperienceDefinition {
  id: string;
  scope: ExperienceScope;
  theme?: string;
  layout?: string;
  themeId?: string;
  layoutId?: string;
  version?: string;
  identity?: any;
  context?: any;
  search?: any;
  infrastructure?: any;
}
export type ExperienceScope = "global" | "solution" | "preview" | "universe";
