export interface ApplicationContext {
  [key: string]: any;
}
export interface ApplicationDefinition {
  id: string;
  component: React.ComponentType<{ context: ApplicationContext }>;
}
