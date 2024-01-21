

type BasicCommonValues = "inherit"|"initial"|"unset"|"revert"|"revert-layer";

type ComplexType = string;

// BASIC TYPES
type Str = `"${string|""}"`|`'${string|""}'`; // TODO: wherever str is required, we could just inject quotes...
type Int = number;
type Percentage = `${number}%`;
type AlphaValue = number | Percentage; // Number should be interpreted as a decimal (x/1);
type Ratio = number|`${number}/${number}`;

// type DigitStr = "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9";
// type HexStr = DigitStr|"A"|"B"|"C"|"D"|"E"|"F"|"a"|"b"|"c"|"d"|"e"|"f";
// type Hex2 = `${HexStr}${HexStr}`;
// type Hex3 = `${Hex2}${HexStr}`;
// type Hex4 = `${Hex3}${HexStr}`;
// type Hex5 = `${Hex4}${HexStr}`;
// type Hex6 = `${Hex5}${HexStr}`;
// type HexColor = `#${Hex3|Hex6}`;
type HexColor = `#${ComplexType}`;

// LENGTH
type AbsoluteUnits = "cm"|"mm"|"in"|"px"|"pt"|"pc"|"Q";
type RelativeUnits = "cap"|"ch"|"em"|"ex"|"ic"|"lh"|"rem"|"rlh"
	|"vh"|"vw"|"vmin"|"vmax"|"vb"|"vi"
	|"cqw"|"cqh"|"cqi"|"cqb"|"cqmin"|"cqmax"
	|"%"; 
type AllLengthUnits = AbsoluteUnits|RelativeUnits;
type NumericLength = `${number}${AllLengthUnits}`;
type LengthPercentage = NumericLength|Percentage;

// TIME & FREQUENCY
type Time = `${number}${"s"|"ms"}`;
type TimePercentage = Time|Percentage;
type Frequency = `${number}${"Hz"|"kHz"}`;
type FrequencyPercentage = Frequency|Percentage;

// RESOLUTION
type Resolution = `${number}${"dpi"|"dpcm"|"dppx"|"x"}`;

// MISC ENUM TYPES
type AbsoluteSize = "xx-small"|"x-small"|"small"|"medium"|"large"|"x-large"|"xx-large"|"xxx-large";
type BlendMode = "normal"|"multiply"|"screen"|"overlay"|"darken"|"lighten"|"color-dodge"|"color-burn"|"hard-light"|"soft-light"|"difference"|"exclusion"|"hue"|"saturation"|"color"|"luminosity";
type LineStyle = "none"|"hidden"|"dotted"|"dashed"|"solid"|"double"|"groove"|"ridge"|"inset"|"outset";
type DisplayBox = "contents"|"none"
type DisplayInside = "flow"|"flow-root"|"table"|"flex"|"grid"|"ruby";
type DisplayInternal = "table-row-group"|"table-header-group"|"table-footer-group"|"table-row"|"table-cell"|"table-column-group"|"table-column"|"table-caption"|"ruby-base"|"ruby-text"|"ruby-base-container"|"ruby-text-container";
type DisplayLegacy = "inline-block"|"inline-table"|"inline-flex"|"inline-grid";
type DisplayOutside = "block"|"inline"|"run-in";
type DisplayFlow = "flow"|"flow-root";
type Overflow = "visible"|"hidden"|"clip"|"scroll";
type RelativeSize = "smaller"|"larger";

// BASIC SHAPE 
// TODO need a builder.
// Most of these are too complex to represent as a typescript type.
// Realistically they should just be constructed usign a builder rather than setting the strings.
// https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape
type InsetFunction = `inset(${ComplexType})`;
type RectFunction = `rect(${ComplexType})`;
type XywhFunction = `xywh(${ComplexType})`;
type CircleFunction = `circle(${ComplexType})`;
type EllipseFunction = `ellipse(${ComplexType})`;
type PolygonFunction = `polygon(${ComplexType})`;
type PathFunction = `path(${ComplexType})`;
type BasicShape = InsetFunction|RectFunction|XywhFunction|CircleFunction|EllipseFunction|PolygonFunction|PathFunction; 

// ANGLES
type AngleUnits = "deg"|"turn"|"rad"|"grad";
type Angle = number | `${number}${AngleUnits}`; // Pure number should be interpreted as degrees.
type AnglePercentage = number | Angle | Percentage; // Number should be interpreted as a decimal (x/1);

// ADVANCED TYPES
// Box.
type VisualBox = "content-box" | "padding-box" | "border-box"; // the three <box> values
type RayoutBox = VisualBox | "margin-box" // the <shape-box> values
type PaintBox = VisualBox | "fill-box" | "stroke-box"
type CoordBox = VisualBox | "fill-box" | "stroke-box" | "view-box"
type GeometryBox = RayoutBox | "fill-box" | "stroke-box" | "view-box"
type BoxEdge = VisualBox | RayoutBox | PaintBox | CoordBox | GeometryBox;

// DIMENSION
type Dimension = Angle|Time|Frequency|NumericLength;

// Calc.
type Calc = ComplexType; 

// It's difficult to compose calc types because they're too complex. See below.
// May consider adding a builder for this, but not sure what it will look like.

/*
	// Can't get this working because the types get too complex for TS.
	// type Decrement = [
	//     never, 0, 1, 2, 3, 4, 5, 6, 7
	// ];
	// type CalcConstant = "e"|"-e"|"E"|"pi"|"-pi"|"infinity"|"-infinity"|"NaN"; // Defined on a different page. Not sure what it's for.
	// type CalcKeyword = 'e' | 'pi' | 'infinity' | '-infinity' | 'NaN';
	// type CalcValue = number | Percentage | Dimension | CalcKeyword;// | CalcSum;
	// type CalcProductSuffix<T extends CalcValue, Depth extends number> = Depth extends 0 ? string : `${"*"|"/"}${T}${CalcProductSuffix<T, Decrement[Depth]>}`;
	// type CalcSumSuffix<T extends CalcValue, Depth extends number> = Depth extends 0 ? string : `${"+"|"-"}${T}${CalcProductSuffix<T, 8>}`;
	// // TODO: optional space can go here.
	// type CalcProduct<T extends CalcValue> = T|`${T}${CalcProductSuffix<T, 8>}`;
	// type CalcSum<T extends CalcValue> = CalcProduct<T>|`${CalcProduct<T>}${"+"|"-"}${CalcProduct<T>}`
	// CalcValue type definition
	// Helper types for CalcProduct and CalcSum
	// type CalcOperation = '+' | '-' | '*' | '/';
	// type CalcProductPart = CalcValue | [CalcOperation, CalcValue];
*/

// Color Interpolation.
type RectangularColorSpace = "srgb"|"srgb-linear"|"display-p3"|"a98-rgb"|"prophoto-rgb"|"rec2020"|"lab"|"oklab"|"xyz"|"xyz-d50"|"xyz-d65";
type PolarColorSpace = "hsl"|"hwb"|"lch"|"oklch";
type HueInterpolationMethod = `${"shorter"|"longer"|"increasing"|"decreasing"} hue`
type ColorInterpolationMethod = RectangularColorSpace|PolarColorSpace|`${PolarColorSpace} ${HueInterpolationMethod}`;

// Color
type NamedColor = "aliceblue"|"antiquewhite"|"aqua"|"aquamarine"|"azure"|"beige"|"bisque"|"black"|"blanchedalmond"|"blue"|"blueviolet"|"brown"|"burlywood"|"cadetblue"|"chartreuse"|"chocolate"|"coral"|"cornflowerblue"|"cornsilk"|"crimson"|"cyan"|"darkblue"|"darkcyan"|"darkgoldenrod"|"darkgray"|"darkgrey"|"darkgreen"|"darkkhaki"|"darkmagenta"|"darkolivegreen"|"darkorange"|"darkorchid"|"darkred"|"darksalmon"|"darkseagreen"|"darkslateblue"|"darkslategray"|"darkslategrey"|"darkturquoise"|"darkviolet"|"deeppink"|"deepskyblue"|"dimgray"|"dimgrey"|"dodgerblue"|"firebrick"|"floralwhite"|"forestgreen"|"fuchsia"|"gainsboro"|"ghostwhite"|"gold"|"goldenrod"|"gray"|"grey"|"green"|"greenyellow"|"honeydew"|"hotpink"|"indianred"|"indigo"|"ivory"|"khaki"|"lavender"|"lavenderblush"|"lawngreen"|"lemonchiffon"|"lightblue"|"lightcoral"|"lightcyan"|"lightgoldenrodyellow"|"lightgray"|"lightgrey"|"lightgreen"|"lightpink"|"lightsalmon"|"lightseagreen"|"lightskyblue"|"lightslategray"|"lightslategrey"|"lightsteelblue"|"lightyellow"|"lime"|"limegreen"|"linen"|"magenta"|"maroon"|"mediumaquamarine"|"mediumblue"|"mediumorchid"|"mediumpurple"|"mediumseagreen"|"mediumslateblue"|"mediumspringgreen"|"mediumturquoise"|"mediumvioletred"|"midnightblue"|"mintcream"|"mistyrose"|"moccasin"|"navajowhite"|"navy"|"oldlace"|"olive"|"olivedrab"|"orange"|"orangered"|"orchid"|"palegoldenrod"|"palegreen"|"paleturquoise"|"palevioletred"|"papayawhip"|"peachpuff"|"peru"|"pink"|"plum"|"powderblue"|"purple"|"rebeccapurple"|"red"|"rosybrown"|"royalblue"|"saddlebrown"|"salmon"|"sandybrown"|"seagreen"|"seashell"|"sienna"|"silver"|"skyblue"|"slateblue"|"slategray"|"slategrey"|"snow"|"springgreen"|"steelblue"|"tan"|"teal"|"thistle"|"tomato"|"turquoise"|"violet"|"wheat"|"white"|"whitesmoke"|"yellow"|"yellowgreen";
type SystemColor = "AccentColor"|"AccentColorText"|"ActiveText"|"ButtonBorder"|"ButtonFace"|"ButtonText"|"Canvas"|"CanvasText"|"Field"|"FieldText"|"GrayText"|"Highlight"|"HighlightText"|"LinkText"|"Mark"|"MarkText"|"SelectedItem"|"SelectedItemText"|"VisitedText";
type Hue = number|Angle;
type PredefinedRgb = "srgb"|"srgb-linear"|"display-p3"|"a98-rgb"|"prophoto-rgb"|"rec2020";
type XyzSpace = "xyz"|"xyz-d50"|"xyz-d65";
type XyzParams = `${XyzSpace} ${number|Percentage|"none"} ${number|Percentage|"none"} ${number|Percentage|"none"}`
type PredefinedRgbParams = `${PredefinedRgb} ${number|Percentage|"none"} ${number|Percentage|"none"} ${number|Percentage|"none"}`
type ColorspaceParams = PredefinedRgbParams|XyzParams;

