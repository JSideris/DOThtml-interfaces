
import IComponent, { FrameworkItems } from "./i-component";
import IDotCss, { IDotcssProp } from "./i-dot-css";
import IEventBus from "./i-event-bus";
import IObservable from "./i-observable";

type DotContentPrimitive = string|number|boolean;
type DotContentBasic = DotContentPrimitive|Node|Element|NodeList|IComponent|IDotDocument//typeof DotDocument;
export type DotContent = DotContentBasic|Array<DotContent>|IObservable;//|(()=>DotContent);

type PrimativeOrObservable<T = string|number|boolean> = T|IObservable<T>;

/**
 * Global interface containing elements.
 */
export interface IDotDocument
{
	// Creating a blank DotDocument.
	(document?: Element, classPrefix?: number, targetWindow?: Window&(typeof globalThis)): void;

	// Internal use only:
	_appendOrCreateDocument(content: DotContent, parentEl?: Element, beforeNode?: Node|number);

	/**
	 * A conditional function, analogous to if. Renders the specified DOT if a condition is met. Dynamic binding is possible when condition and callback are functions.
	*/
	when(condition:IObservable|boolean, DotContent): IDotConditionalDocument;

	// Main functions.
	// TODO: please make this into a test case.
	/**
	 * Cast any document to any other element type. This can be used to access attributes when dotHTML doesn't know the type.
	 * @example
	 * dot("#my-input").as(dot.input).value("Hello, world!")
	 * @example
	 * dot.h("<a>Click me!</a>").as(dot.a).hRef("https://dothtml.com/")
	*/
	as<T extends IDotDocument>(dotElement: (...props: any[])=>T): T;
	/**
	 * Creates a custom element.
	*/
	el(tag: string, content?: DotContent): IDotElementDocument<IDotGenericElement>

	// Special "tags"
	/**
	 * Creates a generic HTML node that can render a string, HTML nodes, or dotHTML content.
	*/
	html(content: string|number|boolean|IObservable): IDotDocument;
	/**
	 * Creates a text node that will render as a string, rather than being parsed as markup.
	*/
	text(content: string|number|boolean|IObservable): IDotDocument;
	/**
	 * Mounts a component.
	 */
	mount(component: IComponent): IMountedComponent;
	/**
	 * Iterates n times, appending the result of each iteration to the VDBO.
	 * @param n The number of iterations.
	 * @param callback The markup-generating callback.
	*/
	iterate(n: number, callback: (i: number)=>DotContent): IDotDocument;
	each<T>(a: Array<T>|{[key: string|number]: T}, callback: (x: T, i: number, k: string|number)=>DotContent): IDotDocument;
	each<T>(a: IObservable<any, Array<T>|{[key: string|number]: T}>, callback: (x: T, i: IObservable<number>, k: string|number)=>DotContent): IDotDocument;

	/**
	 * Removes the targeted document and everything in it.
	*/
	remove(): void;
	/**
	 * Get the last HTML element added to the targeted document.
	*/
	getLast(): HTMLElement;
	/**
	 * Deletes each element within the targeted document.
	*/
	empty(): IDotDocument;

	scopeClass(prefix: number|string|null, content: DotContent): IDotDocument;

	// Tags.
	a(content?: DotContent): IDotA;
	
