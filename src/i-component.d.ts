
import { IDotElement } from "./i-dot";
import IDotCss from "./i-dot-css";

export default interface IComponent {
    // Properties
    props: { [key: string]: any };
    bindings: { [key: string]: any };
    events: Array<string>;
    $refs: { [key: string]: HTMLElement };
    name: string;

    // Methods
    builder(...args: Array<any>): IDotElement;
    created(...args: Array<any>): void;
    ready(): void;
    deleting(): void;
    deleted(): void;
    built(): void;
    on(event: string, handler: Function): void;
    off(event: string, handler: Function): void;
    $updateStyles(): void;

    // Accessors
    readonly $el: HTMLElement;

    // Optional Method
    style?(css: IDotCss): void;
}
