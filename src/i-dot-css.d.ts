import {IReactive} from "./i-reactive";


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
type NumericLength = number|`${number}${AllLengthUnits}`;
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
// type NamedColor = "aliceblue"|"antiquewhite"|"aqua"|"aquamarine"|"azure"|"beige"|"bisque"|"black"|"blanchedalmond"|"blue"|"blueviolet"|"brown"|"burlywood"|"cadetblue"|"chartreuse"|"chocolate"|"coral"|"cornflowerblue"|"cornsilk"|"crimson"|"cyan"|"darkblue"|"darkcyan"|"darkgoldenrod"|"darkgray"|"darkgrey"|"darkgreen"|"darkkhaki"|"darkmagenta"|"darkolivegreen"|"darkorange"|"darkorchid"|"darkred"|"darksalmon"|"darkseagreen"|"darkslateblue"|"darkslategray"|"darkslategrey"|"darkturquoise"|"darkviolet"|"deeppink"|"deepskyblue"|"dimgray"|"dimgrey"|"dodgerblue"|"firebrick"|"floralwhite"|"forestgreen"|"fuchsia"|"gainsboro"|"ghostwhite"|"gold"|"goldenrod"|"gray"|"grey"|"green"|"greenyellow"|"honeydew"|"hotpink"|"indianred"|"indigo"|"ivory"|"khaki"|"lavender"|"lavenderblush"|"lawngreen"|"lemonchiffon"|"lightblue"|"lightcoral"|"lightcyan"|"lightgoldenrodyellow"|"lightgray"|"lightgrey"|"lightgreen"|"lightpink"|"lightsalmon"|"lightseagreen"|"lightskyblue"|"lightslategray"|"lightslategrey"|"lightsteelblue"|"lightyellow"|"lime"|"limegreen"|"linen"|"magenta"|"maroon"|"mediumaquamarine"|"mediumblue"|"mediumorchid"|"mediumpurple"|"mediumseagreen"|"mediumslateblue"|"mediumspringgreen"|"mediumturquoise"|"mediumvioletred"|"midnightblue"|"mintcream"|"mistyrose"|"moccasin"|"navajowhite"|"navy"|"oldlace"|"olive"|"olivedrab"|"orange"|"orangered"|"orchid"|"palegoldenrod"|"palegreen"|"paleturquoise"|"palevioletred"|"papayawhip"|"peachpuff"|"peru"|"pink"|"plum"|"powderblue"|"purple"|"rebeccapurple"|"red"|"rosybrown"|"royalblue"|"saddlebrown"|"salmon"|"sandybrown"|"seagreen"|"seashell"|"sienna"|"silver"|"skyblue"|"slateblue"|"slategray"|"slategrey"|"snow"|"springgreen"|"steelblue"|"tan"|"teal"|"thistle"|"tomato"|"turquoise"|"violet"|"wheat"|"white"|"whitesmoke"|"yellow"|"yellowgreen";
// type SystemColor = "AccentColor"|"AccentColorText"|"ActiveText"|"ButtonBorder"|"ButtonFace"|"ButtonText"|"Canvas"|"CanvasText"|"Field"|"FieldText"|"GrayText"|"Highlight"|"HighlightText"|"LinkText"|"Mark"|"MarkText"|"SelectedItem"|"SelectedItemText"|"VisitedText";
// type Hue = number|Angle;
// type PredefinedRgb = "srgb"|"srgb-linear"|"display-p3"|"a98-rgb"|"prophoto-rgb"|"rec2020";
// type XyzSpace = "xyz"|"xyz-d50"|"xyz-d65";
// type XyzParams = `${XyzSpace} ${number|Percentage|"none"} ${number|Percentage|"none"} ${number|Percentage|"none"}`
// type PredefinedRgbParams = `${PredefinedRgb} ${number|Percentage|"none"} ${number|Percentage|"none"} ${number|Percentage|"none"}`
// type ColorspaceParams = PredefinedRgbParams|XyzParams;

// type LRgba<T extends number|AlphaValue> = `rgb(${T}, ${T}, ${T})` | `rgba(${T}, ${T}, ${T}, ${AlphaValue})`;
// type MRgba = `rgb(${number|Percentage|"none"} ${number|Percentage|"none"} ${number|Percentage|"none"})` | `rgba(${number|Percentage|"none"} ${number|Percentage|"none"} ${number|Percentage|"none"} / ${AlphaValue})`;
// type Rgba = LRgba<number|AlphaValue>|MRgba;
// type LHsla = `hsl(${Hue}, ${Percentage}, ${Percentage})` | `hsla(${Hue}, ${Percentage}, ${Percentage}, ${AlphaValue})`;
// type MHsla = `hsl(${Hue|"none"} ${Percentage|number|"none"} ${Percentage|number|"none"})` | `hsla(${Hue|"none"} ${Percentage|number|"none"} ${Percentage|number|"none"} / ${AlphaValue|"none"})`;
// type Hsla = LHsla|MHsla;
// type Hwb = `hwb(${Hue|"none"} ${Percentage|number|"none"} ${Percentage|number|"none"})` | `hwb(${Hue|"none"} ${Percentage|number|"none"} ${Percentage|number|"none"} / ${AlphaValue|"none"})`;
// type Lab = `${"lab"|"oklab"}(${number|Percentage|"none"} ${number|Percentage|"none"} ${number|Percentage|"none"})` | `${"lab"|"oklab"}(${number|Percentage|"none"} ${number|Percentage|"none"} ${number|Percentage|"none"} / ${AlphaValue|"none"})`;
// type Lch = `${"lch"|"oklch"}(${number|Percentage|"none"} ${number|Percentage|"none"} ${Hue|"none"})` | `${"lch"|"oklch"}(${number|Percentage|"none"} ${number|Percentage|"none"} ${Hue|"none"} / ${AlphaValue|"none"})`;
// type ColorFunc = `color(${ColorspaceParams})`| `color(${ColorspaceParams} / ${AlphaValue|"none"})`;
// type AbsoluteColorFunction = Rgba|Hsla|Hwb|Lab|Lch|ColorFunc;

// type AbsoluteColorBase = HexColor|AbsoluteColorFunction|NamedColor|"transparent";
// type Color = AbsoluteColorBase|SystemColor|"currentcolor";
// type SimpleColor = HexColor|`${"rgb"|"rgba"|"hsl"|"hsla"|"hwb"|"lab"|"lch"|"oklab"|"oklch"|"color"}(${ComplexType})`|NamedColor|SystemColor|"currentcolor";

