export const VIEWS = {
  MAIN: "main",
  ADD: "add",
} as const;

export type ViewType = (typeof VIEWS)[keyof typeof VIEWS];
