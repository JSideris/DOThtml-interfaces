
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

/**
 * Public interface indicating the return type of the Component builder method. Represents any VDBO containing an element. 
 * The VDBO returned by Component builder method must contain exactly one element.
*/
export interface IDotElement extends IDotElementDocument<IDotGenericElement>{}

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
	bgColor(value: unknown): T;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	color(value: unknown): T;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	aLink(value: unknown): T;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	archive(value: unknown): T;
	// Only add this if we decide to add the search element.
	// /** @deprecated Non-standard attribute. */
	// autoSave(value: unknown): IDotMajor;
	
	// TODO: we're still missing some additional global attributes. See https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/
	accessKey(value: PrimativeOrObservable<string>): T; // This could potentially be enumerated. But care should be taken as these types are already quite complex.
	class(value: unknown): T; // TODO: need a better way of setting classes.
	contentEditable(value: PrimativeOrObservable<"true"|"false"|"plaintext-only">): T;
	dir(value: PrimativeOrObservable<string>): T;
	draggable(value: PrimativeOrObservable<"true"|"false">): T; // This one is enumerated. "true" or "false" is mandatory.
	dropZone(value: "move"|"copy"|"link"): T; // Might not be supported anywhere.
	hidden(value: PrimativeOrObservable<boolean>): T;
	id(value: string): T;
	itemProp(value: PrimativeOrObservable<string>): T;
	lang(value: PrimativeOrObservable<string>): T;
	spellCheck(value: PrimativeOrObservable<"true"|"false">): T; // This one should ideally render as "true" or "false", not be removed.
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
	media(value: unknown): IDotA;
	ping(value: unknown): IDotA;
	rel(value: PrimativeOrObservable<string>): IDotA;
	rev(value: unknown): IDotA;
	target(value: PrimativeOrObservable<"_blank"|"_parent"|"_self"|"_top">): IDotA;
	type(value: unknown): IDotA; // This might be fake news.
}
interface IDotArea extends IDotElementDocument<IDotArea>{
	alt(value: unknown): IDotArea;
	coords(value: unknown): IDotArea;
	download(value: unknown): IDotArea;
	hRef(value: unknown): IDotArea;
	hRefLang(value: unknown): IDotArea;
	media(value: unknown): IDotArea;
	noHRef(value: PrimativeOrObservable<string>): IDotArea;
	rel(value: unknown): IDotArea; // Fake?
	shape(value: PrimativeOrObservable<string>): IDotArea;
	target(value: PrimativeOrObservable<string>): IDotArea;
}
interface IDotAudio extends IDotElementDocument<IDotAudio>{
	autoPlay(value: PrimativeOrObservable<boolean>): IDotAudio;
	buffered(value: unknown): IDotAudio;
	controls(value: PrimativeOrObservable<boolean>): IDotAudio;
	loop(value: PrimativeOrObservable<boolean>): IDotAudio;
	muted(value: PrimativeOrObservable<boolean>): IDotAudio;
	preload(value: PrimativeOrObservable<"auto"|"metadata"|"none">): IDotAudio;
	src(value: PrimativeOrObservable<string>): IDotAudio;
	
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
	quoteCite(value: unknown): IDotBlockQuote; // cite
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
	autoFocus(value: unknown): IDotButton;
	formAction(value: unknown): IDotButton;
	disabled(value?: unknown): IDotButton;
	name(value: unknown): IDotButton;
	type(value: unknown): IDotButton;
	whichForm(value: unknown): IDotButton; // form
	value(value: unknown): IDotButton;
}
interface IDotCanvas extends IDotElementDocument<IDotCanvas>{
	height(value: unknown): IDotCanvas;
	width(value: unknown): IDotCanvas;
}
interface IDotCol extends IDotElementDocument<IDotCol>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: unknown): IDotCol;
	colSpan(value: unknown): IDotCol; // span
	vAlign(value: unknown): IDotCol;
}
interface IDotColGroup extends IDotElementDocument<IDotColGroup>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: unknown): IDotColGroup;
	colSpan(value: unknown): IDotColGroup; // span
	vAlign(value: unknown): IDotColGroup;
}
interface IDotDel extends IDotElementDocument<IDotDel>{
	dateTime(value: unknown): IDotDel;
	quoteCite(value: unknown): IDotDel; // cite
}
interface IDotDetails extends IDotElementDocument<IDotDetails>{
	open(value: unknown): IDotDetails;