type LRgba<T extends number|AlphaValue> = `rgb(${T}, ${T}, ${T})` | `rgba(${T}, ${T}, ${T}, ${AlphaValue})`;
type MRgba = `rgb(${number|Percentage|"none"} ${number|Percentage|"none"} ${number|Percentage|"none"})` | `rgba(${number|Percentage|"none"} ${number|Percentage|"none"} ${number|Percentage|"none"} / ${AlphaValue})`;
type Rgba = LRgba<number|AlphaValue>|MRgba;
type LHsla = `hsl(${Hue}, ${Percentage}, ${Percentage})` | `hsla(${Hue}, ${Percentage}, ${Percentage}, ${AlphaValue})`;
type MHsla = `hsl(${Hue|"none"} ${Percentage|number|"none"} ${Percentage|number|"none"})` | `hsla(${Hue|"none"} ${Percentage|number|"none"} ${Percentage|number|"none"} / ${AlphaValue|"none"})`;
type Hsla = LHsla|MHsla;
type Hwb = `hwb(${Hue|"none"} ${Percentage|number|"none"} ${Percentage|number|"none"})` | `hwb(${Hue|"none"} ${Percentage|number|"none"} ${Percentage|number|"none"} / ${AlphaValue|"none"})`;
type Lab = `${"lab"|"oklab"}(${number|Percentage|"none"} ${number|Percentage|"none"} ${number|Percentage|"none"})` | `${"lab"|"oklab"}(${number|Percentage|"none"} ${number|Percentage|"none"} ${number|Percentage|"none"} / ${AlphaValue|"none"})`;
type Lch = `${"lch"|"oklch"}(${number|Percentage|"none"} ${number|Percentage|"none"} ${Hue|"none"})` | `${"lch"|"oklch"}(${number|Percentage|"none"} ${number|Percentage|"none"} ${Hue|"none"} / ${AlphaValue|"none"})`;
type ColorFunc = `color(${ColorspaceParams})`| `color(${ColorspaceParams} / ${AlphaValue|"none"})`;
type AbsoluteColorFunction = Rgba|Hsla|Hwb|Lab|Lch|ColorFunc;

type AbsoluteColorBase = HexColor|AbsoluteColorFunction|NamedColor|"transparent";
type Color = AbsoluteColorBase|SystemColor|"currentcolor";
type SimpleColor = HexColor|`${"rgb"|"rgba"|"hsl"|"hsla"|"hwb"|"lab"|"lch"|"oklab"|"oklch"|"color"}(${ComplexType})`|NamedColor|SystemColor|"currentcolor";

// Display List Item

type DisplayListItem = 
    | 'list-item'
    | `${DisplayOutside} list-item`
    | `list-item ${DisplayOutside}`
    | `${DisplayFlow} list-item`
    | `list-item ${DisplayFlow}`
    | `${DisplayOutside} ${DisplayFlow} list-item`
    | `${DisplayOutside} list-item ${DisplayFlow}`
    | `${DisplayFlow} ${DisplayOutside} list-item`
    | `${DisplayFlow} list-item ${DisplayOutside}`
    | `list-item ${DisplayOutside} ${DisplayFlow}`
    | `list-item ${DisplayFlow} ${DisplayOutside}`;

// ID
type Ident = string;
type CustomIdent = string;
type DashedIdent = `--${string}`;

// EASING FUNCTION

type StepPosition = "jump-start"|"jump-end"|"jump-none"|"jump-both"|"start"|"end";
type LinearStopLength = Percentage|`${Percentage} ${Percentage}`;
type LinearStop = number|`${number} ${LinearStopLength}`|`${LinearStopLength} ${number}`;
type LinearStopList = `${LinearStop}${`, ${LinearStop}${`, ${LinearStop}${`, ${LinearStop}${`, ${LinearStop}${ComplexType}`|""}`|""}`|""}`|""}`;

type StepEasingFunction = "step-start"|"step-end"|`steps(${Int}${`, ${StepPosition}`|""})`;
type CubicBezierEasingFunction = "ease"|"ease-in"|"ease-out"|"ease-in-out"|`cubic-bezier(${number}, ${number}, ${number}, ${number})`;
type LinearEasingFunction = `linear(${LinearStopList})`;
type EasingFunction = "linear"|LinearEasingFunction|CubicBezierEasingFunction|StepEasingFunction;

// FILTER FUNCTION
// TODO: don't forget to provide builders for these. Already put work into some.
type SaturateFunction = `saturate(${number|Percentage|""})`;
type SepiaFunction = `sepia(${number|Percentage|""})`;
type OpacityFunction = `opacity(${number|Percentage|""})`;
type InvertFunction = `invert(${number|Percentage|""})`;
type GrayscaleFunction = `grayscale(${number|Percentage|""})`;
type ContrastFunction = `contrast(${number|Percentage|""})`;
type BrightnessFunction = `brightness(${number|Percentage|""})`;
type BlurFunction = `blur(${NumericLength|""})`;
// Regrettably, strong typing for color isn't possible due to the type complexity.
// Even SimpleColor doesn't work. We use string in place of Color.
type DropShadowFunction = `drop-shadow(${`${ComplexType} ${NumericLength} ${NumericLength}`
	|`${NumericLength} ${NumericLength} ${ComplexType}`
	|`${NumericLength} ${NumericLength}`
	|`${ComplexType} ${NumericLength} ${NumericLength} ${NumericLength}`
	|`${NumericLength} ${NumericLength} ${NumericLength} ${ComplexType}`
	|`${NumericLength} ${NumericLength} ${NumericLength}`
})`;
type HueRotateFunction = `hue-rotate(${Angle|""})`;
type FilterFunction = SaturateFunction|SepiaFunction|OpacityFunction|InvertFunction|GrayscaleFunction|ContrastFunction|BrightnessFunction|BlurFunction|DropShadowFunction|HueRotateFunction;

// FLEX
type Flex = `${number}fr`;

// FONT

type GenericFamily = "serif" | "sans-serif" | "monospace" | "cursive" | "fantasy" | "system-ui" | "ui-serif" | "ui-sans-serif" | "ui-monospace" | "ui-rounded" | "emoji" | "math" | "fangsong";

// POSITION
type HorizontalPosition = "left" | "center" | "right" | LengthPercentage;
type VerticalPosition = "top" | "center" | "bottom" | LengthPercentage;

type Position = 
    | HorizontalPosition
    | VerticalPosition
    | `${HorizontalPosition} ${VerticalPosition}`
    | `${VerticalPosition} ${HorizontalPosition}`
    | `${"left" | "right"} ${LengthPercentage}`
    | `${"top" | "bottom"} ${LengthPercentage}`
    | `${"left" | "right"} ${LengthPercentage} ${"top" | "bottom"} ${LengthPercentage}`
    | `${"top" | "bottom"} ${LengthPercentage} ${"left" | "right"} ${LengthPercentage}`;

// GRADIENT
// https://developer.mozilla.org/en-US/docs/Web/CSS/gradient
// TODO: absolutely need a builder for this.

type RadialShape = "circle"|"ellipse";
type RadialExtent = "closest-corner"|"closest-side"|"farthest-corner"|"farthest-side";
type SideOrCorner = "left"|"right"|"top"|"bottom"|`${"left" | "right"} ${"top" | "bottom"}`|`${"top" | "bottom"} ${"left" | "right"}`;
type RadialSize = `${RadialExtent} ${NumericLength} ${LengthPercentage} ${LengthPercentage}`;
type LinearColorStop = Color|`${Color} ${LengthPercentage}`;
type LinearColorHint = LengthPercentage;
// type LinearColorStopListItem = LinearColorStop|`${LinearColorHint}, ${LinearColorStop}`; // TOO COMPLEX :(
type LinearColorStopListItem = LinearColorStop|`${ComplexType}, ${LinearColorStop}`; // TODO: this type got botched due to complexity.
type ColorStopList = `${LinearColorStop}${`, ${ComplexType}`}`|`${LinearColorStop}`; 

type AngleOrSideOrCorner = Angle | `to ${SideOrCorner}, `;
type LinearGradientSyntax = ComplexType; //`${`${AngleOrSideOrCorner} `|""}${ColorStopList}`;
// type RadiatShapeOrSize = RadialShape | RadialSize | `${RadialShape} ${RadialSize}` | `${RadialSize} ${RadialShape}`;
type RadiatShapeOrSize = RadialShape | RadialSize | ComplexType;//`${RadialShape} ${RadialSize}` | `${RadialSize} ${RadialShape}`;
type RadialGradientSyntax = `${`${RadiatShapeOrSize} ` | ""} [ at <position> ]? , <color-stop-list>`;
type LinearGradientFunction = `linear-gradient(${LinearGradientSyntax})`;
type RepeatingLinearGradientFunction = `linear-gradient(${LinearGradientSyntax})`;
type RadialGradientFunction = `radial-gradient(${RadialGradientSyntax})`;
type RepeatingRadialGradientFunction = `radial-gradient(${RadialGradientSyntax})`;
type Gradient = LinearGradientFunction | RepeatingLinearGradientFunction | RadialGradientFunction | RepeatingRadialGradientFunction;

// URL
type Url = `${"src"|"url"}(${Str})`;

// IMAGE
type Image = Url|Gradient;

// TODO:
// https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function
type TransformFunction = ComplexType;

// Building blocks.

// type OptionalWhitespace = ""|" ";
// export type Percentage = number|`${number}%`; // Used for filters.

// ts starts complaining about the complexity of the type :(


// Types
// TODO: look up types online and correct this.
// https://developer.mozilla.org/en-US/docs/Web/CSS/absolute-size

// MORE COMPLEX TYPES?

type NumericLengthOrAuto = NumericLength|"auto";
type NumericAngle = number|`${number}${AngleUnits}`;

type AppearanceValues = BasicCommonValues|"none"|"menulist-button"|"textfield"|"button"|"searchfield"|"textarea"|"push-button"|"slider-horizontal"|"checkbox"|"radio"|"square-button"|"menulist"|"listbox"|"meter"|"progress-bar"|"scrollbarbutton-up"|"button-bevel"|"media-mute-button"|"caret";
type BackgroundAttachmentValues = BasicCommonValues|"scroll"|"fixed"|"local";
type BackgroundRepeatValues = BasicCommonValues|"no-repeat"|"repeat"|"space"|"round";
type BackgroundOriginValues = BasicCommonValues|"padding-box"|"border-box"|"content-box";
type BackgroundSizeValues = BasicCommonValues|"auto"|NumericLength|"cover"|"contain";
type BackfaceVisibilityValues = BasicCommonValues|"visible"|"hidden";
type BorderStyles = BasicCommonValues|"dotted"|"dashed"|"solid"|"double"|"groove"|"ridge"|"inset"|"outset"|"none"|"hidden";

type DisplayValues = BasicCommonValues|"inline"|"block"|"contents"|"flex"|"grid"|"inline-block"|"inline-flex"|"inline-grid"|"inline-table"|"list-item"|"run-in"|"table"|"table-caption"|"table-column-group"|"table-header-group"|"table-footer-group"|"table-row-group"|"table-cell"|"table-column"|"table-row"|"none";
type DirectionValues = BasicCommonValues|"ltr"|"rtl";
type FontStyleValues = BasicCommonValues|"normal"|"italic"|"oblique";
type FontVariantValues = BasicCommonValues|"normal"|"small-caps";
type FontVariantCapsValues = FontVariantValues|"all-small-caps"|"petite-caps"|"all-petite-caps"|"unicase"|"titling-caps";
type FontWeightValues = BasicCommonValues|number|"normal"|"bold"|"bolder"|"lighter";
type LengthProp = BasicCommonValues|"maxHeight"|"minHeight"|"top"|"bottom"|"height"|"maxHidth"|"minWidth"|"right"|"left"|"width"|"margin"|"marginTop"|"marginBottom"|"marginLeft"|"marginRight"|"outlineOffset"|"padding"|"paddingTop"|"paddingBottom"|"paddingLeft"|"paddingRight"|"lineHeight"|"flexBasis"|"fontSize";
type OutlineWidthValues = BasicCommonValues|"medium"|"thin"|"thick"|NumericLength;
type PositionNames = BasicCommonValues|"static"|"relative"|"fixed"|"absolute"|"sticky";

type FlexDirectionNames = BasicCommonValues|"row"|"row-reverse"|"column"|"column-reverse";
type FlexWrapNames = BasicCommonValues|"nowrap"|"wrap"|"wrap-reverse";


// Advanced formatted types.

