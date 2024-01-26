
import { IDotDocument, IDotGenericElement } from "./i-dot";
import IDotCss from "./i-dot-css";

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
export default interface IComponent {

    // Lifecycle hooks

	/**
	 * A function returning DOThtml (required).
	 */
    build(_: FrameworkItems): IDotDocument;

	/**
	 * An optional function that is called after builder that stylizes the component using a scoped style builder.
	 */
    style?(css: IDotCss): void;

	/**
	 * An optional function that gets called before the component is created, scoped to the new component object.
	 */
    creating?(): void;

	/**
	 * An optional function called after the element has been added. One parameter will be provided containing the added element.
	 */
    ready?(): void;

	/**
	 * An optional function called before the component is deleted.
	 */
    deleting?(): void;

	/**
	 * An optional function called after the component is deleted.
	 */
    deleted?(): void;

	/**
	 * An optional function called after the component is built.
	 */
    built?(): void;
}
