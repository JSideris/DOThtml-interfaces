
import { IDotDocument } from "./i-dot";
import IDotCss from "./styles/i-dot-css";

// export type EventNames<T> = T extends { allowedEvents: infer E } ? E : never;

// TODO: I think this could be typed so that it forces you to emit events from the list of strings.
export interface FrameworkItems {
	/**
	 * The shadow root element of the component.
	 */
	readonly refs: { [key: string]: HTMLElement };
	emit<T>(event: string, ...args: Array<any>): void;
	restyle(): void;
	readonly props: Record<string, any>;
	readonly _meta: {
		readonly allowedEvents: string[];
		readonly shadowRoot: ShadowRoot;
		readonly isRendered: boolean;
		readonly tagName: string;
		readonly styles: Array<string>;
		readonly args: Array<any>;
		// readonly styleElement: HTMLStyleElement;
		readonly sharedStyles: CSSStyleSheet[];
	}
	// css: IDotCss;
	// html: IDotGenericElement;
}


// TODO: there's a weird problem where if a constructor is not provided, it's not possible have a custom builder.
// It should be the contsructor that depends on the builder, not the other way around. If we can't get this working, 
// it might just be better to rethink how stuff gets passed into components.
export default interface IComponent/*<TProps extends Array<string> = [], TEvents extends Array<string> = []>*/ {

	readonly _?: FrameworkItems;

	// Regrettably, TS forces clients to implement the constructor, which is not ideal because we want to internalize that.
	// There's no way to make the constructor optional.
	// new (attrs?: ComponentArgs<TProps, TEvents>): IComponent<TProps, TEvents>;
	// new (): IComponent<TProps, TEvents>;

    // Lifecycle hooks

	/**
	 * A function returning DOThtml (required). The `build` hook is called once per component instance, and constructs the component's virtual DOM.
	 */
    build(): IDotDocument;

	/**
	 * An optional function called after the component is built. Is only called once per component instance. 
	 */
    built?(): void;
	
	/**
	 * An optional function that gets called before the component is mounted.
	 */
    mounting?(): void;

	/**
	 * An optional function called after the element has been mounted. May be called mulitple times if the component is rerendered.
	 */
    mounted?(): void;
	
	/**
	 * An optional function that gets called before the component is unmounted. Use it to do custom cleanup or data saving.
	 */
    unmounting?(): void;

	/**
	 * An optional function called after the element has been unmounted. May be called mulitple times if the component is rerendered.
	 */
    unmounted?(): void;

	/**
	 * An optional function called before the component is deleted.
	 */
    deleting?(): void;

	/**
	 * An optional function called after the component is deleted.
	 */
    deleted?(): void;
}
