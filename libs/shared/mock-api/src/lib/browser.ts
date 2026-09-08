import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

const worker = setupWorker(...handlers);

type MockRuntime = typeof globalThis & {
  __saasMockWorkerStart?: Promise<ServiceWorkerRegistration | undefined>;
};

export function startMockWorker() {
  const runtime = globalThis as MockRuntime;
  runtime.__saasMockWorkerStart ??= worker.start({ onUnhandledRequest: "bypass" });
  return runtime.__saasMockWorkerStart;
}
