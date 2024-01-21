
import IComponent, { FrameworkItems } from "./i-component";
import IDotCss, { IDotcssProp } from "./i-dot-css";
import IEventBus from "./i-event-bus";
import IReactive from "./i-reactive";

type DotContentPrimitive = string|number|boolean;
type DotContentBasic = DotContentPrimitive|Node|Element|NodeList|IComponent|IDotDocument//typeof DotDocument;
export type DotContent = DotContentBasic|Array<DotContent>|IReactive;//|(()=>DotContent);

type AttrVal<T = string|number|boolean> = T|IReactive<T>;

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
	when(condition:IReactive|boolean, DotContent): IDotConditionalDocument;

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
	html(content: string|number|boolean|IReactive): IDotDocument;
	/**
	 * Creates a text node that will render as a string, rather than being parsed as markup.
	*/
	text(content: string|number|boolean|IReactive): IDotDocument;
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
	each<T>(a: IReactive<any, Array<T>|{[key: string|number]: T}>, callback: (x: T, i: IReactive<number>, k: string|number)=>DotContent): IDotDocument;

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

	watch<Ti = IReactive|Array<any>|{[key: string|number]: any}|string|number|boolean, To = Ti>(props?: {value: Ti, key?: string, transformer?: (value: Ti)=>To}): IReactive<Ti, To>;
	
	component<T extends IComponent>(Base: new (...args: Parameters<T['build']>) => T): new (...args: Parameters<T['build']>) => T;
	useStyles<T extends IComponent>(styles: string|((css: IDotCss)=>IDotcssProp|string)): ((Base: new (...args: Parameters<T['build']>) => T) => new (...args: Parameters<T['build']>) => T);
}

export interface IDotWindowBuilder{
	(content): Window;
}

export interface IDotConditionalDocument extends IDotDocument{
	/**
	 * A conditional catch, analogous to else if. Can be used after a when function. Evaluates if the previous when's condition was false.
	 * Renders the specified DOT if a condition is met. Dynamic binding is possible when condition and callback are functions.
	*/
	otherwiseWhen(condition:IReactive|boolean, callback: DotContent): IDotConditionalDocument;
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

	/** @deprecated Deprecated in HTML5. Use CSS. */
	bgColor(value: AttrVal<unknown>): T;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	color(value: AttrVal<unknown>): T;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	aLink(value: AttrVal<unknown>): T;
	/** @deprecated Deprecated in HTML5. */
	archive(value: AttrVal<unknown>): T;
	
