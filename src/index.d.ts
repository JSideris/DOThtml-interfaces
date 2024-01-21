import { IDotCore } from "./i-dot";

export * from "./i-dot";

export { default as IDotCss } from "./i-dot-css";
export * from "./i-dot-css";


export { default as IComponent, FrameworkItems } from "./i-component";

export { default as IReactive } from "./i-reactive";
export { default as IEventBus } from "./i-event-bus";

declare global {
	interface Window {
		dot: IDotCore;
	}
}