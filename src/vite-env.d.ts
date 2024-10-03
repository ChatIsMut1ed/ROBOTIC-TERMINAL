/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />
declare module "*.worker" {
  const worker: new (...args: any[]) => Worker;
  export default worker;
}