	// TODO: we're still missing some additional global attributes. See https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/
	areaHidden(value: AttrVal<boolean>): T;
	areaLabel(value: AttrVal<string>): T;
	areaDescribedBy(value: AttrVal<string>): T;
	areaControls(value: AttrVal<string>): T;
	areaExpanded(value: AttrVal<boolean>): T;
	areaChecked(value: AttrVal<string>): T;
	areaSelected(value: AttrVal<boolean>): T;
	accessKey(value: AttrVal<string>): T; // This could potentially be enumerated. But care should be taken as these types are already quite complex.
	class(value: unknown): T; // TODO: need a better way of setting classes.
	contentEditable(value: AttrVal<"true">|AttrVal<"false">|AttrVal<"plaintext-only">): T;
	contextMenu(value: AttrVal<string>): T;
	dir(value: AttrVal<string>): T;
	draggable(value: AttrVal<"true">|AttrVal<"false">): T;
	dropZone(value: AttrVal<"move">|AttrVal<"copy">|AttrVal<"link">): T;
	exportParts(value: AttrVal<string>): T;
	hidden(value: AttrVal<boolean>): T;
	id(value: string): T;
	inert(value: AttrVal<boolean>): T;
	inputMode(value: AttrVal<string>): T;
	is(value: AttrVal<string>): T;
	itemId(value: AttrVal<string>): T;
	itemProp(value: AttrVal<string>): T;
	itemRef(value: AttrVal<string>): T;
	itemScope(value: AttrVal<string>): T;
	itemType(value: AttrVal<string>): T;
	lang(value: AttrVal<string>): T;
	nOnce(value: AttrVal<string>): T;
	part(value: AttrVal<string>): T;
	role(value: AttrVal<string>): T;
	spellCheck(value: AttrVal<"true">|AttrVal<"false">): T;
	style(value: string|IDotcssProp): T;
	tabIndex(value: AttrVal<number>): T;
	title(value: AttrVal<string>): T;
	translate(value: AttrVal<string>): T;
	virtualKeyboardPolicy(value: AttrVal<"auto">|AttrVal<"manual">): T;

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
	download(value: AttrVal<boolean>): IDotA;
	hRef(value: AttrVal<string>): IDotA;
	hRefLang(value: AttrVal<string>): IDotA;
	charset(value: AttrVal<string>): IDotA;
	coords(value: AttrVal<string>): IDotA;
	shape(value: AttrVal<string>): IDotA;
	media(value: AttrVal<string>): IDotA;
	ping(value: AttrVal<string>): IDotA; // Space separated. Consider an array. Or do what we're doing for class.
	rel(value: AttrVal<string>): IDotA;
	/** @deprecated Deprecated in HTML5. */
	rev(value: AttrVal<unknown>): IDotA;
	name(value: AttrVal<string>): IDotA;
	// rev(value: unknown): IDotA; // Not supported in HTML 5.
	target(value: AttrVal<"_blank">|AttrVal<"_parent">|AttrVal<"_self">|AttrVal<"_top">): IDotA;
	type(value: AttrVal<string>): IDotA;
}
interface IDotArea extends IDotElementDocument<IDotArea>{
	alt(value: AttrVal<string>): IDotArea;
	coords(value: AttrVal<string>): IDotArea;
	download(value: AttrVal<string>): IDotArea;
	hRef(value: AttrVal<string>): IDotArea;
	hRefLang(value: AttrVal<string>): IDotArea;
	media(value: AttrVal<string>): IDotArea;
	/** @deprecated Deprecated in HTML5. */
	noHRef(value: AttrVal<string>): IDotArea;
	rel(value: AttrVal<string>): IDotArea;
	shape(value: AttrVal<string>): IDotArea;
	target(value: AttrVal<string>): IDotArea;
}
interface IDotAudio extends IDotElementDocument<IDotAudio>{
	autoPlay(value: AttrVal<boolean>): IDotAudio;
	// buffered(value: unknown): IDotAudio; // Not used?
	controls(value: AttrVal<boolean>): IDotAudio;
	loop(value: AttrVal<boolean>): IDotAudio;
	muted(value: AttrVal<boolean>): IDotAudio;
	preload(value: AttrVal<"auto">|AttrVal<"metadata">|AttrVal<"none">): IDotAudio;
	src(value: AttrVal<string>): IDotAudio;
	crossOrigin(value: AttrVal<"anonymous">|AttrVal<"use-credentials">): IDotAudio;
	
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
	quoteCite(value: AttrVal<string>): IDotBlockQuote; // alias for cite
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
	autoFocus(value: AttrVal<boolean>): IDotButton;
	formAction(value: AttrVal<string>): IDotButton;
	disabled(value?: AttrVal<boolean>): IDotButton;
	name(value: AttrVal<string>): IDotButton;
	type(value: AttrVal<"button">|AttrVal<"submit">|AttrVal<"reset">): IDotButton;
	whichForm(value: AttrVal<string>): IDotButton; // alias for form
	value(value: AttrVal<string>): IDotButton;
}
interface IDotCanvas extends IDotElementDocument<IDotCanvas>{
	height(value: AttrVal<number>): IDotCanvas;
	width(value: AttrVal<number>): IDotCanvas;
}
interface IDotCol extends IDotElementDocument<IDotCol>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: AttrVal<unknown>): IDotCol;
	colSpan(value: AttrVal<number>): IDotCol; // alias for span
	vAlign(value: AttrVal<number>): IDotCol;
}
interface IDotColGroup extends IDotElementDocument<IDotColGroup>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: AttrVal<unknown>): IDotColGroup;
	colSpan(value: AttrVal<number>): IDotColGroup; // alias for span
	/** @deprecated Deprecated in HTML5. Use CSS. */
	vAlign(value: AttrVal<unknown>): IDotColGroup;
}
interface IDotDel extends IDotElementDocument<IDotDel>{
	dateTime(value: AttrVal<string>): IDotDel; // Would be cool if this could accept dates and just format them internally...
	quoteCite(value: AttrVal<string>): IDotDel; // alias for cite
}
interface IDotDetails extends IDotElementDocument<IDotDetails>{
	open(value: AttrVal<boolean>): IDotDetails;

