
import { IDotGenericElement } from "./i-dot";
import IDotCss from "./i-dot-css";

export interface FrameworkItems {
	/**
	 * The shadow root element of the component.
	 */
	root: ShadowRoot;
	refs: { [key: string]: HTMLElement };
	emit: (event: string, ...args: Array<any>)=>void;
	restyle(): void;
	// css: IDotCss;
	// html: IDotGenericElement;
}

export default interface IComponent {
    // Properties
    events?: Array<string>;

	readonly $?: FrameworkItems;

    // Lifecycle hooks

	/**
	 * A function returning DOThtml (required).
	 */
    build(...args: Array<any>): IDotGenericElement;

	/**
	 * An optional function that is called after builder that stylizes the component using a scoped style builder.
	 */
    style?(css: IDotCss): void;

	/**
	 * An optional function that gets called before the component is created, scoped to the new component object.
	 */
    creating?(...args: Array<any>): void;

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