type Color = string;

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

	// SPECIAL FUNCITONS COMMENTED OUT IN v6!
	// angleToDeg(a: number|string);
	// matrixMultiply3D(a: Array<number>, b: Array<number>): Array<number>;
	// lengthToPx(l: string|number, prop?: LengthProp, element?: Element);
	// angleSubtract(a, b);
	// url(url: string);
	// rgb(r: number, g: number, b: number);
	// rgba(r: number, g: number, b: number, a: number);
	// buildTransform();
	// scopeToEl(el: HTMLElement);
	// cacheScopedStaticStyles(el: HTMLElement);
	// clearDynamicStyles(el: HTMLElement);
	// unscope();
	// formatNumberValue(value: number, unit?: string);
	// hide(params?: HideParams);
	// show(params?: ShowParams);
	// fadeOut(duration: number, complete: Function);
	// fadeIn(duration: number, complete: Function);
	// END SPECIAL FUNCTIONS!

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
	color?: IReactive<string>|Color;
	backgroundColor?: IReactive<string>|Color;
	borderBottomColor?: IReactive<string>|Color;
	borderColor?: IReactive<string>|Color;
	borderLeftColor?: IReactive<string>|Color;
	borderRightColor?: IReactive<string>|Color;
	borderTopColor?: IReactive<string>|Color;
	textDecorationColor?: IReactive<string>|Color;
	outlineColor?: IReactive<string>|Color;
	columnRuleColor?: IReactive<string>|Color;

	//length:(value: 
	backgroundSize?: IReactive<string>|BackgroundSizeValues;
	backgr2undSizeCm?: IReactive<number>|number;
	backgr2undSizeCh?: IReactive<number>|number;
	backgr2undSizeEm?: IReactive<number>|number;
	backgr2undSizeEx?: IReactive<number>|number;
	backgr2undSizeIn?: IReactive<number>|number;
	backgr2undSizeMm?: IReactive<number>|number;
	backgr2undSizeP?: IReactive<number>|number;
	backgr2undSizePc?: IReactive<number>|number;
	backgr2undSizePt?: IReactive<number>|number;
	backgr2undSizePx?: IReactive<number>|number;
	backgr2undSizeRem?: IReactive<number>|number;
	backgr2undSizeVh?: IReactive<number>|number;
	backgr2undSizeVw?: IReactive<number>|number;
	backgr2undSizeVMax?: IReactive<number>|number;
	backgr2undSizeVMin?: IReactive<number>|number;

	blockSize?: IReactive<NumericLength>|NumericLength;
	blockSizeCm?: IReactive<number>|number;
	blockSizeCh?: IReactive<number>|number;
	blockSizeEm?: IReactive<number>|number;
	blockSizeEx?: IReactive<number>|number;
	blockSizeIn?: IReactive<number>|number;
	blockSizeMm?: IReactive<number>|number;
	blockSizeP?: IReactive<number>|number;
	blockSizePc?: IReactive<number>|number;
	blockSizePt?: IReactive<number>|number;
	blockSizePx?: IReactive<number>|number;
	blockSizeRem?: IReactive<number>|number;
	blockSizeVh?: IReactive<number>|number;
	blockSizeVw?: IReactive<number>|number;
	blockSizeVMax?: IReactive<number>|number;
	blockSizeVMin?: IReactive<number>|number;

	borderBottomLeftRadius?: IReactive<NumericLength>|NumericLength;
	borderBottomLeftRadiusCm?: IReactive<number>|number;
	borderBottomLeftRadiusCh?: IReactive<number>|number;
	borderBottomLeftRadiusEm?: IReactive<number>|number;
	borderBottomLeftRadiusEx?: IReactive<number>|number;
	borderBottomLeftRadiusIn?: IReactive<number>|number;
	borderBottomLeftRadiusMm?: IReactive<number>|number;
	borderBottomLeftRadiusP?: IReactive<number>|number;
	borderBottomLeftRadiusPc?: IReactive<number>|number;
	borderBottomLeftRadiusPt?: IReactive<number>|number;
	borderBottomLeftRadiusPx?: IReactive<number>|number;
	borderBottomLeftRadiusRem?: IReactive<number>|number;
	borderBottomLeftRadiusVh?: IReactive<number>|number;
	borderBottomLeftRadiusVw?: IReactive<number>|number;
	borderBottomLeftRadiusVMax?: IReactive<number>|number;
	borderBottomLeftRadiusVMin?: IReactive<number>|number;

	borderBottomRightRadius?: IReactive<NumericLength>|NumericLength;
	borderBottomRightRadiusCm?: IReactive<number>|number;
	borderBottomRightRadiusCh?: IReactive<number>|number;
	borderBottomRightRadiusEm?: IReactive<number>|number;
	borderBottomRightRadiusEx?: IReactive<number>|number;
	borderBottomRightRadiusIn?: IReactive<number>|number;
	borderBottomRightRadiusMm?: IReactive<number>|number;
	borderBottomRightRadiusP?: IReactive<number>|number;
	borderBottomRightRadiusPc?: IReactive<number>|number;
	borderBottomRightRadiusPt?: IReactive<number>|number;
	borderBottomRightRadiusPx?: IReactive<number>|number;
	borderBottomRightRadiusRem?: IReactive<number>|number;
	borderBottomRightRadiusVh?: IReactive<number>|number;
	borderBottomRightRadiusVw?: IReactive<number>|number;
	borderBottomRightRadiusVMax?: IReactive<number>|number;
	borderBottomRightRadiusVMin?: IReactive<number>|number;

	borderBottomWidth?: IReactive<NumericLength>|NumericLength;
	borderBottomWidthCm?: IReactive<number>|number;
	borderBottomWidthCh?: IReactive<number>|number;
	borderBottomWidthEm?: IReactive<number>|number;
	borderBottomWidthEx?: IReactive<number>|number;
	borderBottomWidthIn?: IReactive<number>|number;
	borderBottomWidthMm?: IReactive<number>|number;
	borderBottomWidthP?: IReactive<number>|number;
	borderBottomWidthPc?: IReactive<number>|number;
	borderBottomWidthPt?: IReactive<number>|number;
	borderBottomWidthPx?: IReactive<number>|number;
	borderBottomWidthRem?: IReactive<number>|number;
	borderBottomWidthVh?: IReactive<number>|number;
	borderBottomWidthVw?: IReactive<number>|number;
	borderBottomWidthVMax?: IReactive<number>|number;
	borderBottomWidthVMin?: IReactive<number>|number;

	borderImageWidth?: IReactive<NumericLength>|NumericLength;
	borderImageWidthCm?: IReactive<number>|number;
	borderImageWidthCh?: IReactive<number>|number;
	borderImageWidthEm?: IReactive<number>|number;
	borderImageWidthEx?: IReactive<number>|number;
	borderImageWidthIn?: IReactive<number>|number;
	borderImageWidthMm?: IReactive<number>|number;
	borderImageWidthP?: IReactive<number>|number;
	borderImageWidthPc?: IReactive<number>|number;
	borderImageWidthPt?: IReactive<number>|number;
	borderImageWidthPx?: IReactive<number>|number;
	borderImageWidthRem?: IReactive<number>|number;
	borderImageWidthVh?: IReactive<number>|number;
	borderImageWidthVw?: IReactive<number>|number;
	borderImageWidthVMax?: IReactive<number>|number;
	borderImageWidthVMin?: IReactive<number>|number;

	borderLeftWidth?: IReactive<NumericLength>|NumericLength;
	borderLeftWidthCm?: IReactive<number>|number;
	borderLeftWidthCh?: IReactive<number>|number;
	borderLeftWidthEm?: IReactive<number>|number;
	borderLeftWidthEx?: IReactive<number>|number;
	borderLeftWidthIn?: IReactive<number>|number;
	borderLeftWidthMm?: IReactive<number>|number;
	borderLeftWidthP?: IReactive<number>|number;
	borderLeftWidthPc?: IReactive<number>|number;
	borderLeftWidthPt?: IReactive<number>|number;
	borderLeftWidthPx?: IReactive<number>|number;
	borderLeftWidthRem?: IReactive<number>|number;
	borderLeftWidthVh?: IReactive<number>|number;
	borderLeftWidthVw?: IReactive<number>|number;
	borderLeftWidthVMax?: IReactive<number>|number;
	borderLeftWidthVMin?: IReactive<number>|number;

	borderRadius?: IReactive<NumericLength>|NumericLength;
	borderRadiusCm?: IReactive<number>|number;
	borderRadiusCh?: IReactive<number>|number;
	borderRadiusEm?: IReactive<number>|number;
	borderRadiusEx?: IReactive<number>|number;
	borderRadiusIn?: IReactive<number>|number;
	borderRadiusMm?: IReactive<number>|number;
	borderRadiusP?: IReactive<number>|number;
	borderRadiusPc?: IReactive<number>|number;
	borderRadiusPt?: IReactive<number>|number;
	borderRadiusPx?: IReactive<number>|number;
	borderRadiusRem?: IReactive<number>|number;
	borderRadiusVh?: IReactive<number>|number;
	borderRadiusVw?: IReactive<number>|number;
	borderRadiusVMax?: IReactive<number>|number;
	borderRadiusVMin?: IReactive<number>|number;

	borderRightWidth?: IReactive<NumericLength>|NumericLength;
	borderRightWidthCm?: IReactive<number>|number;
	borderRightWidthCh?: IReactive<number>|number;
	borderRightWidthEm?: IReactive<number>|number;
	borderRightWidthEx?: IReactive<number>|number;
	borderRightWidthIn?: IReactive<number>|number;
	borderRightWidthMm?: IReactive<number>|number;
	borderRightWidthP?: IReactive<number>|number;
	borderRightWidthPc?: IReactive<number>|number;
	borderRightWidthPt?: IReactive<number>|number;
	borderRightWidthPx?: IReactive<number>|number;
	borderRightWidthRem?: IReactive<number>|number;
	borderRightWidthVh?: IReactive<number>|number;
	borderRightWidthVw?: IReactive<number>|number;
	borderRightWidthVMax?: IReactive<number>|number;
	borderRightWidthVMin?: IReactive<number>|number;

	borderTopLeftRadius?: IReactive<NumericLength>|NumericLength;
	borderTopLeftRadiusCm?: IReactive<number>|number;
	borderTopLeftRadiusCh?: IReactive<number>|number;
	borderTopLeftRadiusEm?: IReactive<number>|number;
	borderTopLeftRadiusEx?: IReactive<number>|number;
	borderTopLeftRadiusIn?: IReactive<number>|number;
	borderTopLeftRadiusMm?: IReactive<number>|number;
	borderTopLeftRadiusP?: IReactive<number>|number;
	borderTopLeftRadiusPc?: IReactive<number>|number;
	borderTopLeftRadiusPt?: IReactive<number>|number;
	borderTopLeftRadiusPx?: IReactive<number>|number;
	borderTopLeftRadiusRem?: IReactive<number>|number;
	borderTopLeftRadiusVh?: IReactive<number>|number;
	borderTopLeftRadiusVw?: IReactive<number>|number;
	borderTopLeftRadiusVMax?: IReactive<number>|number;
	borderTopLeftRadiusVMin?: IReactive<number>|number;

	borderTopRightRadius?: IReactive<NumericLength>|NumericLength;
	borderTopRightRadiusCm?: IReactive<number>|number;
	borderTopRightRadiusCh?: IReactive<number>|number;
	borderTopRightRadiusEm?: IReactive<number>|number;
	borderTopRightRadiusEx?: IReactive<number>|number;
	borderTopRightRadiusIn?: IReactive<number>|number;
	borderTopRightRadiusMm?: IReactive<number>|number;
	borderTopRightRadiusP?: IReactive<number>|number;
	borderTopRightRadiusPc?: IReactive<number>|number;
	borderTopRightRadiusPt?: IReactive<number>|number;
	borderTopRightRadiusPx?: IReactive<number>|number;
	borderTopRightRadiusRem?: IReactive<number>|number;
	borderTopRightRadiusVh?: IReactive<number>|number;
	borderTopRightRadiusVw?: IReactive<number>|number;
	borderTopRightRadiusVMax?: IReactive<number>|number;
	borderTopRightRadiusVMin?: IReactive<number>|number;

	borderTopWidth?: IReactive<NumericLength>|NumericLength;
	borderTopWidthCm?: IReactive<number>|number;
	borderTopWidthCh?: IReactive<number>|number;
	borderTopWidthEm?: IReactive<number>|number;
	borderTopWidthEx?: IReactive<number>|number;
	borderTopWidthIn?: IReactive<number>|number;
	borderTopWidthMm?: IReactive<number>|number;
	borderTopWidthP?: IReactive<number>|number;
	borderTopWidthPc?: IReactive<number>|number;
	borderTopWidthPt?: IReactive<number>|number;
	borderTopWidthPx?: IReactive<number>|number;
	borderTopWidthRem?: IReactive<number>|number;
	borderTopWidthVh?: IReactive<number>|number;
	borderTopWidthVw?: IReactive<number>|number;
	borderTopWidthVMax?: IReactive<number>|number;
	borderTopWidthVMin?: IReactive<number>|number;

	borderWidth?: IReactive<NumericLength>|NumericLength;
	borderWidthCm?: IReactive<number>|number;
	borderWidthCh?: IReactive<number>|number;
	borderWidthEm?: IReactive<number>|number;
	borderWidthEx?: IReactive<number>|number;
	borderWidthIn?: IReactive<number>|number;
	borderWidthMm?: IReactive<number>|number;
	borderWidthP?: IReactive<number>|number;
	borderWidthPc?: IReactive<number>|number;
	borderWidthPt?: IReactive<number>|number;
	borderWidthPx?: IReactive<number>|number;
	borderWidthRem?: IReactive<number>|number;
	borderWidthVh?: IReactive<number>|number;
	borderWidthVw?: IReactive<number>|number;
	borderWidthVMax?: IReactive<number>|number;
	borderWidthVMin?: IReactive<number>|number;

	bottom?: IReactive<NumericLength>|NumericLengthOrAuto;
	bottomCm?: IReactive<number>|number;
	bottomCh?: IReactive<number>|number;
	bottomEm?: IReactive<number>|number;
	bottomEx?: IReactive<number>|number;
	bottomIn?: IReactive<number>|number;
	bottomMm?: IReactive<number>|number;
	bottomP?: IReactive<number>|number;
	bottomPc?: IReactive<number>|number;
	bottomPt?: IReactive<number>|number;
	bottomPx?: IReactive<number>|number;
	bottomRem?: IReactive<number>|number;
	bottomVh?: IReactive<number>|number;
	bottomVw?: IReactive<number>|number;
	bottomVMax?: IReactive<number>|number;
	bottomVMin?: IReactive<number>|number;

	gap?: IReactive<NumericLength>|NumericLength;
	gapCm?: IReactive<number>|number;
	gapCh?: IReactive<number>|number;
	gapEm?: IReactive<number>|number;
	gapEx?: IReactive<number>|number;
	gapIn?: IReactive<number>|number;
	gapMm?: IReactive<number>|number;
	gapP?: IReactive<number>|number;
	gapPc?: IReactive<number>|number;
	gapPt?: IReactive<number>|number;
	gapPx?: IReactive<number>|number;
	gapRem?: IReactive<number>|number;
	gapVh?: IReactive<number>|number;
	gapVw?: IReactive<number>|number;
	gapVMax?: IReactive<number>|number;
	gapVMin?: IReactive<number>|number;

	height?: IReactive<NumericLength>|NumericLengthOrAuto;
	heightCm?: IReactive<number>|number;
	heightCh?: IReactive<number>|number;
	heightEm?: IReactive<number>|number;
	heightEx?: IReactive<number>|number;
	heightIn?: IReactive<number>|number;
	heightMm?: IReactive<number>|number;
	heightP?: IReactive<number>|number;
	heightPc?: IReactive<number>|number;
	heightPt?: IReactive<number>|number;
	heightPx?: IReactive<number>|number;
	heightRem?: IReactive<number>|number;
	heightVh?: IReactive<number>|number;
	heightVw?: IReactive<number>|number;
	heightVMax?: IReactive<number>|number;
	heightVMin?: IReactive<number>|number;

	left?: IReactive<NumericLength>|NumericLengthOrAuto;
	leftCm?: IReactive<number>|number;
	leftCh?: IReactive<number>|number;
	leftEm?: IReactive<number>|number;
	leftEx?: IReactive<number>|number;
	leftIn?: IReactive<number>|number;
	leftMm?: IReactive<number>|number;
	leftP?: IReactive<number>|number;
	leftPc?: IReactive<number>|number;
	leftPt?: IReactive<number>|number;
	leftPx?: IReactive<number>|number;
	leftRem?: IReactive<number>|number;
	leftVh?: IReactive<number>|number;
	leftVw?: IReactive<number>|number;
	leftVMax?: IReactive<number>|number;
	leftVMin?: IReactive<number>|number;

	margin?: IReactive<NumericLength>|NumericLengthOrAuto;
	marginCm?: IReactive<number>|number;
	marginCh?: IReactive<number>|number;
	marginEm?: IReactive<number>|number;
	marginEx?: IReactive<number>|number;
	marginIn?: IReactive<number>|number;
	marginMm?: IReactive<number>|number;
	marginP?: IReactive<number>|number;
	marginPc?: IReactive<number>|number;
	marginPt?: IReactive<number>|number;
	marginPx?: IReactive<number>|number;
	marginRem?: IReactive<number>|number;
	marginVh?: IReactive<number>|number;
	marginVw?: IReactive<number>|number;
	marginVMax?: IReactive<number>|number;
	marginVMin?: IReactive<number>|number;

	marginBottom?: IReactive<NumericLength>|NumericLengthOrAuto;
	marginBottomCm?: IReactive<number>|number;
	marginBottomCh?: IReactive<number>|number;
	marginBottomEm?: IReactive<number>|number;
	marginBottomEx?: IReactive<number>|number;
	marginBottomIn?: IReactive<number>|number;
	marginBottomMm?: IReactive<number>|number;
	marginBottomP?: IReactive<number>|number;
	marginBottomPc?: IReactive<number>|number;
	marginBottomPt?: IReactive<number>|number;
	marginBottomPx?: IReactive<number>|number;
	marginBottomRem?: IReactive<number>|number;
	marginBottomVh?: IReactive<number>|number;
	marginBottomVw?: IReactive<number>|number;
	marginBottomVMax?: IReactive<number>|number;
	marginBottomVMin?: IReactive<number>|number;

	marginLeft?: IReactive<NumericLength>|NumericLengthOrAuto;
	marginLeftCm?: IReactive<number>|number;
	marginLeftCh?: IReactive<number>|number;
	marginLeftEm?: IReactive<number>|number;
	marginLeftEx?: IReactive<number>|number;
	marginLeftIn?: IReactive<number>|number;
	marginLeftMm?: IReactive<number>|number;
	marginLeftP?: IReactive<number>|number;
	marginLeftPc?: IReactive<number>|number;
	marginLeftPt?: IReactive<number>|number;
	marginLeftPx?: IReactive<number>|number;
	marginLeftRem?: IReactive<number>|number;
	marginLeftVh?: IReactive<number>|number;
	marginLeftVw?: IReactive<number>|number;
	marginLeftVMax?: IReactive<number>|number;
	marginLeftVMin?: IReactive<number>|number;

	marginRight?: IReactive<NumericLength>|NumericLengthOrAuto;
	marginRightCm?: IReactive<number>|number;
	marginRightCh?: IReactive<number>|number;
	marginRightEm?: IReactive<number>|number;
	marginRightEx?: IReactive<number>|number;
	marginRightIn?: IReactive<number>|number;
	marginRightMm?: IReactive<number>|number;
	marginRightP?: IReactive<number>|number;
	marginRightPc?: IReactive<number>|number;
	marginRightPt?: IReactive<number>|number;
	marginRightPx?: IReactive<number>|number;
	marginRightRem?: IReactive<number>|number;
	marginRightVh?: IReactive<number>|number;
	marginRightVw?: IReactive<number>|number;
	marginRightVMax?: IReactive<number>|number;
	marginRightVMin?: IReactive<number>|number;

	marginTop?: IReactive<NumericLength>|NumericLengthOrAuto;
	marginTopCm?: IReactive<number>|number;
	marginTopCh?: IReactive<number>|number;
	marginTopEm?: IReactive<number>|number;
	marginTopEx?: IReactive<number>|number;
	marginTopIn?: IReactive<number>|number;
	marginTopMm?: IReactive<number>|number;
	marginTopP?: IReactive<number>|number;
	marginTopPc?: IReactive<number>|number;
	marginTopPt?: IReactive<number>|number;
	marginTopPx?: IReactive<number>|number;
	marginTopRem?: IReactive<number>|number;
	marginTopVh?: IReactive<number>|number;
	marginTopVw?: IReactive<number>|number;
	marginTopVMax?: IReactive<number>|number;
	marginTopVMin?: IReactive<number>|number;

	maxHeight?: IReactive<NumericLength>|NumericLengthOrAuto;
	maxHeightCm?: IReactive<number>|number;
	maxHeightCh?: IReactive<number>|number;
	maxHeightEm?: IReactive<number>|number;
	maxHeightEx?: IReactive<number>|number;
	maxHeightIn?: IReactive<number>|number;
	maxHeightMm?: IReactive<number>|number;
	maxHeightP?: IReactive<number>|number;
	maxHeightPc?: IReactive<number>|number;
	maxHeightPt?: IReactive<number>|number;
	maxHeightPx?: IReactive<number>|number;
	maxHeightRem?: IReactive<number>|number;
	maxHeightVh?: IReactive<number>|number;
	maxHeightVw?: IReactive<number>|number;
	maxHeightVMax?: IReactive<number>|number;
	maxHeightVMin?: IReactive<number>|number;

	maxWidth?: IReactive<NumericLength>|NumericLengthOrAuto;
	maxWidthCm?: IReactive<number>|number;
	maxWidthCh?: IReactive<number>|number;
	maxWidthEm?: IReactive<number>|number;
	maxWidthEx?: IReactive<number>|number;
	maxWidthIn?: IReactive<number>|number;
	maxWidthMm?: IReactive<number>|number;
	maxWidthP?: IReactive<number>|number;
	maxWidthPc?: IReactive<number>|number;
	maxWidthPt?: IReactive<number>|number;
	maxWidthPx?: IReactive<number>|number;
	maxWidthRem?: IReactive<number>|number;
	maxWidthVh?: IReactive<number>|number;
	maxWidthVw?: IReactive<number>|number;
	maxWidthVMax?: IReactive<number>|number;
	maxWidthVMin?: IReactive<number>|number;

	minHeight?: IReactive<NumericLength>|NumericLengthOrAuto;
	minHeightCm?: IReactive<number>|number;
	minHeightCh?: IReactive<number>|number;
	minHeightEm?: IReactive<number>|number;
	minHeightEx?: IReactive<number>|number;
	minHeightIn?: IReactive<number>|number;
	minHeightMm?: IReactive<number>|number;
	minHeightP?: IReactive<number>|number;
	minHeightPc?: IReactive<number>|number;
	minHeightPt?: IReactive<number>|number;
	minHeightPx?: IReactive<number>|number;
	minHeightRem?: IReactive<number>|number;
	minHeightVh?: IReactive<number>|number;
	minHeightVw?: IReactive<number>|number;
	minHeightVMax?: IReactive<number>|number;
	minHeightVMin?: IReactive<number>|number;

	minWidth?: IReactive<NumericLength>|NumericLengthOrAuto;
	minWidthCm?: IReactive<number>|number;
	minWidthCh?: IReactive<number>|number;
	minWidthEm?: IReactive<number>|number;
	minWidthEx?: IReactive<number>|number;
	minWidthIn?: IReactive<number>|number;
	minWidthMm?: IReactive<number>|number;
	minWidthP?: IReactive<number>|number;
	minWidthPc?: IReactive<number>|number;
	minWidthPt?: IReactive<number>|number;
	minWidthPx?: IReactive<number>|number;
	minWidthRem?: IReactive<number>|number;
	minWidthVh?: IReactive<number>|number;
	minWidthVw?: IReactive<number>|number;
	minWidthVMax?: IReactive<number>|number;
	minWidthVMin?: IReactive<number>|number;

	outlineOffset?: IReactive<NumericLength>|NumericLength;
	outlineOffsetCm?: IReactive<number>|number;
	outlineOffsetCh?: IReactive<number>|number;
	outlineOffsetEm?: IReactive<number>|number;
	outlineOffsetEx?: IReactive<number>|number;
	outlineOffsetIn?: IReactive<number>|number;
	outlineOffsetMm?: IReactive<number>|number;
	outlineOffsetP?: IReactive<number>|number;
	outlineOffsetPc?: IReactive<number>|number;
	outlineOffsetPt?: IReactive<number>|number;
	outlineOffsetPx?: IReactive<number>|number;
	outlineOffsetRem?: IReactive<number>|number;
	outlineOffsetVh?: IReactive<number>|number;
	outlineOffsetVw?: IReactive<number>|number;
	outlineOffsetVMax?: IReactive<number>|number;
	outlineOffsetVMin?: IReactive<number>|number;

	padding?: IReactive<NumericLength>|NumericLengthOrAuto;
	paddingCm?: IReactive<number>|number;
	paddingCh?: IReactive<number>|number;
	paddingEm?: IReactive<number>|number;
	paddingEx?: IReactive<number>|number;
	paddingIn?: IReactive<number>|number;
	paddingMm?: IReactive<number>|number;
	paddingP?: IReactive<number>|number;
	paddingPc?: IReactive<number>|number;
	paddingPt?: IReactive<number>|number;
	paddingPx?: IReactive<number>|number;
	paddingRem?: IReactive<number>|number;
	paddingVh?: IReactive<number>|number;
	paddingVw?: IReactive<number>|number;
	paddingVMax?: IReactive<number>|number;
	paddingVMin?: IReactive<number>|number;

	paddingBottom?: IReactive<NumericLength>|NumericLengthOrAuto;
	paddingBottomCm?: IReactive<number>|number;
	paddingBottomCh?: IReactive<number>|number;
	paddingBottomEm?: IReactive<number>|number;
	paddingBottomEx?: IReactive<number>|number;
	paddingBottomIn?: IReactive<number>|number;
	paddingBottomMm?: IReactive<number>|number;
	paddingBottomP?: IReactive<number>|number;
	paddingBottomPc?: IReactive<number>|number;
	paddingBottomPt?: IReactive<number>|number;
	paddingBottomPx?: IReactive<number>|number;
	paddingBottomRem?: IReactive<number>|number;
	paddingBottomVh?: IReactive<number>|number;
	paddingBottomVw?: IReactive<number>|number;
	paddingBottomVMax?: IReactive<number>|number;
	paddingBottomVMin?: IReactive<number>|number;

	paddingLeft?: IReactive<NumericLength>|NumericLengthOrAuto;
	paddingLeftCm?: IReactive<number>|number;
	paddingLeftCh?: IReactive<number>|number;
	paddingLeftEm?: IReactive<number>|number;
	paddingLeftEx?: IReactive<number>|number;
	paddingLeftIn?: IReactive<number>|number;
	paddingLeftMm?: IReactive<number>|number;
	paddingLeftP?: IReactive<number>|number;
	paddingLeftPc?: IReactive<number>|number;
	paddingLeftPt?: IReactive<number>|number;
	paddingLeftPx?: IReactive<number>|number;
	paddingLeftRem?: IReactive<number>|number;
	paddingLeftVh?: IReactive<number>|number;
	paddingLeftVw?: IReactive<number>|number;
	paddingLeftVMax?: IReactive<number>|number;
	paddingLeftVMin?: IReactive<number>|number;

	paddingRight?: IReactive<NumericLength>|NumericLengthOrAuto;
	paddingRightCm?: IReactive<number>|number;
	paddingRightCh?: IReactive<number>|number;
	paddingRightEm?: IReactive<number>|number;
	paddingRightEx?: IReactive<number>|number;
	paddingRightIn?: IReactive<number>|number;
	paddingRightMm?: IReactive<number>|number;
	paddingRightP?: IReactive<number>|number;
	paddingRightPc?: IReactive<number>|number;
	paddingRightPt?: IReactive<number>|number;
	paddingRightPx?: IReactive<number>|number;
	paddingRightRem?: IReactive<number>|number;
	paddingRightVh?: IReactive<number>|number;
	paddingRightVw?: IReactive<number>|number;
	paddingRightVMax?: IReactive<number>|number;
	paddingRightVMin?: IReactive<number>|number;

	paddingTop?: IReactive<NumericLength>|NumericLengthOrAuto;
	paddingTopCm?: IReactive<number>|number;
	paddingTopCh?: IReactive<number>|number;
	paddingTopEm?: IReactive<number>|number;
	paddingTopEx?: IReactive<number>|number;
	paddingTopIn?: IReactive<number>|number;
	paddingTopMm?: IReactive<number>|number;
	paddingTopP?: IReactive<number>|number;
	paddingTopPc?: IReactive<number>|number;
	paddingTopPt?: IReactive<number>|number;
	paddingTopPx?: IReactive<number>|number;
	paddingTopRem?: IReactive<number>|number;
	paddingTopVh?: IReactive<number>|number;
	paddingTopVw?: IReactive<number>|number;
	paddingTopVMax?: IReactive<number>|number;
	paddingTopVMin?: IReactive<number>|number;

	right?: IReactive<NumericLength>|NumericLengthOrAuto;
	rightCm?: IReactive<number>|number;
	rightCh?: IReactive<number>|number;
	rightEm?: IReactive<number>|number;
	rightEx?: IReactive<number>|number;
	rightIn?: IReactive<number>|number;
	rightMm?: IReactive<number>|number;
	rightP?: IReactive<number>|number;
	rightPc?: IReactive<number>|number;
	rightPt?: IReactive<number>|number;
	rightPx?: IReactive<number>|number;
	rightRem?: IReactive<number>|number;
	rightVh?: IReactive<number>|number;
	rightVw?: IReactive<number>|number;
	rightVMax?: IReactive<number>|number;
	rightVMin?: IReactive<number>|number;

	textIndent?: IReactive<NumericLength>|NumericLengthOrAuto;
	textIndentCm?: IReactive<number>|number;
	textIndentCh?: IReactive<number>|number;
	textIndentEm?: IReactive<number>|number;
	textIndentEx?: IReactive<number>|number;
	textIndentIn?: IReactive<number>|number;
	textIndentMm?: IReactive<number>|number;
	textIndentP?: IReactive<number>|number;
	textIndentPc?: IReactive<number>|number;
	textIndentPt?: IReactive<number>|number;
	textIndentPx?: IReactive<number>|number;
	textIndentRem?: IReactive<number>|number;
	textIndentVh?: IReactive<number>|number;
	textIndentVw?: IReactive<number>|number;
	textIndentVMax?: IReactive<number>|number;
	textIndentVMin?: IReactive<number>|number;

	top?: IReactive<NumericLength>|NumericLengthOrAuto;
	topCm?: IReactive<number>|number;
	topCh?: IReactive<number>|number;
	topEm?: IReactive<number>|number;
	topEx?: IReactive<number>|number;
	topIn?: IReactive<number>|number;
	topMm?: IReactive<number>|number;
	topP?: IReactive<number>|number;
	topPc?: IReactive<number>|number;
	topPt?: IReactive<number>|number;
	topPx?: IReactive<number>|number;
	topRem?: IReactive<number>|number;
	topVh?: IReactive<number>|number;
	topVw?: IReactive<number>|number;
	topVMax?: IReactive<number>|number;
	topVMin?: IReactive<number>|number;

	width?: IReactive<NumericLength>|NumericLengthOrAuto;
	widthCm?: IReactive<number>|number;
	widthCh?: IReactive<number>|number;
	widthEm?: IReactive<number>|number;
	widthEx?: IReactive<number>|number;
	widthIn?: IReactive<number>|number;
	widthMm?: IReactive<number>|number;
	widthP?: IReactive<number>|number;
	widthPc?: IReactive<number>|number;
	widthPt?: IReactive<number>|number;
	widthPx?: IReactive<number>|number;
	widthRem?: IReactive<number>|number;
	widthVh?: IReactive<number>|number;
	widthVw?: IReactive<number>|number;
	widthVMax?: IReactive<number>|number;
	widthVMin?: IReactive<number>|number;

	lineHeight?: IReactive<NumericLength>|NumericLength;
	lineHeightCm?: IReactive<number>|number;
	lineHeightCh?: IReactive<number>|number;
	lineHeightEm?: IReactive<number>|number;
	lineHeightEx?: IReactive<number>|number;
	lineHeightIn?: IReactive<number>|number;
	lineHeightMm?: IReactive<number>|number;
	lineHeightP?: IReactive<number>|number;
	lineHeightPc?: IReactive<number>|number;
	lineHeightPt?: IReactive<number>|number;
	lineHeightPx?: IReactive<number>|number;
	lineHeightRem?: IReactive<number>|number;
	lineHeightVh?: IReactive<number>|number;
	lineHeightVw?: IReactive<number>|number;
	lineHeightVMax?: IReactive<number>|number;
	lineHeightVMin?: IReactive<number>|number;

	fontSize?: IReactive<NumericLength>|NumericLength;
	fontSizeCm?: IReactive<number>|number;
	fontSizeCh?: IReactive<number>|number;
	fontSizeEm?: IReactive<number>|number;
	fontSizeEx?: IReactive<number>|number;
	fontSizeIn?: IReactive<number>|number;
	fontSizeMm?: IReactive<number>|number;
	fontSizeP?: IReactive<number>|number;
	fontSizePc?: IReactive<number>|number;
	fontSizePt?: IReactive<number>|number;
	fontSizePx?: IReactive<number>|number;
	fontSizeRem?: IReactive<number>|number;
	fontSizeVh?: IReactive<number>|number;
	fontSizeVw?: IReactive<number>|number;
	fontSizeVMax?: IReactive<number>|number;
	fontSizeVMin?: IReactive<number>|number;

	flexBasis?: IReactive<NumericLength>|NumericLengthOrAuto;
	flexBasisCm?: IReactive<number>|number;
	flexBasisCh?: IReactive<number>|number;
	flexBasisEm?: IReactive<number>|number;
	flexBasisEx?: IReactive<number>|number;
	flexBasisIn?: IReactive<number>|number;
	flexBasisMm?: IReactive<number>|number;
	flexBasisP?: IReactive<number>|number;
	flexBasisPc?: IReactive<number>|number;
	flexBasisPt?: IReactive<number>|number;
	flexBasisPx?: IReactive<number>|number;
	flexBasisRem?: IReactive<number>|number;
	flexBasisVh?: IReactive<number>|number;
	flexBasisVw?: IReactive<number>|number;
	flexBasisVMax?: IReactive<number>|number;
	flexBasisVMin?: IReactive<number>|number;
	
	//url: 
	backgroundImage?: IReactive<string>|BackgroundImageFormat;
	borderImage?: IReactive<string>|BackgroundImageFormat;
	listStyleImage?: IReactive<string>|BackgroundImageFormat;
	content?: IReactive<string>|BasicCommonValues|Url;

	//complex: 
	transform?: IReactive<string>|BasicCommonValues|ITransformationContext;
	filter?: IReactive<string>|IFilterContext;
	backdropFilter?: IReactive<string>|IFilterContext;
	
	//misc numeric: 
	opacity?: IReactive<number|string>|number|string;

	//misc: 
	all?: IReactive<string>|BasicCommonValues;
	appearance?: IReactive<string>|AppearanceValues;
	aspectRatio?: IReactive<string>|string; // TODO?: better typing on this. Low priority.

	background?: IReactive<string>|BasicCommonValues|string;
	backgroundAttachment?: IReactive<string>|BackgroundAttachmentValues;
	backgroundBlendMode?: IReactive<string>|BasicCommonValues|string;
	backgroundPosition?: IReactive<string>|BackgroundPositionShorthand2D;
	backgroundRepeat?: IReactive<string>|BackgroundRepeatValues2d;
	backgroundClip?: IReactive<string>|BasicCommonValues|string;
	backgroundOrigin?: IReactive<string>|BackgroundOriginValues;

	borderImageOutset?: IReactive<string>|BasicCommonValues|string;
	borderImageRepeat?: IReactive<string>|BackgroundRepeatValues2d;
	borderImageSlice?: IReactive<string>|BasicCommonValues|string;
	borderImageSource?: IReactive<string>|BasicCommonValues|string;
	
	// TODO: probably should break this down better.
	border?: IReactive<string>|BorderShorthand;
	borderBottom?: IReactive<string>|BorderShorthand;
	borderLeft?: IReactive<string>|BorderShorthand;
	borderRight?: IReactive<string>|BorderShorthand;
	borderTop?: IReactive<string>|BorderShorthand;

	borderBottomStyle?: IReactive<string>|BorderStyles;
	borderLeftStyle?: IReactive<string>|BorderStyles;
	borderRightStyle?: IReactive<string>|BorderStyles;
	borderStyle?: IReactive<string>|BorderStyles;
	borderTopStyle?: IReactive<string>|BorderStyles;

	boxDecorationBreak?: IReactive<string>|BasicCommonValues|string;
	boxShadow?: IReactive<string>|BasicCommonValues|string;
	clear?: IReactive<string>|BasicCommonValues|string;
	clip?: IReactive<string>|BasicCommonValues|string;
	display?: IReactive<string>|DisplayValues;
	float?: IReactive<string>|BasicCommonValues|string;
	overflow?: IReactive<string>|BasicCommonValues|string;
	box?: IReactive<string>|BasicCommonValues|string;
	overflowX?: IReactive<string>|BasicCommonValues|string;
	overflowY?: IReactive<string>|BasicCommonValues|string;
	position?: IReactive<string>|PositionNames;
	visibility?: IReactive<string>|BasicCommonValues|string;
	verticalAlign?: IReactive<string>|BasicCommonValues|string;
	zIndex?: IReactive<string>|string|number;
	alignContent?: IReactive<string>|BasicCommonValues|string;
	alignItems?: IReactive<string>|BasicCommonValues|string;
	alignSelf?: IReactive<string>|BasicCommonValues|string;
	flex?: IReactive<string>|FlexShorthand;
	//flexBasis?: IReactive<string>|FlexBasisNames;
	flexDirection?: IReactive<string>|FlexDirectionNames;
	flexFlow?: IReactive<string>|FlexFlowShorthand;
	flexGrow?: IReactive<string>|BasicCommonValues|number;
	flexShrink?: IReactive<string>|BasicCommonValues|number;
	flexWrap?: IReactive<string>|FlexWrapNames;
	grid?: IReactive<string>|BasicCommonValues|string;
	gridArea?: IReactive<string>|BasicCommonValues|string;
	gridAutoColumns?: IReactive<string>|BasicCommonValues|string;
	gridautoRows?: IReactive<string>|BasicCommonValues|string;
	gridColumn?: IReactive<string>|BasicCommonValues|string;
	gridColumnEnd?: IReactive<string>|BasicCommonValues|string;
	gridColumnGap?: IReactive<string>|BasicCommonValues|string;
	gridColumnStart?: IReactive<string>|BasicCommonValues|string;
	gridGap?: IReactive<string>|BasicCommonValues|string;
	gridRow?: IReactive<string>|BasicCommonValues|string;
	gridRowEnd?: IReactive<string>|BasicCommonValues|string;
	gridRowGap?: IReactive<string>|BasicCommonValues|string;
	gridRowStart?: IReactive<string>|BasicCommonValues|string;
	gridTemplate?: IReactive<string>|BasicCommonValues|string;
	gridTemplateAreas?: IReactive<string>|BasicCommonValues|string;
	gridTemplateColumns?: IReactive<string>|BasicCommonValues|string;
	gridTemplateRows?: IReactive<string>|BasicCommonValues|string;
	imageOrientation?: IReactive<string>|BasicCommonValues|string;
	justifyContent?: IReactive<string>|BasicCommonValues|string;
	order?: IReactive<string>|BasicCommonValues|number;
	hangingPunctuation?: IReactive<string>|BasicCommonValues|string;
	hyphens?: IReactive<string>|BasicCommonValues|string;
	letterSpacing?: IReactive<string>|BasicCommonValues|string;
	lineBreak?: IReactive<string>|BasicCommonValues|string;
	overflowWrap?: IReactive<string>|BasicCommonValues|string;
	tabSize?: IReactive<string>|BasicCommonValues|string;
	textAlign?: IReactive<string>|BasicCommonValues|string;
	textAlignLast?: IReactive<string>|BasicCommonValues|string;
	textCombineUpright?: IReactive<string>|BasicCommonValues|string;
	textJustify?: IReactive<string>|BasicCommonValues|string;
	textTransform?: IReactive<string>|BasicCommonValues|string;
	whiteSpace?: IReactive<string>|BasicCommonValues|string;
	wordBreak?: IReactive<string>|BasicCommonValues|string;
	wordSpacing?: IReactive<string>|BasicCommonValues|string;
	wordWrap?: IReactive<string>|BasicCommonValues|string;
	textDecoration?: IReactive<string>|BasicCommonValues|string;
	textDecorationLine?: IReactive<string>|BasicCommonValues|string;
	textDecorationStyle?: IReactive<string>|BasicCommonValues|string;
	textShadow?: IReactive<string>|BasicCommonValues|string;
	textUnderlinePosition?: IReactive<string>|BasicCommonValues|string;
	font?: IReactive<string>|BasicCommonValues|string;
	fontFamily?: IReactive<string>|BasicCommonValues|string;
	fontFeatureSettings?: IReactive<string>|BasicCommonValues|string;
	fontKerning?: IReactive<string>|BasicCommonValues|string;
	fontLanguageOverride?: IReactive<string>|BasicCommonValues|string;
	fontSizeAdjust?: IReactive<string>|BasicCommonValues|string;
	fontStretch?: IReactive<string>|BasicCommonValues|string;
	fontStyle?: IReactive<string>|FontStyleValues;
	fontSynthesis?: IReactive<string>|BasicCommonValues|string;
	fontVariant?: IReactive<string>|FontVariantValues;
	fontVariantAlternates?: IReactive<string>|BasicCommonValues|string;
	fontVariantCaps?: IReactive<string>|FontVariantCapsValues;
	fontVariantEastAsian?: IReactive<string>|BasicCommonValues|string;
	fontVariantLigatures?: IReactive<string>|BasicCommonValues|string;
	fontVariantNumeric?: IReactive<string>|BasicCommonValues|string;
	fontVariantPosition?: IReactive<string>|BasicCommonValues|string;
	fontWeight?: IReactive<string>|BasicCommonValues|string;
	direction?: IReactive<string>|DirectionValues;
	textOrientation?: IReactive<string>|BasicCommonValues|string;
	unicodeBidi?: IReactive<string>|BasicCommonValues|string;
	userSelect?: IReactive<string>|BasicCommonValues|string;
	writingMode?: IReactive<string>|BasicCommonValues|string;
	borderCollapse?: IReactive<string>|BasicCommonValues|string;
	borderSpacing?: IReactive<string>|BasicCommonValues|string;
	captionSide?: IReactive<string>|BasicCommonValues|string;
	emptyCells?: IReactive<string>|BasicCommonValues|string;
	tableLayout?: IReactive<string>|BasicCommonValues|string;
	counterIncrement?: IReactive<string>|BasicCommonValues|string;
	counterReset?: IReactive<string>|BasicCommonValues|string;
	listStyle?: IReactive<string>|BasicCommonValues|string;
	listStylePosition?: IReactive<string>|BasicCommonValues|string;
	listStyleType?: IReactive<string>|BasicCommonValues|string;
	animation?: IReactive<string>|BasicCommonValues|string;
	animationDelay?: IReactive<string>|BasicCommonValues|string;
	animationDirection?: IReactive<string>|BasicCommonValues|string;
	animationDuration?: IReactive<string>|BasicCommonValues|string;
	animationFillMode?: IReactive<string>|BasicCommonValues|string;
	animationIterationCount?: IReactive<string>|BasicCommonValues|string;
	animationName?: IReactive<string>|BasicCommonValues|string;
	animationPlayState?: IReactive<string>|BasicCommonValues|string;
	animationTimingFunction?: IReactive<string>|BasicCommonValues|string;
	backfaceVisibility?: IReactive<string>|BackfaceVisibilityValues;
	perspective2d?: IReactive<string>|BasicCommonValues|string;
	perspectiveOrigin?: IReactive<string>|BasicCommonValues|string;
	transformOrigin?: IReactive<string>|BasicCommonValues|string;
	transformStyle?: IReactive<string>|BasicCommonValues|string;
	transition?: IReactive<string>|BasicCommonValues|string;
	transitionProperty?: IReactive<string>|BasicCommonValues|string;
	transitionDuration?: IReactive<string>|BasicCommonValues|string;
	transitionTimingFunction?: IReactive<string>|BasicCommonValues|string;
	transitionDelay?: IReactive<string>|BasicCommonValues|string;
	boxSizing?: IReactive<string>|BasicCommonValues|string;
	cursor?: IReactive<string>|BasicCommonValues|string;
	imeMode?: IReactive<string>|BasicCommonValues|string;
	navDown?: IReactive<string>|BasicCommonValues|string;
	navIndex?: IReactive<string>|BasicCommonValues|string;
	navLeft?: IReactive<string>|BasicCommonValues|string;
	navRight?: IReactive<string>|BasicCommonValues|string;
	navUp?: IReactive<string>|BasicCommonValues|string;
	outline?: IReactive<string>|BorderShorthand;
	//outlineOffset?: IReactive<string>|BasicCommonValues|string; // Now animated.
	outlineStyle?: IReactive<string>|BorderStyles;
	outlineWidth?: IReactive<string>|OutlineWidthValues;
	resize?: IReactive<string>|BasicCommonValues|string;
	textOverflow?: IReactive<string>|BasicCommonValues|string;
	breakAfter?: IReactive<string>|BasicCommonValues|string;
	breakBefore?: IReactive<string>|BasicCommonValues|string;
	breakInside?: IReactive<string>|BasicCommonValues|string;
	columnCount?: IReactive<string>|BasicCommonValues|string;
	columnFill?: IReactive<string>|BasicCommonValues|string;
	columnGap?: IReactive<string>|BasicCommonValues|string;
	columnRule?: IReactive<string>|BasicCommonValues|string;
	columnRuleStyle?: IReactive<string>|BasicCommonValues|string;
	columnRuleWidth?: IReactive<string>|BasicCommonValues|string;
	columnSpan?: IReactive<string>|BasicCommonValues|string;
	columnWidth?: IReactive<string>|BasicCommonValues|string;
	columns?: IReactive<string>|BasicCommonValues|string;
	widows?: IReactive<string>|BasicCommonValues|string;
	orphans?: IReactive<string>|BasicCommonValues|string;
	pageBreakAfter?: IReactive<string>|BasicCommonValues|string;
	pageBreakBefore?: IReactive<string>|BasicCommonValues|string;
	pageBreakInside?: IReactive<string>|BasicCommonValues|string;
	marks?: IReactive<string>|BasicCommonValues|string;
	quotes?: IReactive<string>|BasicCommonValues|string;
	imageRendering?: IReactive<string>|BasicCommonValues|string;
	imageResolution?: IReactive<string>|BasicCommonValues|string;
	objectFit?: IReactive<string>|BasicCommonValues|string;
	objectPosition?: IReactive<string>|BasicCommonValues|string;
	mask?: IReactive<string>|BasicCommonValues|string;
	maskType?: IReactive<string>|BasicCommonValues|string;
	mark?: IReactive<string>|BasicCommonValues|string;
	markAfter?: IReactive<string>|BasicCommonValues|string;
	markBefore?: IReactive<string>|BasicCommonValues|string;
	phonemes?: IReactive<string>|BasicCommonValues|string;
	rest?: IReactive<string>|BasicCommonValues|string;
	restAfter?: IReactive<string>|BasicCommonValues|string;
	restBefore?: IReactive<string>|BasicCommonValues|string;
	voiceBalance?: IReactive<string>|BasicCommonValues|string;
	voiceDuration?: IReactive<string>|BasicCommonValues|string;
	voicePitch?: IReactive<string>|BasicCommonValues|string;
	voicePitchRange?: IReactive<string>|BasicCommonValues|string;
	voiceRate?: IReactive<string>|BasicCommonValues|string;
	voiceStress?: IReactive<string>|BasicCommonValues|string;
	voiceVolume?: IReactive<string>|BasicCommonValues|string;
	marqueeDirection?: IReactive<string>|BasicCommonValues|string;
	marqueePlayCount?: IReactive<string>|BasicCommonValues|string;
	marqueeSpeed?: IReactive<string>|BasicCommonValues|string;
	marqueeStyle?: IReactive<string>|BasicCommonValues|string;
	pointerEvents?: IReactive<string>|BasicCommonValues|string;
}