type BackgroundRepeatValues2d = BackgroundRepeatValues|"repeat-x"|"repeat-y"|`${BackgroundRepeatValues} ${BackgroundRepeatValues}`;
type BorderShorthand = BasicCommonValues|`${BorderStyles}`|`${BorderStyles} ${Color}`|ComplexType;//`${number}${AllLengthUnits} ${BorderStyles} ${Color}`;
type BackgroundImageFormat = BasicCommonValues|Url|`${Url}, ${Url}`;
type BackgroundPositionShorthand2D = BasicCommonValues|`${BasicCommonValues|number} ${BasicCommonValues|number}`|`${number}% ${number}%`|`${"left"|"right"|"center"} ${"top"|"center"|"bottom"}`;
type BackgroundShorthand = BasicCommonValues|ComplexType;//`${Color} ${Url} ${BackgroundRepeatValues} ${BackgroundPositionShorthand2D}`;
type FlexFlowShorthand = BasicCommonValues|`${FlexDirectionNames} ${FlexWrapNames}`;
type FlexShorthand = BasicCommonValues|`${BasicCommonValues|number} ${BasicCommonValues|number} ${BasicCommonValues|`${number}${AllLengthUnits}`}`;

type AtRule = "@charset"|"@color-profile"|"@container"|"@counter-style"|"@font-face"|"@document"|"@font-feature-values"|"@font-palette-values"|"@import"|"@keyframes"|"@layer"|"@media"|"@namespace"|"@page"|"@property"|"@scope"|"@starting-style"|"@supports";

interface IDotcssProp{
	angleToDeg(a: number|string);
	matrixMultiply3D(a: Array<number>, b: Array<number>): Array<number>;
	lengthToPx(l: string|number, prop?: LengthProp, element?: Element);
	angleSubtract(a, b);
	url(url: string);
	rgb(r: number, g: number, b: number);
	rgba(r: number, g: number, b: number, a: number);
	buildTransform();
	scopeToEl(el: HTMLElement);
	cacheScopedStaticStyles(el: HTMLElement);
	clearDynamicStyles(el: HTMLElement);
	unscope();
	formatNumberValue(value: number, unit?: string);

	hide(params?: HideParams);
	show(params?: ShowParams);
	fadeOut(duration: number, complete: Function);
	fadeIn(duration: number, complete: Function);

	// Private.
	//cacheScopedStaticStyles(el: HTMLElement);
	//clearCachedStyles(el: HTMLElement);
	

	// CSS PROPS!
	// backgroundColor(values: string|Array<number>): IDotcssProp;
	// backgroundColor(r: number, g: number, b: number, a?: number): IDotcssProp;
	// color(values: string|Array<number>): IDotcssProp;
	// color(r: number, g: number, b: number, a?: number): IDotcssProp;

	// display(value: string): IDotcssProp;
	// height: IDotcssAnimatable<string|number>;
	// opacity: IDotcssAnimatable<string|number>;
	// overflow(value: string): IDotcssProp;
	// width: IDotcssAnimatable<string|number>;





	//color: 
	color: IDotcssAnimatableColor;
	backgroundColor: IDotcssAnimatableColor;
	borderBottomColor: IDotcssAnimatableColor;
	borderColor: IDotcssAnimatableColor;
	borderLeftColor: IDotcssAnimatableColor;
	borderRightColor: IDotcssAnimatableColor;
	borderTopColor: IDotcssAnimatableColor;
	textDecorationColor: IDotcssAnimatableColor;
	outlineColor: IDotcssAnimatableColor;
	columnRuleColor: IDotcssAnimatableColor;

	//length: 
	backgroundSize: IDotcssAnimatable<BackgroundSizeValues>;
	backgroundSizeCm: IDotcssAnimatable<number>;
	backgroundSizeCh: IDotcssAnimatable<number>;
	backgroundSizeEm: IDotcssAnimatable<number>;
	backgroundSizeEx: IDotcssAnimatable<number>;
	backgroundSizeIn: IDotcssAnimatable<number>;
	backgroundSizeMm: IDotcssAnimatable<number>;
	backgroundSizeP: IDotcssAnimatable<number>;
	backgroundSizePc: IDotcssAnimatable<number>;
	backgroundSizePt: IDotcssAnimatable<number>;
	backgroundSizePx: IDotcssAnimatable<number>;
	backgroundSizeRem: IDotcssAnimatable<number>;
	backgroundSizeVh: IDotcssAnimatable<number>;
	backgroundSizeVw: IDotcssAnimatable<number>;
	backgroundSizeVMax: IDotcssAnimatable<number>;
	backgroundSizeVMin: IDotcssAnimatable<number>;

	blockSize: IDotcssAnimatable<NumericLength>;
	blockSizeCm: IDotcssAnimatable<number>;
	blockSizeCh: IDotcssAnimatable<number>;
	blockSizeEm: IDotcssAnimatable<number>;
	blockSizeEx: IDotcssAnimatable<number>;
	blockSizeIn: IDotcssAnimatable<number>;
	blockSizeMm: IDotcssAnimatable<number>;
	blockSizeP: IDotcssAnimatable<number>;
	blockSizePc: IDotcssAnimatable<number>;
	blockSizePt: IDotcssAnimatable<number>;
	blockSizePx: IDotcssAnimatable<number>;
	blockSizeRem: IDotcssAnimatable<number>;
	blockSizeVh: IDotcssAnimatable<number>;
	blockSizeVw: IDotcssAnimatable<number>;
	blockSizeVMax: IDotcssAnimatable<number>;
	blockSizeVMin: IDotcssAnimatable<number>;

	borderBottomLeftRadius: IDotcssAnimatable<NumericLength>;
	borderBottomLeftRadiusCm: IDotcssAnimatable<number>;
	borderBottomLeftRadiusCh: IDotcssAnimatable<number>;
	borderBottomLeftRadiusEm: IDotcssAnimatable<number>;
	borderBottomLeftRadiusEx: IDotcssAnimatable<number>;
	borderBottomLeftRadiusIn: IDotcssAnimatable<number>;
	borderBottomLeftRadiusMm: IDotcssAnimatable<number>;
	borderBottomLeftRadiusP: IDotcssAnimatable<number>;
	borderBottomLeftRadiusPc: IDotcssAnimatable<number>;
	borderBottomLeftRadiusPt: IDotcssAnimatable<number>;
	borderBottomLeftRadiusPx: IDotcssAnimatable<number>;
	borderBottomLeftRadiusRem: IDotcssAnimatable<number>;
	borderBottomLeftRadiusVh: IDotcssAnimatable<number>;
	borderBottomLeftRadiusVw: IDotcssAnimatable<number>;
	borderBottomLeftRadiusVMax: IDotcssAnimatable<number>;
	borderBottomLeftRadiusVMin: IDotcssAnimatable<number>;

	borderBottomRightRadius: IDotcssAnimatable<NumericLength>;
	borderBottomRightRadiusCm: IDotcssAnimatable<number>;
	borderBottomRightRadiusCh: IDotcssAnimatable<number>;
	borderBottomRightRadiusEm: IDotcssAnimatable<number>;
	borderBottomRightRadiusEx: IDotcssAnimatable<number>;
	borderBottomRightRadiusIn: IDotcssAnimatable<number>;
	borderBottomRightRadiusMm: IDotcssAnimatable<number>;
	borderBottomRightRadiusP: IDotcssAnimatable<number>;
	borderBottomRightRadiusPc: IDotcssAnimatable<number>;
	borderBottomRightRadiusPt: IDotcssAnimatable<number>;
	borderBottomRightRadiusPx: IDotcssAnimatable<number>;
	borderBottomRightRadiusRem: IDotcssAnimatable<number>;
	borderBottomRightRadiusVh: IDotcssAnimatable<number>;
	borderBottomRightRadiusVw: IDotcssAnimatable<number>;
	borderBottomRightRadiusVMax: IDotcssAnimatable<number>;
	borderBottomRightRadiusVMin: IDotcssAnimatable<number>;

	borderBottomWidth: IDotcssAnimatable<NumericLength>;
	borderBottomWidthCm: IDotcssAnimatable<number>;
	borderBottomWidthCh: IDotcssAnimatable<number>;
	borderBottomWidthEm: IDotcssAnimatable<number>;
	borderBottomWidthEx: IDotcssAnimatable<number>;
	borderBottomWidthIn: IDotcssAnimatable<number>;
	borderBottomWidthMm: IDotcssAnimatable<number>;
	borderBottomWidthP: IDotcssAnimatable<number>;
	borderBottomWidthPc: IDotcssAnimatable<number>;
	borderBottomWidthPt: IDotcssAnimatable<number>;
	borderBottomWidthPx: IDotcssAnimatable<number>;
	borderBottomWidthRem: IDotcssAnimatable<number>;
	borderBottomWidthVh: IDotcssAnimatable<number>;
	borderBottomWidthVw: IDotcssAnimatable<number>;
	borderBottomWidthVMax: IDotcssAnimatable<number>;
	borderBottomWidthVMin: IDotcssAnimatable<number>;

	borderImageWidth: IDotcssAnimatable<NumericLength>;
	borderImageWidthCm: IDotcssAnimatable<number>;
	borderImageWidthCh: IDotcssAnimatable<number>;
	borderImageWidthEm: IDotcssAnimatable<number>;
	borderImageWidthEx: IDotcssAnimatable<number>;
	borderImageWidthIn: IDotcssAnimatable<number>;
	borderImageWidthMm: IDotcssAnimatable<number>;
	borderImageWidthP: IDotcssAnimatable<number>;
	borderImageWidthPc: IDotcssAnimatable<number>;
	borderImageWidthPt: IDotcssAnimatable<number>;
	borderImageWidthPx: IDotcssAnimatable<number>;
	borderImageWidthRem: IDotcssAnimatable<number>;
	borderImageWidthVh: IDotcssAnimatable<number>;
	borderImageWidthVw: IDotcssAnimatable<number>;
	borderImageWidthVMax: IDotcssAnimatable<number>;
	borderImageWidthVMin: IDotcssAnimatable<number>;

	borderLeftWidth: IDotcssAnimatable<NumericLength>;
	borderLeftWidthCm: IDotcssAnimatable<number>;
	borderLeftWidthCh: IDotcssAnimatable<number>;
	borderLeftWidthEm: IDotcssAnimatable<number>;
	borderLeftWidthEx: IDotcssAnimatable<number>;
	borderLeftWidthIn: IDotcssAnimatable<number>;
	borderLeftWidthMm: IDotcssAnimatable<number>;
	borderLeftWidthP: IDotcssAnimatable<number>;
	borderLeftWidthPc: IDotcssAnimatable<number>;
	borderLeftWidthPt: IDotcssAnimatable<number>;
	borderLeftWidthPx: IDotcssAnimatable<number>;
	borderLeftWidthRem: IDotcssAnimatable<number>;
	borderLeftWidthVh: IDotcssAnimatable<number>;
	borderLeftWidthVw: IDotcssAnimatable<number>;
	borderLeftWidthVMax: IDotcssAnimatable<number>;
	borderLeftWidthVMin: IDotcssAnimatable<number>;

	borderRadius: IDotcssAnimatable<NumericLength>;
	borderRadiusCm: IDotcssAnimatable<number>;
	borderRadiusCh: IDotcssAnimatable<number>;
	borderRadiusEm: IDotcssAnimatable<number>;
	borderRadiusEx: IDotcssAnimatable<number>;
	borderRadiusIn: IDotcssAnimatable<number>;
	borderRadiusMm: IDotcssAnimatable<number>;
	borderRadiusP: IDotcssAnimatable<number>;
	borderRadiusPc: IDotcssAnimatable<number>;
	borderRadiusPt: IDotcssAnimatable<number>;
	borderRadiusPx: IDotcssAnimatable<number>;
	borderRadiusRem: IDotcssAnimatable<number>;
	borderRadiusVh: IDotcssAnimatable<number>;
	borderRadiusVw: IDotcssAnimatable<number>;
	borderRadiusVMax: IDotcssAnimatable<number>;
	borderRadiusVMin: IDotcssAnimatable<number>;

