
export interface IWatcher<T = any>{
	// Get the value.
	get value(): T;
	// Set the value.
	set value(v: T|null|undefined);

	// Key is used for observable array proxy bindings.
	// If a key is provided, it's used to uniquely identify array elements.
	// If a key is not provided, identification is done automatically by the framework by comparing object references.
	key: string;
	// subscribeNode(node: Node): number;
	// subscribeAttr(node: HTMLElement, attributeName: string): number;
	// subscribeCallback(callback: (value: T)=>void): number;
	// detachBinding(id: number);

	/** 
	 * Subscribe to changes in the reactive object.
	*/
	subscribe(callback: Function): number;

	_subscribe(boundReactive: IBinding, item: any);
	_detachBinding(id: number);

	/**
	 * Called manually by the user to trigger an update.
	 * Useful for arrays and objects.
	 */
	updateObservers(): void;

	bindAs<Td = string>(transform: (((v: T)=>Td)|({
		display?: (v: T)=>Td;
		read?: (v: string)=>T;
	}))): IBinding<T, Td>;

	bind(): IBinding<T>;
}

export interface IObserver<T = any>{
	observerUpdate(value: T, obsreverId: number): void;
}

export interface IBinding<T = any, Td = T>{
	_source: IWatcher<T>;
	_get: ()=>Td;
	_set: (v: string|number|boolean)=>void;
	
	_transform: {
		display?: (v: T)=>Td;
		read?: (v: string)=>T;
	}
}

export type IReactive = IBinding|IWatcher;