	// Events:
	onToggle (callback: (e: Event)=>void): IDotDetails;
}
interface IDotEmbed extends IDotElementDocument<IDotEmbed>{
	height(value: AttrVal<number>): IDotEmbed;
	src(value: AttrVal<string>): IDotEmbed;
	type(value: AttrVal<string>): IDotEmbed;
	width(value: AttrVal<number>): IDotEmbed;
}
interface IDotFieldSet extends IDotElementDocument<IDotFieldSet>{
	disabled(value: AttrVal<boolean>): IDotFieldSet;
	name(value: AttrVal<string>): IDotFieldSet;
	whichForm(value: AttrVal<string>): IDotFieldSet; // alias for form
}
interface IDotForm extends IDotElementDocument<IDotForm>{
	acceptCharset(value: AttrVal<string>): IDotForm; // accept-charset, apparently the only hyphenated attribute (aside from data-*)...
	action(value: AttrVal<string>): IDotForm;
	autoComplete(value: AttrVal<"on">|AttrVal<"off">): IDotForm;
	encType(value: AttrVal<"application/x-www-form-urlencoded">|AttrVal<"multipart/form-data">|AttrVal<"text/plain">): IDotForm;
	method(value: AttrVal<"get">|AttrVal<"post">): IDotForm;
	name(value: AttrVal<string>): IDotForm;
	noValidate(value: AttrVal<boolean>): IDotForm;
	// rel(value: PrimativeOrObservable<string>): IDotForm; // Not used with forms?
	target(value: AttrVal<"_self">|AttrVal<"_blank">|AttrVal<"_parent">|AttrVal<"_top">): IDotForm;
}
interface IDotHr extends IDotElementDocument<IDotHr>{
	noShade(value: unknown): IDotHr;
}
interface IDotIFrame extends IDotElementDocument<IDotIFrame>{
	allow(value: AttrVal<string>): IDotIFrame;
	allowFullScreen(value: AttrVal<boolean>): IDotIFrame;
	/** @deprecated Deprecated in HTML5. */
	frameBorder(value: AttrVal<0>|AttrVal<1>): IDotIFrame;
	height(value: AttrVal<number>): IDotIFrame;
	/** @deprecated Deprecated in HTML5. */
	longDesc(value: AttrVal<string>): IDotIFrame;
	marginHeight(value: AttrVal<number>): IDotIFrame;
	marginWidth(value: AttrVal<number>): IDotIFrame;
	name(value: AttrVal<string>): IDotIFrame;
	referrerPolicy(value: AttrVal<string>): IDotIFrame;
	sandbox(value: AttrVal<string>): IDotIFrame;
	/** @deprecated Deprecated in HTML5. */
	scrolling(value: AttrVal<string>): IDotIFrame;
	seamless(value: AttrVal<boolean>): IDotIFrame;
	src(value: AttrVal<string>): IDotIFrame;
	srcDoc(value: AttrVal<string>): IDotIFrame;
	width(value: AttrVal<number>): IDotIFrame;
}
interface IDotImg extends IDotElementDocument<IDotImg>{
	alt(value: AttrVal<string>): IDotImg;
	crossOrigin(value: AttrVal<"anonymous">|AttrVal<"use-credentials">): IDotImg;
	decoding(value: AttrVal<"async">|AttrVal<"auto">|AttrVal<"sync">): IDotImg;
	height(value: AttrVal<number>): IDotImg;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	hSpace(value: AttrVal<unknown>): IDotImg;
	isMap(value: AttrVal<boolean>): IDotImg;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	loading(value: AttrVal<"eager">|AttrVal<"lazy">): IDotImg;
	longDesc(value: AttrVal<string>): IDotImg;
	referrerPolicy(value: AttrVal<string>): IDotImg;
	sizes(value: AttrVal<string>): IDotImg;
	src(value: AttrVal<string>): IDotImg;
	srcSet(value: AttrVal<string>): IDotImg; // Comma separated. Consider accepting an array.
	useMap(value: AttrVal<number>): IDotImg;
	width(value: AttrVal<number>): IDotImg;
}
interface IDotInput extends IDotElementDocument<IDotInput>{
	accept(value: AttrVal<string>): IDotInput;
	alt(value: AttrVal<string>): IDotInput;
	autoCapitalize(value: AttrVal<"none">|AttrVal<"sentences">|AttrVal<"words">|AttrVal<"characters">): IDotInput;
	autoComplete(value: AttrVal<"on">|AttrVal<"off">): IDotInput;
	autoFocus(value: AttrVal<boolean>): IDotInput;
	checked(value?: AttrVal<boolean>): IDotInput;
	enterKeyHint(value: AttrVal<"enter">|AttrVal<"done">|AttrVal<"go">|AttrVal<"next">|AttrVal<"preveous">|AttrVal<"search">|AttrVal<"send">): IDotInput;
	dirName(value: AttrVal<string>): IDotInput;
	disabled(value: AttrVal<boolean>): IDotInput;
	formAction(value: AttrVal<string>): IDotInput;
	height(value: AttrVal<number>): IDotInput;
	list(value: AttrVal<string>): IDotInput;
	max(value: AttrVal<number>): IDotInput;
	maxLength(value: AttrVal<number>): IDotInput;
	min(value: AttrVal<number>): IDotInput;
	multiple(value: AttrVal<boolean>): IDotInput;
	name(value: AttrVal<string>): IDotInput;
	pattern(value: AttrVal<string>): IDotInput;
	placeholder(value: AttrVal<string>): IDotInput;
	readOnly(value: AttrVal<boolean>): IDotInput;
	required(value: AttrVal<boolean>): IDotInput;
	size(value: AttrVal<number>): IDotInput;
	src(value: AttrVal<string>): IDotInput;
	step(value: AttrVal<string>|AttrVal<number>): IDotInput;
	type(value: "button"|"checkbox"|"color"|"date"|"datetime-local"|"email"|"file"|"hidden"|"image"|"month"|"number"|"password"|"radio"|"range"|"reset"|"search"|"submit"|"tel"|"text"|"time"|"url"|"week"): IDotInput;
	whichForm(value: AttrVal<string>): IDotInput; // form
	value(value: AttrVal<string>): IDotInput;
	width(value: AttrVal<number>): IDotInput;

