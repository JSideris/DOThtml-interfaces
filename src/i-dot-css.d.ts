

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
	color?: Color;
	backgroundColor?: Color;
	borderBottomColor?: Color;
	borderColor?: Color;
	borderLeftColor?: Color;
	borderRightColor?: Color;
	borderTopColor?: Color;
	textDecorationColor?: Color;
	outlineColor?: Color;
	columnRuleColor?: Color;

	//length:(value: 
	backgroundSize?: BackgroundSizeValues;
	backgroundSizeCm?: number;
	backgroundSizeCh?: number;
	backgroundSizeEm?: number;
	backgroundSizeEx?: number;
	backgroundSizeIn?: number;
	backgroundSizeMm?: number;
	backgroundSizeP?: number;
	backgroundSizePc?: number;
	backgroundSizePt?: number;
	backgroundSizePx?: number;
	backgroundSizeRem?: number;
	backgroundSizeVh?: number;
	backgroundSizeVw?: number;
	backgroundSizeVMax?: number;
	backgroundSizeVMin?: number;

	blockSize?: NumericLength;
	blockSizeCm?: number;
	blockSizeCh?: number;
	blockSizeEm?: number;
	blockSizeEx?: number;
	blockSizeIn?: number;
	blockSizeMm?: number;
	blockSizeP?: number;
	blockSizePc?: number;
	blockSizePt?: number;
	blockSizePx?: number;
	blockSizeRem?: number;
	blockSizeVh?: number;
	blockSizeVw?: number;
	blockSizeVMax?: number;
	blockSizeVMin?: number;

	borderBottomLeftRadius?: NumericLength;
	borderBottomLeftRadiusCm?: number;
	borderBottomLeftRadiusCh?: number;
	borderBottomLeftRadiusEm?: number;
	borderBottomLeftRadiusEx?: number;
	borderBottomLeftRadiusIn?: number;
	borderBottomLeftRadiusMm?: number;
	borderBottomLeftRadiusP?: number;
	borderBottomLeftRadiusPc?: number;
	borderBottomLeftRadiusPt?: number;
	borderBottomLeftRadiusPx?: number;
	borderBottomLeftRadiusRem?: number;
	borderBottomLeftRadiusVh?: number;
	borderBottomLeftRadiusVw?: number;
	borderBottomLeftRadiusVMax?: number;
	borderBottomLeftRadiusVMin?: number;

	borderBottomRightRadius?: NumericLength;
	borderBottomRightRadiusCm?: number;
	borderBottomRightRadiusCh?: number;
	borderBottomRightRadiusEm?: number;
	borderBottomRightRadiusEx?: number;
	borderBottomRightRadiusIn?: number;
	borderBottomRightRadiusMm?: number;
	borderBottomRightRadiusP?: number;
	borderBottomRightRadiusPc?: number;
	borderBottomRightRadiusPt?: number;
	borderBottomRightRadiusPx?: number;
	borderBottomRightRadiusRem?: number;
	borderBottomRightRadiusVh?: number;
	borderBottomRightRadiusVw?: number;
	borderBottomRightRadiusVMax?: number;
	borderBottomRightRadiusVMin?: number;

	borderBottomWidth?: NumericLength;
	borderBottomWidthCm?: number;
	borderBottomWidthCh?: number;
	borderBottomWidthEm?: number;
	borderBottomWidthEx?: number;
	borderBottomWidthIn?: number;
	borderBottomWidthMm?: number;
	borderBottomWidthP?: number;
	borderBottomWidthPc?: number;
	borderBottomWidthPt?: number;
	borderBottomWidthPx?: number;
	borderBottomWidthRem?: number;
	borderBottomWidthVh?: number;
	borderBottomWidthVw?: number;
	borderBottomWidthVMax?: number;
	borderBottomWidthVMin?: number;

	borderImageWidth?: NumericLength;
	borderImageWidthCm?: number;
	borderImageWidthCh?: number;
	borderImageWidthEm?: number;
	borderImageWidthEx?: number;
	borderImageWidthIn?: number;
	borderImageWidthMm?: number;
	borderImageWidthP?: number;
	borderImageWidthPc?: number;
	borderImageWidthPt?: number;
	borderImageWidthPx?: number;
	borderImageWidthRem?: number;
	borderImageWidthVh?: number;
	borderImageWidthVw?: number;
	borderImageWidthVMax?: number;
	borderImageWidthVMin?: number;

	borderLeftWidth?: NumericLength;
	borderLeftWidthCm?: number;
	borderLeftWidthCh?: number;
	borderLeftWidthEm?: number;
	borderLeftWidthEx?: number;
	borderLeftWidthIn?: number;
	borderLeftWidthMm?: number;
	borderLeftWidthP?: number;
	borderLeftWidthPc?: number;
	borderLeftWidthPt?: number;
	borderLeftWidthPx?: number;
	borderLeftWidthRem?: number;
	borderLeftWidthVh?: number;
	borderLeftWidthVw?: number;
	borderLeftWidthVMax?: number;
	borderLeftWidthVMin?: number;

	borderRadius?: NumericLength;
	borderRadiusCm?: number;
	borderRadiusCh?: number;
	borderRadiusEm?: number;
	borderRadiusEx?: number;
	borderRadiusIn?: number;
	borderRadiusMm?: number;
	borderRadiusP?: number;
	borderRadiusPc?: number;
	borderRadiusPt?: number;
	borderRadiusPx?: number;
	borderRadiusRem?: number;
	borderRadiusVh?: number;
	borderRadiusVw?: number;
	borderRadiusVMax?: number;
	borderRadiusVMin?: number;

	borderRightWidth?: NumericLength;
	borderRightWidthCm?: number;
	borderRightWidthCh?: number;
	borderRightWidthEm?: number;
	borderRightWidthEx?: number;
	borderRightWidthIn?: number;
	borderRightWidthMm?: number;
	borderRightWidthP?: number;
	borderRightWidthPc?: number;
	borderRightWidthPt?: number;
	borderRightWidthPx?: number;
	borderRightWidthRem?: number;
	borderRightWidthVh?: number;
	borderRightWidthVw?: number;
	borderRightWidthVMax?: number;
	borderRightWidthVMin?: number;

	borderTopLeftRadius?: NumericLength;
	borderTopLeftRadiusCm?: number;
	borderTopLeftRadiusCh?: number;
	borderTopLeftRadiusEm?: number;
	borderTopLeftRadiusEx?: number;
	borderTopLeftRadiusIn?: number;
	borderTopLeftRadiusMm?: number;
	borderTopLeftRadiusP?: number;
	borderTopLeftRadiusPc?: number;
	borderTopLeftRadiusPt?: number;
	borderTopLeftRadiusPx?: number;
	borderTopLeftRadiusRem?: number;
	borderTopLeftRadiusVh?: number;
	borderTopLeftRadiusVw?: number;
	borderTopLeftRadiusVMax?: number;
	borderTopLeftRadiusVMin?: number;

	borderTopRightRadius?: NumericLength;
	borderTopRightRadiusCm?: number;
	borderTopRightRadiusCh?: number;
	borderTopRightRadiusEm?: number;
	borderTopRightRadiusEx?: number;
	borderTopRightRadiusIn?: number;
	borderTopRightRadiusMm?: number;
	borderTopRightRadiusP?: number;
	borderTopRightRadiusPc?: number;
	borderTopRightRadiusPt?: number;
	borderTopRightRadiusPx?: number;
	borderTopRightRadiusRem?: number;
	borderTopRightRadiusVh?: number;
	borderTopRightRadiusVw?: number;
	borderTopRightRadiusVMax?: number;
	borderTopRightRadiusVMin?: number;

	borderTopWidth?: NumericLength;
	borderTopWidthCm?: number;
	borderTopWidthCh?: number;
	borderTopWidthEm?: number;
	borderTopWidthEx?: number;
	borderTopWidthIn?: number;
	borderTopWidthMm?: number;
	borderTopWidthP?: number;
	borderTopWidthPc?: number;
	borderTopWidthPt?: number;
	borderTopWidthPx?: number;
	borderTopWidthRem?: number;
	borderTopWidthVh?: number;
	borderTopWidthVw?: number;
	borderTopWidthVMax?: number;
	borderTopWidthVMin?: number;

	borderWidth?: NumericLength;
	borderWidthCm?: number;
	borderWidthCh?: number;
	borderWidthEm?: number;
	borderWidthEx?: number;
	borderWidthIn?: number;
	borderWidthMm?: number;
	borderWidthP?: number;
	borderWidthPc?: number;
	borderWidthPt?: number;
	borderWidthPx?: number;
	borderWidthRem?: number;
	borderWidthVh?: number;
	borderWidthVw?: number;
	borderWidthVMax?: number;
	borderWidthVMin?: number;

	bottom?: NumericLengthOrAuto;
	bottomCm?: number;
	bottomCh?: number;
	bottomEm?: number;
	bottomEx?: number;
	bottomIn?: number;
	bottomMm?: number;
	bottomP?: number;
	bottomPc?: number;
	bottomPt?: number;
	bottomPx?: number;
	bottomRem?: number;
	bottomVh?: number;
	bottomVw?: number;
	bottomVMax?: number;
	bottomVMin?: number;

	gap?: NumericLength;
	gapCm?: number;
	gapCh?: number;
	gapEm?: number;
	gapEx?: number;
	gapIn?: number;
	gapMm?: number;
	gapP?: number;
	gapPc?: number;
	gapPt?: number;
	gapPx?: number;
	gapRem?: number;
	gapVh?: number;
	gapVw?: number;
	gapVMax?: number;
	gapVMin?: number;

	height?: NumericLengthOrAuto;
	heightCm?: number;
	heightCh?: number;
	heightEm?: number;
	heightEx?: number;
	heightIn?: number;
	heightMm?: number;
	heightP?: number;
	heightPc?: number;
	heightPt?: number;
	heightPx?: number;
	heightRem?: number;
	heightVh?: number;
	heightVw?: number;
	heightVMax?: number;
	heightVMin?: number;

	left?: NumericLengthOrAuto;
	leftCm?: number;
	leftCh?: number;
	leftEm?: number;
	leftEx?: number;
	leftIn?: number;
	leftMm?: number;
	leftP?: number;
	leftPc?: number;
	leftPt?: number;
	leftPx?: number;
	leftRem?: number;
	leftVh?: number;
	leftVw?: number;
	leftVMax?: number;
	leftVMin?: number;

	margin?: NumericLengthOrAuto;
	marginCm?: number;
	marginCh?: number;
	marginEm?: number;
	marginEx?: number;
	marginIn?: number;
	marginMm?: number;
	marginP?: number;
	marginPc?: number;
	marginPt?: number;
	marginPx?: number;
	marginRem?: number;
	marginVh?: number;
	marginVw?: number;
	marginVMax?: number;
	marginVMin?: number;

	marginBottom?: NumericLengthOrAuto;
	marginBottomCm?: number;
	marginBottomCh?: number;
	marginBottomEm?: number;
	marginBottomEx?: number;
	marginBottomIn?: number;
	marginBottomMm?: number;
	marginBottomP?: number;
	marginBottomPc?: number;
	marginBottomPt?: number;
	marginBottomPx?: number;
	marginBottomRem?: number;
	marginBottomVh?: number;
	marginBottomVw?: number;
	marginBottomVMax?: number;
	marginBottomVMin?: number;

	marginLeft?: NumericLengthOrAuto;
	marginLeftCm?: number;
	marginLeftCh?: number;
	marginLeftEm?: number;
	marginLeftEx?: number;
	marginLeftIn?: number;
	marginLeftMm?: number;
	marginLeftP?: number;
	marginLeftPc?: number;
	marginLeftPt?: number;
	marginLeftPx?: number;
	marginLeftRem?: number;
	marginLeftVh?: number;
	marginLeftVw?: number;
	marginLeftVMax?: number;
	marginLeftVMin?: number;

	marginRight?: NumericLengthOrAuto;
	marginRightCm?: number;
	marginRightCh?: number;
	marginRightEm?: number;
	marginRightEx?: number;
	marginRightIn?: number;
	marginRightMm?: number;
	marginRightP?: number;
	marginRightPc?: number;
	marginRightPt?: number;
	marginRightPx?: number;
	marginRightRem?: number;
	marginRightVh?: number;
	marginRightVw?: number;
	marginRightVMax?: number;
	marginRightVMin?: number;

	marginTop?: NumericLengthOrAuto;
	marginTopCm?: number;
	marginTopCh?: number;
	marginTopEm?: number;
	marginTopEx?: number;
	marginTopIn?: number;
	marginTopMm?: number;
	marginTopP?: number;
	marginTopPc?: number;
	marginTopPt?: number;
	marginTopPx?: number;
	marginTopRem?: number;
	marginTopVh?: number;
	marginTopVw?: number;
	marginTopVMax?: number;
	marginTopVMin?: number;

	maxHeight?: NumericLengthOrAuto;
	maxHeightCm?: number;
	maxHeightCh?: number;
	maxHeightEm?: number;
	maxHeightEx?: number;
	maxHeightIn?: number;
	maxHeightMm?: number;
	maxHeightP?: number;
	maxHeightPc?: number;
	maxHeightPt?: number;
	maxHeightPx?: number;
	maxHeightRem?: number;
	maxHeightVh?: number;
	maxHeightVw?: number;
	maxHeightVMax?: number;
	maxHeightVMin?: number;

	maxWidth?: NumericLengthOrAuto;
	maxWidthCm?: number;
	maxWidthCh?: number;
	maxWidthEm?: number;
	maxWidthEx?: number;
	maxWidthIn?: number;
	maxWidthMm?: number;
	maxWidthP?: number;
	maxWidthPc?: number;
	maxWidthPt?: number;
	maxWidthPx?: number;
	maxWidthRem?: number;
	maxWidthVh?: number;
	maxWidthVw?: number;
	maxWidthVMax?: number;
	maxWidthVMin?: number;

	minHeight?: NumericLengthOrAuto;
	minHeightCm?: number;
	minHeightCh?: number;
	minHeightEm?: number;
	minHeightEx?: number;
	minHeightIn?: number;
	minHeightMm?: number;
	minHeightP?: number;
	minHeightPc?: number;
	minHeightPt?: number;
	minHeightPx?: number;
	minHeightRem?: number;
	minHeightVh?: number;
	minHeightVw?: number;
	minHeightVMax?: number;
	minHeightVMin?: number;

	minWidth?: NumericLengthOrAuto;
	minWidthCm?: number;
	minWidthCh?: number;
	minWidthEm?: number;
	minWidthEx?: number;
	minWidthIn?: number;
	minWidthMm?: number;
	minWidthP?: number;
	minWidthPc?: number;
	minWidthPt?: number;
	minWidthPx?: number;
	minWidthRem?: number;
	minWidthVh?: number;
	minWidthVw?: number;
	minWidthVMax?: number;
	minWidthVMin?: number;

	outlineOffset?: NumericLength;
	outlineOffsetCm?: number;
	outlineOffsetCh?: number;
	outlineOffsetEm?: number;
	outlineOffsetEx?: number;
	outlineOffsetIn?: number;
	outlineOffsetMm?: number;
	outlineOffsetP?: number;
	outlineOffsetPc?: number;
	outlineOffsetPt?: number;
	outlineOffsetPx?: number;
	outlineOffsetRem?: number;
	outlineOffsetVh?: number;
	outlineOffsetVw?: number;
	outlineOffsetVMax?: number;
	outlineOffsetVMin?: number;

	padding?: NumericLengthOrAuto;
	paddingCm?: number;
	paddingCh?: number;
	paddingEm?: number;
	paddingEx?: number;
	paddingIn?: number;
	paddingMm?: number;
	paddingP?: number;
	paddingPc?: number;
	paddingPt?: number;
	paddingPx?: number;
	paddingRem?: number;
	paddingVh?: number;
	paddingVw?: number;
	paddingVMax?: number;
	paddingVMin?: number;

	paddingBottom?: NumericLengthOrAuto;
	paddingBottomCm?: number;
	paddingBottomCh?: number;
	paddingBottomEm?: number;
	paddingBottomEx?: number;
	paddingBottomIn?: number;
	paddingBottomMm?: number;
	paddingBottomP?: number;
	paddingBottomPc?: number;
	paddingBottomPt?: number;
	paddingBottomPx?: number;
	paddingBottomRem?: number;
	paddingBottomVh?: number;
	paddingBottomVw?: number;
	paddingBottomVMax?: number;
	paddingBottomVMin?: number;

	paddingLeft?: NumericLengthOrAuto;
	paddingLeftCm?: number;
	paddingLeftCh?: number;
	paddingLeftEm?: number;
	paddingLeftEx?: number;
	paddingLeftIn?: number;
	paddingLeftMm?: number;
	paddingLeftP?: number;
	paddingLeftPc?: number;
	paddingLeftPt?: number;
	paddingLeftPx?: number;
	paddingLeftRem?: number;
	paddingLeftVh?: number;
	paddingLeftVw?: number;
	paddingLeftVMax?: number;
	paddingLeftVMin?: number;

	paddingRight?: NumericLengthOrAuto;
	paddingRightCm?: number;
	paddingRightCh?: number;
	paddingRightEm?: number;
	paddingRightEx?: number;
	paddingRightIn?: number;
	paddingRightMm?: number;
	paddingRightP?: number;
	paddingRightPc?: number;
	paddingRightPt?: number;
	paddingRightPx?: number;
	paddingRightRem?: number;
	paddingRightVh?: number;
	paddingRightVw?: number;
	paddingRightVMax?: number;
	paddingRightVMin?: number;

	paddingTop?: NumericLengthOrAuto;
	paddingTopCm?: number;
	paddingTopCh?: number;
	paddingTopEm?: number;
	paddingTopEx?: number;
	paddingTopIn?: number;
	paddingTopMm?: number;
	paddingTopP?: number;
	paddingTopPc?: number;
	paddingTopPt?: number;
	paddingTopPx?: number;
	paddingTopRem?: number;
	paddingTopVh?: number;
	paddingTopVw?: number;
	paddingTopVMax?: number;
	paddingTopVMin?: number;

	right?: NumericLengthOrAuto;
	rightCm?: number;
	rightCh?: number;
	rightEm?: number;
	rightEx?: number;
	rightIn?: number;
	rightMm?: number;
	rightP?: number;
	rightPc?: number;
	rightPt?: number;
	rightPx?: number;
	rightRem?: number;
	rightVh?: number;
	rightVw?: number;
	rightVMax?: number;
	rightVMin?: number;

	textIndent?: NumericLengthOrAuto;
	textIndentCm?: number;
	textIndentCh?: number;
	textIndentEm?: number;
	textIndentEx?: number;
	textIndentIn?: number;
	textIndentMm?: number;
	textIndentP?: number;
	textIndentPc?: number;
	textIndentPt?: number;
	textIndentPx?: number;
	textIndentRem?: number;
	textIndentVh?: number;
	textIndentVw?: number;
	textIndentVMax?: number;
	textIndentVMin?: number;

	top?: NumericLengthOrAuto;
	topCm?: number;
	topCh?: number;
	topEm?: number;
	topEx?: number;
	topIn?: number;
	topMm?: number;
	topP?: number;
	topPc?: number;
	topPt?: number;
	topPx?: number;
	topRem?: number;
	topVh?: number;
	topVw?: number;
	topVMax?: number;
	topVMin?: number;

	width?: NumericLengthOrAuto;
	widthCm?: number;
	widthCh?: number;
	widthEm?: number;
	widthEx?: number;
	widthIn?: number;
	widthMm?: number;
	widthP?: number;
	widthPc?: number;
	widthPt?: number;
	widthPx?: number;
	widthRem?: number;
	widthVh?: number;
	widthVw?: number;
	widthVMax?: number;
	widthVMin?: number;

	lineHeight?: NumericLength;
	lineHeightCm?: number;
	lineHeightCh?: number;
	lineHeightEm?: number;
	lineHeightEx?: number;
	lineHeightIn?: number;
	lineHeightMm?: number;
	lineHeightP?: number;
	lineHeightPc?: number;
	lineHeightPt?: number;
	lineHeightPx?: number;
	lineHeightRem?: number;
	lineHeightVh?: number;
	lineHeightVw?: number;
	lineHeightVMax?: number;
	lineHeightVMin?: number;

	fontSize?: NumericLength;
	fontSizeCm?: number;
	fontSizeCh?: number;
	fontSizeEm?: number;
	fontSizeEx?: number;
	fontSizeIn?: number;
	fontSizeMm?: number;
	fontSizeP?: number;
	fontSizePc?: number;
	fontSizePt?: number;
	fontSizePx?: number;
	fontSizeRem?: number;
	fontSizeVh?: number;
	fontSizeVw?: number;
	fontSizeVMax?: number;
	fontSizeVMin?: number;

	flexBasis?: NumericLengthOrAuto;
	flexBasisCm?: number;
	flexBasisCh?: number;
	flexBasisEm?: number;
	flexBasisEx?: number;
	flexBasisIn?: number;
	flexBasisMm?: number;
	flexBasisP?: number;
	flexBasisPc?: number;
	flexBasisPt?: number;
	flexBasisPx?: number;
	flexBasisRem?: number;
	flexBasisVh?: number;
	flexBasisVw?: number;
	flexBasisVMax?: number;
	flexBasisVMin?: number;
	
	//url: 
	backgroundImage?: BackgroundImageFormat;
	borderImage?: BackgroundImageFormat;
	listStyleImage?: BackgroundImageFormat;
	content?: BasicCommonValues|Url;

	//complex: 
	transform?: BasicCommonValues|ITransformationContext;
	filter?: IFilterContext;
	backdropFilter?: IFilterContext;
	
	//misc numeric: 
	opacity?: number|string;

	//misc: 
	all?: BasicCommonValues;
	appearance?: AppearanceValues;
	aspectRatio?: string; // TODO?: better typing on this. Low priority.

	background?: BasicCommonValues|string;
	backgroundAttachment?: BackgroundAttachmentValues;
	backgroundBlendMode?: BasicCommonValues|string;
	backgroundPosition?: BackgroundPositionShorthand2D;
	backgroundRepeat?: BackgroundRepeatValues2d;
	backgroundClip?: BasicCommonValues|string;
	backgroundOrigin?: BackgroundOriginValues;

	borderImageOutset?: BasicCommonValues|string;
	borderImageRepeat?: BackgroundRepeatValues2d;
	borderImageSlice?: BasicCommonValues|string;
	borderImageSource?: BasicCommonValues|string;
	
	border?: BorderShorthand;
	borderBottom?: BorderShorthand;
	borderLeft?: BorderShorthand;
	borderRight?: BorderShorthand;
	borderTop?: BorderShorthand;

	borderBottomStyle?: BorderStyles;
	borderLeftStyle?: BorderStyles;
	borderRightStyle?: BorderStyles;
	borderStyle?: BorderStyles;
	borderTopStyle?: BorderStyles;

	boxDecorationBreak?: BasicCommonValues|string;
	boxShadow?: BasicCommonValues|string;
	clear?: BasicCommonValues|string;
	clip?: BasicCommonValues|string;
	display?: DisplayValues;
	float?: BasicCommonValues|string;
	overflow?: BasicCommonValues|string;
	box?: BasicCommonValues|string;
	overflowX?: BasicCommonValues|string;
	overflowY?: BasicCommonValues|string;
	position?: PositionNames;
	visibility?: BasicCommonValues|string;
	verticalAlign?: BasicCommonValues|string;
	zIndex?: string|number;
	alignContent?: BasicCommonValues|string;
	alignItems?: BasicCommonValues|string;
	alignSelf?: BasicCommonValues|string;
	flex?: FlexShorthand;
	// flexBasis?: FlexBasisNames;
	flexDirection?: FlexDirectionNames;
	flexFlow?: FlexFlowShorthand;
	flexGrow?: BasicCommonValues|number;
	flexShrink?: BasicCommonValues|number;
	flexWrap?: FlexWrapNames;
	grid?: BasicCommonValues|string;
	gridArea?: BasicCommonValues|string;
	gridAutoColumns?: BasicCommonValues|string;
	gridautoRows?: BasicCommonValues|string;
	gridColumn?: BasicCommonValues|string;
	gridColumnEnd?: BasicCommonValues|string;
	gridColumnGap?: BasicCommonValues|string;
	gridColumnStart?: BasicCommonValues|string;
	gridGap?: BasicCommonValues|string;
	gridRow?: BasicCommonValues|string;
	gridRowEnd?: BasicCommonValues|string;
	gridRowGap?: BasicCommonValues|string;
	gridRowStart?: BasicCommonValues|string;
	gridTemplate?: BasicCommonValues|string;
	gridTemplateAreas?: BasicCommonValues|string;
	gridTemplateColumns?: BasicCommonValues|string;
	gridTemplateRows?: BasicCommonValues|string;
	imageOrientation?: BasicCommonValues|string;
	justifyContent?: BasicCommonValues|string;
	order?: BasicCommonValues|number;
	hangingPunctuation?: BasicCommonValues|string;
	hyphens?: BasicCommonValues|string;
	letterSpacing?: BasicCommonValues|string;
	lineBreak?: BasicCommonValues|string;
	overflowWrap?: BasicCommonValues|string;
	tabSize?: BasicCommonValues|string;
	textAlign?: BasicCommonValues|string;
	textAlignLast?: BasicCommonValues|string;
	textCombineUpright?: BasicCommonValues|string;
	textJustify?: BasicCommonValues|string;
	textTransform?: BasicCommonValues|string;
	whiteSpace?: BasicCommonValues|string;
	wordBreak?: BasicCommonValues|string;
	wordSpacing?: BasicCommonValues|string;
	wordWrap?: BasicCommonValues|string;
	textDecoration?: BasicCommonValues|string;
	textDecorationLine?: BasicCommonValues|string;
	textDecorationStyle?: BasicCommonValues|string;
	textShadow?: BasicCommonValues|string;
	textUnderlinePosition?: BasicCommonValues|string;
	font?: BasicCommonValues|string;
	fontFamily?: BasicCommonValues|string;
	fontFeatureSettings?: BasicCommonValues|string;
	fontKerning?: BasicCommonValues|string;
	fontLanguageOverride?: BasicCommonValues|string;
	fontSizeAdjust?: BasicCommonValues|string;
	fontStretch?: BasicCommonValues|string;
	fontStyle?: FontStyleValues;
	fontSynthesis?: BasicCommonValues|string;
	fontVariant?: FontVariantValues;
	fontVariantAlternates?: BasicCommonValues|string;
	fontVariantCaps?: FontVariantCapsValues;
	fontVariantEastAsian?: BasicCommonValues|string;
	fontVariantLigatures?: BasicCommonValues|string;
	fontVariantNumeric?: BasicCommonValues|string;
	fontVariantPosition?: BasicCommonValues|string;
	fontWeight?: BasicCommonValues|string;
	direction?: DirectionValues;
	textOrientation?: BasicCommonValues|string;
	unicodeBidi?: BasicCommonValues|string;
	userSelect?: BasicCommonValues|string;
	writingMode?: BasicCommonValues|string;
	borderCollapse?: BasicCommonValues|string;
	borderSpacing?: BasicCommonValues|string;
	captionSide?: BasicCommonValues|string;
	emptyCells?: BasicCommonValues|string;
	tableLayout?: BasicCommonValues|string;
	counterIncrement?: BasicCommonValues|string;
	counterReset?: BasicCommonValues|string;
	listStyle?: BasicCommonValues|string;
	listStylePosition?: BasicCommonValues|string;
	listStyleType?: BasicCommonValues|string;
	animation?: BasicCommonValues|string;
	animationDelay?: BasicCommonValues|string;
	animationDirection?: BasicCommonValues|string;
	animationDuration?: BasicCommonValues|string;
	animationFillMode?: BasicCommonValues|string;
	animationIterationCount?: BasicCommonValues|string;
	animationName?: BasicCommonValues|string;
	animationPlayState?: BasicCommonValues|string;
	animationTimingFunction?: BasicCommonValues|string;
	backfaceVisibility?: BackfaceVisibilityValues;
	perspective2d?: BasicCommonValues|string;
	perspectiveOrigin?: BasicCommonValues|string;
	transformOrigin?: BasicCommonValues|string;
	transformStyle?: BasicCommonValues|string;
	transition?: BasicCommonValues|string;
	transitionProperty?: BasicCommonValues|string;
	transitionDuration?: BasicCommonValues|string;
	transitionTimingFunction?: BasicCommonValues|string;
	transitionDelay?: BasicCommonValues|string;
	boxSizing?: BasicCommonValues|string;
	cursor?: BasicCommonValues|string;
	imeMode?: BasicCommonValues|string;
	navDown?: BasicCommonValues|string;
	navIndex?: BasicCommonValues|string;
	navLeft?: BasicCommonValues|string;
	navRight?: BasicCommonValues|string;
	navUp?: BasicCommonValues|string;
	outline?: BorderShorthand;
	//outlineOffset?: BasicCommonValues|string; // Now animated.
	outlineStyle?: BorderStyles;
	outlineWidth?: OutlineWidthValues;
	resize?: BasicCommonValues|string;
	textOverflow?: BasicCommonValues|string;
	breakAfter?: BasicCommonValues|string;
	breakBefore?: BasicCommonValues|string;
	breakInside?: BasicCommonValues|string;
	columnCount?: BasicCommonValues|string;
	columnFill?: BasicCommonValues|string;
	columnGap?: BasicCommonValues|string;
	columnRule?: BasicCommonValues|string;
	columnRuleStyle?: BasicCommonValues|string;
	columnRuleWidth?: BasicCommonValues|string;
	columnSpan?: BasicCommonValues|string;
	columnWidth?: BasicCommonValues|string;
	columns?: BasicCommonValues|string;
	widows?: BasicCommonValues|string;
	orphans?: BasicCommonValues|string;
	pageBreakAfter?: BasicCommonValues|string;
	pageBreakBefore?: BasicCommonValues|string;
	pageBreakInside?: BasicCommonValues|string;
	marks?: BasicCommonValues|string;
	quotes?: BasicCommonValues|string;
	imageRendering?: BasicCommonValues|string;
	imageResolution?: BasicCommonValues|string;
	objectFit?: BasicCommonValues|string;
	objectPosition?: BasicCommonValues|string;
	mask?: BasicCommonValues|string;
	maskType?: BasicCommonValues|string;
	mark?: BasicCommonValues|string;
	markAfter?: BasicCommonValues|string;
	markBefore?: BasicCommonValues|string;
	phonemes?: BasicCommonValues|string;
	rest?: BasicCommonValues|string;
	restAfter?: BasicCommonValues|string;
	restBefore?: BasicCommonValues|string;
	voiceBalance?: BasicCommonValues|string;
	voiceDuration?: BasicCommonValues|string;
	voicePitch?: BasicCommonValues|string;
	voicePitchRange?: BasicCommonValues|string;
	voiceRate?: BasicCommonValues|string;
	voiceStress?: BasicCommonValues|string;
	voiceVolume?: BasicCommonValues|string;
	marqueeDirection?: BasicCommonValues|string;
	marqueePlayCount?: BasicCommonValues|string;
	marqueeSpeed?: BasicCommonValues|string;
	marqueeStyle?: BasicCommonValues|string;
	pointerEvents?: BasicCommonValues|string;
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