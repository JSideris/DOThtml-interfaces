
import IComponent, { FrameworkItems } from "./i-component";
import IDotCss from "./styles/i-dot-css";
import IEventBus from "./i-event-bus";
import {IReactive} from "./i-reactive";
import IDotcssProp from "./styles/i-css-prop";

type DotContentPrimitive = string | number | boolean;
type DotContentBasic = DotContentPrimitive | Node | Element | NodeList | IComponent | IDotDocument//typeof DotDocument;
export type DotContent = DotContentBasic | Array<DotContent> | IReactive;//|(()=>DotContent);

type AttrVal<T = string | number | boolean> = T | IReactive<T>;

/**
 * Global interface containing elements.
 */
export interface IDotDocument {
	// Creating a blank DotDocument.
	(document?: Element, classPrefix?: number, targetWindow?: Window & (typeof globalThis)): void;

	// Internal use only:
	// Removed in v6.
	// _appendOrCreateDocument(content: DotContent, parentEl?: Element, beforeNode?: Node|number);

	/**
	 * A conditional function, analogous to if. Renders the specified DOT if a condition is met. Dynamic binding is possible when condition and callback are functions.
	*/
	when(condition: IReactive | boolean, DotContent): IDotConditionalDocument;

	// Main functions.
	// TODO: please make this into a test case.
	/**
	 * Cast any document to any other element type. This can be used to access attributes when dotHTML doesn't know the type.
	 * @example
	 * dot("#my-input").as(dot.input).value("Hello, world!")
	 * @example
	 * dot.h("<a>Click me!</a>").as(dot.a).hRef("https://dothtml.com/")
	*/
	as<T extends IDotDocument>(dotElement: (...props: any[]) => T): T;
	/**
	 * Creates a custom element.
	*/
	el(tag: string, content?: DotContent): IDotDocument

	// Special "tags"
	/**
	 * Creates a generic HTML node that can render a string, HTML nodes, or dotHTML content.
	*/
	html(content: string | number | boolean | IReactive): IDotDocument;
	/**
	 * Creates a text node that will render as a string, rather than being parsed as markup.
	*/
	text(content: string | number | boolean | IReactive): IDotDocument;
	/**
	 * Mounts a component.
	 * TODO: add second arg.
	 */
	mount<T extends IComponent>(component: T): IDotDocument;
	// mount<T extends IComponent>(init: (c: IMountedComponent<T>) => IMountedComponent<T> | void, component: T): IDotDocument;
	// mount(component: IComponent, init: (init=>IMountedComponent): IMountedComponent|void): IDotDocument;
	/**
	 * Iterates n times, appending the result of each iteration to the VDBO.
	 * @param n The number of iterations.
	 * @param callback The markup-generating callback.
	*/
	iterate(n: number, callback: (i: number) => DotContent): IDotDocument;
	each<T>(a: Array<T> | { [key: string | number]: T }, callback: (x: T, i: number, k: string | number) => DotContent): IDotDocument;
	each<T>(a: IReactive<any, Array<T> | { [key: string | number]: T }>, callback: (x: T, i: IReactive<number>, k: string | number) => DotContent): IDotDocument;

	/**
	 * Removes the targeted document and everything in it.
	*/
	remove(): void;
	/**
	 * Get the last HTML element added to the targeted document.
	*/
	// getLast(): HTMLElement;
	/**
	 * Deletes each element within the targeted document.
	*/
	empty(): IDotDocument;

	// Redundant in v6.
	// scopeClass(prefix: number|string|null, content: DotContent): IDotDocument;

	// Tags.
	a(content?: DotContent, attrs?: IDotA): IDotDocument;
	a(attrs: IDotA, content?: DotContent): IDotDocument;