	// Special functions:
	// getVal(): string
	// setVal(value: unknown): IDotInput;

	// Input-specific events:
	onSearch(callback: (e: Event)=>void): IDotInput;
}
interface IDotIns extends IDotElementDocument<IDotIns>{
	dateTime(value: AttrVal<string>): IDotIns;
	quoteCite(value: AttrVal<string>): IDotIns; // alias for cite
}
interface IDotKeyGen extends IDotElementDocument<IDotKeyGen>{
	challenge(value: AttrVal<string>): IDotKeyGen;
	keyType(value: AttrVal<string>): IDotKeyGen;
}
interface IDotLabel extends IDotElementDocument<IDotLabel>{
	for(value: AttrVal<string>): IDotLabel;
}
interface IDotLi extends IDotElementDocument<IDotLi>{
	value(value: AttrVal<number>): IDotLi;
}
interface IDotMap extends IDotElementDocument<IDotMap>{
	name(value: AttrVal<string>): IDotMap;
}
interface IDotMenu extends IDotElementDocument<IDotMenu>{
	type(value: AttrVal<string>): IDotMenu;
}
interface IDotMeter extends IDotElementDocument<IDotMeter>{
	high(value: AttrVal<number>): IDotMeter;
	low(value: AttrVal<number>): IDotMeter;
	max(value: AttrVal<number>): IDotMeter;
	min(value: AttrVal<number>): IDotMeter;
	optimum(value: AttrVal<number>): IDotMeter;
	value(value: AttrVal<number>): IDotMeter;
}
interface IDotObject extends IDotElementDocument<IDotObject>{
	archive(value: AttrVal<string>): IDotObject;
	classId(value: AttrVal<string>): IDotObject;
	codeBase(value: AttrVal<string>): IDotObject;
	codeType(value: AttrVal<string>): IDotObject;
	objectData(value: AttrVal<string>): IDotObject; // alias for data
	declare(value: AttrVal<boolean>): IDotObject;
	height(value: AttrVal<number>): IDotObject;
	name(value: AttrVal<string>): IDotObject;
	standby(value: AttrVal<string>): IDotObject;
	type(value: AttrVal<string>): IDotObject;
	useMap(value: AttrVal<string>): IDotObject;
	width(value: AttrVal<number>): IDotObject;
}
interface IDotOl extends IDotElementDocument<IDotOl>{
	reversed(value: boolean): IDotOl;
	start(value: number): IDotOl;
}
interface IDotOptGroup extends IDotElementDocument<IDotOptGroup>{
	disabled(value: boolean): IDotOptGroup;
}
interface IDotOption extends IDotElementDocument<IDotOption>{
	disabled(value: AttrVal<boolean>): IDotOption;
	optionLabel(value: AttrVal<string>): IDotOption; // alias for label
	selected(value: AttrVal<boolean>): IDotOption;
	value(value: AttrVal<string>): IDotOption;

