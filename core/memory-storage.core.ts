export class MemoryStorageCore {
	public static Instance: MemoryStorageCore;

	constructor() {
		if (!MemoryStorageCore.Instance) {
			MemoryStorageCore.Instance = this;
		}
	}

	token: string = "";
	firstAccess: boolean = false;
}