	aside(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	aside(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	abbr(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	abbr(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	address(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	address(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;

	area(content?: DotContent, attrs?: IDotArea): IDotDocument;
	area(attrs: IDotArea, content?: DotContent): IDotDocument;

	article(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	article(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;

	audio(content?: DotContent, attrs?: IDotAudio): IDotDocument;
	audio(attrs: IDotAudio, content?: DotContent): IDotDocument;

	b(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	b(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	bdi(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	bdi(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	bdo(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	bdo(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;

	blockQuote(content?: DotContent, attrs?: IDotBlockQuote): IDotDocument;
	blockQuote(attrs: IDotBlockQuote, content?: DotContent): IDotDocument;

	// This shouldn't really be used - if it is, then it should have the custom behavior of rewriting the existing document body, rather than adding a second one.
	body(content?: DotContent, attrs?: IDotBody): IDotDocument;
	body(attrs: IDotBody, content?: DotContent): IDotDocument;

	br(content?: DotContent, attrs?: IDotBr): IDotDocument;
	br(attrs: IDotBr, content?: DotContent): IDotDocument;
	button(content?: DotContent, attrs?: IDotButton): IDotDocument;
	button(attrs: IDotButton, content?: DotContent): IDotDocument;
	canvas(content?: DotContent, attrs?: IDotCanvas): IDotDocument;
	canvas(attrs: IDotCanvas, content?: DotContent): IDotDocument;

	caption(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	caption(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	cite(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	cite(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	code(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	code(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;

	col(content?: DotContent, attrs?: IDotCol): IDotDocument;
	col(attrs: IDotCol, content?: DotContent): IDotDocument;
	colGroup(content?: DotContent, attrs?: IDotColGroup): IDotDocument;
	colGroup(attrs: IDotColGroup, content?: DotContent): IDotDocument;

	content(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	content(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	data(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	data(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	dataList(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	dataList(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	dd(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	dd(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;

	del(content?: DotContent, attrs?: IDotDel): IDotDocument;
	del(attrs: IDotDel, content?: DotContent): IDotDocument;
	details(content?: DotContent, attrs?: IDotDetails): IDotDocument;
	details(attrs: IDotDetails, content?: DotContent): IDotDocument;

	dfn(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	dfn(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	dialog(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	dialog(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	div(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	div(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	dl(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	dl(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	dt(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	dt(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	em(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	em(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;

	embed(content?: DotContent, attrs?: IDotEmbed): IDotDocument;
	embed(attrs: IDotEmbed, content?: DotContent): IDotDocument;
	fieldSet(content?: DotContent, attrs?: IDotFieldSet): IDotDocument;
	fieldSet(attrs: IDotFieldSet, content?: DotContent): IDotDocument;

	figCaption(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	figCaption(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	figure(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	figure(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	footer(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	footer(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;

	form(content?: DotContent, attrs?: IDotForm): IDotDocument;
	form(attrs: IDotForm, content?: DotContent): IDotDocument;

	h1(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	h1(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	h2(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	h2(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	h3(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	h3(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	h4(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	h4(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	h5(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	h5(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	h6(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	h6(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	header(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	header(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;

	hr(content?: DotContent, attrs?: (attrs: IDotHr) => IDotHr): IDotDocument;
	hr(attrs: (attrs: IDotHr) => IDotHr, content?: DotContent): IDotDocument;

	i(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	i(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;

	iFrame(content?: DotContent, attrs?: IDotIFrame): IDotDocument;
	iFrame(attrs: IDotIFrame, content?: DotContent): IDotDocument;
	img(content?: DotContent, attrs?: IDotImg): IDotDocument;
	img(attrs: IDotImg, content?: DotContent): IDotDocument;
	input(content?: DotContent, attrs?: IDotInput): IDotDocument;
	input(attrs: IDotInput, content?: DotContent): IDotDocument;
	ins(content?: DotContent, attrs?: IDotIns): IDotDocument;
	ins(attrs: IDotIns, content?: DotContent): IDotDocument;

	kbd(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	kbd(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;

	/** @deprecated Deprecated in HTML5. */
	keyGen(content?: DotContent, attrs?: IDotKeyGen): IDotDocument;
	keyGen(attrs: IDotKeyGen, content?: DotContent): IDotDocument;
	label(content?: DotContent, attrs?: IDotLabel): IDotDocument;
	label(attrs: IDotLabel, content?: DotContent): IDotDocument;

	legend(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	legend(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;

	li(content?: DotContent, attrs?: IDotLi): IDotDocument;
	li(attrs: IDotLi, content?: DotContent): IDotDocument;

	main(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	main(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;

	map(content?: DotContent, attrs?: IDotMap): IDotDocument;
	map(attrs: IDotMap, content?: DotContent): IDotDocument;

	mark(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	mark(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;

	menu(content?: DotContent, attrs?: IDotMenu): IDotDocument;
	menu(attrs: IDotMenu, content?: DotContent): IDotDocument;
	meter(content?: DotContent, attrs?: IDotMeter): IDotDocument;
	meter(attrs: IDotMeter, content?: DotContent): IDotDocument;

	nav(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	nav(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;

	object(content?: DotContent, attrs?: IDotObject): IDotDocument;
	object(attrs: IDotObject, content?: DotContent): IDotDocument;
	ol(content?: DotContent, attrs?: IDotOl): IDotDocument;
	ol(attrs: IDotOl, content?: DotContent): IDotDocument;
	optGroup(content?: DotContent, attrs?: IDotOptGroup): IDotDocument;
	optGroup(attrs: IDotOptGroup, content?: DotContent): IDotDocument;
	option(content?: DotContent, attrs?: IDotOption): IDotDocument;
	option(attrs: IDotOption, content?: DotContent): IDotDocument;
	output(content?: DotContent, attrs?: IDotOutput): IDotDocument;
	output(attrs: IDotOutput, content?: DotContent): IDotDocument;

	p(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	p(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;

	param(content?: DotContent, attrs?: IDotParam): IDotDocument;
	param(attrs: IDotParam, content?: DotContent): IDotDocument;

	pre(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	pre(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;

	progress(content?: DotContent, attrs?: IDotProgress): IDotDocument;
	progress(attrs: IDotProgress, content?: DotContent): IDotDocument;
	q(content?: DotContent, attrs?: IDotQ): IDotDocument;
	q(attrs: IDotQ, content?: DotContent): IDotDocument;

	rp(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	rp(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	rt(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	rt(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	ruby(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	ruby(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	s(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	s(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	samp(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	samp(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	section(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	section(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;

	select(content?: DotContent, attrs?: IDotSelect): IDotDocument;
	select(attrs: IDotSelect, content?: DotContent): IDotDocument;

	small(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	small(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;

	source(content?: DotContent, attrs?: IDotSource): IDotDocument;
	source(attrs: IDotSource, content?: DotContent): IDotDocument;

	span(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	span(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	strong(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	strong(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	svg(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	svg(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	sub(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	sub(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	summary(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	summary(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	sup(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	sup(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;

	table(content?: DotContent, attrs?: IDotTable): IDotDocument;
	table(attrs: IDotTable, content?: DotContent): IDotDocument;
	tBody(content?: DotContent, attrs?: IDotTBody): IDotDocument;
	tBody(attrs: IDotTBody, content?: DotContent): IDotDocument;
	td(content?: DotContent, attrs?: IDotTd): IDotDocument;
	td(attrs: IDotTd, content?: DotContent): IDotDocument;
	textArea(content?: DotContent, attrs?: IDotTextArea): IDotDocument;
	textArea(attrs: IDotTextArea, content?: DotContent): IDotDocument;
	tFoot(content?: DotContent, attrs?: IDotTFoot): IDotDocument;
	tFoot(attrs: IDotTFoot, content?: DotContent): IDotDocument;
	th(content?: DotContent, attrs?: IDotTh): IDotDocument;
	th(attrs: IDotTh, content?: DotContent): IDotDocument;
	tHead(content?: DotContent, attrs?: IDotTHead): IDotDocument;
	tHead(attrs: IDotTHead, content?: DotContent): IDotDocument;
	time(content?: DotContent, attrs?: IDotTime): IDotDocument;
	time(attrs: IDotTime, content?: DotContent): IDotDocument;
	tr(content?: DotContent, attrs?: IDotTr): IDotDocument;
	tr(attrs: IDotTr, content?: DotContent): IDotDocument;
	track(content?: DotContent, attrs?: IDotTrack): IDotDocument;
	track(attrs: IDotTrack, content?: DotContent): IDotDocument;

	u(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	u(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	ul(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	ul(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
	var(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	var(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;

	video(content?: DotContent, attrs?: IDotVideo): IDotDocument;
	video(attrs: IDotVideo, content?: DotContent): IDotDocument;

	wbr(content?: DotContent, attrs?: IDotGlobalAttrs): IDotDocument;
	wbr(attrs: IDotGlobalAttrs, content?: DotContent): IDotDocument;
}

type Styles = string | IDotcssProp;
// interface IComponentFactory {
// 	<TProps extends string[], TEvents extends string[], T extends IComponent<TProps, TEvents>>(
// 		Base: new () => T, styles?: Styles | Styles[]
// 	): new (attrs?: ComponentArgs<TProps, TEvents>) => T & { new (attrs?: ComponentArgs<TProps, TEvents>): IComponent<TProps, TEvents> };
// }

// interface IComponentFactory {
//     <TProps extends string[], TEvents extends string[], T extends IComponent<TProps, TEvents>>(
//         Base: new () => T, styles?: Styles | Styles[]
//     ): new (attrs?: ComponentArgs<TProps, TEvents>) => T & IComponent<TProps, TEvents>;
// }

// useStyles<T extends IComponent>(styles: Styles | Styles[]): (Base: new () => T) => new () => T;
// hasEvents<T extends IComponent>(styles: Styles | Styles[]): (Base: new () => T) => new () => T;
// prop(target: any, propertyKey: string): void;

export type ComponentArgs<TProps extends Array<string> = [], TEvents extends Array<string> = []> = {
	[key in TProps[number]]?: any;
} & Partial<{
	[key in TEvents[number]]?: (...args: any[]) => void;
}>;

/**
 * Interface for the dot object.
 */
export interface IDotCore extends IDotDocument {
	(targetSelector: string | Element | Node | NodeList | Array<Node | Element>): IDotDocument;

	version: string;
	styleMode: "sync" | "async";

	navigate(path: string, noHistory?: boolean, force?: boolean): void;
	css: IDotCss;
	bus: IEventBus;
	// window: IDotWindowBuilder;

	watch<Ti = IReactive | Array<any> | { [key: string | number]: any } | string | number | boolean, To = Ti>(initValue?: Ti, props?: { key?: string, transformer?: (value: Ti) => To }): IReactive<Ti, To>;

	// Keep these around for a bit to show how it was done before in case I need to change anything prior to the v6 launch.
	// component<T extends IComponent>(Base: new (...args: Parameters<T['build']>) => T): new (...args: Parameters<T['build']>) => T;
	// useStyles<T extends IComponent>(styles: string|((css: IDotCss)=>IDotcssProp|string)): ((Base: new (...args: Parameters<T['build']>) => T) => new (...args: Parameters<T['build']>) => T);

	// component: IComponentFactory;
	// Works but doesn't infer types from the component.
	// There's room for improvement here but it's not clear to me how to do it.
	// What I'd like to do is have the types tied to the IComponent interface rather than the component factory function.
	component<TProps extends string[] = [], TEvents extends string[] = []>(Base: new () => IComponent, styles?: string|IDotcssProp|Array<string|IDotcssProp>)
		: new (attrs?: ComponentArgs<TProps, TEvents>) => IComponent & { new (attrs?: ComponentArgs<TProps, TEvents>): IComponent };

	useStyles(document: Document, styles: Styles): HTMLStyleElement;
}

export interface IDotWindowBuilder {
	(content): Window;
}

export interface IDotConditionalDocument extends IDotDocument {
	/**
	 * A conditional catch, analogous to else if. Can be used after a when function. Evaluates if the previous when's condition was false.
	 * Renders the specified DOT if a condition is met. Dynamic binding is possible when condition and callback are functions.
	*/
	otherwiseWhen(condition: IReactive | boolean, callback: DotContent): IDotConditionalDocument;
	/**
	 * A conditional final catch, analogous to else. Can be used after a when or otherwiseWhen function. Evaluates if the previous when/otherwiseWhen evaluated to false.
	 * Renders the specified DOT if a condition is met. Dynamic binding is possible when callback is a function.
	*/
	otherwise(callback: DotContent): IDotDocument;
}

// Attribute interface (for all elements):
export interface IDotGlobalAttrs {
	/**
	 * Create a custom attribute.
	*/
	// attr(name: string, value: unknown, arg3?: unknown): T;
	custom?: Record<string, AttrVal<unknown>>
	/**
	 * Adds a data-<suffix> attribute to the current element which can contain custom data.
	*/
	customData?: Record<string, AttrVal<unknown>>;
	/**
	 * Create a named reference to the current element so that it can be accessed within the current component.
	*/
	// TODO: this needs to be redone now. 
	// The better way might be using the new reactive system instead of references.
	// For now I'll leave it like this:
	ref?: IReactive<HTMLElement>;

	/** @deprecated Deprecated in HTML5. Use CSS. */
	bgColor?: AttrVal<unknown>;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	color?: AttrVal<unknown>;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	aLink?: AttrVal<unknown>;
	/** @deprecated Deprecated in HTML5. */
	archive?: AttrVal<unknown>;

	// TODO: we're still missing some additional global attributes. See https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/
	areaHidden?: AttrVal<boolean>;
	areaLabel?: AttrVal<string>;
	areaDescribedBy?: AttrVal<string>;
	areaControls?: AttrVal<string>;
	areaExpanded?: AttrVal<boolean>;
	areaChecked?: AttrVal<string>;
	areaSelected?: AttrVal<boolean>;
	accessKey?: AttrVal<string>; // This could potentially be enumerated. But care should be taken as these types are already quite complex.
	class?: AttrVal<string> | Array<AttrVal<string>> | AttrVal<Array<string>> | Record<string, AttrVal<boolean>>; // Space-separated. TODO: need tests.
	contentEditable?: AttrVal<"true"> | AttrVal<"false"> | AttrVal<"plaintext-only">;
	contextMenu?: AttrVal<string>;
	dir?: AttrVal<string>;
	draggable?: AttrVal<"true"> | AttrVal<"false">;
	dropZone?: AttrVal<"move"> | AttrVal<"copy"> | AttrVal<"link">;
	exportParts?: AttrVal<string>;
	hidden?: AttrVal<boolean>;
	id?: string;
	inert?: AttrVal<boolean>;
	inputMode?: AttrVal<string>;
	is?: AttrVal<string>;
	itemId?: AttrVal<string>;
	itemProp?: AttrVal<string>;
	itemRef?: AttrVal<string>;
	itemScope?: AttrVal<string>;
	itemType?: AttrVal<string>;
	lang?: AttrVal<string>;
	nOnce?: AttrVal<string>;
	part?: AttrVal<string>;
	role?: AttrVal<string>;
	spellCheck?: AttrVal<"true"> | AttrVal<"false">;
	style?: string | IDotcssProp;
	tabIndex?: AttrVal<number>;
	title?: AttrVal<string>;
	translate?: AttrVal<string>;
	virtualKeyboardPolicy?: AttrVal<"auto"> | AttrVal<"manual">;

	// Events

	onContextMenu?: (e: MouseEvent) => void; // global
	onCopy?: (e: ClipboardEvent) => void; // global
	onCut?: (e: ClipboardEvent) => void; // global
	onPagePaste?: (e: ClipboardEvent) => void; // global

	onDrag?: (e: DragEvent) => void; // global
	onDragEnd?: (e: DragEvent) => void; // global
	onDragStart?: (e: DragEvent) => void; // global
	onDragEnter?: (e: DragEvent) => void; // global
	onDragOver?: (e: DragEvent) => void; // global
	onDragLeave?: (e: DragEvent) => void; // global
	onDrop?: (e: DragEvent) => void; // global
	onError?: (e: Event) => void; // loading elements.
	onInvalid?: (e: Event) => void; // global
	onMouseWheel?: (e: WheelEvent) => void; // global
	onWheel?: (e: WheelEvent) => void; // global

	// Configured.
	onBlur?: (e: FocusEvent) => void;
	onChange?: (e: Event) => void;
	onClick?: (e: MouseEvent) => void;
	onDblClick?: (e: MouseEvent) => void;
	onFocus?: (e: FocusEvent) => void;
	onInput?: (e: InputEvent) => void;
	onKeyDown?: (e: KeyboardEvent) => void;
	onKeyPress?: (e: KeyboardEvent) => void;
	onKeyUp?: (e: KeyboardEvent) => void;
	onLoad?: (e: Event) => void; // On specific resources only.
	onMouseDown?: (e: MouseEvent) => void;
	onMouseEnter?: (e: MouseEvent) => void;
	onMouseLeave?: (e: MouseEvent) => void;
	onMouseMove?: (e: MouseEvent) => void;
	onMouseOut?: (e: MouseEvent) => void;
	onMouseOver?: (e: MouseEvent) => void;
	onMouseUp?: (e: MouseEvent) => void;
	onPointerCancel?: (e: PointerEvent) => void;
	onPointerDown?: (e: PointerEvent) => void;
	onPointerEnter?: (e: PointerEvent) => void;
	onPointerLeave?: (e: PointerEvent) => void;
	onPointerMove?: (e: PointerEvent) => void;
	onPointerOut?: (e: PointerEvent) => void;
	onPointerOver?: (e: PointerEvent) => void;
	onPointerUp?: (e: PointerEvent) => void;

	onTouchMove?: (e: TouchEvent) => void;
	onTouchCancel?: (e: TouchEvent) => void;
	onTouchEnd?: (e: TouchEvent) => void;
	onTouchStart?: (e: TouchEvent) => void;

	onReset?: (e: Event) => void;
	onScroll?: (e: UIEvent) => void;
	onSelect?: (e: Event) => void;
	onSubmit?: (e: Event) => void;
	onUnload?: (e: Event) => void;
}

// Interface for specific elements:

// interface IMountedComponent<T extends IComponent> {
// 	on(event: string, callback: (...args: Array<any>) => void): IMountedComponent<T>;
// 	prop(name: string, value: any): IMountedComponent<T>;
// }

interface IDotA extends IDotGlobalAttrs {
	download?: AttrVal<boolean>;
	hRef?: AttrVal<string>;
	hRefLang?: AttrVal<string>;
	charset?: AttrVal<string>;
	coords?: AttrVal<string>;
	shape?: AttrVal<string>;
	media?: AttrVal<string>;
	ping?: AttrVal<string> | Array<AttrVal<string>> | AttrVal<Array<string>> | Record<string, AttrVal<string>>; // Space-separated. TODO: need tests.
	rel?: AttrVal<string>;
	/** @deprecated Deprecated in HTML5. */
	rev?: AttrVal<unknown>;
	name?: AttrVal<string>;
	target?: AttrVal<"_blank"> | AttrVal<"_parent"> | AttrVal<"_self"> | AttrVal<"_top">;
	type?: AttrVal<string>;
}
interface IDotArea extends IDotGlobalAttrs {
	alt?: AttrVal<string>;
	coords?: AttrVal<string>;
	download?: AttrVal<string>;
	hRef?: AttrVal<string>;
	hRefLang?: AttrVal<string>;
	media?: AttrVal<string>;
	noHRef?: AttrVal<string>; // Deprecated in HTML5.
	rel?: AttrVal<string>;
	shape?: AttrVal<string>;
	target?: AttrVal<string>;
}
interface IDotAudio extends IDotGlobalAttrs {
	autoPlay?: AttrVal<boolean>;
	// buffered?: unknown; // Not used?
	controls?: AttrVal<boolean>;
	loop?: AttrVal<boolean>;
	muted?: AttrVal<boolean>;
	preload?: AttrVal<"auto"> | AttrVal<"metadata"> | AttrVal<"none">;
	src?: AttrVal<string>;
	crossOrigin?: AttrVal<"anonymous"> | AttrVal<"use-credentials">;

	// Special functions:
	// TODO: these need to be removed from here.
	// pause(): IDotAudio;
	// play(): IDotAudio;
	// stop(): IDotAudio;

	// Events:
	onAbort?: (e: Event) => void;
	onCantPlayThrough?: (e: Event) => void;
	onDurationChange?: (e: Event) => void;
	onEmptied?: (e: Event) => void;
	onEnded?: (e: Event) => void;
	onLoadedData?: (e: Event) => void;
	onLoadStart?: (e: Event) => void;
	onLoadedMetadata?: (e: Event) => void;
	onPause?: (e: Event) => void;
	onPlay?: (e: Event) => void;
	onPlaying?: (e: Event) => void;
	onProgress?: (e: Event) => void;
	onRateChange?: (e: Event) => void;
	onSeeked?: (e: Event) => void;
	onSeeking?: (e: Event) => void;
	onStalled?: (e: Event) => void;
	onSuspend?: (e: Event) => void;
	onTimeUpdate?: (e: Event) => void;
	onVolumeChange?: (e: Event) => void;
	onWaiting?: (e: Event) => void;
	onCanPlay?: (e: Event) => void;
}
interface IDotBlockQuote extends IDotGlobalAttrs {
	quoteCite?: AttrVal<string>; // alias for cite
}

interface IDotBody extends IDotGlobalAttrs {
	align?: unknown; // Deprecated in HTML5. Use CSS.
	background?: unknown; // Deprecated in HTML5. Use CSS.

	// Events
	onHashChange?: (e: HashChangeEvent) => void;
	onOffline?: (e: Event) => void;
	onOnline?: (e: Event) => void;
	onPageHide?: (e: PageTransitionEvent) => void;
	onPageShow?: (e: PageTransitionEvent) => void;
	onPopState?: (e: PopStateEvent) => void;
	onResize?: (e: UIEvent) => void;
	onStorage?: (e: StorageEvent) => void;
}

interface IDotBr extends IDotGlobalAttrs {
	/** @deprecated Deprecated in HTML5. Use CSS. */
	clear?: unknown;
}
interface IDotButton extends IDotGlobalAttrs {
	autoFocus?: AttrVal<boolean>;
	formAction?: AttrVal<string>;
	disabled?: AttrVal<boolean>;
	name?: AttrVal<string>;
	type?: AttrVal<"button"> | AttrVal<"submit"> | AttrVal<"reset">;
	whichForm?: AttrVal<string>; // alias for form
	value?: AttrVal<string>;
}
interface IDotCanvas extends IDotGlobalAttrs {
	height?: AttrVal<number>;
	width?: AttrVal<number>;
}

interface IDotCol extends IDotGlobalAttrs {
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff?: AttrVal<unknown>;
	colSpan?: AttrVal<number>; // alias for span
	vAlign?: AttrVal<number>;
}

interface IDotColGroup extends IDotGlobalAttrs {
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff?: AttrVal<unknown>;
	colSpan?: AttrVal<number>; // alias for span
	/** @deprecated Deprecated in HTML5. Use CSS. */
	vAlign?: AttrVal<unknown>;
}

interface IDotDel extends IDotGlobalAttrs {
	dateTime?: AttrVal<string>; // Would be cool if this could accept dates and just format them internally...
	quoteCite?: AttrVal<string>; // alias for cite
}

interface IDotDetails extends IDotGlobalAttrs {
	open?: AttrVal<boolean>;
	// Events:
	onToggle?: (e: Event) => void;
}
interface IDotEmbed extends IDotGlobalAttrs {
	height?: AttrVal<number>;
	src?: AttrVal<string>;
	type?: AttrVal<string>;
	width?: AttrVal<number>;
}
interface IDotFieldSet extends IDotGlobalAttrs {
	disabled?: AttrVal<boolean>;
	name?: AttrVal<string>;
	whichForm?: AttrVal<string>; // alias for form
}
interface IDotForm extends IDotGlobalAttrs {
	acceptCharset?: AttrVal<string>; // accept-charset, apparently the only hyphenated attribute (aside from data-*)...
	action?: AttrVal<string>;
	autoComplete?: AttrVal<"on"> | AttrVal<"off">;
	encType?: AttrVal<"application/x-www-form-urlencoded"> | AttrVal<"multipart/form-data"> | AttrVal<"text/plain">;
	method?: AttrVal<"get"> | AttrVal<"post">;
	name?: AttrVal<string>;
	noValidate?: AttrVal<boolean>;
	target?: AttrVal<"_self"> | AttrVal<"_blank"> | AttrVal<"_parent"> | AttrVal<"_top">;
	// rel?: PrimativeOrObservable<string> IDotForm; // Not used with forms?
}
interface IDotHr extends IDotGlobalAttrs {
	noShade?: AttrVal<unknown>;
}
interface IDotIFrame extends IDotGlobalAttrs {
	allow?: AttrVal<string>;
	allowFullScreen?: AttrVal<boolean>;
	/** @deprecated Deprecated in HTML5. */
	frameBorder?: AttrVal<0> | AttrVal<1>;
	height?: AttrVal<number>;
	/** @deprecated Deprecated in HTML5. */
	longDesc?: AttrVal<string>;
	marginHeight?: AttrVal<number>;
	marginWidth?: AttrVal<number>;
	name?: AttrVal<string>;
	referrerPolicy?: AttrVal<string>;
	sandbox?: AttrVal<string>;
	/** @deprecated Deprecated in HTML5. */
	scrolling?: AttrVal<string>;
	seamless?: AttrVal<boolean>;
	src?: AttrVal<string>;
	srcDoc?: AttrVal<string>;
	width?: AttrVal<number>;
}
interface IDotImg extends IDotGlobalAttrs {
	alt?: AttrVal<string>;
	crossOrigin?: AttrVal<"anonymous"> | AttrVal<"use-credentials">;
	decoding?: AttrVal<"async"> | AttrVal<"auto"> | AttrVal<"sync">;
	height?: AttrVal<number>;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	hSpace?: AttrVal<unknown>;
	isMap?: AttrVal<boolean>;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	loading?: AttrVal<"eager"> | AttrVal<"lazy">;
	longDesc?: AttrVal<string>;
	referrerPolicy?: AttrVal<string>;
	sizes?: AttrVal<string>;
	src?: AttrVal<string>;
	srcSet?: AttrVal<string>; // Comma separated. Consider accepting an array.
	useMap?: AttrVal<number>;
	width?: AttrVal<number>;
}
interface IDotInput extends IDotGlobalAttrs {
	accept?: AttrVal<string>;
	alt?: AttrVal<string>;
	autoCapitalize?: AttrVal<"none"> | AttrVal<"sentences"> | AttrVal<"words"> | AttrVal<"characters">;
	autoComplete?: AttrVal<"on"> | AttrVal<"off">;
	autoFocus?: AttrVal<boolean>;
	checked?: AttrVal<boolean>;
	enterKeyHint?: AttrVal<"enter"> | AttrVal<"done"> | AttrVal<"go"> | AttrVal<"next"> | AttrVal<"preveous"> | AttrVal<"search"> | AttrVal<"send">;
	dirName?: AttrVal<string>;
	disabled?: AttrVal<boolean>;
	formAction?: AttrVal<string>;
	height?: AttrVal<number>;
	list?: AttrVal<string>;
	max?: AttrVal<number>;
	maxLength?: AttrVal<number>;
	min?: AttrVal<number>;
	multiple?: AttrVal<boolean>;
	name?: AttrVal<string>;
	pattern?: AttrVal<string>;
	placeholder?: AttrVal<string>;
	readOnly?: AttrVal<boolean>;
	required?: AttrVal<boolean>;
	size?: AttrVal<number>;
	src?: AttrVal<string>;
	step?: AttrVal<string> | AttrVal<number>;
	type?: "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week";
	whichForm?: AttrVal<string>; // form
	value?: AttrVal<string>;
	width?: AttrVal<number>;

	// Special functions:
	// getVal(): string
	// setVal(value: unknown): IDotInput;

	// Input-specific events:
	onSearch?: (e: Event) => void;
}

interface IDotIns extends IDotGlobalAttrs {
	dateTime?: AttrVal<string>;
	quoteCite?: AttrVal<string>; // Alias for cite.
}

interface IDotKeyGen extends IDotGlobalAttrs {
	challenge?: AttrVal<string>;
	keyType?: AttrVal<string>;
}

interface IDotLabel extends IDotGlobalAttrs {
	for?: AttrVal<string>;
}

interface IDotLi extends IDotGlobalAttrs {
	value?: AttrVal<number>;
}

interface IDotMap extends IDotGlobalAttrs {
	name?: AttrVal<string>;
}

interface IDotMenu extends IDotGlobalAttrs {
	type?: AttrVal<string>;
}

interface IDotMeter extends IDotGlobalAttrs {
	high?: AttrVal<number>;
	low?: AttrVal<number>;
	max?: AttrVal<number>;
	min?: AttrVal<number>;
	optimum?: AttrVal<number>;
	value?: AttrVal<number>;
}

interface IDotObject extends IDotGlobalAttrs {
	archive?: AttrVal<string>;
	classId?: AttrVal<string>;
	codeBase?: AttrVal<string>;
	codeType?: AttrVal<string>;
	objectData?: AttrVal<string>; // Alias for data.
	declare?: AttrVal<boolean>;
	height?: AttrVal<number>;
	name?: AttrVal<string>;
	standby?: AttrVal<string>;
	type?: AttrVal<string>;
	useMap?: AttrVal<string>;
	width?: AttrVal<number>;
}

interface IDotOl extends IDotGlobalAttrs {
	/** @deprecated Deprecated in HTML5. */
	reversed?: AttrVal<boolean>;
	start?: AttrVal<number>;
}

interface IDotOptGroup extends IDotGlobalAttrs {
	disabled?: AttrVal<boolean>;
}

interface IDotOption extends IDotGlobalAttrs {
	disabled?: AttrVal<boolean>;
	optionLabel?: AttrVal<string>; // Alias for label
	selected?: AttrVal<boolean>;
	value?: AttrVal<string>;
}

interface IDotOutput extends IDotGlobalAttrs {
	for?: AttrVal<string>;
	name?: AttrVal<string>;
	whichForm?: AttrVal<string>; // Alias for form
}

interface IDotParam extends IDotGlobalAttrs {
	name?: AttrVal<string>;
	value?: AttrVal<string>;
	/** @deprecated Deprecated in HTML5. */
	valueType?: AttrVal<unknown>;
}

interface IDotProgress extends IDotGlobalAttrs {
	max?: AttrVal<number>;
	value?: AttrVal<number>;
}

interface IDotQ extends IDotGlobalAttrs {
	quoteCite?: AttrVal<string>; // alias for cite
}

interface IDotSelect extends IDotGlobalAttrs {
	autoFocus?: AttrVal<boolean>;
	disabled?: AttrVal<boolean>;
	multiple?: AttrVal<boolean>;
	name?: AttrVal<string>;
	required?: AttrVal<boolean>;
	size?: AttrVal<number>;
	whichForm?: AttrVal<string>; // alias for form
	value?: AttrVal<string>; // Pseudo attribute for convenience. 
}

interface IDotSource extends IDotGlobalAttrs {
	media?: AttrVal<string>;
	src?: AttrVal<string>;
	type?: AttrVal<string>;
	sizes?: AttrVal<string>;
	srcSet?: AttrVal<string>;
}
interface IDotTable extends IDotGlobalAttrs {
	/** @deprecated Deprecated in HTML5. Use CSS. */
	border?: AttrVal<string> | AttrVal<number>; 
	/** @deprecated Deprecated in HTML5. Use CSS. */
	cellPadding?: AttrVal<string> | AttrVal<number>; 
	/** @deprecated Deprecated in HTML5. Use CSS. */
	cellSpacing?: AttrVal<string> | AttrVal<number>; 
	/** @deprecated Deprecated in HTML5. Use CSS. */
	frame?: AttrVal<string> | AttrVal<number>; 
	/** @deprecated Deprecated in HTML5. */
	height?: AttrVal<number>; 
	/** @deprecated Deprecated in HTML5. Use CSS. */
	rules?: AttrVal<string>; 
	/** @deprecated Deprecated in HTML5. */
	tableSummary?: AttrVal<string>; 
	/** @deprecated Deprecated in HTML5. */
	width?: AttrVal<number>; 
}

interface IDotTextArea extends IDotGlobalAttrs {
	autoCapitalize?: AttrVal<"none"> | AttrVal<"sentences"> | AttrVal<"words"> | AttrVal<"characters">;
	autoFocus?: AttrVal<boolean>;
	cols?: AttrVal<number>;
	dirName?: AttrVal<string>;
	disabled?: AttrVal<boolean>;
	enterKeyHint?: AttrVal<"enter"> | AttrVal<"done"> | AttrVal<"go"> | AttrVal<"next"> | AttrVal<"preveous"> | AttrVal<"search"> | AttrVal<"send">;
	maxLength?: AttrVal<number>;
	name?: AttrVal<string>;
	placeholder?: AttrVal<string>;
	readOnly?: AttrVal<boolean>;
	required?: AttrVal<boolean>;
	rows?: AttrVal<number>;
	whichForm?: AttrVal<string>; // alias for form
	wrap?: AttrVal<string>;
	value?: AttrVal<string>; // Pseudo attribute for convenience. 
}

interface IDotTBody extends IDotGlobalAttrs {
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff?: AttrVal<unknown>;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	vAlign?: AttrVal<unknown>;
}

interface IDotTd extends IDotGlobalAttrs {

	/** @deprecated Deprecated in HTML5. Use CSS. */
	axis?: AttrVal<string>;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	char?: AttrVal<string>;
	colSpan?: AttrVal<number>;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff?: AttrVal<string>;
	headers?: AttrVal<string>;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	noWrap?: AttrVal<boolean>;
	rowSpan?: AttrVal<number>;
	scope?: AttrVal<string>;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	vAlign?: AttrVal<string>;
}

interface IDotTFoot extends IDotGlobalAttrs {
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff?: AttrVal<number>;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	vAlign?: AttrVal<string>;
}

interface IDotTime extends IDotGlobalAttrs {
	dateTime?: AttrVal<string>;
}

interface IDotTh extends IDotGlobalAttrs {
	/** @deprecated Deprecated in HTML5. Use CSS. */
	axis?: AttrVal<string>;
	colSpan?: AttrVal<number>;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff?: AttrVal<string>;
	headers?: AttrVal<string>;
	rowSpan?: AttrVal<number>;
	scope?: AttrVal<string>;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	vAlign?: AttrVal<string>;
}

interface IDotTHead extends IDotGlobalAttrs {
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff?: AttrVal<string> | AttrVal<number>;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	vAlign?: AttrVal<string>;
}

interface IDotTr extends IDotGlobalAttrs {
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff?: AttrVal<string> | AttrVal<number>;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	vAlign?: AttrVal<string>;
}

interface IDotTrack extends IDotGlobalAttrs {
	default?: AttrVal<boolean>;
	kind?: AttrVal<string>;
	src?: AttrVal<string>;
	srcLang?: AttrVal<string>;
	trackLabel?: AttrVal<string>; // alias for label

	// Events:
	onCueChange?: (e: Event) => void;
}

interface IDotVideo extends IDotGlobalAttrs {
	autoPlay?: AttrVal<boolean>;
	buffered?: IReactive<unknown>; // Managed by browser not user. TODO: we can possibly use events to update observable objects.
	controls?: AttrVal<boolean>;
	crossOrigin?: AttrVal<"anonymous"> | AttrVal<"use-credentials">;
	height?: AttrVal<number>;
	loop?: AttrVal<boolean>;
	muted?: AttrVal<boolean>;
	playsInline?: AttrVal<boolean>;
	poster?: AttrVal<string>;
	preload?: AttrVal<"none"> | AttrVal<"metadata"> | AttrVal<"auto">;
	src?: AttrVal<string>;
	width?: AttrVal<number>;

	// Special functions:
	// TODO:
	// pause(): IDotVideo;
	// play(): IDotVideo;
	// stop(): IDotVideo;

	// Events:
	onAbort?: (e: Event) => void;
	onCantPlayThrough?: (e: Event) => void;
	onDurationChange?: (e: Event) => void;
	onEmptied?: (e: Event) => void;
	onEnded?: (e: Event) => void;
	onLoadedData?: (e: Event) => void;
	onLoadStart?: (e: Event) => void;
	onLoadedMetadata?: (e: Event) => void;
	onPause?: (e: Event) => void;
	onPlay?: (e: Event) => void;
	onPlaying?: (e: Event) => void;
	onProgress?: (e: Event) => void;
	onRateChange?: (e: Event) => void;
	onSeeked?: (e: Event) => void;
	onSeeking?: (e: Event) => void;
	onStalled?: (e: Event) => void;
	onSuspend?: (e: Event) => void;
	onTimeUpdate?: (e: Event) => void;
	onVolumeChange?: (e: Event) => void;
	onWaiting?: (e: Event) => void;
	onCanPlay?: (e: Event) => void;
}