	// Special functions:
	// getVal(): string;
	// setVal(value: unknown): IDotOption;
}
interface IDotOutput extends IDotElementDocument<IDotOutput>{
	for(value: AttrVal<string>): IDotOutput;
	name(value: AttrVal<string>): IDotOutput;
	whichForm(value: AttrVal<string>): IDotOutput; // alias for form
}
interface IDotParam extends IDotElementDocument<IDotParam>{
	name(value: AttrVal<string>): IDotParam;
	value(value: AttrVal<string>): IDotParam;
	/** @deprecated Deprecated in HTML5. */
	valueType(value: AttrVal<unknown>): IDotParam;
}
interface IDotProgress extends IDotElementDocument<IDotProgress>{
	max(value: AttrVal<number>): IDotProgress;
	value(value: AttrVal<number>): IDotProgress;
}
interface IDotQ extends IDotElementDocument<IDotQ>{
	quoteCite(value: AttrVal<string>): IDotQ; // alias for cite
}
interface IDotSelect extends IDotElementDocument<IDotSelect>{
	autoFocus(value: AttrVal<boolean>): IDotSelect;
	disabled(value: AttrVal<boolean>): IDotSelect;
	multiple(value: AttrVal<boolean>): IDotSelect;
	name(value: AttrVal<string>): IDotSelect;
	required(value: AttrVal<boolean>): IDotSelect;
	size(value: AttrVal<number>): IDotSelect;
	whichForm(value: AttrVal<string>): IDotSelect; // alias for form
	value(value: AttrVal<string>); // Pseudo attribute for convenience. 
}
interface IDotSource extends IDotElementDocument<IDotSource>{
	media(value: AttrVal<string>): IDotSource;
	src(value: AttrVal<string>): IDotSource;
	type(value: AttrVal<string>): IDotSource;
	sizes(value: AttrVal<string>): IDotSource;
	src(value: AttrVal<string>): IDotSource;
	srcSet(value: AttrVal<string>): IDotSource;
	type(value: AttrVal<string>): IDotSource;
}
interface IDotTable extends IDotElementDocument<IDotTable>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	border(value: AttrVal<string>|AttrVal<number>): IDotTable;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	cellPadding(value: AttrVal<string>|AttrVal<number>): IDotTable;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	cellSpacing(value: AttrVal<string>|AttrVal<number>): IDotTable;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	frame(value: AttrVal<string>|AttrVal<number>): IDotTable;
	/** @deprecated Deprecated in HTML5. */
	height(value: AttrVal<number>): IDotTable;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	rules(value: AttrVal<string>): IDotTable;
	/** @deprecated Deprecated in HTML5. */
	tableSummary(value: AttrVal<string>): IDotTable; // summary
	/** @deprecated Deprecated in HTML5. */
	width(value: AttrVal<number>): IDotTable;
}
interface IDotTextArea extends IDotElementDocument<IDotTextArea>{
	autoCapitalize(value: AttrVal<"none">|AttrVal<"sentences">|AttrVal<"words">|AttrVal<"characters">): IDotTextArea;
	autoFocus(value: AttrVal<boolean>): IDotTextArea;
	cols(value: AttrVal<number>): IDotTextArea;
	dirName(value: AttrVal<string>): IDotTextArea;
	disabled(value: AttrVal<boolean>): IDotTextArea;
	enterKeyHint(value: AttrVal<"enter">|AttrVal<"done">|AttrVal<"go">|AttrVal<"next">|AttrVal<"preveous">|AttrVal<"search">|AttrVal<"send">): IDotTextArea;
	maxLength(value: AttrVal<number>): IDotTextArea;
	name(value: AttrVal<string>): IDotTextArea;
	placeholder(value: AttrVal<string>): IDotTextArea;
	readOnly(value: AttrVal<boolean>): IDotTextArea;
	required(value: AttrVal<boolean>): IDotTextArea;
	rows(value: AttrVal<number>): IDotTextArea;
	whichForm(value: AttrVal<string>): IDotTextArea; // alias for form
	wrap(value: AttrVal<string>): IDotTextArea;
	value(value: AttrVal<string>); // Pseudo attribute for convenience. 
}
interface IDotTBody extends IDotElementDocument<IDotTBody>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: AttrVal<unknown>): IDotTBody;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	vAlign(value: AttrVal<unknown>): IDotTBody;
}
interface IDotTd extends IDotElementDocument<IDotTd>{
	
