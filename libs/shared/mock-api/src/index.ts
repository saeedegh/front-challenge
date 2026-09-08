export async function startMockWorker() {
  const { startMockWorker } = await import("./lib/browser");
  return startMockWorker();
}