	// Events:
	onToggle (callback: (e: Event)=>void): IDotDetails;
}
interface IDotEmbed extends IDotElementDocument<IDotEmbed>{
	height(value: unknown): IDotEmbed;
	src(value: unknown): IDotEmbed;
	type(value: unknown): IDotEmbed;
	width(value: unknown): IDotEmbed;
}
interface IDotFieldSet extends IDotElementDocument<IDotFieldSet>{
	disabled(value: unknown): IDotFieldSet;
	name(value: unknown): IDotFieldSet;
	whichForm(value: unknown): IDotFieldSet; // form
}
interface IDotForm extends IDotElementDocument<IDotForm>{
	acceptCharset(value: unknown): IDotForm; // accept-charset
	action(value: unknown): IDotForm;
	autoComplete(value: unknown): IDotForm;
	encType(value: unknown): IDotForm;
	method(value: unknown): IDotForm;
	name(value: unknown): IDotForm;
	noValidate(value: boolean): IDotForm;
	rel(value: unknown): IDotForm;
	target(value: unknown): IDotForm;
}
interface IDotHr extends IDotElementDocument<IDotHr>{
	noShade(value: unknown): IDotHr;
}
interface IDotIFrame extends IDotElementDocument<IDotIFrame>{
	height(value: unknown): IDotIFrame;
	longDesc(value: unknown): IDotIFrame;
	marginHeight(value: unknown): IDotIFrame;
	marginWidth(value: unknown): IDotIFrame;
	name(value: unknown): IDotIFrame;
	sandbox(value: unknown): IDotIFrame;
	scrolling(value: unknown): IDotIFrame;
	seamless(value: unknown): IDotIFrame;
	src(value: unknown): IDotIFrame;
	srcDoc(value: unknown): IDotIFrame;
	width(value: unknown): IDotIFrame;
}
interface IDotImg extends IDotElementDocument<IDotImg>{
	alt(value: PrimativeOrObservable<string>): IDotImg;
	height(value: PrimativeOrObservable<number>): IDotImg;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	hSpace(value: unknown): IDotImg;
	isMap(value: unknown): IDotImg;
	longDesc(value: unknown): IDotImg;
	sizes(value: unknown): IDotImg;
	src(value: PrimativeOrObservable<string>): IDotImg;
	srcSet(value: unknown): IDotImg;
	useMap(value: unknown): IDotImg;
	width(value: PrimativeOrObservable<number>): IDotImg;
}
interface IDotInput extends IDotElementDocument<IDotInput>{
	accept(value: unknown): IDotInput;
	alt(value: unknown): IDotInput;
	autoComplete(value: unknown): IDotInput;
	autoFocus(value: unknown): IDotInput;
	checked(value?: PrimativeOrObservable<boolean>): IDotInput;
	dirName(value: PrimativeOrObservable<string>): IDotInput;
	disabled(value: PrimativeOrObservable<boolean>): IDotInput;
	formAction(value: unknown): IDotInput;
	list(value: unknown): IDotInput;
	max(value: PrimativeOrObservable<number>): IDotInput;
	maxLength(value: PrimativeOrObservable<number>): IDotInput;
	min(value: PrimativeOrObservable<number>): IDotInput;
	multiple(value: unknown): IDotInput;
	name(value: PrimativeOrObservable<string>): IDotInput;
	pattern(value: PrimativeOrObservable<string>): IDotInput;
	placeholder(value: unknown): IDotInput;
	readOnly(value: PrimativeOrObservable<boolean>): IDotInput;
	required(value: PrimativeOrObservable<boolean>): IDotInput;
	size(value: unknown): IDotInput;
	src(value: PrimativeOrObservable<string>): IDotInput;
	step(value: unknown): IDotInput;
	type(value: "button"|"checkbox"|"color"|"date"|"datetime-local"|"email"|"file"|"hidden"|"image"|"month"|"number"|"password"|"radio"|"range"|"reset"|"search"|"submit"|"tel"|"text"|"time"|"url"|"week"): IDotInput;
	whichForm(value: unknown): IDotInput; // form
	value(value: PrimativeOrObservable<string|boolean|number>): IDotInput;
	width(value: PrimativeOrObservable<number>): IDotInput;

