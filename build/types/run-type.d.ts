type RunOptionsType = "build" | "dev";

type RunOptions<T = {}> = {
  type: RunOptionsType;
} & T;

interface RunType {
  run(option: RunOptions): void;
}
