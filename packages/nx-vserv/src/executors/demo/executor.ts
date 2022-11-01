import { DemoExecutorSchema } from "./schema";

export default async function runExecutor(options: DemoExecutorSchema) {
  console.log("Executor ran for Build", options);
  return {
    success: true,
  };
}