export default interface IDotCss extends IDotcssProp{
	// TODO: ensure each of these has test cases.
	(selector: "@charset", charset: string): void;
	(selector: "@color-profile", name: string, styles: IColorProfileBuilder): void;
	(selector: "@container", condition: string, styles: IDotcssProp): void;
	(selector: "@counter-style", name: string, styles: ICounterStyleBuilder): void;

	(selector: Array<HTMLElement>|HTMLElement|string, styles: IDotcssProp): void;
	(styles: IDotcssProp): void;

	version: string;
}

// export interface IDotcssAnimatable<T> extends IDotcssProp{
// 	(value: T): IDotcssProp;

// 	animate(value: number|string, duration: number, style: "ease", complete: Function): IDotcssProp;
// }

// export interface IDotcssAnimatableColor extends IDotcssProp{
// 	(value: Color|Array<number>): IDotcssProp;
// 	(r: number, g: number, b: number, a?: number): IDotcssProp;

// 	animate(value: Color|Array<number>, duration: number, style: "ease", complete: Function): IDotcssProp;
// }

// export interface HideParams{
// 	duration?: number,
// 	complete?: Function,
// 	hideStyle?: "normal"|"fade"|"shrink",
// 	animationStyle?: "ease",
// }

// export interface ShowParams{
// 	duration?: number,
// 	display?: DisplayValues, // TODO: potential to expand this.
// 	complete?: Function,
// 	opacity?: number,
// 	width?: number,
// 	height?: number,
// 	showStyle?: "normal"|"fade"|"grow",
// 	animationStyle?: "ease",
// }

