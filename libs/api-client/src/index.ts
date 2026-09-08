export * from './lib/users.api';
export * from './lib/mock/data';
export * from './lib/mock/handlers';

export async function startMockWorker() {
  const browserMock = await import("./lib/mock/browser");
  return browserMock.startMockWorker();
}
