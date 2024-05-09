
export interface IRef<T extends HTMLElement = HTMLElement>{
	get element(): T;
}