// TODO: add tests for these. Especially the 2-parameter ones.
export type ITransformationContext = {
	// a, b, c, d, tx, ty
	matrix?: [number, number, number, number, number, number];
	// a1, b1, c1, d1,  a2, b2, c2, d2,  a3, b3, c3, d3,  a4, b4, c4, d4
	matrix3d?: [
		number, number, number, number, 
		number, number, number, number, 
		number, number, number, number, 
		number, number, number, number
	];
	
	translate: NumericLength | [NumericLength, NumericLength]
	translateCm: number | [number, number]
	translateCh: number | [number, number]
	translateEm: number | [number, number]
	translateEx: number | [number, number]
	translateIn: number | [number, number]
	translateMm: number | [number, number]
	translateP: number | [number, number]
	translatePc: number | [number, number]
	translatePt: number | [number, number]
	translatePx: number | [number, number]
	translateRem: number | [number, number]
	translateVh: number | [number, number]
	translateVw: number | [number, number]
	translateVMax: number | [number, number]
	translateVMin: number | [number, number]
	translate3d?: [NumericLength, NumericLength, NumericLength];
	translate3dCm?: [number, number, number];
	translate3dCh?: [number, number, number];
	translate3dEm?: [number, number, number];
	translate3dEx?: [number, number, number];
	translate3dIn?: [number, number, number];
	translate3dMm?: [number, number, number];
	translate3dP?: [number, number, number];
	translate3dPc?: [number, number, number];
	translate3dPt?: [number, number, number];
	translate3dPx?: [number, number, number];
	translate3dRem?: [number, number, number];
	translate3dVh?: [number, number, number];
	translate3dVw?: [number, number, number];
	translate3dVMax?: [number, number, number];
	translate3dVMin?: [number, number, number];
	translateX?: NumericLength;
	translateXCm?: number;
	translateXCh?: number;
	translateXEm?: number;
	translateXEx?: number;
	translateXIn?: number;
	translateXMm?: number;
	translateXP?: number;
	translateXPc?: number;
	translateXPt?: number;
	translateXPx?: number;
	translateXRem?: number;
	translateXVh?: number;
	translateXVw?: number;
	translateXVMax?: number;
	translateXVMin?: number;
	translateY?: NumericLength;
	translateYCm?: number;
	translateYCh?: number;
	translateYEm?: number;
	translateYEx?: number;
	translateYIn?: number;
	translateYMm?: number;
	translateYP?: number;
	translateYPc?: number;
	translateYPt?: number;
	translateYPx?: number;
	translateYRem?: number;
	translateYVh?: number;
	translateYVw?: number;
	translateYVMax?: number;
	translateYVMin?: number;
	translateZ?: NumericLength;
	translateZCm?: number;
	translateZCh?: number;
	translateZEm?: number;
	translateZEx?: number;
	translateZIn?: number;
	translateZMm?: number;
	translateZP?: number;
	translateZPc?: number;
	translateZPt?: number;
	translateZPx?: number;
	translateZRem?: number;
	translateZVh?: number;
	translateZVw?: number;
	translateZVMax?: number;
	translateZVMin?: number;
	
	scale?: number | [number, number];
	scale3d?: [number, number, number];
	scaleX?: number;
	scaleY?: number;
	scaleZ?: number;
	
	rotate?: NumericAngle;
	rotateDeg?: number;
	rotateTurn?: number;
	rotateRad?: number;
	rotateGrad?: number;
	rotate3d?: [number, number, number, NumericAngle];
	rotate3dDeg?: [number, number, number, number];
	rotate3dTurn?: [number, number, number, number];
	rotate3dRad?: [number, number, number, number];
	rotate3dGrad?: [number, number, number, number];
	rotateX?: NumericAngle;
	rotateXDeg?: number;
	rotateXTurn?: number;
	rotateXRad?: number;
	rotateXGrad?: number;
	rotateY?: NumericAngle;
	rotateYDeg?: number;
	rotateYTurn?: number;
	rotateYRad?: number;
	rotateYGrad?: number;
	rotateZ?: NumericAngle;
	rotateZDeg?: number;
	rotateZTurn?: number;
	rotateZRad?: number;
	rotateZGrad?: number;
	
	skew?: NumericAngle | [NumericAngle, NumericAngle];
	skewDeg?: number | [number, number];
	skewTurn?: number | [number, number];
	skewRad?: number | [number, number];
	skewGrad?: number | [number, number];
	skewX?: NumericAngle;
	skewXDeg?: number;
	skewXTurn?: number;
	skewXRad?: number;
	skewXGrad?: number;
	skewY?: NumericAngle;
	skewYDeg?: number;
	skewYTurn?: number;
	skewYRad?: number;
	skewYGrad?: number;
	
	perspective?: NumericLength;
	perspectiveCm?: number;
	perspectiveCh?: number;
	perspectiveEm?: number;
	perspectiveEx?: number;
	perspectiveIn?: number;
	perspectiveMm?: number;
	perspectiveP?: number;
	perspectivePc?: number;
	perspectivePt?: number;
	perspectivePx?: number;
	perspectiveRem?: number;
	perspectiveVh?: number;
	perspectiveVw?: number;
	perspectiveVMax?: number;
	perspectiveVMin?: number;
}

type IFilterContext = {
	// url(commonfilters.svg#filter); // Don't know how this works yet.
	blur?: NumericLength;
	brightness?: Percentage;
	contrast?: Percentage;
	dropShadow?: {x?: NumericLength, y?: NumericLength, blur?: NumericLength, color?: Color};
	grayscale?: Percentage;
	hueRotate?: AngleUnits;
	invert?: Percentage;
	opacity?: Percentage;
	sepia?: Percentage;
	saturate?: Percentage;
	// url(filters.svg#filter) blur(4px) saturate(150%); // example.
}

// AT RULE BUILDERS

interface IColorProfileBuilder{
	src?: Url;
	renderingIntent?: "relative-colorimetric"|"absolute-colorimetric"|"perceptual"|"saturation";
}

type SystemValue = "cyclic"|"numeric"|"alphabetic"|"symbolic"|"additive"|`fixed ${number}`|`extends ${string}`;
interface ICounterStyleBuilder{

	// TODO: need a testcase on this.
	system?: SystemValue|["fixed", number]|["extends", string];

	symbols?: string;
	additiveSymbols?: string;
	negative?: string;
	prefix?: string;
	suffix?: string;
	range?: string;
	pad?: string;
	speakAs?: string;
}