	// Special functions:
	// getVal(): string
	// setVal(value: unknown): IDotInput;

	// Input-specific events:
	onSearch(callback: (e: Event)=>void): IDotInput;
}
interface IDotIns extends IDotElementDocument<IDotIns>{
	dateTime(value: unknown): IDotIns;
	quoteCite(value: unknown): IDotIns; // cite
}
interface IDotKeyGen extends IDotElementDocument<IDotKeyGen>{
	challenge(value: unknown): IDotKeyGen;
	keyType(value: unknown): IDotKeyGen;
}
interface IDotLabel extends IDotElementDocument<IDotLabel>{
	for(value: unknown): IDotLabel;
	whichForm(value: unknown): IDotLabel; // form
}
interface IDotLi extends IDotElementDocument<IDotLi>{
	value(value: unknown): IDotLi;
}
interface IDotMap extends IDotElementDocument<IDotMap>{
	name(value: unknown): IDotMap;
}
interface IDotMenu extends IDotElementDocument<IDotMenu>{
	type(value: unknown): IDotMenu;
}
interface IDotMeter extends IDotElementDocument<IDotMeter>{
	high(value: unknown): IDotMeter;
	low(value: unknown): IDotMeter;
	max(value: unknown): IDotMeter;
	min(value: unknown): IDotMeter;
	optimum(value: unknown): IDotMeter;
	whichForm(value: unknown): IDotMeter; // form
	value(value: unknown): IDotMeter;
}
interface IDotObject extends IDotElementDocument<IDotObject>{
	classId(value: unknown): IDotObject;
	codeBase(value: unknown): IDotObject;
	codeType(value: unknown): IDotObject;
	objectData(value: unknown): IDotObject; // data
	declare(value: unknown): IDotObject;
	height(value: unknown): IDotObject;
	name(value: unknown): IDotObject;
	standby(value: unknown): IDotObject;
	type(value: unknown): IDotObject;
	useMap(value: unknown): IDotObject;
	whichForm(value: unknown): IDotObject; // form
	width(value: unknown): IDotObject;
}
interface IDotOl extends IDotElementDocument<IDotOl>{
	reversed(value: unknown): IDotOl;
	start(value: unknown): IDotOl;
}
interface IDotOptGroup extends IDotElementDocument<IDotOptGroup>{
	disabled(value: unknown): IDotOptGroup;
}
interface IDotOption extends IDotElementDocument<IDotOption>{
	disabled(value: unknown): IDotOption;
	optionLabel(value: unknown): IDotOption; // label
	selected(value?: boolean): IDotOption;
	value(value: unknown): IDotOption;

	// Special functions:
	// getVal(): string;
	// setVal(value: unknown): IDotOption;
}
interface IDotOutput extends IDotElementDocument<IDotOutput>{
	for(value: PrimativeOrObservable<string>): IDotOutput;
	name(value: PrimativeOrObservable<string>): IDotOutput;
	whichForm(value: unknown): IDotOutput; // form
}
interface IDotParam extends IDotElementDocument<IDotParam>{
	name(value: unknown): IDotParam;
	value(value: unknown): IDotParam;
	valueType(value: unknown): IDotParam;
}
interface IDotProgress extends IDotElementDocument<IDotProgress>{
	max(value: unknown): IDotProgress;
	value(value: unknown): IDotProgress;
}
interface IDotQ extends IDotElementDocument<IDotQ>{
	quoteCite(value: unknown): IDotQ; // cite
}
interface IDotSelect extends IDotElementDocument<IDotSelect>{
	autoFocus(value: unknown): IDotSelect;
	disabled(value: unknown): IDotSelect;
	multiple(value: unknown): IDotSelect;
	name(value: unknown): IDotSelect;
	required(value: unknown): IDotSelect;
	size(value: unknown): IDotSelect;
	whichForm(value: unknown): IDotSelect; // form

