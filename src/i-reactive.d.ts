
export interface IReactive<T = any> extends IBoundReactive<T, T>{
	// The untransformed value.
	_value: T;
	// Get the value.
	getValue(): T;
	// Set the value.
	setValue(v: T|null|undefined);

	// Key is used for observable array proxy bindings.
	// If a key is provided, it's used to uniquely identify array elements.
	// If a key is not provided, identification is done automatically by the framework by comparing object references.
	key: string;
	// subscribeNode(node: Node): number;
	// subscribeAttr(node: HTMLElement, attributeName: string): number;
	subscribeCallback(callback: (value: T)=>void): number;
	detachBinding(id: number);
	updateObservers(): void;

	bindAs<Td = string>(transform: {
		display?: (v: T)=>Td;
		read?: (v: string)=>T;
	}): IBoundReactive<T, Td>;
}

export interface IReactiveWatcher<T = any>{
	observerUpdate(value: T, obsreverId: number): void;
}

export interface IBoundReactive<T = any, Td = T>{
	_source: IReactive<T>;
	_get: ()=>Td;
	_set: (v: string)=>void;
}