	borderRightWidth: IDotcssAnimatable<NumericLength>;
	borderRightWidthCm: IDotcssAnimatable<number>;
	borderRightWidthCh: IDotcssAnimatable<number>;
	borderRightWidthEm: IDotcssAnimatable<number>;
	borderRightWidthEx: IDotcssAnimatable<number>;
	borderRightWidthIn: IDotcssAnimatable<number>;
	borderRightWidthMm: IDotcssAnimatable<number>;
	borderRightWidthP: IDotcssAnimatable<number>;
	borderRightWidthPc: IDotcssAnimatable<number>;
	borderRightWidthPt: IDotcssAnimatable<number>;
	borderRightWidthPx: IDotcssAnimatable<number>;
	borderRightWidthRem: IDotcssAnimatable<number>;
	borderRightWidthVh: IDotcssAnimatable<number>;
	borderRightWidthVw: IDotcssAnimatable<number>;
	borderRightWidthVMax: IDotcssAnimatable<number>;
	borderRightWidthVMin: IDotcssAnimatable<number>;

	borderTopLeftRadius: IDotcssAnimatable<NumericLength>;
	borderTopLeftRadiusCm: IDotcssAnimatable<number>;
	borderTopLeftRadiusCh: IDotcssAnimatable<number>;
	borderTopLeftRadiusEm: IDotcssAnimatable<number>;
	borderTopLeftRadiusEx: IDotcssAnimatable<number>;
	borderTopLeftRadiusIn: IDotcssAnimatable<number>;
	borderTopLeftRadiusMm: IDotcssAnimatable<number>;
	borderTopLeftRadiusP: IDotcssAnimatable<number>;
	borderTopLeftRadiusPc: IDotcssAnimatable<number>;
	borderTopLeftRadiusPt: IDotcssAnimatable<number>;
	borderTopLeftRadiusPx: IDotcssAnimatable<number>;
	borderTopLeftRadiusRem: IDotcssAnimatable<number>;
	borderTopLeftRadiusVh: IDotcssAnimatable<number>;
	borderTopLeftRadiusVw: IDotcssAnimatable<number>;
	borderTopLeftRadiusVMax: IDotcssAnimatable<number>;
	borderTopLeftRadiusVMin: IDotcssAnimatable<number>;

	borderTopRightRadius: IDotcssAnimatable<NumericLength>;
	borderTopRightRadiusCm: IDotcssAnimatable<number>;
	borderTopRightRadiusCh: IDotcssAnimatable<number>;
	borderTopRightRadiusEm: IDotcssAnimatable<number>;
	borderTopRightRadiusEx: IDotcssAnimatable<number>;
	borderTopRightRadiusIn: IDotcssAnimatable<number>;
	borderTopRightRadiusMm: IDotcssAnimatable<number>;
	borderTopRightRadiusP: IDotcssAnimatable<number>;
	borderTopRightRadiusPc: IDotcssAnimatable<number>;
	borderTopRightRadiusPt: IDotcssAnimatable<number>;
	borderTopRightRadiusPx: IDotcssAnimatable<number>;
	borderTopRightRadiusRem: IDotcssAnimatable<number>;
	borderTopRightRadiusVh: IDotcssAnimatable<number>;
	borderTopRightRadiusVw: IDotcssAnimatable<number>;
	borderTopRightRadiusVMax: IDotcssAnimatable<number>;
	borderTopRightRadiusVMin: IDotcssAnimatable<number>;

	borderTopWidth: IDotcssAnimatable<NumericLength>;
	borderTopWidthCm: IDotcssAnimatable<number>;
	borderTopWidthCh: IDotcssAnimatable<number>;
	borderTopWidthEm: IDotcssAnimatable<number>;
	borderTopWidthEx: IDotcssAnimatable<number>;
	borderTopWidthIn: IDotcssAnimatable<number>;
	borderTopWidthMm: IDotcssAnimatable<number>;
	borderTopWidthP: IDotcssAnimatable<number>;
	borderTopWidthPc: IDotcssAnimatable<number>;
	borderTopWidthPt: IDotcssAnimatable<number>;
	borderTopWidthPx: IDotcssAnimatable<number>;
	borderTopWidthRem: IDotcssAnimatable<number>;
	borderTopWidthVh: IDotcssAnimatable<number>;
	borderTopWidthVw: IDotcssAnimatable<number>;
	borderTopWidthVMax: IDotcssAnimatable<number>;
	borderTopWidthVMin: IDotcssAnimatable<number>;

	borderWidth: IDotcssAnimatable<NumericLength>;
	borderWidthCm: IDotcssAnimatable<number>;
	borderWidthCh: IDotcssAnimatable<number>;
	borderWidthEm: IDotcssAnimatable<number>;
	borderWidthEx: IDotcssAnimatable<number>;
	borderWidthIn: IDotcssAnimatable<number>;
	borderWidthMm: IDotcssAnimatable<number>;
	borderWidthP: IDotcssAnimatable<number>;
	borderWidthPc: IDotcssAnimatable<number>;
	borderWidthPt: IDotcssAnimatable<number>;
	borderWidthPx: IDotcssAnimatable<number>;
	borderWidthRem: IDotcssAnimatable<number>;
	borderWidthVh: IDotcssAnimatable<number>;
	borderWidthVw: IDotcssAnimatable<number>;
	borderWidthVMax: IDotcssAnimatable<number>;
	borderWidthVMin: IDotcssAnimatable<number>;

	bottom: IDotcssAnimatable<NumericLengthOrAuto>;
	bottomCm: IDotcssAnimatable<number>;
	bottomCh: IDotcssAnimatable<number>;
	bottomEm: IDotcssAnimatable<number>;
	bottomEx: IDotcssAnimatable<number>;
	bottomIn: IDotcssAnimatable<number>;
	bottomMm: IDotcssAnimatable<number>;
	bottomP: IDotcssAnimatable<number>;
	bottomPc: IDotcssAnimatable<number>;
	bottomPt: IDotcssAnimatable<number>;
	bottomPx: IDotcssAnimatable<number>;
	bottomRem: IDotcssAnimatable<number>;
	bottomVh: IDotcssAnimatable<number>;
	bottomVw: IDotcssAnimatable<number>;
	bottomVMax: IDotcssAnimatable<number>;
	bottomVMin: IDotcssAnimatable<number>;

	gap: IDotcssAnimatable<NumericLength>;
	gapCm: IDotcssAnimatable<number>;
	gapCh: IDotcssAnimatable<number>;
	gapEm: IDotcssAnimatable<number>;
	gapEx: IDotcssAnimatable<number>;
	gapIn: IDotcssAnimatable<number>;
	gapMm: IDotcssAnimatable<number>;
	gapP: IDotcssAnimatable<number>;
	gapPc: IDotcssAnimatable<number>;
	gapPt: IDotcssAnimatable<number>;
	gapPx: IDotcssAnimatable<number>;
	gapRem: IDotcssAnimatable<number>;
	gapVh: IDotcssAnimatable<number>;
	gapVw: IDotcssAnimatable<number>;
	gapVMax: IDotcssAnimatable<number>;
	gapVMin: IDotcssAnimatable<number>;

	height: IDotcssAnimatable<NumericLengthOrAuto>;
	heightCm: IDotcssAnimatable<number>;
	heightCh: IDotcssAnimatable<number>;
	heightEm: IDotcssAnimatable<number>;
	heightEx: IDotcssAnimatable<number>;
	heightIn: IDotcssAnimatable<number>;
	heightMm: IDotcssAnimatable<number>;
	heightP: IDotcssAnimatable<number>;
	heightPc: IDotcssAnimatable<number>;
	heightPt: IDotcssAnimatable<number>;
	heightPx: IDotcssAnimatable<number>;
	heightRem: IDotcssAnimatable<number>;
	heightVh: IDotcssAnimatable<number>;
	heightVw: IDotcssAnimatable<number>;
	heightVMax: IDotcssAnimatable<number>;
	heightVMin: IDotcssAnimatable<number>;

	left: IDotcssAnimatable<NumericLengthOrAuto>;
	leftCm: IDotcssAnimatable<number>;
	leftCh: IDotcssAnimatable<number>;
	leftEm: IDotcssAnimatable<number>;
	leftEx: IDotcssAnimatable<number>;
	leftIn: IDotcssAnimatable<number>;
	leftMm: IDotcssAnimatable<number>;
	leftP: IDotcssAnimatable<number>;
	leftPc: IDotcssAnimatable<number>;
	leftPt: IDotcssAnimatable<number>;
	leftPx: IDotcssAnimatable<number>;
	leftRem: IDotcssAnimatable<number>;
	leftVh: IDotcssAnimatable<number>;
	leftVw: IDotcssAnimatable<number>;
	leftVMax: IDotcssAnimatable<number>;
	leftVMin: IDotcssAnimatable<number>;

	margin: IDotcssAnimatable<NumericLengthOrAuto>;
	marginCm: IDotcssAnimatable<number>;
	marginCh: IDotcssAnimatable<number>;
	marginEm: IDotcssAnimatable<number>;
	marginEx: IDotcssAnimatable<number>;
	marginIn: IDotcssAnimatable<number>;
	marginMm: IDotcssAnimatable<number>;
	marginP: IDotcssAnimatable<number>;
	marginPc: IDotcssAnimatable<number>;
	marginPt: IDotcssAnimatable<number>;
	marginPx: IDotcssAnimatable<number>;
	marginRem: IDotcssAnimatable<number>;
	marginVh: IDotcssAnimatable<number>;
	marginVw: IDotcssAnimatable<number>;
	marginVMax: IDotcssAnimatable<number>;
	marginVMin: IDotcssAnimatable<number>;

	marginBottom: IDotcssAnimatable<NumericLengthOrAuto>;
	marginBottomCm: IDotcssAnimatable<number>;
	marginBottomCh: IDotcssAnimatable<number>;
	marginBottomEm: IDotcssAnimatable<number>;
	marginBottomEx: IDotcssAnimatable<number>;
	marginBottomIn: IDotcssAnimatable<number>;
	marginBottomMm: IDotcssAnimatable<number>;
	marginBottomP: IDotcssAnimatable<number>;
	marginBottomPc: IDotcssAnimatable<number>;
	marginBottomPt: IDotcssAnimatable<number>;
	marginBottomPx: IDotcssAnimatable<number>;
	marginBottomRem: IDotcssAnimatable<number>;
	marginBottomVh: IDotcssAnimatable<number>;
	marginBottomVw: IDotcssAnimatable<number>;
	marginBottomVMax: IDotcssAnimatable<number>;
	marginBottomVMin: IDotcssAnimatable<number>;

	marginLeft: IDotcssAnimatable<NumericLengthOrAuto>;
	marginLeftCm: IDotcssAnimatable<number>;
	marginLeftCh: IDotcssAnimatable<number>;
	marginLeftEm: IDotcssAnimatable<number>;
	marginLeftEx: IDotcssAnimatable<number>;
	marginLeftIn: IDotcssAnimatable<number>;
	marginLeftMm: IDotcssAnimatable<number>;
	marginLeftP: IDotcssAnimatable<number>;
	marginLeftPc: IDotcssAnimatable<number>;
	marginLeftPt: IDotcssAnimatable<number>;
	marginLeftPx: IDotcssAnimatable<number>;
	marginLeftRem: IDotcssAnimatable<number>;
	marginLeftVh: IDotcssAnimatable<number>;
	marginLeftVw: IDotcssAnimatable<number>;
	marginLeftVMax: IDotcssAnimatable<number>;
	marginLeftVMin: IDotcssAnimatable<number>;

