
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
	a(content?: DotContent, attrs?: (attrs: IDotA)=>IDotA): IDotDocument;
	a(attrs: (attrs: IDotA)=>IDotA): IDotDocument;
	
	aside(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	aside(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	abbr(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	abbr(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	address(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	address(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;

	area(content?: DotContent, attrs?: (attrs: IDotArea)=>IDotArea): IDotDocument;
	area(attrs: (attrs: IDotArea)=>IDotArea): IDotDocument;
	
	article(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	article(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;

	audio(content?: DotContent, attrs?: (attrs: IDotAudio)=>IDotAudio): IDotDocument;
	audio(attrs: (attrs: IDotAudio)=>IDotAudio): IDotDocument;

	b(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	b(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	bdi(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	bdi(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	bdo(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	bdo(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	
	blockQuote(content?: DotContent, attrs?: (attrs: IDotBlockQuote)=>IDotBlockQuote): IDotDocument;
	blockQuote(attrs: (attrs: IDotBlockQuote)=>IDotBlockQuote): IDotDocument;
	
	// This shouldn't really be used - if it is, then it should have the custom behavior of rewriting the existing document body, rather than adding a second one.
	body(content?: DotContent, attrs?: (attrs: IDotBody)=>IDotBody): IDotDocument;
	body(content?: DotContent): IDotDocument;
	
	br(content?: DotContent, attrs?: (attrs: IDotBr)=>IDotBr): IDotDocument;
	br(attrs: (attrs: IDotBr)=>IDotBr): IDotDocument;
	button(content?: DotContent, attrs?: (attrs: IDotButton)=>IDotButton): IDotDocument;
	button(attrs: (attrs: IDotButton)=>IDotButton): IDotDocument;
	canvas(content?: DotContent, attrs?: (attrs: IDotCanvas)=>IDotCanvas): IDotDocument;
	canvas(attrs: (attrs: IDotCanvas)=>IDotCanvas): IDotDocument;
	
	caption(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	caption(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	cite(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	cite(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	code(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	code(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	
	col(content?: DotContent, attrs?: (attrs: IDotCol)=>IDotCol): IDotDocument;
	col(attrs: (attrs: IDotCol)=>IDotCol): IDotDocument;
	colGroup(content?: DotContent, attrs?: (attrs: IDotColGroup)=>IDotColGroup): IDotDocument;
	colGroup(attrs: (attrs: IDotColGroup)=>IDotColGroup): IDotDocument;
	
	content(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	content(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	data(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	data(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	dataList(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	dataList(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	dd(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	dd(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;

	del(content?: DotContent, attrs?: (attrs: IDotDel)=>IDotDel): IDotDocument;
	del(attrs: (attrs: IDotDel)=>IDotDel): IDotDocument;
	details(content?: DotContent, attrs?: (attrs: IDotDetails)=>IDotDetails): IDotDocument;
	details(attrs: (attrs: IDotDetails)=>IDotDetails): IDotDocument;

	dfn(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	dfn(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	dialog(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	dialog(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	div(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	div(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	dl(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	dl(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	dt(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	dt(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	em(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	em(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;

	embed(content?: DotContent, attrs?: (attrs: IDotEmbed)=>IDotEmbed): IDotDocument;
	embed(attrs: (attrs: IDotEmbed)=>IDotEmbed): IDotDocument;
	fieldSet(content?: DotContent, attrs?: (attrs: IDotFieldSet)=>IDotFieldSet): IDotDocument;
	fieldSet(attrs: (attrs: IDotFieldSet)=>IDotFieldSet): IDotDocument;

	figCaption(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	figCaption(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	figure(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	figure(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	footer(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	footer(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;

	form(content?: DotContent, attrs?: (attrs: IDotForm)=>IDotForm): IDotDocument;
	form(attrs: (attrs: IDotForm)=>IDotForm): IDotDocument;

	h1(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	h1(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	h2(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	h2(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	h3(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	h3(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	h4(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	h4(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	h5(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	h5(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	h6(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	h6(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	header(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	header(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;

	hr(content?: DotContent, attrs?: (attrs: IDotHr)=>IDotHr): IDotDocument;
	hr(attrs: (attrs: IDotHr)=>IDotHr): IDotDocument;

	i(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	i(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;

	iFrame(content?: DotContent, attrs?: (attrs: IDotIFrame)=>IDotIFrame): IDotDocument;
	iFrame(attrs: (attrs: IDotIFrame)=>IDotIFrame): IDotDocument;
	img(content?: DotContent, attrs?: (attrs: IDotImg)=>IDotImg): IDotDocument;
	img(attrs: (attrs: IDotImg)=>IDotImg): IDotDocument;
	input(content?: DotContent, attrs?: (attrs: IDotInput)=>IDotInput): IDotDocument;
	input(attrs: (attrs: IDotInput)=>IDotInput): IDotDocument;
	ins(content?: DotContent, attrs?: (attrs: IDotIns)=>IDotIns): IDotDocument;
	ins(attrs: (attrs: IDotIns)=>IDotIns): IDotDocument;
	
	kbd(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	kbd(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	
	/** @deprecated Deprecated in HTML5. */
	keyGen(content?: DotContent, attrs?: (attrs: IDotKeyGen)=>IDotKeyGen): IDotDocument;
	keyGen(attrs: (attrs: IDotKeyGen)=>IDotKeyGen): IDotDocument;
	label(content?: DotContent, attrs?: (attrs: IDotLabel)=>IDotLabel): IDotDocument;
	label(attrs: (attrs: IDotLabel)=>IDotLabel): IDotDocument;
	
	legend(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	legend(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;

	li(content?: DotContent, attrs?: (attrs: IDotLi)=>IDotLi): IDotDocument;
	li(attrs: (attrs: IDotLi)=>IDotLi): IDotDocument;

	main(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	main(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;

	map(content?: DotContent, attrs?: (attrs: IDotMap)=>IDotMap): IDotDocument;
	map(attrs: (attrs: IDotMap)=>IDotMap): IDotDocument;

	mark(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	mark(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;

	menu(content?: DotContent, attrs?: (attrs: IDotMenu)=>IDotMenu): IDotDocument;
	menu(attrs: (attrs: IDotMenu)=>IDotMenu): IDotDocument;
	meter(content?: DotContent, attrs?: (attrs: IDotMeter)=>IDotMeter): IDotDocument;
	meter(attrs: (attrs: IDotMeter)=>IDotMeter): IDotDocument;

	nav(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	nav(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;

	object(content?: DotContent, attrs?: (attrs: IDotObject)=>IDotObject): IDotDocument;
	object(attrs: (attrs: IDotObject)=>IDotObject): IDotDocument;
	ol(content?: DotContent, attrs?: (attrs: IDotOl)=>IDotOl): IDotDocument;
	ol(attrs: (attrs: IDotOl)=>IDotOl): IDotDocument;
	optGroup(content?: DotContent, attrs?: (attrs: IDotOptGroup)=>IDotOptGroup): IDotDocument;
	optGroup(attrs: (attrs: IDotOptGroup)=>IDotOptGroup): IDotDocument;
	option(content?: DotContent, attrs?: (attrs: IDotOption)=>IDotOption): IDotDocument;
	option(attrs: (attrs: IDotOption)=>IDotOption): IDotDocument;
	output(content?: DotContent, attrs?: (attrs: IDotOutput)=>IDotOutput): IDotDocument;
	output(attrs: (attrs: IDotOutput)=>IDotOutput): IDotDocument;

	p(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	p(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;

	param(content?: DotContent, attrs?: (attrs: IDotParam)=>IDotParam): IDotDocument;
	param(attrs: (attrs: IDotParam)=>IDotParam): IDotDocument;

	pre(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	pre(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;

	progress(content?: DotContent, attrs?: (attrs: IDotProgress)=>IDotProgress): IDotDocument;
	progress(attrs: (attrs: IDotProgress)=>IDotProgress): IDotDocument;
	q(content?: DotContent, attrs?: (attrs: IDotQ)=>IDotQ): IDotDocument;
	q(attrs: (attrs: IDotQ)=>IDotQ): IDotDocument;

	rp(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	rp(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	rt(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	rt(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	ruby(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	ruby(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	s(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	s(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	samp(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	samp(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	section(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	section(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;

	select(content?: DotContent, attrs?: (attrs: IDotSelect)=>IDotSelect): IDotDocument;
	select(attrs: (attrs: IDotSelect)=>IDotSelect): IDotDocument;

	small(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	small(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;

	source(content?: DotContent, attrs?: (attrs: IDotSource)=>IDotSource): IDotDocument;
	source(attrs: (attrs: IDotSource)=>IDotSource): IDotDocument;

	span(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	span(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	strong(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	strong(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	svg(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	svg(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	sub(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	sub(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	summary(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	summary(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	sup(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	sup(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;

	table(content?: DotContent, attrs?: (attrs: IDotTable)=>IDotTable): IDotDocument;
	table(attrs: (attrs: IDotTable)=>IDotTable): IDotDocument;
	tBody(content?: DotContent, attrs?: (attrs: IDotTBody)=>IDotTBody): IDotDocument;
	tBody(attrs: (attrs: IDotTBody)=>IDotTBody): IDotDocument;
	td(content?: DotContent, attrs?: (attrs: IDotTd)=>IDotTd): IDotDocument;
	td(attrs: (attrs: IDotTd)=>IDotTd): IDotDocument;
	textArea(content?: DotContent, attrs?: (attrs: IDotTextArea)=>IDotTextArea): IDotDocument;
	textArea(attrs: (attrs: IDotTextArea)=>IDotTextArea): IDotDocument;
	tFoot(content?: DotContent, attrs?: (attrs: IDotTFoot)=>IDotTFoot): IDotDocument;
	tFoot(attrs: (attrs: IDotTFoot)=>IDotTFoot): IDotDocument;
	th(content?: DotContent, attrs?: (attrs: IDotTh)=>IDotTh): IDotDocument;
	th(attrs: (attrs: IDotTh)=>IDotTh): IDotDocument;
	tHead(content?: DotContent, attrs?: (attrs: IDotTHead)=>IDotTHead): IDotDocument;
	tHead(attrs: (attrs: IDotTHead)=>IDotTHead): IDotDocument;
	time(content?: DotContent, attrs?: (attrs: IDotTime)=>IDotTime): IDotDocument;
	time(attrs: (attrs: IDotTime)=>IDotTime): IDotDocument;
	tr(content?: DotContent, attrs?: (attrs: IDotTr)=>IDotTr): IDotDocument;
	tr(attrs: (attrs: IDotTr)=>IDotTr): IDotDocument;
	track(content?: DotContent, attrs?: (attrs: IDotTrack)=>IDotTrack): IDotDocument;
	track(attrs: (attrs: IDotTrack)=>IDotTrack): IDotDocument;

	u(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	u(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	ul(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	ul(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	var(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	var(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;

	video(content?: DotContent, attrs?: (attrs: IDotVideo)=>IDotVideo): IDotDocument;
	video(attrs: (attrs: IDotVideo)=>IDotVideo): IDotDocument;

	wbr(content?: DotContent, attrs?: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
	wbr(attrs: (attrs: IDotElementDocument<IDotGenericElement>)=>IDotElementDocument<IDotGenericElement>): IDotDocument;
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
	(targetSelector: string|Element|Node|NodeList|Array<Node|Element>): IDotElementDocument<IDotGenericElement>;

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
export interface IDotElementDocument<T>
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