import { IDotDocument } from "./i-dot";


export default interface IObservable<Ti = any, To = Ti>{
	// The untransformed value.
	_value: Ti;
	// Get the value.
	get value(): To;
	// Set the value.
	set value(v: Ti);
	// Optional transformer that can .
	transformer?: (input: Ti)=>To;
	subscribeNode(node: IDotDocument): number;
	subscribeAttr(node: IDotDocument, attributeName: string): number;
	subscribeCallback(node: IDotDocument): number;
	detachBinding(id: number);
	updateObservers(): void;
}