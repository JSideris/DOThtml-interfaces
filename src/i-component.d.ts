
import { IDotElement, IDotGenericElement } from "./i-dot";
import IDotCss from "./i-dot-css";

export interface FrameworkItems {
	el: HTMLElement;
	css: IDotCss;
	html: IDotGenericElement;
	refs: { [key: string]: HTMLElement };
	restyle(): void;
}

export default interface IComponent {
    // Properties
    props?: { [key: string]: any };
    bindings?: { [key: string]: any };
    events?: Array<string>;

	readonly $?: FrameworkItems;

    // Lifecycle hooks

	/**
	 * 
	 * @param args 
	 */
    build(...args: Array<any>): IDotElement;

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
