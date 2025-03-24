export type ContinuityConfig = {
  getLatestVersion: () => Promise<number>;
  keepVersionEveryInMs: number;
};
