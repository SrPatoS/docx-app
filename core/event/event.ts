import { EventEmitter } from "eventemitter3";

type events = "redirect-login";

export class Event {
	private eventEmitter: EventEmitter;
	public static Instance: Event;

	constructor() {
		if (!Event.Instance) {
			Event.Instance = this;
		}

		this.eventEmitter = new EventEmitter();
	}

	public on(eventName: events, callback: (...args: any[]) => void) {
		this.eventEmitter.on(eventName, callback);
	}

	public emit(eventName: events, ...args: any[]) {
		this.eventEmitter.emit(eventName, ...args);
	}

	public off(eventName: events, callback: (...args: any[]) => void) {
		this.eventEmitter.off(eventName, callback);
	}
}