	// Special functions:
	// getVal(): string;
	// setVal(value: unknown): IDotSelect;
}
interface IDotSource extends IDotElementDocument<IDotSource>{
	media(value: unknown): IDotSource;
	src(value: unknown): IDotSource;
	type(value: unknown): IDotSource;
	sizes(value: unknown): IDotSource;
	src(value: unknown): IDotSource;
	srcSet(value: unknown): IDotSource;
	type(value: unknown): IDotSource;
}
interface IDotTable extends IDotElementDocument<IDotTable>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	border(value: unknown): IDotTable;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	cellPadding(value: unknown): IDotTable;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	cellSpacing(value: unknown): IDotTable;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	frame(value: unknown): IDotTable;
	rules(value: unknown): IDotTable;
	tableSummary(value: unknown): IDotTable; // summary
}
interface IDotTextArea extends IDotElementDocument<IDotTextArea>{
	autoFocus(value: PrimativeOrObservable<boolean>): IDotTextArea;
	cols(value: PrimativeOrObservable<number>): IDotTextArea;
	dirName(value: PrimativeOrObservable<string>): IDotTextArea;
	disabled(value: PrimativeOrObservable<boolean>): IDotTextArea;
	maxLength(value: unknown): IDotTextArea;
	name(value: string): IDotTextArea;
	placeholder(value: unknown): IDotTextArea;
	readOnly(value: unknown): IDotTextArea;
	required(value: unknown): IDotTextArea;
	rows(value: PrimativeOrObservable<number>): IDotTextArea;
	whichForm(value: unknown): IDotTextArea; // form
	wrap(value: unknown): IDotTextArea;

	// Special functions:
	// getVal(): string;
	// setVal(value: unknown): IDotTextArea;
}
interface IDotTBody extends IDotElementDocument<IDotTBody>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: unknown): IDotTBody;
	vAlign(value: unknown): IDotTBody;
}
interface IDotTd extends IDotElementDocument<IDotTd>{
	
	/** @deprecated Deprecated in HTML5. Use CSS. */
	axis(value: unknown): IDotTd;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	char(value: unknown): IDotTd;
	colSpan(value: unknown): IDotTd;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: unknown): IDotTd;
	headers(value: unknown): IDotTd;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	nowrap(value: unknown): IDotTd;
	rowSpan(value: unknown): IDotTd;
	vAlign(value: unknown): IDotTd;
	
}
interface IDotTFoot extends IDotElementDocument<IDotTFoot>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: unknown): IDotTFoot;
	vAlign(value: unknown): IDotTFoot;
}
interface IDotTime extends IDotElementDocument<IDotTime>{
	dateTime(value: unknown): IDotTime;
}
interface IDotTh extends IDotElementDocument<IDotTh>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	axis(value: unknown): IDotTh;
	colSpan(value: unknown): IDotTh;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: unknown): IDotTh;
	headers(value: unknown): IDotTh;
	rowSpan(value: unknown): IDotTh;
	scope(value: unknown): IDotTh;
	vAlign(value: unknown): IDotTh;
}
interface IDotTHead extends IDotElementDocument<IDotTHead>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: unknown): IDotTHead;
	vAlign(value: unknown): IDotTHead;
}
interface IDotTr extends IDotElementDocument<IDotTr>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: unknown): IDotTr;
	vAlign(value: unknown): IDotTr;
}
interface IDotTrack extends IDotElementDocument<IDotTrack>{
	default(value: unknown): IDotTrack;
	kind(value: unknown): IDotTrack;
	src(value: unknown): IDotTrack;
	srcLang(value: unknown): IDotTrack;
	trackLabel(value: unknown): IDotTrack; // label

	// Events:
	onCueChange(callback: (e: Event)=>void): IDotTrack;
}
interface IDotVideo extends IDotElementDocument<IDotVideo>{
	autoPlay(value: PrimativeOrObservable<boolean>): IDotVideo;
	buffered(value: unknown): IDotVideo;
	controls(value: PrimativeOrObservable<boolean>): IDotVideo;
	height(value: PrimativeOrObservable<number>): IDotVideo;
	loop(value: PrimativeOrObservable<boolean>): IDotVideo;
	muted(value: PrimativeOrObservable<boolean>): IDotVideo;
	poster(value: PrimativeOrObservable<string>): IDotVideo;
	preload(value: PrimativeOrObservable<boolean>): IDotVideo;
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