	marginRight: IDotcssAnimatable<NumericLengthOrAuto>;
	marginRightCm: IDotcssAnimatable<number>;
	marginRightCh: IDotcssAnimatable<number>;
	marginRightEm: IDotcssAnimatable<number>;
	marginRightEx: IDotcssAnimatable<number>;
	marginRightIn: IDotcssAnimatable<number>;
	marginRightMm: IDotcssAnimatable<number>;
	marginRightP: IDotcssAnimatable<number>;
	marginRightPc: IDotcssAnimatable<number>;
	marginRightPt: IDotcssAnimatable<number>;
	marginRightPx: IDotcssAnimatable<number>;
	marginRightRem: IDotcssAnimatable<number>;
	marginRightVh: IDotcssAnimatable<number>;
	marginRightVw: IDotcssAnimatable<number>;
	marginRightVMax: IDotcssAnimatable<number>;
	marginRightVMin: IDotcssAnimatable<number>;

	marginTop: IDotcssAnimatable<NumericLengthOrAuto>;
	marginTopCm: IDotcssAnimatable<number>;
	marginTopCh: IDotcssAnimatable<number>;
	marginTopEm: IDotcssAnimatable<number>;
	marginTopEx: IDotcssAnimatable<number>;
	marginTopIn: IDotcssAnimatable<number>;
	marginTopMm: IDotcssAnimatable<number>;
	marginTopP: IDotcssAnimatable<number>;
	marginTopPc: IDotcssAnimatable<number>;
	marginTopPt: IDotcssAnimatable<number>;
	marginTopPx: IDotcssAnimatable<number>;
	marginTopRem: IDotcssAnimatable<number>;
	marginTopVh: IDotcssAnimatable<number>;
	marginTopVw: IDotcssAnimatable<number>;
	marginTopVMax: IDotcssAnimatable<number>;
	marginTopVMin: IDotcssAnimatable<number>;

	maxHeight: IDotcssAnimatable<NumericLengthOrAuto>;
	maxHeightCm: IDotcssAnimatable<number>;
	maxHeightCh: IDotcssAnimatable<number>;
	maxHeightEm: IDotcssAnimatable<number>;
	maxHeightEx: IDotcssAnimatable<number>;
	maxHeightIn: IDotcssAnimatable<number>;
	maxHeightMm: IDotcssAnimatable<number>;
	maxHeightP: IDotcssAnimatable<number>;
	maxHeightPc: IDotcssAnimatable<number>;
	maxHeightPt: IDotcssAnimatable<number>;
	maxHeightPx: IDotcssAnimatable<number>;
	maxHeightRem: IDotcssAnimatable<number>;
	maxHeightVh: IDotcssAnimatable<number>;
	maxHeightVw: IDotcssAnimatable<number>;
	maxHeightVMax: IDotcssAnimatable<number>;
	maxHeightVMin: IDotcssAnimatable<number>;

	maxWidth: IDotcssAnimatable<NumericLengthOrAuto>;
	maxWidthCm: IDotcssAnimatable<number>;
	maxWidthCh: IDotcssAnimatable<number>;
	maxWidthEm: IDotcssAnimatable<number>;
	maxWidthEx: IDotcssAnimatable<number>;
	maxWidthIn: IDotcssAnimatable<number>;
	maxWidthMm: IDotcssAnimatable<number>;
	maxWidthP: IDotcssAnimatable<number>;
	maxWidthPc: IDotcssAnimatable<number>;
	maxWidthPt: IDotcssAnimatable<number>;
	maxWidthPx: IDotcssAnimatable<number>;
	maxWidthRem: IDotcssAnimatable<number>;
	maxWidthVh: IDotcssAnimatable<number>;
	maxWidthVw: IDotcssAnimatable<number>;
	maxWidthVMax: IDotcssAnimatable<number>;
	maxWidthVMin: IDotcssAnimatable<number>;

	minHeight: IDotcssAnimatable<NumericLengthOrAuto>;
	minHeightCm: IDotcssAnimatable<number>;
	minHeightCh: IDotcssAnimatable<number>;
	minHeightEm: IDotcssAnimatable<number>;
	minHeightEx: IDotcssAnimatable<number>;
	minHeightIn: IDotcssAnimatable<number>;
	minHeightMm: IDotcssAnimatable<number>;
	minHeightP: IDotcssAnimatable<number>;
	minHeightPc: IDotcssAnimatable<number>;
	minHeightPt: IDotcssAnimatable<number>;
	minHeightPx: IDotcssAnimatable<number>;
	minHeightRem: IDotcssAnimatable<number>;
	minHeightVh: IDotcssAnimatable<number>;
	minHeightVw: IDotcssAnimatable<number>;
	minHeightVMax: IDotcssAnimatable<number>;
	minHeightVMin: IDotcssAnimatable<number>;

	minWidth: IDotcssAnimatable<NumericLengthOrAuto>;
	minWidthCm: IDotcssAnimatable<number>;
	minWidthCh: IDotcssAnimatable<number>;
	minWidthEm: IDotcssAnimatable<number>;
	minWidthEx: IDotcssAnimatable<number>;
	minWidthIn: IDotcssAnimatable<number>;
	minWidthMm: IDotcssAnimatable<number>;
	minWidthP: IDotcssAnimatable<number>;
	minWidthPc: IDotcssAnimatable<number>;
	minWidthPt: IDotcssAnimatable<number>;
	minWidthPx: IDotcssAnimatable<number>;
	minWidthRem: IDotcssAnimatable<number>;
	minWidthVh: IDotcssAnimatable<number>;
	minWidthVw: IDotcssAnimatable<number>;
	minWidthVMax: IDotcssAnimatable<number>;
	minWidthVMin: IDotcssAnimatable<number>;

	outlineOffset: IDotcssAnimatable<NumericLength>;
	outlineOffsetCm: IDotcssAnimatable<number>;
	outlineOffsetCh: IDotcssAnimatable<number>;
	outlineOffsetEm: IDotcssAnimatable<number>;
	outlineOffsetEx: IDotcssAnimatable<number>;
	outlineOffsetIn: IDotcssAnimatable<number>;
	outlineOffsetMm: IDotcssAnimatable<number>;
	outlineOffsetP: IDotcssAnimatable<number>;
	outlineOffsetPc: IDotcssAnimatable<number>;
	outlineOffsetPt: IDotcssAnimatable<number>;
	outlineOffsetPx: IDotcssAnimatable<number>;
	outlineOffsetRem: IDotcssAnimatable<number>;
	outlineOffsetVh: IDotcssAnimatable<number>;
	outlineOffsetVw: IDotcssAnimatable<number>;
	outlineOffsetVMax: IDotcssAnimatable<number>;
	outlineOffsetVMin: IDotcssAnimatable<number>;

	padding: IDotcssAnimatable<NumericLengthOrAuto>;
	paddingCm: IDotcssAnimatable<number>;
	paddingCh: IDotcssAnimatable<number>;
	paddingEm: IDotcssAnimatable<number>;
	paddingEx: IDotcssAnimatable<number>;
	paddingIn: IDotcssAnimatable<number>;
	paddingMm: IDotcssAnimatable<number>;
	paddingP: IDotcssAnimatable<number>;
	paddingPc: IDotcssAnimatable<number>;
	paddingPt: IDotcssAnimatable<number>;
	paddingPx: IDotcssAnimatable<number>;
	paddingRem: IDotcssAnimatable<number>;
	paddingVh: IDotcssAnimatable<number>;
	paddingVw: IDotcssAnimatable<number>;
	paddingVMax: IDotcssAnimatable<number>;
	paddingVMin: IDotcssAnimatable<number>;

	paddingBottom: IDotcssAnimatable<NumericLengthOrAuto>;
	paddingBottomCm: IDotcssAnimatable<number>;
	paddingBottomCh: IDotcssAnimatable<number>;
	paddingBottomEm: IDotcssAnimatable<number>;
	paddingBottomEx: IDotcssAnimatable<number>;
	paddingBottomIn: IDotcssAnimatable<number>;
	paddingBottomMm: IDotcssAnimatable<number>;
	paddingBottomP: IDotcssAnimatable<number>;
	paddingBottomPc: IDotcssAnimatable<number>;
	paddingBottomPt: IDotcssAnimatable<number>;
	paddingBottomPx: IDotcssAnimatable<number>;
	paddingBottomRem: IDotcssAnimatable<number>;
	paddingBottomVh: IDotcssAnimatable<number>;
	paddingBottomVw: IDotcssAnimatable<number>;
	paddingBottomVMax: IDotcssAnimatable<number>;
	paddingBottomVMin: IDotcssAnimatable<number>;

	paddingLeft: IDotcssAnimatable<NumericLengthOrAuto>;
	paddingLeftCm: IDotcssAnimatable<number>;
	paddingLeftCh: IDotcssAnimatable<number>;
	paddingLeftEm: IDotcssAnimatable<number>;
	paddingLeftEx: IDotcssAnimatable<number>;
	paddingLeftIn: IDotcssAnimatable<number>;
	paddingLeftMm: IDotcssAnimatable<number>;
	paddingLeftP: IDotcssAnimatable<number>;
	paddingLeftPc: IDotcssAnimatable<number>;
	paddingLeftPt: IDotcssAnimatable<number>;
	paddingLeftPx: IDotcssAnimatable<number>;
	paddingLeftRem: IDotcssAnimatable<number>;
	paddingLeftVh: IDotcssAnimatable<number>;
	paddingLeftVw: IDotcssAnimatable<number>;
	paddingLeftVMax: IDotcssAnimatable<number>;
	paddingLeftVMin: IDotcssAnimatable<number>;

	paddingRight: IDotcssAnimatable<NumericLengthOrAuto>;
	paddingRightCm: IDotcssAnimatable<number>;
	paddingRightCh: IDotcssAnimatable<number>;
	paddingRightEm: IDotcssAnimatable<number>;
	paddingRightEx: IDotcssAnimatable<number>;
	paddingRightIn: IDotcssAnimatable<number>;
	paddingRightMm: IDotcssAnimatable<number>;
	paddingRightP: IDotcssAnimatable<number>;
	paddingRightPc: IDotcssAnimatable<number>;
	paddingRightPt: IDotcssAnimatable<number>;
	paddingRightPx: IDotcssAnimatable<number>;
	paddingRightRem: IDotcssAnimatable<number>;
	paddingRightVh: IDotcssAnimatable<number>;
	paddingRightVw: IDotcssAnimatable<number>;
	paddingRightVMax: IDotcssAnimatable<number>;
	paddingRightVMin: IDotcssAnimatable<number>;

	paddingTop: IDotcssAnimatable<NumericLengthOrAuto>;
	paddingTopCm: IDotcssAnimatable<number>;
	paddingTopCh: IDotcssAnimatable<number>;
	paddingTopEm: IDotcssAnimatable<number>;
	paddingTopEx: IDotcssAnimatable<number>;
	paddingTopIn: IDotcssAnimatable<number>;
	paddingTopMm: IDotcssAnimatable<number>;
	paddingTopP: IDotcssAnimatable<number>;
	paddingTopPc: IDotcssAnimatable<number>;
	paddingTopPt: IDotcssAnimatable<number>;
	paddingTopPx: IDotcssAnimatable<number>;
	paddingTopRem: IDotcssAnimatable<number>;
	paddingTopVh: IDotcssAnimatable<number>;
	paddingTopVw: IDotcssAnimatable<number>;
	paddingTopVMax: IDotcssAnimatable<number>;
	paddingTopVMin: IDotcssAnimatable<number>;