	/** @deprecated Deprecated in HTML5. Use CSS. */
	axis(value: AttrVal<string>): IDotTd;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	char(value: AttrVal<string>): IDotTd;
	colSpan(value: AttrVal<number>): IDotTd;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: AttrVal<string>): IDotTd;
	headers(value: AttrVal<string>): IDotTd;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	noWrap(value: AttrVal<boolean>): IDotTd;
	rowSpan(value: AttrVal<number>): IDotTd;
	scope(value: AttrVal<string>): IDotTd;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	vAlign(value: AttrVal<string>): IDotTd;
}
interface IDotTFoot extends IDotElementDocument<IDotTFoot>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: AttrVal<number>): IDotTFoot;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	vAlign(value: AttrVal<string>): IDotTFoot;
}
interface IDotTime extends IDotElementDocument<IDotTime>{
	dateTime(value: AttrVal<string>): IDotTime;
}
interface IDotTh extends IDotElementDocument<IDotTh>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	axis(value: AttrVal<string>): IDotTh;
	colSpan(value: AttrVal<number>): IDotTh;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: AttrVal<string>): IDotTh;
	headers(value: AttrVal<string>): IDotTh;
	rowSpan(value: AttrVal<number>): IDotTh;
	scope(value: AttrVal<string>): IDotTh;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	vAlign(value: AttrVal<string>): IDotTh;
}
interface IDotTHead extends IDotElementDocument<IDotTHead>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: AttrVal<string>|AttrVal<number>): IDotTHead;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	vAlign(value: AttrVal<string>): IDotTHead;
}
interface IDotTr extends IDotElementDocument<IDotTr>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: AttrVal<string>|AttrVal<number>): IDotTr;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	vAlign(value: AttrVal<string>): IDotTr;
}
interface IDotTrack extends IDotElementDocument<IDotTrack>{
	default(value: AttrVal<boolean>): IDotTrack;
	kind(value: AttrVal<string>): IDotTrack;
	src(value: AttrVal<string>): IDotTrack;
	srcLang(value: AttrVal<string>): IDotTrack;
	trackLabel(value: AttrVal<string>): IDotTrack; // alias for label

	// Events:
	onCueChange(callback: (e: Event)=>void): IDotTrack;
}
interface IDotVideo extends IDotElementDocument<IDotVideo>{
	autoPlay(value: AttrVal<boolean>): IDotVideo;
	buffered(value: IReactive<unknown>): IDotVideo; // Managed by browser not user. TODO: we can possibly use events to update observable objects.
	controls(value: AttrVal<boolean>): IDotVideo;
	crossOrigin(value: AttrVal<"anonymous">|AttrVal<"use-credentials">): IDotVideo;
	height(value: AttrVal<number>): IDotVideo;
	loop(value: AttrVal<boolean>): IDotVideo;
	muted(value: AttrVal<boolean>): IDotVideo;
	playsInline(value: AttrVal<boolean>): IDotVideo;
	poster(value: AttrVal<string>): IDotVideo;
	preload(value: AttrVal<"none">|AttrVal<"metadata">|AttrVal<"auto">): IDotVideo;
	src(value: AttrVal<string>): IDotVideo;
	width(value: AttrVal<number>): IDotVideo;
	
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