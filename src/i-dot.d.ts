
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
	// Removed in v6.
	// _appendOrCreateDocument(content: DotContent, parentEl?: Element, beforeNode?: Node|number);

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
	el(tag: string, content?: DotContent): IDotDocument

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
	 * TODO: add second arg.
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
	// getLast(): HTMLElement;
	/**
	 * Deletes each element within the targeted document.
	*/
	empty(): IDotDocument;

	// Redundant in v6.
	// scopeClass(prefix: number|string|null, content: DotContent): IDotDocument;

	// Tags.
	a(content?: DotContent, attrs?: (attrs: IDotA)=>IDotA|void): IDotDocument;
	a(attrs: (attrs: IDotA)=>IDotA|void): IDotDocument;
	
	aside(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	aside(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	abbr(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	abbr(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	address(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	address(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;

	area(content?: DotContent, attrs?: (attrs: IDotArea)=>IDotArea|void): IDotDocument;
	area(attrs: (attrs: IDotArea)=>IDotArea|void): IDotDocument;
	
	article(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	article(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;

	audio(content?: DotContent, attrs?: (attrs: IDotAudio)=>IDotAudio|void): IDotDocument;
	audio(attrs: (attrs: IDotAudio)=>IDotAudio|void): IDotDocument;

	b(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	b(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	bdi(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	bdi(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	bdo(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	bdo(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	
	blockQuote(content?: DotContent, attrs?: (attrs: IDotBlockQuote)=>IDotBlockQuote|void): IDotDocument;
	blockQuote(attrs: (attrs: IDotBlockQuote)=>IDotBlockQuote|void): IDotDocument;
	
	// This shouldn't really be used - if it is, then it should have the custom behavior of rewriting the existing document body, rather than adding a second one.
	body(content?: DotContent, attrs?: (attrs: IDotBody)=>IDotBody|void): IDotDocument;
	body(content?: DotContent|void): IDotDocument;
	
	br(content?: DotContent, attrs?: (attrs: IDotBr)=>IDotBr|void): IDotDocument;
	br(attrs: (attrs: IDotBr)=>IDotBr|void): IDotDocument;
	button(content?: DotContent, attrs?: (attrs: IDotButton)=>IDotButton|void): IDotDocument;
	button(attrs: (attrs: IDotButton)=>IDotButton|void): IDotDocument;
	canvas(content?: DotContent, attrs?: (attrs: IDotCanvas)=>IDotCanvas|void): IDotDocument;
	canvas(attrs: (attrs: IDotCanvas)=>IDotCanvas|void): IDotDocument;
	
	caption(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	caption(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	cite(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	cite(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	code(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	code(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	
	col(content?: DotContent, attrs?: (attrs: IDotCol)=>IDotCol|void): IDotDocument;
	col(attrs: (attrs: IDotCol)=>IDotCol|void): IDotDocument;
	colGroup(content?: DotContent, attrs?: (attrs: IDotColGroup)=>IDotColGroup|void): IDotDocument;
	colGroup(attrs: (attrs: IDotColGroup)=>IDotColGroup|void): IDotDocument;
	
	content(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	content(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	data(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	data(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	dataList(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	dataList(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	dd(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	dd(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;

	del(content?: DotContent, attrs?: (attrs: IDotDel)=>IDotDel|void): IDotDocument;
	del(attrs: (attrs: IDotDel)=>IDotDel|void): IDotDocument;
	details(content?: DotContent, attrs?: (attrs: IDotDetails)=>IDotDetails|void): IDotDocument;
	details(attrs: (attrs: IDotDetails)=>IDotDetails|void): IDotDocument;

	dfn(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	dfn(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	dialog(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	dialog(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	div(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	div(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	dl(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	dl(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	dt(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	dt(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	em(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	em(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;

	embed(content?: DotContent, attrs?: (attrs: IDotEmbed)=>IDotEmbed|void): IDotDocument;
	embed(attrs: (attrs: IDotEmbed)=>IDotEmbed|void): IDotDocument;
	fieldSet(content?: DotContent, attrs?: (attrs: IDotFieldSet)=>IDotFieldSet|void): IDotDocument;
	fieldSet(attrs: (attrs: IDotFieldSet)=>IDotFieldSet|void): IDotDocument;

	figCaption(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	figCaption(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	figure(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	figure(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	footer(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	footer(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;

	form(content?: DotContent, attrs?: (attrs: IDotForm)=>IDotForm|void): IDotDocument;
	form(attrs: (attrs: IDotForm)=>IDotForm|void): IDotDocument;

	h1(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	h1(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	h2(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	h2(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	h3(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	h3(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	h4(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	h4(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	h5(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	h5(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	h6(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	h6(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	header(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	header(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;

	hr(content?: DotContent, attrs?: (attrs: IDotHr)=>IDotHr|void): IDotDocument;
	hr(attrs: (attrs: IDotHr)=>IDotHr|void): IDotDocument;

	i(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	i(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;

	iFrame(content?: DotContent, attrs?: (attrs: IDotIFrame)=>IDotIFrame|void): IDotDocument;
	iFrame(attrs: (attrs: IDotIFrame)=>IDotIFrame|void): IDotDocument;
	img(content?: DotContent, attrs?: (attrs: IDotImg)=>IDotImg|void): IDotDocument;
	img(attrs: (attrs: IDotImg)=>IDotImg|void): IDotDocument;
	input(content?: DotContent, attrs?: (attrs: IDotInput)=>IDotInput|void): IDotDocument;
	input(attrs: (attrs: IDotInput)=>IDotInput|void): IDotDocument;
	ins(content?: DotContent, attrs?: (attrs: IDotIns)=>IDotIns|void): IDotDocument;
	ins(attrs: (attrs: IDotIns)=>IDotIns|void): IDotDocument;
	
	kbd(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	kbd(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	
	/** @deprecated Deprecated in HTML5. */
	keyGen(content?: DotContent, attrs?: (attrs: IDotKeyGen)=>IDotKeyGen|void): IDotDocument;
	keyGen(attrs: (attrs: IDotKeyGen)=>IDotKeyGen|void): IDotDocument;
	label(content?: DotContent, attrs?: (attrs: IDotLabel)=>IDotLabel|void): IDotDocument;
	label(attrs: (attrs: IDotLabel)=>IDotLabel|void): IDotDocument;
	
	legend(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	legend(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;

	li(content?: DotContent, attrs?: (attrs: IDotLi)=>IDotLi|void): IDotDocument;
	li(attrs: (attrs: IDotLi)=>IDotLi|void): IDotDocument;

	main(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	main(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;

	map(content?: DotContent, attrs?: (attrs: IDotMap)=>IDotMap|void): IDotDocument;
	map(attrs: (attrs: IDotMap)=>IDotMap|void): IDotDocument;

	mark(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	mark(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;

	menu(content?: DotContent, attrs?: (attrs: IDotMenu)=>IDotMenu|void): IDotDocument;
	menu(attrs: (attrs: IDotMenu)=>IDotMenu|void): IDotDocument;
	meter(content?: DotContent, attrs?: (attrs: IDotMeter)=>IDotMeter|void): IDotDocument;
	meter(attrs: (attrs: IDotMeter)=>IDotMeter|void): IDotDocument;

	nav(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	nav(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;

	object(content?: DotContent, attrs?: (attrs: IDotObject)=>IDotObject|void): IDotDocument;
	object(attrs: (attrs: IDotObject)=>IDotObject|void): IDotDocument;
	ol(content?: DotContent, attrs?: (attrs: IDotOl)=>IDotOl|void): IDotDocument;
	ol(attrs: (attrs: IDotOl)=>IDotOl|void): IDotDocument;
	optGroup(content?: DotContent, attrs?: (attrs: IDotOptGroup)=>IDotOptGroup|void): IDotDocument;
	optGroup(attrs: (attrs: IDotOptGroup)=>IDotOptGroup|void): IDotDocument;
	option(content?: DotContent, attrs?: (attrs: IDotOption)=>IDotOption|void): IDotDocument;
	option(attrs: (attrs: IDotOption)=>IDotOption|void): IDotDocument;
	output(content?: DotContent, attrs?: (attrs: IDotOutput)=>IDotOutput|void): IDotDocument;
	output(attrs: (attrs: IDotOutput)=>IDotOutput|void): IDotDocument;

	p(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	p(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;

	param(content?: DotContent, attrs?: (attrs: IDotParam)=>IDotParam|void): IDotDocument;
	param(attrs: (attrs: IDotParam)=>IDotParam|void): IDotDocument;

	pre(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	pre(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;

	progress(content?: DotContent, attrs?: (attrs: IDotProgress)=>IDotProgress|void): IDotDocument;
	progress(attrs: (attrs: IDotProgress)=>IDotProgress|void): IDotDocument;
	q(content?: DotContent, attrs?: (attrs: IDotQ)=>IDotQ|void): IDotDocument;
	q(attrs: (attrs: IDotQ)=>IDotQ|void): IDotDocument;

	rp(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	rp(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	rt(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	rt(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	ruby(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	ruby(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	s(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	s(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	samp(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	samp(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	section(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	section(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;

	select(content?: DotContent, attrs?: (attrs: IDotSelect)=>IDotSelect|void): IDotDocument;
	select(attrs: (attrs: IDotSelect)=>IDotSelect|void): IDotDocument;

	small(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	small(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;

	source(content?: DotContent, attrs?: (attrs: IDotSource)=>IDotSource|void): IDotDocument;
	source(attrs: (attrs: IDotSource)=>IDotSource|void): IDotDocument;

	span(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	span(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	strong(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	strong(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	svg(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	svg(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	sub(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	sub(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	summary(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	summary(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	sup(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	sup(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;

	table(content?: DotContent, attrs?: (attrs: IDotTable)=>IDotTable|void): IDotDocument;
	table(attrs: (attrs: IDotTable)=>IDotTable|void): IDotDocument;
	tBody(content?: DotContent, attrs?: (attrs: IDotTBody)=>IDotTBody|void): IDotDocument;
	tBody(attrs: (attrs: IDotTBody)=>IDotTBody|void): IDotDocument;
	td(content?: DotContent, attrs?: (attrs: IDotTd)=>IDotTd|void): IDotDocument;
	td(attrs: (attrs: IDotTd)=>IDotTd|void): IDotDocument;
	textArea(content?: DotContent, attrs?: (attrs: IDotTextArea)=>IDotTextArea|void): IDotDocument;
	textArea(attrs: (attrs: IDotTextArea)=>IDotTextArea|void): IDotDocument;
	tFoot(content?: DotContent, attrs?: (attrs: IDotTFoot)=>IDotTFoot|void): IDotDocument;
	tFoot(attrs: (attrs: IDotTFoot)=>IDotTFoot|void): IDotDocument;
	th(content?: DotContent, attrs?: (attrs: IDotTh)=>IDotTh|void): IDotDocument;
	th(attrs: (attrs: IDotTh)=>IDotTh|void): IDotDocument;
	tHead(content?: DotContent, attrs?: (attrs: IDotTHead)=>IDotTHead|void): IDotDocument;
	tHead(attrs: (attrs: IDotTHead)=>IDotTHead|void): IDotDocument;
	time(content?: DotContent, attrs?: (attrs: IDotTime)=>IDotTime|void): IDotDocument;
	time(attrs: (attrs: IDotTime)=>IDotTime|void): IDotDocument;
	tr(content?: DotContent, attrs?: (attrs: IDotTr)=>IDotTr|void): IDotDocument;
	tr(attrs: (attrs: IDotTr)=>IDotTr|void): IDotDocument;
	track(content?: DotContent, attrs?: (attrs: IDotTrack)=>IDotTrack|void): IDotDocument;
	track(attrs: (attrs: IDotTrack)=>IDotTrack|void): IDotDocument;

	u(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	u(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	ul(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	ul(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	var(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	var(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;

	video(content?: DotContent, attrs?: (attrs: IDotVideo)=>IDotVideo|void): IDotDocument;
	video(attrs: (attrs: IDotVideo)=>IDotVideo|void): IDotDocument;

	wbr(content?: DotContent, attrs?: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
	wbr(attrs: (attrs: IDotAttrBuilder<IDotGenericElement>)=>IDotAttrBuilder<IDotGenericElement>|void): IDotDocument;
}

type Styles = string|((css: IDotCss) => IDotcssProp|string);
interface IComponentFactory {
    <T extends IComponent>(Base: new (...args: Parameters<T['build']>) => T, styles?: Styles[]): new (...args: Parameters<T['build']>) => T;
	useStyles<T extends IComponent>(styles: Styles): (Base: new (...args: Parameters<T['build']>) => T) => new (...args: Parameters<T['build']>) => T;
}


/**
 * Interface for the dot object.
 */
export interface IDotCore extends IDotDocument
{
	(targetSelector: string|Element|Node|NodeList|Array<Node|Element>): IDotDocument;

	version: string;
	styleMode: "sync"|"async";

	navigate(path: string, noHistory?: boolean, force?: boolean): void;
	css: IDotCss;
	bus: IEventBus;
	// window: IDotWindowBuilder;

	watch<Ti = IReactive|Array<any>|{[key: string|number]: any}|string|number|boolean, To = Ti>(props?: {value: Ti, key?: string, transformer?: (value: Ti)=>To}): IReactive<Ti, To>;
	
	// Keep these around for a bit to show how it was done before in case I need to change anything prior to the v6 launch.
	// component<T extends IComponent>(Base: new (...args: Parameters<T['build']>) => T): new (...args: Parameters<T['build']>) => T;
	// useStyles<T extends IComponent>(styles: string|((css: IDotCss)=>IDotcssProp|string)): ((Base: new (...args: Parameters<T['build']>) => T) => new (...args: Parameters<T['build']>) => T);

	component: IComponentFactory;
	useStyles(document: Document, styles: Styles): HTMLStyleElement;
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
export interface IDotAttrBuilder<T>
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

interface IDotGenericElement extends IDotAttrBuilder<IDotGenericElement>{}

// Interface for specific elements:

interface IMountedComponent extends IDotDocument{
	on(event: string, callback: (...args: Array<any>)=>void): IMountedComponent;
	prop(name: string, value: any): IMountedComponent;
}

interface IDotA extends IDotAttrBuilder<IDotA>{
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
interface IDotArea extends IDotAttrBuilder<IDotArea>{
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
interface IDotAudio extends IDotAttrBuilder<IDotAudio>{
	autoPlay(value: AttrVal<boolean>): IDotAudio;
	// buffered(value: unknown): IDotAudio; // Not used?
	controls(value: AttrVal<boolean>): IDotAudio;
	loop(value: AttrVal<boolean>): IDotAudio;
	muted(value: AttrVal<boolean>): IDotAudio;
	preload(value: AttrVal<"auto">|AttrVal<"metadata">|AttrVal<"none">): IDotAudio;
	src(value: AttrVal<string>): IDotAudio;
	crossOrigin(value: AttrVal<"anonymous">|AttrVal<"use-credentials">): IDotAudio;
	
	// Special functions:
	// TODO: these need to be removed from here.
	// pause(): IDotAudio;
	// play(): IDotAudio;
	// stop(): IDotAudio;

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
interface IDotBlockQuote extends IDotAttrBuilder<IDotBlockQuote>{
	quoteCite(value: AttrVal<string>): IDotBlockQuote; // alias for cite
}
interface IDotBody extends IDotAttrBuilder<IDotBody>{
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
interface IDotBr extends IDotAttrBuilder<IDotBr>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	clear(value: unknown): IDotBr;
}
interface IDotButton extends IDotAttrBuilder<IDotButton>{
	autoFocus(value: AttrVal<boolean>): IDotButton;
	formAction(value: AttrVal<string>): IDotButton;
	disabled(value?: AttrVal<boolean>): IDotButton;
	name(value: AttrVal<string>): IDotButton;
	type(value: AttrVal<"button">|AttrVal<"submit">|AttrVal<"reset">): IDotButton;
	whichForm(value: AttrVal<string>): IDotButton; // alias for form
	value(value: AttrVal<string>): IDotButton;
}
interface IDotCanvas extends IDotAttrBuilder<IDotCanvas>{
	height(value: AttrVal<number>): IDotCanvas;
	width(value: AttrVal<number>): IDotCanvas;
}
interface IDotCol extends IDotAttrBuilder<IDotCol>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: AttrVal<unknown>): IDotCol;
	colSpan(value: AttrVal<number>): IDotCol; // alias for span
	vAlign(value: AttrVal<number>): IDotCol;
}
interface IDotColGroup extends IDotAttrBuilder<IDotColGroup>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: AttrVal<unknown>): IDotColGroup;
	colSpan(value: AttrVal<number>): IDotColGroup; // alias for span
	/** @deprecated Deprecated in HTML5. Use CSS. */
	vAlign(value: AttrVal<unknown>): IDotColGroup;
}
interface IDotDel extends IDotAttrBuilder<IDotDel>{
	dateTime(value: AttrVal<string>): IDotDel; // Would be cool if this could accept dates and just format them internally...
	quoteCite(value: AttrVal<string>): IDotDel; // alias for cite
}
interface IDotDetails extends IDotAttrBuilder<IDotDetails>{
	open(value: AttrVal<boolean>): IDotDetails;

	// Events:
	onToggle (callback: (e: Event)=>void): IDotDetails;
}
interface IDotEmbed extends IDotAttrBuilder<IDotEmbed>{
	height(value: AttrVal<number>): IDotEmbed;
	src(value: AttrVal<string>): IDotEmbed;
	type(value: AttrVal<string>): IDotEmbed;
	width(value: AttrVal<number>): IDotEmbed;
}
interface IDotFieldSet extends IDotAttrBuilder<IDotFieldSet>{
	disabled(value: AttrVal<boolean>): IDotFieldSet;
	name(value: AttrVal<string>): IDotFieldSet;
	whichForm(value: AttrVal<string>): IDotFieldSet; // alias for form
}
interface IDotForm extends IDotAttrBuilder<IDotForm>{
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
interface IDotHr extends IDotAttrBuilder<IDotHr>{
	noShade(value: unknown): IDotHr;
}
interface IDotIFrame extends IDotAttrBuilder<IDotIFrame>{
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
interface IDotImg extends IDotAttrBuilder<IDotImg>{
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
interface IDotInput extends IDotAttrBuilder<IDotInput>{
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
interface IDotIns extends IDotAttrBuilder<IDotIns>{
	dateTime(value: AttrVal<string>): IDotIns;
	quoteCite(value: AttrVal<string>): IDotIns; // alias for cite
}
interface IDotKeyGen extends IDotAttrBuilder<IDotKeyGen>{
	challenge(value: AttrVal<string>): IDotKeyGen;
	keyType(value: AttrVal<string>): IDotKeyGen;
}
interface IDotLabel extends IDotAttrBuilder<IDotLabel>{
	for(value: AttrVal<string>): IDotLabel;
}
interface IDotLi extends IDotAttrBuilder<IDotLi>{
	value(value: AttrVal<number>): IDotLi;
}
interface IDotMap extends IDotAttrBuilder<IDotMap>{
	name(value: AttrVal<string>): IDotMap;
}
interface IDotMenu extends IDotAttrBuilder<IDotMenu>{
	type(value: AttrVal<string>): IDotMenu;
}
interface IDotMeter extends IDotAttrBuilder<IDotMeter>{
	high(value: AttrVal<number>): IDotMeter;
	low(value: AttrVal<number>): IDotMeter;
	max(value: AttrVal<number>): IDotMeter;
	min(value: AttrVal<number>): IDotMeter;
	optimum(value: AttrVal<number>): IDotMeter;
	value(value: AttrVal<number>): IDotMeter;
}
interface IDotObject extends IDotAttrBuilder<IDotObject>{
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
interface IDotOl extends IDotAttrBuilder<IDotOl>{
	reversed(value: boolean): IDotOl;
	start(value: number): IDotOl;
}
interface IDotOptGroup extends IDotAttrBuilder<IDotOptGroup>{
	disabled(value: boolean): IDotOptGroup;
}
interface IDotOption extends IDotAttrBuilder<IDotOption>{
	disabled(value: AttrVal<boolean>): IDotOption;
	optionLabel(value: AttrVal<string>): IDotOption; // alias for label
	selected(value: AttrVal<boolean>): IDotOption;
	value(value: AttrVal<string>): IDotOption;

	// Special functions:
	// getVal(): string;
	// setVal(value: unknown): IDotOption;
}
interface IDotOutput extends IDotAttrBuilder<IDotOutput>{
	for(value: AttrVal<string>): IDotOutput;
	name(value: AttrVal<string>): IDotOutput;
	whichForm(value: AttrVal<string>): IDotOutput; // alias for form
}
interface IDotParam extends IDotAttrBuilder<IDotParam>{
	name(value: AttrVal<string>): IDotParam;
	value(value: AttrVal<string>): IDotParam;
	/** @deprecated Deprecated in HTML5. */
	valueType(value: AttrVal<unknown>): IDotParam;
}
interface IDotProgress extends IDotAttrBuilder<IDotProgress>{
	max(value: AttrVal<number>): IDotProgress;
	value(value: AttrVal<number>): IDotProgress;
}
interface IDotQ extends IDotAttrBuilder<IDotQ>{
	quoteCite(value: AttrVal<string>): IDotQ; // alias for cite
}
interface IDotSelect extends IDotAttrBuilder<IDotSelect>{
	autoFocus(value: AttrVal<boolean>): IDotSelect;
	disabled(value: AttrVal<boolean>): IDotSelect;
	multiple(value: AttrVal<boolean>): IDotSelect;
	name(value: AttrVal<string>): IDotSelect;
	required(value: AttrVal<boolean>): IDotSelect;
	size(value: AttrVal<number>): IDotSelect;
	whichForm(value: AttrVal<string>): IDotSelect; // alias for form
	value(value: AttrVal<string>); // Pseudo attribute for convenience. 
}
interface IDotSource extends IDotAttrBuilder<IDotSource>{
	media(value: AttrVal<string>): IDotSource;
	src(value: AttrVal<string>): IDotSource;
	type(value: AttrVal<string>): IDotSource;
	sizes(value: AttrVal<string>): IDotSource;
	src(value: AttrVal<string>): IDotSource;
	srcSet(value: AttrVal<string>): IDotSource;
	type(value: AttrVal<string>): IDotSource;
}
interface IDotTable extends IDotAttrBuilder<IDotTable>{
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
interface IDotTextArea extends IDotAttrBuilder<IDotTextArea>{
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
interface IDotTBody extends IDotAttrBuilder<IDotTBody>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: AttrVal<unknown>): IDotTBody;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	vAlign(value: AttrVal<unknown>): IDotTBody;
}
interface IDotTd extends IDotAttrBuilder<IDotTd>{
	
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
interface IDotTFoot extends IDotAttrBuilder<IDotTFoot>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: AttrVal<number>): IDotTFoot;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	vAlign(value: AttrVal<string>): IDotTFoot;
}
interface IDotTime extends IDotAttrBuilder<IDotTime>{
	dateTime(value: AttrVal<string>): IDotTime;
}
interface IDotTh extends IDotAttrBuilder<IDotTh>{
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
interface IDotTHead extends IDotAttrBuilder<IDotTHead>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: AttrVal<string>|AttrVal<number>): IDotTHead;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	vAlign(value: AttrVal<string>): IDotTHead;
}
interface IDotTr extends IDotAttrBuilder<IDotTr>{
	/** @deprecated Deprecated in HTML5. Use CSS. */
	charOff(value: AttrVal<string>|AttrVal<number>): IDotTr;
	/** @deprecated Deprecated in HTML5. Use CSS. */
	vAlign(value: AttrVal<string>): IDotTr;
}
interface IDotTrack extends IDotAttrBuilder<IDotTrack>{
	default(value: AttrVal<boolean>): IDotTrack;
	kind(value: AttrVal<string>): IDotTrack;
	src(value: AttrVal<string>): IDotTrack;
	srcLang(value: AttrVal<string>): IDotTrack;
	trackLabel(value: AttrVal<string>): IDotTrack; // alias for label

	// Events:
	onCueChange(callback: (e: Event)=>void): IDotTrack;
}
interface IDotVideo extends IDotAttrBuilder<IDotVideo>{
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
	// TODO:
	// pause(): IDotVideo;
	// play(): IDotVideo;
	// stop(): IDotVideo;

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