	right: IDotcssAnimatable<NumericLengthOrAuto>;
	rightCm: IDotcssAnimatable<number>;
	rightCh: IDotcssAnimatable<number>;
	rightEm: IDotcssAnimatable<number>;
	rightEx: IDotcssAnimatable<number>;
	rightIn: IDotcssAnimatable<number>;
	rightMm: IDotcssAnimatable<number>;
	rightP: IDotcssAnimatable<number>;
	rightPc: IDotcssAnimatable<number>;
	rightPt: IDotcssAnimatable<number>;
	rightPx: IDotcssAnimatable<number>;
	rightRem: IDotcssAnimatable<number>;
	rightVh: IDotcssAnimatable<number>;
	rightVw: IDotcssAnimatable<number>;
	rightVMax: IDotcssAnimatable<number>;
	rightVMin: IDotcssAnimatable<number>;

	textIndent: IDotcssAnimatable<NumericLengthOrAuto>;
	textIndentCm: IDotcssAnimatable<number>;
	textIndentCh: IDotcssAnimatable<number>;
	textIndentEm: IDotcssAnimatable<number>;
	textIndentEx: IDotcssAnimatable<number>;
	textIndentIn: IDotcssAnimatable<number>;
	textIndentMm: IDotcssAnimatable<number>;
	textIndentP: IDotcssAnimatable<number>;
	textIndentPc: IDotcssAnimatable<number>;
	textIndentPt: IDotcssAnimatable<number>;
	textIndentPx: IDotcssAnimatable<number>;
	textIndentRem: IDotcssAnimatable<number>;
	textIndentVh: IDotcssAnimatable<number>;
	textIndentVw: IDotcssAnimatable<number>;
	textIndentVMax: IDotcssAnimatable<number>;
	textIndentVMin: IDotcssAnimatable<number>;

	top: IDotcssAnimatable<NumericLengthOrAuto>;
	topCm: IDotcssAnimatable<number>;
	topCh: IDotcssAnimatable<number>;
	topEm: IDotcssAnimatable<number>;
	topEx: IDotcssAnimatable<number>;
	topIn: IDotcssAnimatable<number>;
	topMm: IDotcssAnimatable<number>;
	topP: IDotcssAnimatable<number>;
	topPc: IDotcssAnimatable<number>;
	topPt: IDotcssAnimatable<number>;
	topPx: IDotcssAnimatable<number>;
	topRem: IDotcssAnimatable<number>;
	topVh: IDotcssAnimatable<number>;
	topVw: IDotcssAnimatable<number>;
	topVMax: IDotcssAnimatable<number>;
	topVMin: IDotcssAnimatable<number>;

	width: IDotcssAnimatable<NumericLengthOrAuto>;
	widthCm: IDotcssAnimatable<number>;
	widthCh: IDotcssAnimatable<number>;
	widthEm: IDotcssAnimatable<number>;
	widthEx: IDotcssAnimatable<number>;
	widthIn: IDotcssAnimatable<number>;
	widthMm: IDotcssAnimatable<number>;
	widthP: IDotcssAnimatable<number>;
	widthPc: IDotcssAnimatable<number>;
	widthPt: IDotcssAnimatable<number>;
	widthPx: IDotcssAnimatable<number>;
	widthRem: IDotcssAnimatable<number>;
	widthVh: IDotcssAnimatable<number>;
	widthVw: IDotcssAnimatable<number>;
	widthVMax: IDotcssAnimatable<number>;
	widthVMin: IDotcssAnimatable<number>;

	lineHeight: IDotcssAnimatable<NumericLength>;
	lineHeightCm: IDotcssAnimatable<number>;
	lineHeightCh: IDotcssAnimatable<number>;
	lineHeightEm: IDotcssAnimatable<number>;
	lineHeightEx: IDotcssAnimatable<number>;
	lineHeightIn: IDotcssAnimatable<number>;
	lineHeightMm: IDotcssAnimatable<number>;
	lineHeightP: IDotcssAnimatable<number>;
	lineHeightPc: IDotcssAnimatable<number>;
	lineHeightPt: IDotcssAnimatable<number>;
	lineHeightPx: IDotcssAnimatable<number>;
	lineHeightRem: IDotcssAnimatable<number>;
	lineHeightVh: IDotcssAnimatable<number>;
	lineHeightVw: IDotcssAnimatable<number>;
	lineHeightVMax: IDotcssAnimatable<number>;
	lineHeightVMin: IDotcssAnimatable<number>;

	fontSize: IDotcssAnimatable<NumericLength>;
	fontSizeCm: IDotcssAnimatable<number>;
	fontSizeCh: IDotcssAnimatable<number>;
	fontSizeEm: IDotcssAnimatable<number>;
	fontSizeEx: IDotcssAnimatable<number>;
	fontSizeIn: IDotcssAnimatable<number>;
	fontSizeMm: IDotcssAnimatable<number>;
	fontSizeP: IDotcssAnimatable<number>;
	fontSizePc: IDotcssAnimatable<number>;
	fontSizePt: IDotcssAnimatable<number>;
	fontSizePx: IDotcssAnimatable<number>;
	fontSizeRem: IDotcssAnimatable<number>;
	fontSizeVh: IDotcssAnimatable<number>;
	fontSizeVw: IDotcssAnimatable<number>;
	fontSizeVMax: IDotcssAnimatable<number>;
	fontSizeVMin: IDotcssAnimatable<number>;

	flexBasis: IDotcssAnimatable<NumericLengthOrAuto>;
	flexBasisCm: IDotcssAnimatable<number>;
	flexBasisCh: IDotcssAnimatable<number>;
	flexBasisEm: IDotcssAnimatable<number>;
	flexBasisEx: IDotcssAnimatable<number>;
	flexBasisIn: IDotcssAnimatable<number>;
	flexBasisMm: IDotcssAnimatable<number>;
	flexBasisP: IDotcssAnimatable<number>;
	flexBasisPc: IDotcssAnimatable<number>;
	flexBasisPt: IDotcssAnimatable<number>;
	flexBasisPx: IDotcssAnimatable<number>;
	flexBasisRem: IDotcssAnimatable<number>;
	flexBasisVh: IDotcssAnimatable<number>;
	flexBasisVw: IDotcssAnimatable<number>;
	flexBasisVMax: IDotcssAnimatable<number>;
	flexBasisVMin: IDotcssAnimatable<number>;
	
	//url: 
	backgroundImage: (value: BackgroundImageFormat)=>IDotcssProp;
	borderImage: (value: BackgroundImageFormat)=>IDotcssProp;
	listStyleImage: (value: BackgroundImageFormat)=>IDotcssProp;
	content: (value: BasicCommonValues|Url)=>IDotcssProp;

	//complex: 
	transform: (transformOrTransformBuilder: BasicCommonValues|TransformationBuilder)=>IDotcssProp;
	filter: (filterBuilder: FilterBuilder)=>IDotcssProp;
	backdropFilter: (filterBuilder: FilterBuilder)=>IDotcssProp;
	
	//misc numeric: 
	opacity: IDotcssAnimatable<number|string>;

	//misc: 
	appearance: (value: AppearanceValues)=>IDotcssProp;
	aspectRatio: (value: string)=>IDotcssProp; // TODO: better typing on this. Low priority.

	background: (value: BasicCommonValues|string)=>IDotcssProp
	backgroundAttachment: (value: BackgroundAttachmentValues)=>IDotcssProp
	backgroundBlendMode: (value: BasicCommonValues|string)=>IDotcssProp
	backgroundPosition: (value: BackgroundPositionShorthand2D)=>IDotcssProp
	backgroundRepeat: (value: BackgroundRepeatValues2d)=>IDotcssProp
	backgroundClip: (value: BasicCommonValues|string)=>IDotcssProp
	backgroundOrigin: (value: BackgroundOriginValues)=>IDotcssProp

	borderImageOutset: (value: BasicCommonValues|string)=>IDotcssProp
	borderImageRepeat: (value: BackgroundRepeatValues2d)=>IDotcssProp
	borderImageSlice: (value: BasicCommonValues|string)=>IDotcssProp
	borderImageSource: (value: BasicCommonValues|string)=>IDotcssProp
	
	border: (value: BorderShorthand)=>IDotcssProp
	borderBottom: (value: BorderShorthand)=>IDotcssProp
	borderLeft: (value: BorderShorthand)=>IDotcssProp
	borderRight: (value: BorderShorthand)=>IDotcssProp
	borderTop: (value: BorderShorthand)=>IDotcssProp

	borderBottomStyle: (value: BorderStyles)=>IDotcssProp
	borderLeftStyle: (value: BorderStyles)=>IDotcssProp
	borderRightStyle: (value: BorderStyles)=>IDotcssProp
	borderStyle: (value: BorderStyles)=>IDotcssProp
	borderTopStyle: (value: BorderStyles)=>IDotcssProp

