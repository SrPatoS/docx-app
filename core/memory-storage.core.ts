export class MemoryStorageCore {
  public static instance: MemoryStorageCore;

  constructor() {
    if (!MemoryStorageCore.instance) {
      MemoryStorageCore.instance = this;
    }
  }

  token: string = "";
}