	aside(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	abbr(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	address(content?: DotContent): IDotElementDocument<IDotGenericElement>;

	area(content?: DotContent): IDotArea;
	
	article(content?: DotContent): IDotElementDocument<IDotGenericElement>;

	audio(content?: DotContent): IDotAudio;

	b(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	bdi(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	bdo(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	
	blockQuote(content?: DotContent): IDotBlockQuote;
	body(content?: DotContent): IDotBody; // This shouldn't really be used - if it is, then it should have the custom behavior of rewriting the existing document body, rather than adding a second one.
	br(content?: DotContent): IDotBr;
	button(content?: DotContent): IDotButton;
	canvas(content?: DotContent): IDotCanvas;
	
	caption(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	cite(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	code(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	
	col(content?: DotContent): IDotCol;
	colGroup(content?: DotContent): IDotColGroup;
	
	content(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	data(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	dataList(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	dd(content?: DotContent): IDotElementDocument<IDotGenericElement>;

	del(content?: DotContent): IDotDel;
	details(content?: DotContent): IDotDetails;

	dfn(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	dialog(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	div(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	dl(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	dt(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	em(content?: DotContent): IDotElementDocument<IDotGenericElement>;

	embed(content?: DotContent): IDotEmbed;
	fieldSet(content?: DotContent): IDotFieldSet;

	figCaption(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	figure(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	footer(content?: DotContent): IDotElementDocument<IDotGenericElement>;

	form(content?: DotContent): IDotForm;

	h1(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	h2(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	h3(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	h4(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	h5(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	h6(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	header(content?: DotContent): IDotElementDocument<IDotGenericElement>;

	hr(content?: DotContent): IDotHr;

	i(content?: DotContent): IDotElementDocument<IDotGenericElement>;

	iFrame(content?: DotContent): IDotIFrame;
	img(content?: DotContent): IDotImg;
	input(content?: DotContent): IDotInput;
	ins(content?: DotContent): IDotIns;
	
	kbd(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	
	/** @deprecated Deprecated in HTML5. */
	keyGen(content?: DotContent): IDotKeyGen;
	label(content?: DotContent): IDotLabel;
	
	legend(content?: DotContent): IDotElementDocument<IDotGenericElement>;

	li(content?: DotContent): IDotLi;

	main(content?: DotContent): IDotElementDocument<IDotGenericElement>;

	map(content?: DotContent): IDotMap;

	mark(content?: DotContent): IDotElementDocument<IDotGenericElement>;

	menu(content?: DotContent): IDotMenu;
	meter(content?: DotContent): IDotMeter;

	nav(content?: DotContent): IDotElementDocument<IDotGenericElement>;

	object(content?: DotContent): IDotObject;
	ol(content?: DotContent): IDotOl;
	optGroup(content?: DotContent): IDotOptGroup;
	option(content?: DotContent): IDotOption;
	output(content?: DotContent): IDotOutput;

	p(content?: DotContent): IDotElementDocument<IDotGenericElement>;

	param(content?: DotContent): IDotParam;

	pre(content?: DotContent): IDotElementDocument<IDotGenericElement>;

	progress(content?: DotContent): IDotProgress;
	q(content?: DotContent): IDotQ;

	rp(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	rt(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	ruby(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	s(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	samp(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	section(content?: DotContent): IDotElementDocument<IDotGenericElement>;

	select(content?: DotContent): IDotSelect;

	small(content?: DotContent): IDotElementDocument<IDotGenericElement>;

	source(content?: DotContent): IDotSource;

	span(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	strong(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	svg(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	sub(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	summary(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	sup(content?: DotContent): IDotElementDocument<IDotGenericElement>;

	table(content?: DotContent): IDotTable;
	tBody(content?: DotContent): IDotTBody;
	td(content?: DotContent): IDotTd;
	textArea(content?: DotContent): IDotTextArea;
	tFoot(content?: DotContent): IDotTFoot;
	th(content?: DotContent): IDotTh;
	tHead(content?: DotContent): IDotTHead;
	time(content?: DotContent): IDotTime;
	tr(content?: DotContent): IDotTr;
	track(content?: DotContent): IDotTrack;

	u(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	ul(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	var(content?: DotContent): IDotElementDocument<IDotGenericElement>;

	video(content?: DotContent): IDotVideo;

	wbr(content?: DotContent): IDotElementDocument<IDotGenericElement>;
}

/**
 * Interface for the dot object.
 */
export interface IDotCore extends IDotDocument
{
	(targetSelector: string|Element|Node|NodeList|Array<Node|Element>): IDotElementDocument<IDotGenericElement>;

	version: string;

	navigate(path: string, noHistory?: boolean, force?: boolean): void;
	css: IDotCss;
	bus: IEventBus;
	window: IDotWindowBuilder;

	observe<Ti = IObservable|Array<any>|{[key: string|number]: any}|string|number|boolean, To = Ti>(props?: {value: Ti, key?: string, transformer?: (value: Ti)=>To}): IObservable<Ti, To>;
	
	component<T extends IComponent>(ComponentClass: new(...args: any[])=>T): (new(...args: any[])=>(T&{readonly $:FrameworkItems}));
}

export interface IDotWindowBuilder{
	(content): Window;
}

export interface IDotConditionalDocument extends IDotDocument{
	/**
	 * A conditional catch, analogous to else if. Can be used after a when function. Evaluates if the previous when's condition was false.
	 * Renders the specified DOT if a condition is met. Dynamic binding is possible when condition and callback are functions.
	*/
	otherwiseWhen(condition:IObservable|boolean, callback: DotContent): IDotConditionalDocument;
	/**
	 * A conditional final catch, analogous to else. Can be used after a when or otherwiseWhen function. Evaluates if the previous when/otherwiseWhen evaluated to false.
	 * Renders the specified DOT if a condition is met. Dynamic binding is possible when callback is a function.
	*/
	otherwise(callback: DotContent): IDotDocument;
}

// Attribute interface (for all elements):
export interface IDotElementDocument<T extends IDotDocument> extends IDotDocument
{
	// (document?: Element, classPrefix?: number): IDotElement;
	// TODO: consider allowing a function that passes in the container for the previous element to allow adding attributes to it.
	// TODO: I'd really like to enable this. Unfortunately it's not terribly easy to implement.
	// Might be impossible in ES5 (notwithstanding some possible hackery).
	//(content?: DotContent): IDotElementDocument<IDotGenericElement>;
	
	// TODO: this will erase element context, which could be a bug.
	// It can be duplicated multiple times below, or find a new solution.
	/**
	 * Create a custom attribute.
	*/
	attr(name: string, value: unknown, arg3?: unknown): T;
	/**
	 * Adds a data-<suffix> attribute to the current element which can contain custom data.
	*/
	customData(suffix: string, value: DotContentPrimitive): T;
	/**
	 * Create a named reference to the current element so that it can be accessed within the current component.
	*/
	ref(name: string, index?:number): T;

	// TODO: move to specific elements.
	/** @deprecated Deprecated in HTML5. Use CSS. */
	bgColor(value: PrimativeOrObservable<unknown>): T;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	color(value: PrimativeOrObservable<unknown>): T;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	aLink(value: PrimativeOrObservable<unknown>): T;
	/** @deprecated Deprecated in HTML5. */
	archive(value: PrimativeOrObservable<unknown>): T;
	// Only add this if we decide to add the search element.
	// /** @deprecated Non-standard attribute. */
	// autoSave(value: unknown): IDotMajor;
	
	// TODO: we're still missing some additional global attributes. See https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/
	accessKey(value: PrimativeOrObservable<string>): T; // This could potentially be enumerated. But care should be taken as these types are already quite complex.
	class(value: unknown): T; // TODO: need a better way of setting classes.
	contentEditable(value: PrimativeOrObservable<"true">|PrimativeOrObservable<"false">|PrimativeOrObservable<"plaintext-only">): T;
	dir(value: PrimativeOrObservable<string>): T;
	draggable(value: PrimativeOrObservable<"true">|PrimativeOrObservable<"false">): T; // This one is enumerated. "true" or "false" is mandatory.
	dropZone(value: PrimativeOrObservable<"move">|PrimativeOrObservable<"copy">|PrimativeOrObservable<"link">): T; // Might not be supported anywhere.
	hidden(value: PrimativeOrObservable<boolean>): T;
	id(value: string): T;
	itemProp(value: PrimativeOrObservable<string>): T;
	lang(value: PrimativeOrObservable<string>): T;
	spellCheck(value: PrimativeOrObservable<"true">|PrimativeOrObservable<"false">): T; // This one should ideally render as "true" or "false", not be removed.
	style(value: string|IDotcssProp): T;
	tabIndex(value: PrimativeOrObservable<number>): T;
	title(value: PrimativeOrObservable<string>): T;

	// Events

	onContextMenu(callback: (e: Event)=>void): T; // global
	onCopy(callback: (e: Event)=>void): T; // global
	onCut(callback: (e: Event)=>void): T; // global
	onPagePaste(callback: (e: Event)=>void): T; // global

	onDrag(callback: (e: DragEvent)=>void): T; // global
	onDragEnd(callback: (e: DragEvent)=>void): T; // global
	onDragStart(callback: (e: DragEvent)=>void): T; // global
	onDragEnter(callback: (e: DragEvent)=>void): T; // global
	onDragOver(callback: (e: DragEvent)=>void): T; // global
	onDragLeave(callback: (e: DragEvent)=>void): T; // global
	onDrop(callback: (e: DragEvent)=>void): T; // global
	onError(callback: (e: Event)=>void): T; // loading elements
	onInvalid(callback: (e: DragEvent)=>void): T; // global
	onMouseWheel(callback: (e: WheelEvent)=>void): T; // global
	onWheel(callback: (e: WheelEvent)=>void): T; // global

	// Configured.
	onBlur(callback: (e: FocusEvent)=>void): T;
	onChange(callback: (e: Event)=>void): T;
	onClick(callback: (e: MouseEvent)=>void): T;
	onDblClick(callback: (e: MouseEvent)=>void): T;
	onFocus(callback: (e: FocusEvent)=>void): T;
	onInput(callback: (e: InputEvent)=>void): T;
	onKeyDown(callback: (e: KeyboardEvent)=>void): T;
	onKeyPress(callback: (e: KeyboardEvent)=>void): T;
	onKeyUp(callback: (e: KeyboardEvent)=>void): T;
	onLoad(callback: (e: Event)=>void): T; // On specific resources only.
	onMouseDown(callback: (e: MouseEvent)=>void): T;
	onMouseEnter(callback: (e: MouseEvent)=>void): T;
	onMouseLeave(callback: (e: MouseEvent)=>void): T;
	onMouseMove(callback: (e: MouseEvent)=>void): T;
	onMouseOut(callback: (e: MouseEvent)=>void): T;
	onMouseOver(callback: (e: MouseEvent)=>void): T;
	onMouseUp(callback: (e: MouseEvent)=>void): T;
	onPointerCancel(callback: (e: PointerEvent)=>void): T;
	onPointerDown(callback: (e: PointerEvent)=>void): T;
	onPointerEnter(callback: (e: PointerEvent)=>void): T;
	onPointerLeave(callback: (e: PointerEvent)=>void): T;
	onPointerMove(callback: (e: PointerEvent)=>void): T;
	onPointerOut(callback: (e: PointerEvent)=>void): T;
	onPointerOver(callback: (e: PointerEvent)=>void): T;
	onPointerUp(callback: (e: PointerEvent)=>void): T;

	onTouchMove(callback: (e: TouchEvent)=>void): T;
	onTouchCancel(callback: (e: TouchEvent)=>void): T;
	onTouchEnd(callback: (e: TouchEvent)=>void): T;
	onTouchStart(callback: (e: TouchEvent)=>void): T;

	onReset(callback: (e: Event)=>void): T;
	onScroll(callback: (e: MouseEvent)=>void): T;
	onSelect(callback: (e: Event)=>void): T;
	onSubmit(callback: (e: SubmitEvent)=>void): T;
	onUnload(callback: (e: Event)=>void): T;
}

export interface IDotGenericElement extends IDotElementDocument<IDotGenericElement>{}

// Interface for specific elements:

interface IMountedComponent extends IDotDocument{
	on(event: string, callback: (...args: Array<any>)=>void): IMountedComponent;
	prop(name: string, value: any): IMountedComponent;
}

interface IDotA extends IDotElementDocument<IDotA>{
	download(value: PrimativeOrObservable<boolean>): IDotA;
	hRef(value: PrimativeOrObservable<string>): IDotA;
	hRefLang(value: PrimativeOrObservable<string>): IDotA;
	charset(value: PrimativeOrObservable<string>): IDotA;
	coords(value: PrimativeOrObservable<string>): IDotA;
	shape(value: PrimativeOrObservable<string>): IDotA;
	media(value: PrimativeOrObservable<string>): IDotA;
	ping(value: PrimativeOrObservable<string>): IDotA; // Space separated. Consider an array. Or do what we're doing for class.
	rel(value: PrimativeOrObservable<string>): IDotA;
	/** @deprecated Deprecated in HTML5. */
	rev(value: PrimativeOrObservable<unknown>): IDotA;
	name(value: PrimativeOrObservable<string>): IDotA;
	// rev(value: unknown): IDotA; // Not supported in HTML 5.
	target(value: PrimativeOrObservable<"_blank">|PrimativeOrObservable<"_parent">|PrimativeOrObservable<"_self">|PrimativeOrObservable<"_top">): IDotA;
	type(value: PrimativeOrObservable<string>): IDotA;
}
interface IDotArea extends IDotElementDocument<IDotArea>{
	alt(value: PrimativeOrObservable<string>): IDotArea;
	coords(value: PrimativeOrObservable<string>): IDotArea;
	download(value: PrimativeOrObservable<string>): IDotArea;
	hRef(value: PrimativeOrObservable<string>): IDotArea;
	hRefLang(value: PrimativeOrObservable<string>): IDotArea;
	media(value: PrimativeOrObservable<string>): IDotArea;
	/** @deprecated Deprecated in HTML5. */
	noHRef(value: PrimativeOrObservable<string>): IDotArea;
	rel(value: PrimativeOrObservable<string>): IDotArea;
	shape(value: PrimativeOrObservable<string>): IDotArea;
	target(value: PrimativeOrObservable<string>): IDotArea;
}
interface IDotAudio extends IDotElementDocument<IDotAudio>{
	autoPlay(value: PrimativeOrObservable<boolean>): IDotAudio;
	// buffered(value: unknown): IDotAudio; // Not used?
	controls(value: PrimativeOrObservable<boolean>): IDotAudio;
	loop(value: PrimativeOrObservable<boolean>): IDotAudio;
	muted(value: PrimativeOrObservable<boolean>): IDotAudio;
	preload(value: PrimativeOrObservable<"auto">|PrimativeOrObservable<"metadata">|PrimativeOrObservable<"none">): IDotAudio;
	src(value: PrimativeOrObservable<string>): IDotAudio;
	crossOrigin(value: PrimativeOrObservable<"anonymous">|PrimativeOrObservable<"use-credentials">): IDotAudio;
	
	// Special functions:
	pause(): IDotAudio;
	play(): IDotAudio;
	stop(): IDotAudio;

	// Events:
	onAbort(callback: (e: Event)=>void): IDotAudio;
	onCantPlayThrough(callback: (e: Event)=>void): IDotAudio;
	onDurationChange(callback: (e: Event)=>void): IDotAudio;
	onEmptied(callback: (e: Event)=>void): IDotAudio;
	onEnded(callback: (e: Event)=>void): IDotAudio;
	onLoadedData(callback: (e: Event)=>void): IDotAudio;
	onLoadStart(callback: (e: Event)=>void): IDotAudio;
	onLoadedMetadata(callback: (e: Event)=>void): IDotAudio;
	onPause(callback: (e: Event)=>void): IDotAudio;
	onPlay(callback: (e: Event)=>void): IDotAudio;
	onPlaying(callback: (e: Event)=>void): IDotAudio;
	onProgress(callback: (e: Event)=>void): IDotAudio;
	onRateChange(callback: (e: Event)=>void): IDotAudio;
	onSeeked(callback: (e: Event)=>void): IDotAudio;
	onSeeking(callback: (e: Event)=>void): IDotAudio;
	onStalled(callback: (e: Event)=>void): IDotAudio;
	onSuspend(callback: (e: Event)=>void): IDotAudio;
	onTimeUpdate(callback: (e: Event)=>void): IDotAudio;
	onVolumeChange(callback: (e: Event)=>void): IDotAudio;
	onWaiting(callback: (e: Event)=>void): IDotAudio;
	onCanPlay(callback: (e: Event)=>void): IDotAudio;
}
interface IDotBlockQuote extends IDotElementDocument<IDotBlockQuote>{
	quoteCite(value: PrimativeOrObservable<string>): IDotBlockQuote; // alias for cite
}
interface IDotBody extends IDotElementDocument<IDotBody>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	align(value: unknown): IDotBody;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	background(value: unknown): IDotBody;

	// Events
	onHashChange(callback: (e: Event)=>void): IDotBody;
	onOffline(callback: (e: Event)=>void): IDotBody;
	onOnline(callback: (e: Event)=>void): IDotBody;
	onPageHide(callback: (e: Event)=>void): IDotBody;
	onPageShow(callback: (e: Event)=>void): IDotBody;
	onPopState(callback: (e: Event)=>void): IDotBody;
	onResize(callback: (e: Event)=>void): IDotBody;
	onStorage(callback: (e: Event)=>void): IDotBody;
}
interface IDotBr extends IDotElementDocument<IDotBr>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	clear(value: unknown): IDotBr;
}
interface IDotButton extends IDotElementDocument<IDotButton>{
	autoFocus(value: PrimativeOrObservable<boolean>): IDotButton;
	formAction(value: PrimativeOrObservable<string>): IDotButton;
	disabled(value?: PrimativeOrObservable<boolean>): IDotButton;
	name(value: PrimativeOrObservable<string>): IDotButton;
	type(value: PrimativeOrObservable<"button">|PrimativeOrObservable<"submit">|PrimativeOrObservable<"reset">): IDotButton;
	whichForm(value: PrimativeOrObservable<string>): IDotButton; // alias for form
	value(value: PrimativeOrObservable<string>): IDotButton;
}
interface IDotCanvas extends IDotElementDocument<IDotCanvas>{
	height(value: PrimativeOrObservable<number>): IDotCanvas;
	width(value: PrimativeOrObservable<number>): IDotCanvas;
}
interface IDotCol extends IDotElementDocument<IDotCol>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: PrimativeOrObservable<unknown>): IDotCol;
	colSpan(value: PrimativeOrObservable<number>): IDotCol; // alias for span
	vAlign(value: PrimativeOrObservable<number>): IDotCol;
}
interface IDotColGroup extends IDotElementDocument<IDotColGroup>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: PrimativeOrObservable<unknown>): IDotColGroup;
	colSpan(value: PrimativeOrObservable<number>): IDotColGroup; // alias for span
	/** @deprecated Deprecated in HTML5. Use CSS. */
	vAlign(value: PrimativeOrObservable<unknown>): IDotColGroup;
}
interface IDotDel extends IDotElementDocument<IDotDel>{
	dateTime(value: PrimativeOrObservable<string>): IDotDel; // Would be cool if this could accept dates and just format them internally...
	quoteCite(value: PrimativeOrObservable<string>): IDotDel; // alias for cite
}
interface IDotDetails extends IDotElementDocument<IDotDetails>{
	open(value: PrimativeOrObservable<boolean>): IDotDetails;

	// Events:
	onToggle (callback: (e: Event)=>void): IDotDetails;
}
interface IDotEmbed extends IDotElementDocument<IDotEmbed>{
	height(value: PrimativeOrObservable<number>): IDotEmbed;
	src(value: PrimativeOrObservable<string>): IDotEmbed;
	type(value: PrimativeOrObservable<string>): IDotEmbed;
	width(value: PrimativeOrObservable<number>): IDotEmbed;
}
interface IDotFieldSet extends IDotElementDocument<IDotFieldSet>{
	disabled(value: PrimativeOrObservable<boolean>): IDotFieldSet;
	name(value: PrimativeOrObservable<string>): IDotFieldSet;
	whichForm(value: PrimativeOrObservable<string>): IDotFieldSet; // alias for form
}
interface IDotForm extends IDotElementDocument<IDotForm>{
	acceptCharset(value: PrimativeOrObservable<string>): IDotForm; // accept-charset, apparently the only hyphenated attribute (aside from data-*)...
	action(value: PrimativeOrObservable<string>): IDotForm;
	autoComplete(value: PrimativeOrObservable<"on">|PrimativeOrObservable<"off">): IDotForm;
	encType(value: PrimativeOrObservable<"application/x-www-form-urlencoded">|PrimativeOrObservable<"multipart/form-data">|PrimativeOrObservable<"text/plain">): IDotForm;
	method(value: PrimativeOrObservable<"get">|PrimativeOrObservable<"post">): IDotForm;
	name(value: PrimativeOrObservable<string>): IDotForm;
	noValidate(value: PrimativeOrObservable<boolean>): IDotForm;
	// rel(value: PrimativeOrObservable<string>): IDotForm; // Not used with forms?
	target(value: PrimativeOrObservable<"_self">|PrimativeOrObservable<"_blank">|PrimativeOrObservable<"_parent">|PrimativeOrObservable<"_top">): IDotForm;
}
interface IDotHr extends IDotElementDocument<IDotHr>{
	noShade(value: unknown): IDotHr;
}
interface IDotIFrame extends IDotElementDocument<IDotIFrame>{
	allow(value: PrimativeOrObservable<string>): IDotIFrame;
	allowFullScreen(value: PrimativeOrObservable<boolean>): IDotIFrame;
	/** @deprecated Deprecated in HTML5. */
	frameBorder(value: PrimativeOrObservable<0>|PrimativeOrObservable<1>): IDotIFrame;
	height(value: PrimativeOrObservable<number>): IDotIFrame;
	/** @deprecated Deprecated in HTML5. */
	longDesc(value: PrimativeOrObservable<string>): IDotIFrame;
	marginHeight(value: PrimativeOrObservable<number>): IDotIFrame;
	marginWidth(value: PrimativeOrObservable<number>): IDotIFrame;
	name(value: PrimativeOrObservable<string>): IDotIFrame;
	referrerPolicy(value: PrimativeOrObservable<string>): IDotIFrame;
	sandbox(value: PrimativeOrObservable<string>): IDotIFrame;
	/** @deprecated Deprecated in HTML5. */
	scrolling(value: PrimativeOrObservable<string>): IDotIFrame;
	seamless(value: PrimativeOrObservable<boolean>): IDotIFrame;
	src(value: PrimativeOrObservable<string>): IDotIFrame;
	srcDoc(value: PrimativeOrObservable<string>): IDotIFrame;
	width(value: PrimativeOrObservable<number>): IDotIFrame;
}
interface IDotImg extends IDotElementDocument<IDotImg>{
	alt(value: PrimativeOrObservable<string>): IDotImg;
	crossOrigin(value: PrimativeOrObservable<"anonymous">|PrimativeOrObservable<"use-credentials">): IDotImg;
	decoding(value: PrimativeOrObservable<"async">|PrimativeOrObservable<"auto">|PrimativeOrObservable<"sync">): IDotImg;
	height(value: PrimativeOrObservable<number>): IDotImg;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	hSpace(value: PrimativeOrObservable<unknown>): IDotImg;
	isMap(value: PrimativeOrObservable<boolean>): IDotImg;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	loading(value: PrimativeOrObservable<"eager">|PrimativeOrObservable<"lazy">): IDotImg;
	longDesc(value: PrimativeOrObservable<string>): IDotImg;
	referrerPolicy(value: PrimativeOrObservable<string>): IDotImg;
	sizes(value: PrimativeOrObservable<string>): IDotImg;
	src(value: PrimativeOrObservable<string>): IDotImg;
	srcSet(value: PrimativeOrObservable<string>): IDotImg; // Comma separated. Consider accepting an array.
	useMap(value: PrimativeOrObservable<number>): IDotImg;
	width(value: PrimativeOrObservable<number>): IDotImg;
}
interface IDotInput extends IDotElementDocument<IDotInput>{
	accept(value: PrimativeOrObservable<string>): IDotInput;
	alt(value: PrimativeOrObservable<string>): IDotInput;
	autoComplete(value: PrimativeOrObservable<"on">|PrimativeOrObservable<"off">): IDotInput;
	autoFocus(value: PrimativeOrObservable<boolean>): IDotInput;
	checked(value?: PrimativeOrObservable<boolean>): IDotInput;
	dirName(value: PrimativeOrObservable<string>): IDotInput;
	disabled(value: PrimativeOrObservable<boolean>): IDotInput;
	formAction(value: PrimativeOrObservable<string>): IDotInput;
	height(value: PrimativeOrObservable<number>): IDotInput;
	list(value: PrimativeOrObservable<string>): IDotInput;
	max(value: PrimativeOrObservable<number>): IDotInput;
	maxLength(value: PrimativeOrObservable<number>): IDotInput;
	min(value: PrimativeOrObservable<number>): IDotInput;
	multiple(value: PrimativeOrObservable<boolean>): IDotInput;
	name(value: PrimativeOrObservable<string>): IDotInput;
	pattern(value: PrimativeOrObservable<string>): IDotInput;
	placeholder(value: PrimativeOrObservable<string>): IDotInput;
	readOnly(value: PrimativeOrObservable<boolean>): IDotInput;
	required(value: PrimativeOrObservable<boolean>): IDotInput;
	size(value: PrimativeOrObservable<number>): IDotInput;
	src(value: PrimativeOrObservable<string>): IDotInput;
	step(value: PrimativeOrObservable<string>|PrimativeOrObservable<number>): IDotInput;
	type(value: "button"|"checkbox"|"color"|"date"|"datetime-local"|"email"|"file"|"hidden"|"image"|"month"|"number"|"password"|"radio"|"range"|"reset"|"search"|"submit"|"tel"|"text"|"time"|"url"|"week"): IDotInput;
	whichForm(value: PrimativeOrObservable<string>): IDotInput; // form
	value(value: PrimativeOrObservable<string>): IDotInput;
	width(value: PrimativeOrObservable<number>): IDotInput;

	// Special functions:
	// getVal(): string
	// setVal(value: unknown): IDotInput;

	// Input-specific events:
	onSearch(callback: (e: Event)=>void): IDotInput;
}
interface IDotIns extends IDotElementDocument<IDotIns>{
	dateTime(value: PrimativeOrObservable<string>): IDotIns;
	quoteCite(value: PrimativeOrObservable<string>): IDotIns; // alias for cite
}
interface IDotKeyGen extends IDotElementDocument<IDotKeyGen>{
	challenge(value: PrimativeOrObservable<string>): IDotKeyGen;
	keyType(value: PrimativeOrObservable<string>): IDotKeyGen;
}
interface IDotLabel extends IDotElementDocument<IDotLabel>{
	for(value: PrimativeOrObservable<string>): IDotLabel;
}
interface IDotLi extends IDotElementDocument<IDotLi>{
	value(value: PrimativeOrObservable<number>): IDotLi;
}
interface IDotMap extends IDotElementDocument<IDotMap>{
	name(value: PrimativeOrObservable<string>): IDotMap;
}
interface IDotMenu extends IDotElementDocument<IDotMenu>{
	type(value: PrimativeOrObservable<string>): IDotMenu;
}
interface IDotMeter extends IDotElementDocument<IDotMeter>{
	high(value: PrimativeOrObservable<number>): IDotMeter;
	low(value: PrimativeOrObservable<number>): IDotMeter;
	max(value: PrimativeOrObservable<number>): IDotMeter;
	min(value: PrimativeOrObservable<number>): IDotMeter;
	optimum(value: PrimativeOrObservable<number>): IDotMeter;
	value(value: PrimativeOrObservable<number>): IDotMeter;
}
interface IDotObject extends IDotElementDocument<IDotObject>{
	archive(value: PrimativeOrObservable<string>): IDotObject;
	classId(value: PrimativeOrObservable<string>): IDotObject;
	codeBase(value: PrimativeOrObservable<string>): IDotObject;
	codeType(value: PrimativeOrObservable<string>): IDotObject;
	objectData(value: PrimativeOrObservable<string>): IDotObject; // alias for data
	declare(value: PrimativeOrObservable<boolean>): IDotObject;
	height(value: PrimativeOrObservable<number>): IDotObject;
	name(value: PrimativeOrObservable<string>): IDotObject;
	standby(value: PrimativeOrObservable<string>): IDotObject;
	type(value: PrimativeOrObservable<string>): IDotObject;
	useMap(value: PrimativeOrObservable<string>): IDotObject;
	width(value: PrimativeOrObservable<number>): IDotObject;
}
interface IDotOl extends IDotElementDocument<IDotOl>{
	reversed(value: boolean): IDotOl;
	start(value: number): IDotOl;
}
interface IDotOptGroup extends IDotElementDocument<IDotOptGroup>{
	disabled(value: boolean): IDotOptGroup;
}
interface IDotOption extends IDotElementDocument<IDotOption>{
	disabled(value: PrimativeOrObservable<boolean>): IDotOption;
	optionLabel(value: PrimativeOrObservable<string>): IDotOption; // alias for label
	selected(value: PrimativeOrObservable<boolean>): IDotOption;
	value(value: PrimativeOrObservable<string>): IDotOption;

	// Special functions:
	// getVal(): string;
	// setVal(value: unknown): IDotOption;
}
interface IDotOutput extends IDotElementDocument<IDotOutput>{
	for(value: PrimativeOrObservable<string>): IDotOutput;
	name(value: PrimativeOrObservable<string>): IDotOutput;
	whichForm(value: PrimativeOrObservable<string>): IDotOutput; // alias for form
}
interface IDotParam extends IDotElementDocument<IDotParam>{
	name(value: PrimativeOrObservable<string>): IDotParam;
	value(value: PrimativeOrObservable<string>): IDotParam;
	/** @deprecated Deprecated in HTML5. */
	valueType(value: PrimativeOrObservable<unknown>): IDotParam;
}
interface IDotProgress extends IDotElementDocument<IDotProgress>{
	max(value: PrimativeOrObservable<number>): IDotProgress;
	value(value: PrimativeOrObservable<number>): IDotProgress;
}
interface IDotQ extends IDotElementDocument<IDotQ>{
	quoteCite(value: PrimativeOrObservable<string>): IDotQ; // alias for cite
}
interface IDotSelect extends IDotElementDocument<IDotSelect>{
	autoFocus(value: PrimativeOrObservable<boolean>): IDotSelect;
	disabled(value: PrimativeOrObservable<boolean>): IDotSelect;
	multiple(value: PrimativeOrObservable<boolean>): IDotSelect;
	name(value: PrimativeOrObservable<string>): IDotSelect;
	required(value: PrimativeOrObservable<boolean>): IDotSelect;
	size(value: PrimativeOrObservable<number>): IDotSelect;
	whichForm(value: PrimativeOrObservable<string>): IDotSelect; // alias for form
	value(value: PrimativeOrObservable<string>); // Pseudo attribute for convenience. 
}
interface IDotSource extends IDotElementDocument<IDotSource>{
	media(value: PrimativeOrObservable<string>): IDotSource;
	src(value: PrimativeOrObservable<string>): IDotSource;
	type(value: PrimativeOrObservable<string>): IDotSource;
	sizes(value: PrimativeOrObservable<string>): IDotSource;
	src(value: PrimativeOrObservable<string>): IDotSource;
	srcSet(value: PrimativeOrObservable<string>): IDotSource;
	type(value: PrimativeOrObservable<string>): IDotSource;
}
interface IDotTable extends IDotElementDocument<IDotTable>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	border(value: PrimativeOrObservable<string>|PrimativeOrObservable<number>): IDotTable;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	cellPadding(value: PrimativeOrObservable<string>|PrimativeOrObservable<number>): IDotTable;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	cellSpacing(value: PrimativeOrObservable<string>|PrimativeOrObservable<number>): IDotTable;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	frame(value: PrimativeOrObservable<string>|PrimativeOrObservable<number>): IDotTable;
	/** @deprecated Deprecated in HTML5. */
	height(value: PrimativeOrObservable<number>): IDotTable;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	rules(value: PrimativeOrObservable<string>): IDotTable;
	/** @deprecated Deprecated in HTML5. */
	tableSummary(value: PrimativeOrObservable<string>): IDotTable; // summary
	/** @deprecated Deprecated in HTML5. */
	width(value: PrimativeOrObservable<number>): IDotTable;
}
interface IDotTextArea extends IDotElementDocument<IDotTextArea>{
	autoFocus(value: PrimativeOrObservable<boolean>): IDotTextArea;
	cols(value: PrimativeOrObservable<number>): IDotTextArea;
	dirName(value: PrimativeOrObservable<string>): IDotTextArea;
	disabled(value: PrimativeOrObservable<boolean>): IDotTextArea;
	maxLength(value: PrimativeOrObservable<number>): IDotTextArea;
	name(value: PrimativeOrObservable<string>): IDotTextArea;
	placeholder(value: PrimativeOrObservable<string>): IDotTextArea;
	readOnly(value: PrimativeOrObservable<boolean>): IDotTextArea;
	required(value: PrimativeOrObservable<boolean>): IDotTextArea;
	rows(value: PrimativeOrObservable<number>): IDotTextArea;
	whichForm(value: PrimativeOrObservable<string>): IDotTextArea; // alias for form
	wrap(value: PrimativeOrObservable<string>): IDotTextArea;
	value(value: PrimativeOrObservable<string>); // Pseudo attribute for convenience. 
}
interface IDotTBody extends IDotElementDocument<IDotTBody>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: PrimativeOrObservable<unknown>): IDotTBody;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	vAlign(value: PrimativeOrObservable<unknown>): IDotTBody;
}
interface IDotTd extends IDotElementDocument<IDotTd>{
	
	/** @deprecated Deprecated in HTML5. Use CSS. */
	axis(value: PrimativeOrObservable<string>): IDotTd;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	char(value: PrimativeOrObservable<string>): IDotTd;
	colSpan(value: PrimativeOrObservable<number>): IDotTd;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: PrimativeOrObservable<string>): IDotTd;
	headers(value: PrimativeOrObservable<string>): IDotTd;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	noWrap(value: PrimativeOrObservable<boolean>): IDotTd;
	rowSpan(value: PrimativeOrObservable<number>): IDotTd;
	scope(value: PrimativeOrObservable<string>): IDotTd;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	vAlign(value: PrimativeOrObservable<string>): IDotTd;
}
interface IDotTFoot extends IDotElementDocument<IDotTFoot>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: PrimativeOrObservable<number>): IDotTFoot;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	vAlign(value: PrimativeOrObservable<string>): IDotTFoot;
}
interface IDotTime extends IDotElementDocument<IDotTime>{
	dateTime(value: PrimativeOrObservable<string>): IDotTime;
}
interface IDotTh extends IDotElementDocument<IDotTh>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	axis(value: PrimativeOrObservable<string>): IDotTh;
	colSpan(value: PrimativeOrObservable<number>): IDotTh;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: PrimativeOrObservable<string>): IDotTh;
	headers(value: PrimativeOrObservable<string>): IDotTh;
	rowSpan(value: PrimativeOrObservable<number>): IDotTh;
	scope(value: PrimativeOrObservable<string>): IDotTh;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	vAlign(value: PrimativeOrObservable<string>): IDotTh;
}
interface IDotTHead extends IDotElementDocument<IDotTHead>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: PrimativeOrObservable<string>|PrimativeOrObservable<number>): IDotTHead;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	vAlign(value: PrimativeOrObservable<string>): IDotTHead;
}
interface IDotTr extends IDotElementDocument<IDotTr>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: PrimativeOrObservable<string>|PrimativeOrObservable<number>): IDotTr;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	vAlign(value: PrimativeOrObservable<string>): IDotTr;
}
interface IDotTrack extends IDotElementDocument<IDotTrack>{
	default(value: PrimativeOrObservable<boolean>): IDotTrack;
	kind(value: PrimativeOrObservable<string>): IDotTrack;
	src(value: PrimativeOrObservable<string>): IDotTrack;
	srcLang(value: PrimativeOrObservable<string>): IDotTrack;
	trackLabel(value: PrimativeOrObservable<string>): IDotTrack; // alias for label

	// Events:
	onCueChange(callback: (e: Event)=>void): IDotTrack;
}
interface IDotVideo extends IDotElementDocument<IDotVideo>{
	autoPlay(value: PrimativeOrObservable<boolean>): IDotVideo;
	buffered(value: IObservable<unknown>): IDotVideo; // Managed by browser not user. TODO: we can possibly use events to update observable objects.
	controls(value: PrimativeOrObservable<boolean>): IDotVideo;
	crossOrigin(value: PrimativeOrObservable<"anonymous">|PrimativeOrObservable<"use-credentials">): IDotVideo;
	height(value: PrimativeOrObservable<number>): IDotVideo;
	loop(value: PrimativeOrObservable<boolean>): IDotVideo;
	muted(value: PrimativeOrObservable<boolean>): IDotVideo;
	playsInline(value: PrimativeOrObservable<boolean>): IDotVideo;
	poster(value: PrimativeOrObservable<string>): IDotVideo;
	preload(value: PrimativeOrObservable<"none">|PrimativeOrObservable<"metadata">|PrimativeOrObservable<"auto">): IDotVideo;
	src(value: PrimativeOrObservable<string>): IDotVideo;
	width(value: PrimativeOrObservable<number>): IDotVideo;
	
	// Special functions:
	pause(): IDotVideo;
	play(): IDotVideo;
	stop(): IDotVideo;

	// Events:
	onAbort(callback: (e: Event)=>void): IDotVideo;
	onCantPlayThrough(callback: (e: Event)=>void): IDotVideo;
	onDurationChange(callback: (e: Event)=>void): IDotVideo;
	onEmptied(callback: (e: Event)=>void): IDotVideo;
	onEnded(callback: (e: Event)=>void): IDotVideo;
	onLoadedData(callback: (e: Event)=>void): IDotVideo;
	onLoadStart(callback: (e: Event)=>void): IDotVideo;
	onLoadedMetadata(callback: (e: Event)=>void): IDotVideo;
	onPause(callback: (e: Event)=>void): IDotVideo;
	onPlay(callback: (e: Event)=>void): IDotVideo;
	onPlaying(callback: (e: Event)=>void): IDotVideo;
	onProgress(callback: (e: Event)=>void): IDotVideo;
	onRateChange(callback: (e: Event)=>void): IDotVideo;
	onSeeked(callback: (e: Event)=>void): IDotVideo;
	onSeeking(callback: (e: Event)=>void): IDotVideo;
	onStalled(callback: (e: Event)=>void): IDotVideo;
	onSuspend(callback: (e: Event)=>void): IDotVideo;
	onTimeUpdate(callback: (e: Event)=>void): IDotVideo;
	onVolumeChange(callback: (e: Event)=>void): IDotVideo;
	onWaiting(callback: (e: Event)=>void): IDotVideo;
	onCanPlay(callback: (e: Event)=>void): IDotVideo;
}