	boxDecorationBreak: (value: BasicCommonValues|string)=>IDotcssProp
	boxShadow: (value: BasicCommonValues|string)=>IDotcssProp
	clear: (value: BasicCommonValues|string)=>IDotcssProp
	clip: (value: BasicCommonValues|string)=>IDotcssProp
	display: (value: DisplayValues)=>IDotcssProp
	float: (value: BasicCommonValues|string)=>IDotcssProp
	overflow: (value: BasicCommonValues|string)=>IDotcssProp
	box: (value: BasicCommonValues|string)=>IDotcssProp
	overflowX: (value: BasicCommonValues|string)=>IDotcssProp
	overflowY: (value: BasicCommonValues|string)=>IDotcssProp
	position: (value: PositionNames)=>IDotcssProp
	visibility: (value: BasicCommonValues|string)=>IDotcssProp
	verticalAlign: (value: BasicCommonValues|string)=>IDotcssProp
	zIndex: (value: string|number)=>IDotcssProp
	alignContent: (value: BasicCommonValues|string)=>IDotcssProp
	alignItems: (value: BasicCommonValues|string)=>IDotcssProp
	alignSelf: (value: BasicCommonValues|string)=>IDotcssProp
	flex: (value: FlexShorthand)=>IDotcssProp
	// flexBasis: (value: FlexBasisNames)=>IDotcssProp
	flexDirection: (value: FlexDirectionNames)=>IDotcssProp
	flexFlow: (value: FlexFlowShorthand)=>IDotcssProp
	flexGrow: (value: BasicCommonValues|number)=>IDotcssProp
	flexShrink: (value: BasicCommonValues|number)=>IDotcssProp
	flexWrap: (value: FlexWrapNames)=>IDotcssProp
	grid: (value: BasicCommonValues|string)=>IDotcssProp
	gridArea: (value: BasicCommonValues|string)=>IDotcssProp
	gridAutoColumns: (value: BasicCommonValues|string)=>IDotcssProp
	gridautoRows: (value: BasicCommonValues|string)=>IDotcssProp
	gridColumn: (value: BasicCommonValues|string)=>IDotcssProp
	gridColumnEnd: (value: BasicCommonValues|string)=>IDotcssProp
	gridColumnGap: (value: BasicCommonValues|string)=>IDotcssProp
	gridColumnStart: (value: BasicCommonValues|string)=>IDotcssProp
	gridGap: (value: BasicCommonValues|string)=>IDotcssProp
	gridRow: (value: BasicCommonValues|string)=>IDotcssProp
	gridRowEnd: (value: BasicCommonValues|string)=>IDotcssProp
	gridRowGap: (value: BasicCommonValues|string)=>IDotcssProp
	gridRowStart: (value: BasicCommonValues|string)=>IDotcssProp
	gridTemplate: (value: BasicCommonValues|string)=>IDotcssProp
	gridTemplateAreas: (value: BasicCommonValues|string)=>IDotcssProp
	gridTemplateColumns: (value: BasicCommonValues|string)=>IDotcssProp
	gridTemplateRows: (value: BasicCommonValues|string)=>IDotcssProp
	imageOrientation: (value: BasicCommonValues|string)=>IDotcssProp
	justifyContent: (value: BasicCommonValues|string)=>IDotcssProp
	order: (value: BasicCommonValues|number)=>IDotcssProp
	hangingPunctuation: (value: BasicCommonValues|string)=>IDotcssProp
	hyphens: (value: BasicCommonValues|string)=>IDotcssProp
	letterSpacing: (value: BasicCommonValues|string)=>IDotcssProp
	lineBreak: (value: BasicCommonValues|string)=>IDotcssProp
	overflowWrap: (value: BasicCommonValues|string)=>IDotcssProp
	tabSize: (value: BasicCommonValues|string)=>IDotcssProp
	textAlign: (value: BasicCommonValues|string)=>IDotcssProp
	textAlignLast: (value: BasicCommonValues|string)=>IDotcssProp
	textCombineUpright: (value: BasicCommonValues|string)=>IDotcssProp
	textJustify: (value: BasicCommonValues|string)=>IDotcssProp
	textTransform: (value: BasicCommonValues|string)=>IDotcssProp
	whiteSpace: (value: BasicCommonValues|string)=>IDotcssProp
	wordBreak: (value: BasicCommonValues|string)=>IDotcssProp
	wordSpacing: (value: BasicCommonValues|string)=>IDotcssProp
	wordWrap: (value: BasicCommonValues|string)=>IDotcssProp
	textDecoration: (value: BasicCommonValues|string)=>IDotcssProp
	textDecorationLine: (value: BasicCommonValues|string)=>IDotcssProp
	textDecorationStyle: (value: BasicCommonValues|string)=>IDotcssProp
	textShadow: (value: BasicCommonValues|string)=>IDotcssProp
	textUnderlinePosition: (value: BasicCommonValues|string)=>IDotcssProp
	font: (value: BasicCommonValues|string)=>IDotcssProp
	fontFamily: (value: BasicCommonValues|string)=>IDotcssProp
	fontFeatureSettings: (value: BasicCommonValues|string)=>IDotcssProp
	fontKerning: (value: BasicCommonValues|string)=>IDotcssProp
	fontLanguageOverride: (value: BasicCommonValues|string)=>IDotcssProp
	fontSizeAdjust: (value: BasicCommonValues|string)=>IDotcssProp
	fontStretch: (value: BasicCommonValues|string)=>IDotcssProp
	fontStyle: (value: FontStyleValues)=>IDotcssProp
	fontSynthesis: (value: BasicCommonValues|string)=>IDotcssProp
	fontVariant: (value: FontVariantValues)=>IDotcssProp
	fontVariantAlternates: (value: BasicCommonValues|string)=>IDotcssProp
	fontVariantCaps: (value: FontVariantCapsValues)=>IDotcssProp
	fontVariantEastAsian: (value: BasicCommonValues|string)=>IDotcssProp
	fontVariantLigatures: (value: BasicCommonValues|string)=>IDotcssProp
	fontVariantNumeric: (value: BasicCommonValues|string)=>IDotcssProp
	fontVariantPosition: (value: BasicCommonValues|string)=>IDotcssProp
	fontWeight: (value: BasicCommonValues|string)=>IDotcssProp
	direction: (value: DirectionValues)=>IDotcssProp
	textOrientation: (value: BasicCommonValues|string)=>IDotcssProp
	unicodeBidi: (value: BasicCommonValues|string)=>IDotcssProp
	userSelect: (value: BasicCommonValues|string)=>IDotcssProp
	writingMode: (value: BasicCommonValues|string)=>IDotcssProp
	borderCollapse: (value: BasicCommonValues|string)=>IDotcssProp
	borderSpacing: (value: BasicCommonValues|string)=>IDotcssProp
	captionSide: (value: BasicCommonValues|string)=>IDotcssProp
	emptyCells: (value: BasicCommonValues|string)=>IDotcssProp
	tableLayout: (value: BasicCommonValues|string)=>IDotcssProp
	counterIncrement: (value: BasicCommonValues|string)=>IDotcssProp
	counterReset: (value: BasicCommonValues|string)=>IDotcssProp
	listStyle: (value: BasicCommonValues|string)=>IDotcssProp
	listStylePosition: (value: BasicCommonValues|string)=>IDotcssProp
	listStyleType: (value: BasicCommonValues|string)=>IDotcssProp
	animation: (value: BasicCommonValues|string)=>IDotcssProp
	animationDelay: (value: BasicCommonValues|string)=>IDotcssProp
	animationDirection: (value: BasicCommonValues|string)=>IDotcssProp
	animationDuration: (value: BasicCommonValues|string)=>IDotcssProp
	animationFillMode: (value: BasicCommonValues|string)=>IDotcssProp
	animationIterationCount: (value: BasicCommonValues|string)=>IDotcssProp
	animationName: (value: BasicCommonValues|string)=>IDotcssProp
	animationPlayState: (value: BasicCommonValues|string)=>IDotcssProp
	animationTimingFunction: (value: BasicCommonValues|string)=>IDotcssProp
	backfaceVisibility: (value: BackfaceVisibilityValues)=>IDotcssProp
	perspective2d: (value: BasicCommonValues|string)=>IDotcssProp
	perspectiveOrigin: (value: BasicCommonValues|string)=>IDotcssProp
	transformOrigin: (value: BasicCommonValues|string)=>IDotcssProp
	transformStyle: (value: BasicCommonValues|string)=>IDotcssProp
	transition: (value: BasicCommonValues|string)=>IDotcssProp
	transitionProperty: (value: BasicCommonValues|string)=>IDotcssProp
	transitionDuration: (value: BasicCommonValues|string)=>IDotcssProp
	transitionTimingFunction: (value: BasicCommonValues|string)=>IDotcssProp
	transitionDelay: (value: BasicCommonValues|string)=>IDotcssProp
	boxSizing: (value: BasicCommonValues|string)=>IDotcssProp
	cursor: (value: BasicCommonValues|string)=>IDotcssProp
	imeMode: (value: BasicCommonValues|string)=>IDotcssProp
	navDown: (value: BasicCommonValues|string)=>IDotcssProp
	navIndex: (value: BasicCommonValues|string)=>IDotcssProp
	navLeft: (value: BasicCommonValues|string)=>IDotcssProp
	navRight: (value: BasicCommonValues|string)=>IDotcssProp
	navUp: (value: BasicCommonValues|string)=>IDotcssProp
	outline: (value: BorderShorthand)=>IDotcssProp
	//outlineOffset: (value: BasicCommonValues|string)=>IDotcssProp // Now animated.
	outlineStyle: (value: BorderStyles)=>IDotcssProp
	outlineWidth: (value: OutlineWidthValues)=>IDotcssProp
	resize: (value: BasicCommonValues|string)=>IDotcssProp
	textOverflow: (value: BasicCommonValues|string)=>IDotcssProp
	breakAfter: (value: BasicCommonValues|string)=>IDotcssProp
	breakBefore: (value: BasicCommonValues|string)=>IDotcssProp
	breakInside: (value: BasicCommonValues|string)=>IDotcssProp
	columnCount: (value: BasicCommonValues|string)=>IDotcssProp
	columnFill: (value: BasicCommonValues|string)=>IDotcssProp
	columnGap: (value: BasicCommonValues|string)=>IDotcssProp
	columnRule: (value: BasicCommonValues|string)=>IDotcssProp
	columnRuleStyle: (value: BasicCommonValues|string)=>IDotcssProp
	columnRuleWidth: (value: BasicCommonValues|string)=>IDotcssProp
	columnSpan: (value: BasicCommonValues|string)=>IDotcssProp
	columnWidth: (value: BasicCommonValues|string)=>IDotcssProp
	columns: (value: BasicCommonValues|string)=>IDotcssProp
	widows: (value: BasicCommonValues|string)=>IDotcssProp
	orphans: (value: BasicCommonValues|string)=>IDotcssProp
	pageBreakAfter: (value: BasicCommonValues|string)=>IDotcssProp
	pageBreakBefore: (value: BasicCommonValues|string)=>IDotcssProp
	pageBreakInside: (value: BasicCommonValues|string)=>IDotcssProp
	marks: (value: BasicCommonValues|string)=>IDotcssProp
	quotes: (value: BasicCommonValues|string)=>IDotcssProp
	imageRendering: (value: BasicCommonValues|string)=>IDotcssProp
	imageResolution: (value: BasicCommonValues|string)=>IDotcssProp
	objectFit: (value: BasicCommonValues|string)=>IDotcssProp
	objectPosition: (value: BasicCommonValues|string)=>IDotcssProp
	mask: (value: BasicCommonValues|string)=>IDotcssProp
	maskType: (value: BasicCommonValues|string)=>IDotcssProp
	mark: (value: BasicCommonValues|string)=>IDotcssProp
	markAfter: (value: BasicCommonValues|string)=>IDotcssProp
	markBefore: (value: BasicCommonValues|string)=>IDotcssProp
	phonemes: (value: BasicCommonValues|string)=>IDotcssProp
	rest: (value: BasicCommonValues|string)=>IDotcssProp
	restAfter: (value: BasicCommonValues|string)=>IDotcssProp
	restBefore: (value: BasicCommonValues|string)=>IDotcssProp
	voiceBalance: (value: BasicCommonValues|string)=>IDotcssProp
	voiceDuration: (value: BasicCommonValues|string)=>IDotcssProp
	voicePitch: (value: BasicCommonValues|string)=>IDotcssProp
	voicePitchRange: (value: BasicCommonValues|string)=>IDotcssProp
	voiceRate: (value: BasicCommonValues|string)=>IDotcssProp
	voiceStress: (value: BasicCommonValues|string)=>IDotcssProp
	voiceVolume: (value: BasicCommonValues|string)=>IDotcssProp
	marqueeDirection: (value: BasicCommonValues|string)=>IDotcssProp
	marqueePlayCount: (value: BasicCommonValues|string)=>IDotcssProp
	marqueeSpeed: (value: BasicCommonValues|string)=>IDotcssProp
	marqueeStyle: (value: BasicCommonValues|string)=>IDotcssProp
	pointerEvents: (value: BasicCommonValues|string)=>IDotcssProp
}

export default interface IDotCss extends IDotcssProp{

	(selector: "@charset", charset: string): void;
	(selector: "@color-profile", name: string): IColorProfileBuilder;
	(selector: "@container", condition: string): IDotcssProp;
	(selector: "@counter-style", name: string): ICounterStyleBuilder;

	(selector?: Array<HTMLElement>|HTMLElement|string): IDotcssProp;

	version: string;
}

export interface IDotcssAnimatable<T> extends IDotcssProp{
	(value: T): IDotcssProp;

	animate(value: number|string, duration: number, style: "ease", complete: Function): IDotcssProp;
}

export interface IDotcssAnimatableColor extends IDotcssProp{
	(value: Color|Array<number>): IDotcssProp;
	(r: number, g: number, b: number, a?: number): IDotcssProp;

	animate(value: Color|Array<number>, duration: number, style: "ease", complete: Function): IDotcssProp;
}

export interface HideParams{
	duration?: number,
	complete?: Function,
	hideStyle?: "normal"|"fade"|"shrink",
	animationStyle?: "ease",
}

export interface ShowParams{
	duration?: number,
	display?: DisplayValues, // TODO: potential to expand this.
	complete?: Function,
	opacity?: number,
	width?: number,
	height?: number,
	showStyle?: "normal"|"fade"|"grow",
	animationStyle?: "ease",
}

