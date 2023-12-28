
export default interface IObservable<Ti = any, To = Ti>{
	// The untransformed value.
	_value: Ti;
	// Get the value.
	getValue(): To;
	// Set the value.
	setValue(v: Ti);

	// Key is used for observable array proxy bindings.
	// If a key is provided, it's used to uniquely identify array elements.
	// If a key is not provided, identification is done automatically by the framework by comparing object references.
	key: string;
	// Optional transformer that can transform the input.
	transformer?: (input: Ti)=>To;
	// subscribeNode(node: Node): number;
	// subscribeAttr(node: HTMLElement, attributeName: string): number;
	subscribeCallback(callback: (value: To)=>void): number;
	detachBinding(id: number);
	updateObservers(): void;
}