export interface TransformationBuilder {
	// TODO: it would be cool if this didn't have to return anything, and the trns parameter that's passed in would just retain a memory of the transformations.
	(trns: ITransformationContext): ITransformationContext|string;
}

export type ITransformationContext = {
	matrix: (a: number, b: number, c: number, d: number, tx: number, ty: number)=>ITransformationContext;
	matrix3d: (a1:number, b1:number, c1:number, d1:number, a2:number, b2:number, c2:number, d2:number, a3:number, b3:number, c3:number, d3:number, a4:number, b4:number, c4:number, d4:number)=>ITransformationContext;
	
	translate: (x: NumericLength, y?:NumericLength)=>ITransformationContext;
	translateCm: (x: number, y?:number)=>ITransformationContext;
	translateCh: (x: number, y?:number)=>ITransformationContext;
	translateEm: (x: number, y?:number)=>ITransformationContext;
	translateEx: (x: number, y?:number)=>ITransformationContext;
	translateIn: (x: number, y?:number)=>ITransformationContext;
	translateMm: (x: number, y?:number)=>ITransformationContext;
	translateP: (x: number, y?:number)=>ITransformationContext;
	translatePc: (x: number, y?:number)=>ITransformationContext;
	translatePt: (x: number, y?:number)=>ITransformationContext;
	translatePx: (x: number, y?:number)=>ITransformationContext;
	translateRem: (x: number, y?:number)=>ITransformationContext;
	translateVh: (x: number, y?:number)=>ITransformationContext;
	translateVw: (x: number, y?:number)=>ITransformationContext;
	translateVMax: (x: number, y?:number)=>ITransformationContext;
	translateVMin: (x: number, y?:number)=>ITransformationContext;
	translate3d: (x: NumericLength, y: NumericLength, z: NumericLength)=>ITransformationContext;
	translate3dCm: (x: number, y: number, z: number)=>ITransformationContext;
	translate3dCh: (x: number, y: number, z: number)=>ITransformationContext;
	translate3dEm: (x: number, y: number, z: number)=>ITransformationContext;
	translate3dEx: (x: number, y: number, z: number)=>ITransformationContext;
	translate3dIn: (x: number, y: number, z: number)=>ITransformationContext;
	translate3dMm: (x: number, y: number, z: number)=>ITransformationContext;
	translate3dP: (x: number, y: number, z: number)=>ITransformationContext;
	translate3dPc: (x: number, y: number, z: number)=>ITransformationContext;
	translate3dPt: (x: number, y: number, z: number)=>ITransformationContext;
	translate3dPx: (x: number, y: number, z: number)=>ITransformationContext;
	translate3dRem: (x: number, y: number, z: number)=>ITransformationContext;
	translate3dVh: (x: number, y: number, z: number)=>ITransformationContext;
	translate3dVw: (x: number, y: number, z: number)=>ITransformationContext;
	translate3dVMax: (x: number, y: number, z: number)=>ITransformationContext;
	translate3dVMin: (x: number, y: number, z: number)=>ITransformationContext;
	translateX: (v: NumericLength)=>ITransformationContext;
	translateXCm: (v: number)=>ITransformationContext;
	translateXCh: (v: number)=>ITransformationContext;
	translateXEm: (v: number)=>ITransformationContext;
	translateXEx: (v: number)=>ITransformationContext;
	translateXIn: (v: number)=>ITransformationContext;
	translateXMm: (v: number)=>ITransformationContext;
	translateXP: (v: number)=>ITransformationContext;
	translateXPc: (v: number)=>ITransformationContext;
	translateXPt: (v: number)=>ITransformationContext;
	translateXPx: (v: number)=>ITransformationContext;
	translateXRem: (v: number)=>ITransformationContext;
	translateXVh: (v: number)=>ITransformationContext;
	translateXVw: (v: number)=>ITransformationContext;
	translateXVMax: (v: number)=>ITransformationContext;
	translateXVMin: (v: number)=>ITransformationContext;
	translateY: (v: NumericLength)=>ITransformationContext;
	translateYCm: (v: number)=>ITransformationContext;
	translateYCh: (v: number)=>ITransformationContext;
	translateYEm: (v: number)=>ITransformationContext;
	translateYEx: (v: number)=>ITransformationContext;
	translateYIn: (v: number)=>ITransformationContext;
	translateYMm: (v: number)=>ITransformationContext;
	translateYP: (v: number)=>ITransformationContext;
	translateYPc: (v: number)=>ITransformationContext;
	translateYPt: (v: number)=>ITransformationContext;
	translateYPx: (v: number)=>ITransformationContext;
	translateYRem: (v: number)=>ITransformationContext;
	translateYVh: (v: number)=>ITransformationContext;
	translateYVw: (v: number)=>ITransformationContext;
	translateYVMax: (v: number)=>ITransformationContext;
	translateYVMin: (v: number)=>ITransformationContext;
	translateZ: (v: NumericLength)=>ITransformationContext;
	translateZCm: (v: number)=>ITransformationContext;
	translateZCh: (v: number)=>ITransformationContext;
	translateZEm: (v: number)=>ITransformationContext;
	translateZEx: (v: number)=>ITransformationContext;
	translateZIn: (v: number)=>ITransformationContext;
	translateZMm: (v: number)=>ITransformationContext;
	translateZP: (v: number)=>ITransformationContext;
	translateZPc: (v: number)=>ITransformationContext;
	translateZPt: (v: number)=>ITransformationContext;
	translateZPx: (v: number)=>ITransformationContext;
	translateZRem: (v: number)=>ITransformationContext;
	translateZVh: (v: number)=>ITransformationContext;
	translateZVw: (v: number)=>ITransformationContext;
	translateZVMax: (v: number)=>ITransformationContext;
	translateZVMin: (v: number)=>ITransformationContext;
	
	scale: (x: number, y?: number)=>ITransformationContext;
	scale3d: (x: number, y: number, z: number)=>ITransformationContext;
	scaleX: (v: number)=>ITransformationContext;
	scaleY: (v: number)=>ITransformationContext;
	scaleZ: (v: number)=>ITransformationContext;
	
	rotate: (v: NumericAngle)=>ITransformationContext;
	rotateDeg: (v: number)=>ITransformationContext;
	rotateTurn: (v: number)=>ITransformationContext;
	rotateRad: (v: number)=>ITransformationContext;
	rotateGrad: (v: number)=>ITransformationContext;
	rotate3d: (x: number, y: number, z: number, a: NumericAngle)=>ITransformationContext;
	rotate3dDeg: (x: number, y: number, z: number, a: number)=>ITransformationContext;
	rotate3dTurn: (x: number, y: number, z: number, a: number)=>ITransformationContext;
	rotate3dRad: (x: number, y: number, z: number, a: number)=>ITransformationContext;
	rotate3dGrad: (x: number, y: number, z: number, a: number)=>ITransformationContext;
	rotateX: (v: NumericAngle)=>ITransformationContext;
	rotateXDeg: (v: number)=>ITransformationContext;
	rotateXTurn: (v: number)=>ITransformationContext;
	rotateXRad: (v: number)=>ITransformationContext;
	rotateXGrad: (v: number)=>ITransformationContext;
	rotateY: (v: NumericAngle)=>ITransformationContext;
	rotateYDeg: (v: number)=>ITransformationContext;
	rotateYTurn: (v: number)=>ITransformationContext;
	rotateYRad: (v: number)=>ITransformationContext;
	rotateYGrad: (v: number)=>ITransformationContext;
	rotateZ: (v: NumericAngle)=>ITransformationContext;
	rotateZDeg: (v: number)=>ITransformationContext;
	rotateZTurn: (v: number)=>ITransformationContext;
	rotateZRad: (v: number)=>ITransformationContext;
	rotateZGrad: (v: number)=>ITransformationContext;
	
	skew: (x: NumericAngle, y?: NumericAngle)=>ITransformationContext;
	skewDeg: (x: number, y?: number)=>ITransformationContext;
	skewTurn: (x: number, y?: number)=>ITransformationContext;
	skewRad: (x: number, y?: number)=>ITransformationContext;
	skewGrad: (x: number, y?: number)=>ITransformationContext;
	skewX: (v: NumericAngle)=>ITransformationContext;
	skewXDeg: (v: number)=>ITransformationContext;
	skewXTurn: (v: number)=>ITransformationContext;
	skewXRad: (v: number)=>ITransformationContext;
	skewXGrad: (v: number)=>ITransformationContext;
	skewY: (v: NumericAngle)=>ITransformationContext;
	skewYDeg: (v: number)=>ITransformationContext;
	skewYTurn: (v: number)=>ITransformationContext;
	skewYRad: (v: number)=>ITransformationContext;
	skewYGrad: (v: number)=>ITransformationContext;
	
	perspective: (v: NumericLength)=>ITransformationContext;
	perspectiveCm: (v: number)=>ITransformationContext;
	perspectiveCh: (v: number)=>ITransformationContext;
	perspectiveEm: (v: number)=>ITransformationContext;
	perspectiveEx: (v: number)=>ITransformationContext;
	perspectiveIn: (v: number)=>ITransformationContext;
	perspectiveMm: (v: number)=>ITransformationContext;
	perspectiveP: (v: number)=>ITransformationContext;
	perspectivePc: (v: number)=>ITransformationContext;
	perspectivePt: (v: number)=>ITransformationContext;
	perspectivePx: (v: number)=>ITransformationContext;
	perspectiveRem: (v: number)=>ITransformationContext;
	perspectiveVh: (v: number)=>ITransformationContext;
	perspectiveVw: (v: number)=>ITransformationContext;
	perspectiveVMax: (v: number)=>ITransformationContext;
	perspectiveVMin: (v: number)=>ITransformationContext;
}

export interface FilterBuilder{
	(filtCtx: IFilterContext): IFilterContext|string;
}

type IFilterContext = {
	// url(commonfilters.svg#filter); // Don't know how this works yet.
	blur(v: NumericLength): IFilterContext;
	brightness(v: Percentage): IFilterContext;
	contrast(v: Percentage): IFilterContext;
	dropShadow(x: NumericLength, y: NumericLength, blur: NumericLength, color: Color): IFilterContext;
	grayscale(v: Percentage): IFilterContext;
	hueRotate(v: AngleUnits): IFilterContext;
	invert(v: Percentage): IFilterContext;
	opacity(v: Percentage): IFilterContext;
	sepia(v: Percentage): IFilterContext;
	saturate(v: Percentage): IFilterContext;
	// url(filters.svg#filter) blur(4px) saturate(150%); // example.
}

// AT RULE BUILDERS

interface IColorProfileBuilder{
	src: (value: Url)=>IColorProfileBuilder;
	renderingIntent(value: "relative-colorimetric"|"absolute-colorimetric"|"perceptual"|"saturation");
}

type SystemValue = "cyclic"|"numeric"|"alphabetic"|"symbolic"|"additive"|"fixed"|"extends";
interface ICounterStyleBuilder{

    system(value: "fixed", arg: number): ICounterStyleBuilder;
    system(value: "extends", arg: string): ICounterStyleBuilder;
    system(value: Exclude<SystemValue, "fixed" | "extends">): ICounterStyleBuilder;

	symbols: (value: string)=> ICounterStyleBuilder; // TODO
	additiveSymbols: (value: string)=> ICounterStyleBuilder; // TODO
	negative: (value: string)=> ICounterStyleBuilder; // TODO
	prefix: (value: string)=> ICounterStyleBuilder; // TOOD
	suffix: (value: string)=> ICounterStyleBuilder; // TODO
	range: (value: string)=> ICounterStyleBuilder; // TODO
	pad: (value: string)=> ICounterStyleBuilder; // TODO
	speakAs: (value: string)=> ICounterStyleBuilder; // TODO
}