

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
	color:(value: Color)=>IDotcssProp;
	backgroundColor:(value: Color)=>IDotcssProp;
	borderBottomColor:(value: Color)=>IDotcssProp;
	borderColor:(value: Color)=>IDotcssProp;
	borderLeftColor:(value: Color)=>IDotcssProp;
	borderRightColor:(value: Color)=>IDotcssProp;
	borderTopColor:(value: Color)=>IDotcssProp;
	textDecorationColor:(value: Color)=>IDotcssProp;
	outlineColor:(value: Color)=>IDotcssProp;
	columnRuleColor:(value: Color)=>IDotcssProp;

	//length:(value: 
	backgroundSize:(value: BackgroundSizeValues)=>IDotcssProp;
	backgroundSizeCm:(value: number)=>IDotcssProp;
	backgroundSizeCh:(value: number)=>IDotcssProp;
	backgroundSizeEm:(value: number)=>IDotcssProp;
	backgroundSizeEx:(value: number)=>IDotcssProp;
	backgroundSizeIn:(value: number)=>IDotcssProp;
	backgroundSizeMm:(value: number)=>IDotcssProp;
	backgroundSizeP:(value: number)=>IDotcssProp;
	backgroundSizePc:(value: number)=>IDotcssProp;
	backgroundSizePt:(value: number)=>IDotcssProp;
	backgroundSizePx:(value: number)=>IDotcssProp;
	backgroundSizeRem:(value: number)=>IDotcssProp;
	backgroundSizeVh:(value: number)=>IDotcssProp;
	backgroundSizeVw:(value: number)=>IDotcssProp;
	backgroundSizeVMax:(value: number)=>IDotcssProp;
	backgroundSizeVMin:(value: number)=>IDotcssProp;

	blockSize:(value: NumericLength)=>IDotcssProp;
	blockSizeCm:(value: number)=>IDotcssProp;
	blockSizeCh:(value: number)=>IDotcssProp;
	blockSizeEm:(value: number)=>IDotcssProp;
	blockSizeEx:(value: number)=>IDotcssProp;
	blockSizeIn:(value: number)=>IDotcssProp;
	blockSizeMm:(value: number)=>IDotcssProp;
	blockSizeP:(value: number)=>IDotcssProp;
	blockSizePc:(value: number)=>IDotcssProp;
	blockSizePt:(value: number)=>IDotcssProp;
	blockSizePx:(value: number)=>IDotcssProp;
	blockSizeRem:(value: number)=>IDotcssProp;
	blockSizeVh:(value: number)=>IDotcssProp;
	blockSizeVw:(value: number)=>IDotcssProp;
	blockSizeVMax:(value: number)=>IDotcssProp;
	blockSizeVMin:(value: number)=>IDotcssProp;

	borderBottomLeftRadius:(value: NumericLength)=>IDotcssProp;
	borderBottomLeftRadiusCm:(value: number)=>IDotcssProp;
	borderBottomLeftRadiusCh:(value: number)=>IDotcssProp;
	borderBottomLeftRadiusEm:(value: number)=>IDotcssProp;
	borderBottomLeftRadiusEx:(value: number)=>IDotcssProp;
	borderBottomLeftRadiusIn:(value: number)=>IDotcssProp;
	borderBottomLeftRadiusMm:(value: number)=>IDotcssProp;
	borderBottomLeftRadiusP:(value: number)=>IDotcssProp;
	borderBottomLeftRadiusPc:(value: number)=>IDotcssProp;
	borderBottomLeftRadiusPt:(value: number)=>IDotcssProp;
	borderBottomLeftRadiusPx:(value: number)=>IDotcssProp;
	borderBottomLeftRadiusRem:(value: number)=>IDotcssProp;
	borderBottomLeftRadiusVh:(value: number)=>IDotcssProp;
	borderBottomLeftRadiusVw:(value: number)=>IDotcssProp;
	borderBottomLeftRadiusVMax:(value: number)=>IDotcssProp;
	borderBottomLeftRadiusVMin:(value: number)=>IDotcssProp;

	borderBottomRightRadius:(value: NumericLength)=>IDotcssProp;
	borderBottomRightRadiusCm:(value: number)=>IDotcssProp;
	borderBottomRightRadiusCh:(value: number)=>IDotcssProp;
	borderBottomRightRadiusEm:(value: number)=>IDotcssProp;
	borderBottomRightRadiusEx:(value: number)=>IDotcssProp;
	borderBottomRightRadiusIn:(value: number)=>IDotcssProp;
	borderBottomRightRadiusMm:(value: number)=>IDotcssProp;
	borderBottomRightRadiusP:(value: number)=>IDotcssProp;
	borderBottomRightRadiusPc:(value: number)=>IDotcssProp;
	borderBottomRightRadiusPt:(value: number)=>IDotcssProp;
	borderBottomRightRadiusPx:(value: number)=>IDotcssProp;
	borderBottomRightRadiusRem:(value: number)=>IDotcssProp;
	borderBottomRightRadiusVh:(value: number)=>IDotcssProp;
	borderBottomRightRadiusVw:(value: number)=>IDotcssProp;
	borderBottomRightRadiusVMax:(value: number)=>IDotcssProp;
	borderBottomRightRadiusVMin:(value: number)=>IDotcssProp;

	borderBottomWidth:(value: NumericLength)=>IDotcssProp;
	borderBottomWidthCm:(value: number)=>IDotcssProp;
	borderBottomWidthCh:(value: number)=>IDotcssProp;
	borderBottomWidthEm:(value: number)=>IDotcssProp;
	borderBottomWidthEx:(value: number)=>IDotcssProp;
	borderBottomWidthIn:(value: number)=>IDotcssProp;
	borderBottomWidthMm:(value: number)=>IDotcssProp;
	borderBottomWidthP:(value: number)=>IDotcssProp;
	borderBottomWidthPc:(value: number)=>IDotcssProp;
	borderBottomWidthPt:(value: number)=>IDotcssProp;
	borderBottomWidthPx:(value: number)=>IDotcssProp;
	borderBottomWidthRem:(value: number)=>IDotcssProp;
	borderBottomWidthVh:(value: number)=>IDotcssProp;
	borderBottomWidthVw:(value: number)=>IDotcssProp;
	borderBottomWidthVMax:(value: number)=>IDotcssProp;
	borderBottomWidthVMin:(value: number)=>IDotcssProp;

	borderImageWidth:(value: NumericLength)=>IDotcssProp;
	borderImageWidthCm:(value: number)=>IDotcssProp;
	borderImageWidthCh:(value: number)=>IDotcssProp;
	borderImageWidthEm:(value: number)=>IDotcssProp;
	borderImageWidthEx:(value: number)=>IDotcssProp;
	borderImageWidthIn:(value: number)=>IDotcssProp;
	borderImageWidthMm:(value: number)=>IDotcssProp;
	borderImageWidthP:(value: number)=>IDotcssProp;
	borderImageWidthPc:(value: number)=>IDotcssProp;
	borderImageWidthPt:(value: number)=>IDotcssProp;
	borderImageWidthPx:(value: number)=>IDotcssProp;
	borderImageWidthRem:(value: number)=>IDotcssProp;
	borderImageWidthVh:(value: number)=>IDotcssProp;
	borderImageWidthVw:(value: number)=>IDotcssProp;
	borderImageWidthVMax:(value: number)=>IDotcssProp;
	borderImageWidthVMin:(value: number)=>IDotcssProp;

	borderLeftWidth:(value: NumericLength)=>IDotcssProp;
	borderLeftWidthCm:(value: number)=>IDotcssProp;
	borderLeftWidthCh:(value: number)=>IDotcssProp;
	borderLeftWidthEm:(value: number)=>IDotcssProp;
	borderLeftWidthEx:(value: number)=>IDotcssProp;
	borderLeftWidthIn:(value: number)=>IDotcssProp;
	borderLeftWidthMm:(value: number)=>IDotcssProp;
	borderLeftWidthP:(value: number)=>IDotcssProp;
	borderLeftWidthPc:(value: number)=>IDotcssProp;
	borderLeftWidthPt:(value: number)=>IDotcssProp;
	borderLeftWidthPx:(value: number)=>IDotcssProp;
	borderLeftWidthRem:(value: number)=>IDotcssProp;
	borderLeftWidthVh:(value: number)=>IDotcssProp;
	borderLeftWidthVw:(value: number)=>IDotcssProp;
	borderLeftWidthVMax:(value: number)=>IDotcssProp;
	borderLeftWidthVMin:(value: number)=>IDotcssProp;

	borderRadius:(value: NumericLength)=>IDotcssProp;
	borderRadiusCm:(value: number)=>IDotcssProp;
	borderRadiusCh:(value: number)=>IDotcssProp;
	borderRadiusEm:(value: number)=>IDotcssProp;
	borderRadiusEx:(value: number)=>IDotcssProp;
	borderRadiusIn:(value: number)=>IDotcssProp;
	borderRadiusMm:(value: number)=>IDotcssProp;
	borderRadiusP:(value: number)=>IDotcssProp;
	borderRadiusPc:(value: number)=>IDotcssProp;
	borderRadiusPt:(value: number)=>IDotcssProp;
	borderRadiusPx:(value: number)=>IDotcssProp;
	borderRadiusRem:(value: number)=>IDotcssProp;
	borderRadiusVh:(value: number)=>IDotcssProp;
	borderRadiusVw:(value: number)=>IDotcssProp;
	borderRadiusVMax:(value: number)=>IDotcssProp;
	borderRadiusVMin:(value: number)=>IDotcssProp;

	borderRightWidth:(value: NumericLength)=>IDotcssProp;
	borderRightWidthCm:(value: number)=>IDotcssProp;
	borderRightWidthCh:(value: number)=>IDotcssProp;
	borderRightWidthEm:(value: number)=>IDotcssProp;
	borderRightWidthEx:(value: number)=>IDotcssProp;
	borderRightWidthIn:(value: number)=>IDotcssProp;
	borderRightWidthMm:(value: number)=>IDotcssProp;
	borderRightWidthP:(value: number)=>IDotcssProp;
	borderRightWidthPc:(value: number)=>IDotcssProp;
	borderRightWidthPt:(value: number)=>IDotcssProp;
	borderRightWidthPx:(value: number)=>IDotcssProp;
	borderRightWidthRem:(value: number)=>IDotcssProp;
	borderRightWidthVh:(value: number)=>IDotcssProp;
	borderRightWidthVw:(value: number)=>IDotcssProp;
	borderRightWidthVMax:(value: number)=>IDotcssProp;
	borderRightWidthVMin:(value: number)=>IDotcssProp;

	borderTopLeftRadius:(value: NumericLength)=>IDotcssProp;
	borderTopLeftRadiusCm:(value: number)=>IDotcssProp;
	borderTopLeftRadiusCh:(value: number)=>IDotcssProp;
	borderTopLeftRadiusEm:(value: number)=>IDotcssProp;
	borderTopLeftRadiusEx:(value: number)=>IDotcssProp;
	borderTopLeftRadiusIn:(value: number)=>IDotcssProp;
	borderTopLeftRadiusMm:(value: number)=>IDotcssProp;
	borderTopLeftRadiusP:(value: number)=>IDotcssProp;
	borderTopLeftRadiusPc:(value: number)=>IDotcssProp;
	borderTopLeftRadiusPt:(value: number)=>IDotcssProp;
	borderTopLeftRadiusPx:(value: number)=>IDotcssProp;
	borderTopLeftRadiusRem:(value: number)=>IDotcssProp;
	borderTopLeftRadiusVh:(value: number)=>IDotcssProp;
	borderTopLeftRadiusVw:(value: number)=>IDotcssProp;
	borderTopLeftRadiusVMax:(value: number)=>IDotcssProp;
	borderTopLeftRadiusVMin:(value: number)=>IDotcssProp;

	borderTopRightRadius:(value: NumericLength)=>IDotcssProp;
	borderTopRightRadiusCm:(value: number)=>IDotcssProp;
	borderTopRightRadiusCh:(value: number)=>IDotcssProp;
	borderTopRightRadiusEm:(value: number)=>IDotcssProp;
	borderTopRightRadiusEx:(value: number)=>IDotcssProp;
	borderTopRightRadiusIn:(value: number)=>IDotcssProp;
	borderTopRightRadiusMm:(value: number)=>IDotcssProp;
	borderTopRightRadiusP:(value: number)=>IDotcssProp;
	borderTopRightRadiusPc:(value: number)=>IDotcssProp;
	borderTopRightRadiusPt:(value: number)=>IDotcssProp;
	borderTopRightRadiusPx:(value: number)=>IDotcssProp;
	borderTopRightRadiusRem:(value: number)=>IDotcssProp;
	borderTopRightRadiusVh:(value: number)=>IDotcssProp;
	borderTopRightRadiusVw:(value: number)=>IDotcssProp;
	borderTopRightRadiusVMax:(value: number)=>IDotcssProp;
	borderTopRightRadiusVMin:(value: number)=>IDotcssProp;

	borderTopWidth:(value: NumericLength)=>IDotcssProp;
	borderTopWidthCm:(value: number)=>IDotcssProp;
	borderTopWidthCh:(value: number)=>IDotcssProp;
	borderTopWidthEm:(value: number)=>IDotcssProp;
	borderTopWidthEx:(value: number)=>IDotcssProp;
	borderTopWidthIn:(value: number)=>IDotcssProp;
	borderTopWidthMm:(value: number)=>IDotcssProp;
	borderTopWidthP:(value: number)=>IDotcssProp;
	borderTopWidthPc:(value: number)=>IDotcssProp;
	borderTopWidthPt:(value: number)=>IDotcssProp;
	borderTopWidthPx:(value: number)=>IDotcssProp;
	borderTopWidthRem:(value: number)=>IDotcssProp;
	borderTopWidthVh:(value: number)=>IDotcssProp;
	borderTopWidthVw:(value: number)=>IDotcssProp;
	borderTopWidthVMax:(value: number)=>IDotcssProp;
	borderTopWidthVMin:(value: number)=>IDotcssProp;

	borderWidth:(value: NumericLength)=>IDotcssProp;
	borderWidthCm:(value: number)=>IDotcssProp;
	borderWidthCh:(value: number)=>IDotcssProp;
	borderWidthEm:(value: number)=>IDotcssProp;
	borderWidthEx:(value: number)=>IDotcssProp;
	borderWidthIn:(value: number)=>IDotcssProp;
	borderWidthMm:(value: number)=>IDotcssProp;
	borderWidthP:(value: number)=>IDotcssProp;
	borderWidthPc:(value: number)=>IDotcssProp;
	borderWidthPt:(value: number)=>IDotcssProp;
	borderWidthPx:(value: number)=>IDotcssProp;
	borderWidthRem:(value: number)=>IDotcssProp;
	borderWidthVh:(value: number)=>IDotcssProp;
	borderWidthVw:(value: number)=>IDotcssProp;
	borderWidthVMax:(value: number)=>IDotcssProp;
	borderWidthVMin:(value: number)=>IDotcssProp;

	bottom:(value: NumericLengthOrAuto)=>IDotcssProp;
	bottomCm:(value: number)=>IDotcssProp;
	bottomCh:(value: number)=>IDotcssProp;
	bottomEm:(value: number)=>IDotcssProp;
	bottomEx:(value: number)=>IDotcssProp;
	bottomIn:(value: number)=>IDotcssProp;
	bottomMm:(value: number)=>IDotcssProp;
	bottomP:(value: number)=>IDotcssProp;
	bottomPc:(value: number)=>IDotcssProp;
	bottomPt:(value: number)=>IDotcssProp;
	bottomPx:(value: number)=>IDotcssProp;
	bottomRem:(value: number)=>IDotcssProp;
	bottomVh:(value: number)=>IDotcssProp;
	bottomVw:(value: number)=>IDotcssProp;
	bottomVMax:(value: number)=>IDotcssProp;
	bottomVMin:(value: number)=>IDotcssProp;

	gap:(value: NumericLength)=>IDotcssProp;
	gapCm:(value: number)=>IDotcssProp;
	gapCh:(value: number)=>IDotcssProp;
	gapEm:(value: number)=>IDotcssProp;
	gapEx:(value: number)=>IDotcssProp;
	gapIn:(value: number)=>IDotcssProp;
	gapMm:(value: number)=>IDotcssProp;
	gapP:(value: number)=>IDotcssProp;
	gapPc:(value: number)=>IDotcssProp;
	gapPt:(value: number)=>IDotcssProp;
	gapPx:(value: number)=>IDotcssProp;
	gapRem:(value: number)=>IDotcssProp;
	gapVh:(value: number)=>IDotcssProp;
	gapVw:(value: number)=>IDotcssProp;
	gapVMax:(value: number)=>IDotcssProp;
	gapVMin:(value: number)=>IDotcssProp;

	height:(value: NumericLengthOrAuto)=>IDotcssProp;
	heightCm:(value: number)=>IDotcssProp;
	heightCh:(value: number)=>IDotcssProp;
	heightEm:(value: number)=>IDotcssProp;
	heightEx:(value: number)=>IDotcssProp;
	heightIn:(value: number)=>IDotcssProp;
	heightMm:(value: number)=>IDotcssProp;
	heightP:(value: number)=>IDotcssProp;
	heightPc:(value: number)=>IDotcssProp;
	heightPt:(value: number)=>IDotcssProp;
	heightPx:(value: number)=>IDotcssProp;
	heightRem:(value: number)=>IDotcssProp;
	heightVh:(value: number)=>IDotcssProp;
	heightVw:(value: number)=>IDotcssProp;
	heightVMax:(value: number)=>IDotcssProp;
	heightVMin:(value: number)=>IDotcssProp;

	left:(value: NumericLengthOrAuto)=>IDotcssProp;
	leftCm:(value: number)=>IDotcssProp;
	leftCh:(value: number)=>IDotcssProp;
	leftEm:(value: number)=>IDotcssProp;
	leftEx:(value: number)=>IDotcssProp;
	leftIn:(value: number)=>IDotcssProp;
	leftMm:(value: number)=>IDotcssProp;
	leftP:(value: number)=>IDotcssProp;
	leftPc:(value: number)=>IDotcssProp;
	leftPt:(value: number)=>IDotcssProp;
	leftPx:(value: number)=>IDotcssProp;
	leftRem:(value: number)=>IDotcssProp;
	leftVh:(value: number)=>IDotcssProp;
	leftVw:(value: number)=>IDotcssProp;
	leftVMax:(value: number)=>IDotcssProp;
	leftVMin:(value: number)=>IDotcssProp;

	margin:(value: NumericLengthOrAuto)=>IDotcssProp;
	marginCm:(value: number)=>IDotcssProp;
	marginCh:(value: number)=>IDotcssProp;
	marginEm:(value: number)=>IDotcssProp;
	marginEx:(value: number)=>IDotcssProp;
	marginIn:(value: number)=>IDotcssProp;
	marginMm:(value: number)=>IDotcssProp;
	marginP:(value: number)=>IDotcssProp;
	marginPc:(value: number)=>IDotcssProp;
	marginPt:(value: number)=>IDotcssProp;
	marginPx:(value: number)=>IDotcssProp;
	marginRem:(value: number)=>IDotcssProp;
	marginVh:(value: number)=>IDotcssProp;
	marginVw:(value: number)=>IDotcssProp;
	marginVMax:(value: number)=>IDotcssProp;
	marginVMin:(value: number)=>IDotcssProp;

	marginBottom:(value: NumericLengthOrAuto)=>IDotcssProp;
	marginBottomCm:(value: number)=>IDotcssProp;
	marginBottomCh:(value: number)=>IDotcssProp;
	marginBottomEm:(value: number)=>IDotcssProp;
	marginBottomEx:(value: number)=>IDotcssProp;
	marginBottomIn:(value: number)=>IDotcssProp;
	marginBottomMm:(value: number)=>IDotcssProp;
	marginBottomP:(value: number)=>IDotcssProp;
	marginBottomPc:(value: number)=>IDotcssProp;
	marginBottomPt:(value: number)=>IDotcssProp;
	marginBottomPx:(value: number)=>IDotcssProp;
	marginBottomRem:(value: number)=>IDotcssProp;
	marginBottomVh:(value: number)=>IDotcssProp;
	marginBottomVw:(value: number)=>IDotcssProp;
	marginBottomVMax:(value: number)=>IDotcssProp;
	marginBottomVMin:(value: number)=>IDotcssProp;

	marginLeft:(value: NumericLengthOrAuto)=>IDotcssProp;
	marginLeftCm:(value: number)=>IDotcssProp;
	marginLeftCh:(value: number)=>IDotcssProp;
	marginLeftEm:(value: number)=>IDotcssProp;
	marginLeftEx:(value: number)=>IDotcssProp;
	marginLeftIn:(value: number)=>IDotcssProp;
	marginLeftMm:(value: number)=>IDotcssProp;
	marginLeftP:(value: number)=>IDotcssProp;
	marginLeftPc:(value: number)=>IDotcssProp;
	marginLeftPt:(value: number)=>IDotcssProp;
	marginLeftPx:(value: number)=>IDotcssProp;
	marginLeftRem:(value: number)=>IDotcssProp;
	marginLeftVh:(value: number)=>IDotcssProp;
	marginLeftVw:(value: number)=>IDotcssProp;
	marginLeftVMax:(value: number)=>IDotcssProp;
	marginLeftVMin:(value: number)=>IDotcssProp;

	marginRight:(value: NumericLengthOrAuto)=>IDotcssProp;
	marginRightCm:(value: number)=>IDotcssProp;
	marginRightCh:(value: number)=>IDotcssProp;
	marginRightEm:(value: number)=>IDotcssProp;
	marginRightEx:(value: number)=>IDotcssProp;
	marginRightIn:(value: number)=>IDotcssProp;
	marginRightMm:(value: number)=>IDotcssProp;
	marginRightP:(value: number)=>IDotcssProp;
	marginRightPc:(value: number)=>IDotcssProp;
	marginRightPt:(value: number)=>IDotcssProp;
	marginRightPx:(value: number)=>IDotcssProp;
	marginRightRem:(value: number)=>IDotcssProp;
	marginRightVh:(value: number)=>IDotcssProp;
	marginRightVw:(value: number)=>IDotcssProp;
	marginRightVMax:(value: number)=>IDotcssProp;
	marginRightVMin:(value: number)=>IDotcssProp;

	marginTop:(value: NumericLengthOrAuto)=>IDotcssProp;
	marginTopCm:(value: number)=>IDotcssProp;
	marginTopCh:(value: number)=>IDotcssProp;
	marginTopEm:(value: number)=>IDotcssProp;
	marginTopEx:(value: number)=>IDotcssProp;
	marginTopIn:(value: number)=>IDotcssProp;
	marginTopMm:(value: number)=>IDotcssProp;
	marginTopP:(value: number)=>IDotcssProp;
	marginTopPc:(value: number)=>IDotcssProp;
	marginTopPt:(value: number)=>IDotcssProp;
	marginTopPx:(value: number)=>IDotcssProp;
	marginTopRem:(value: number)=>IDotcssProp;
	marginTopVh:(value: number)=>IDotcssProp;
	marginTopVw:(value: number)=>IDotcssProp;
	marginTopVMax:(value: number)=>IDotcssProp;
	marginTopVMin:(value: number)=>IDotcssProp;

	maxHeight:(value: NumericLengthOrAuto)=>IDotcssProp;
	maxHeightCm:(value: number)=>IDotcssProp;
	maxHeightCh:(value: number)=>IDotcssProp;
	maxHeightEm:(value: number)=>IDotcssProp;
	maxHeightEx:(value: number)=>IDotcssProp;
	maxHeightIn:(value: number)=>IDotcssProp;
	maxHeightMm:(value: number)=>IDotcssProp;
	maxHeightP:(value: number)=>IDotcssProp;
	maxHeightPc:(value: number)=>IDotcssProp;
	maxHeightPt:(value: number)=>IDotcssProp;
	maxHeightPx:(value: number)=>IDotcssProp;
	maxHeightRem:(value: number)=>IDotcssProp;
	maxHeightVh:(value: number)=>IDotcssProp;
	maxHeightVw:(value: number)=>IDotcssProp;
	maxHeightVMax:(value: number)=>IDotcssProp;
	maxHeightVMin:(value: number)=>IDotcssProp;

	maxWidth:(value: NumericLengthOrAuto)=>IDotcssProp;
	maxWidthCm:(value: number)=>IDotcssProp;
	maxWidthCh:(value: number)=>IDotcssProp;
	maxWidthEm:(value: number)=>IDotcssProp;
	maxWidthEx:(value: number)=>IDotcssProp;
	maxWidthIn:(value: number)=>IDotcssProp;
	maxWidthMm:(value: number)=>IDotcssProp;
	maxWidthP:(value: number)=>IDotcssProp;
	maxWidthPc:(value: number)=>IDotcssProp;
	maxWidthPt:(value: number)=>IDotcssProp;
	maxWidthPx:(value: number)=>IDotcssProp;
	maxWidthRem:(value: number)=>IDotcssProp;
	maxWidthVh:(value: number)=>IDotcssProp;
	maxWidthVw:(value: number)=>IDotcssProp;
	maxWidthVMax:(value: number)=>IDotcssProp;
	maxWidthVMin:(value: number)=>IDotcssProp;

	minHeight:(value: NumericLengthOrAuto)=>IDotcssProp;
	minHeightCm:(value: number)=>IDotcssProp;
	minHeightCh:(value: number)=>IDotcssProp;
	minHeightEm:(value: number)=>IDotcssProp;
	minHeightEx:(value: number)=>IDotcssProp;
	minHeightIn:(value: number)=>IDotcssProp;
	minHeightMm:(value: number)=>IDotcssProp;
	minHeightP:(value: number)=>IDotcssProp;
	minHeightPc:(value: number)=>IDotcssProp;
	minHeightPt:(value: number)=>IDotcssProp;
	minHeightPx:(value: number)=>IDotcssProp;
	minHeightRem:(value: number)=>IDotcssProp;
	minHeightVh:(value: number)=>IDotcssProp;
	minHeightVw:(value: number)=>IDotcssProp;
	minHeightVMax:(value: number)=>IDotcssProp;
	minHeightVMin:(value: number)=>IDotcssProp;

	minWidth:(value: NumericLengthOrAuto)=>IDotcssProp;
	minWidthCm:(value: number)=>IDotcssProp;
	minWidthCh:(value: number)=>IDotcssProp;
	minWidthEm:(value: number)=>IDotcssProp;
	minWidthEx:(value: number)=>IDotcssProp;
	minWidthIn:(value: number)=>IDotcssProp;
	minWidthMm:(value: number)=>IDotcssProp;
	minWidthP:(value: number)=>IDotcssProp;
	minWidthPc:(value: number)=>IDotcssProp;
	minWidthPt:(value: number)=>IDotcssProp;
	minWidthPx:(value: number)=>IDotcssProp;
	minWidthRem:(value: number)=>IDotcssProp;
	minWidthVh:(value: number)=>IDotcssProp;
	minWidthVw:(value: number)=>IDotcssProp;
	minWidthVMax:(value: number)=>IDotcssProp;
	minWidthVMin:(value: number)=>IDotcssProp;

	outlineOffset:(value: NumericLength)=>IDotcssProp;
	outlineOffsetCm:(value: number)=>IDotcssProp;
	outlineOffsetCh:(value: number)=>IDotcssProp;
	outlineOffsetEm:(value: number)=>IDotcssProp;
	outlineOffsetEx:(value: number)=>IDotcssProp;
	outlineOffsetIn:(value: number)=>IDotcssProp;
	outlineOffsetMm:(value: number)=>IDotcssProp;
	outlineOffsetP:(value: number)=>IDotcssProp;
	outlineOffsetPc:(value: number)=>IDotcssProp;
	outlineOffsetPt:(value: number)=>IDotcssProp;
	outlineOffsetPx:(value: number)=>IDotcssProp;
	outlineOffsetRem:(value: number)=>IDotcssProp;
	outlineOffsetVh:(value: number)=>IDotcssProp;
	outlineOffsetVw:(value: number)=>IDotcssProp;
	outlineOffsetVMax:(value: number)=>IDotcssProp;
	outlineOffsetVMin:(value: number)=>IDotcssProp;

	padding:(value: NumericLengthOrAuto)=>IDotcssProp;
	paddingCm:(value: number)=>IDotcssProp;
	paddingCh:(value: number)=>IDotcssProp;
	paddingEm:(value: number)=>IDotcssProp;
	paddingEx:(value: number)=>IDotcssProp;
	paddingIn:(value: number)=>IDotcssProp;
	paddingMm:(value: number)=>IDotcssProp;
	paddingP:(value: number)=>IDotcssProp;
	paddingPc:(value: number)=>IDotcssProp;
	paddingPt:(value: number)=>IDotcssProp;
	paddingPx:(value: number)=>IDotcssProp;
	paddingRem:(value: number)=>IDotcssProp;
	paddingVh:(value: number)=>IDotcssProp;
	paddingVw:(value: number)=>IDotcssProp;
	paddingVMax:(value: number)=>IDotcssProp;
	paddingVMin:(value: number)=>IDotcssProp;

	paddingBottom:(value: NumericLengthOrAuto)=>IDotcssProp;
	paddingBottomCm:(value: number)=>IDotcssProp;
	paddingBottomCh:(value: number)=>IDotcssProp;
	paddingBottomEm:(value: number)=>IDotcssProp;
	paddingBottomEx:(value: number)=>IDotcssProp;
	paddingBottomIn:(value: number)=>IDotcssProp;
	paddingBottomMm:(value: number)=>IDotcssProp;
	paddingBottomP:(value: number)=>IDotcssProp;
	paddingBottomPc:(value: number)=>IDotcssProp;
	paddingBottomPt:(value: number)=>IDotcssProp;
	paddingBottomPx:(value: number)=>IDotcssProp;
	paddingBottomRem:(value: number)=>IDotcssProp;
	paddingBottomVh:(value: number)=>IDotcssProp;
	paddingBottomVw:(value: number)=>IDotcssProp;
	paddingBottomVMax:(value: number)=>IDotcssProp;
	paddingBottomVMin:(value: number)=>IDotcssProp;

	paddingLeft:(value: NumericLengthOrAuto)=>IDotcssProp;
	paddingLeftCm:(value: number)=>IDotcssProp;
	paddingLeftCh:(value: number)=>IDotcssProp;
	paddingLeftEm:(value: number)=>IDotcssProp;
	paddingLeftEx:(value: number)=>IDotcssProp;
	paddingLeftIn:(value: number)=>IDotcssProp;
	paddingLeftMm:(value: number)=>IDotcssProp;
	paddingLeftP:(value: number)=>IDotcssProp;
	paddingLeftPc:(value: number)=>IDotcssProp;
	paddingLeftPt:(value: number)=>IDotcssProp;
	paddingLeftPx:(value: number)=>IDotcssProp;
	paddingLeftRem:(value: number)=>IDotcssProp;
	paddingLeftVh:(value: number)=>IDotcssProp;
	paddingLeftVw:(value: number)=>IDotcssProp;
	paddingLeftVMax:(value: number)=>IDotcssProp;
	paddingLeftVMin:(value: number)=>IDotcssProp;

	paddingRight:(value: NumericLengthOrAuto)=>IDotcssProp;
	paddingRightCm:(value: number)=>IDotcssProp;
	paddingRightCh:(value: number)=>IDotcssProp;
	paddingRightEm:(value: number)=>IDotcssProp;
	paddingRightEx:(value: number)=>IDotcssProp;
	paddingRightIn:(value: number)=>IDotcssProp;
	paddingRightMm:(value: number)=>IDotcssProp;
	paddingRightP:(value: number)=>IDotcssProp;
	paddingRightPc:(value: number)=>IDotcssProp;
	paddingRightPt:(value: number)=>IDotcssProp;
	paddingRightPx:(value: number)=>IDotcssProp;
	paddingRightRem:(value: number)=>IDotcssProp;
	paddingRightVh:(value: number)=>IDotcssProp;
	paddingRightVw:(value: number)=>IDotcssProp;
	paddingRightVMax:(value: number)=>IDotcssProp;
	paddingRightVMin:(value: number)=>IDotcssProp;

	paddingTop:(value: NumericLengthOrAuto)=>IDotcssProp;
	paddingTopCm:(value: number)=>IDotcssProp;
	paddingTopCh:(value: number)=>IDotcssProp;
	paddingTopEm:(value: number)=>IDotcssProp;
	paddingTopEx:(value: number)=>IDotcssProp;
	paddingTopIn:(value: number)=>IDotcssProp;
	paddingTopMm:(value: number)=>IDotcssProp;
	paddingTopP:(value: number)=>IDotcssProp;
	paddingTopPc:(value: number)=>IDotcssProp;
	paddingTopPt:(value: number)=>IDotcssProp;
	paddingTopPx:(value: number)=>IDotcssProp;
	paddingTopRem:(value: number)=>IDotcssProp;
	paddingTopVh:(value: number)=>IDotcssProp;
	paddingTopVw:(value: number)=>IDotcssProp;
	paddingTopVMax:(value: number)=>IDotcssProp;
	paddingTopVMin:(value: number)=>IDotcssProp;

	right:(value: NumericLengthOrAuto)=>IDotcssProp;
	rightCm:(value: number)=>IDotcssProp;
	rightCh:(value: number)=>IDotcssProp;
	rightEm:(value: number)=>IDotcssProp;
	rightEx:(value: number)=>IDotcssProp;
	rightIn:(value: number)=>IDotcssProp;
	rightMm:(value: number)=>IDotcssProp;
	rightP:(value: number)=>IDotcssProp;
	rightPc:(value: number)=>IDotcssProp;
	rightPt:(value: number)=>IDotcssProp;
	rightPx:(value: number)=>IDotcssProp;
	rightRem:(value: number)=>IDotcssProp;
	rightVh:(value: number)=>IDotcssProp;
	rightVw:(value: number)=>IDotcssProp;
	rightVMax:(value: number)=>IDotcssProp;
	rightVMin:(value: number)=>IDotcssProp;

	textIndent:(value: NumericLengthOrAuto)=>IDotcssProp;
	textIndentCm:(value: number)=>IDotcssProp;
	textIndentCh:(value: number)=>IDotcssProp;
	textIndentEm:(value: number)=>IDotcssProp;
	textIndentEx:(value: number)=>IDotcssProp;
	textIndentIn:(value: number)=>IDotcssProp;
	textIndentMm:(value: number)=>IDotcssProp;
	textIndentP:(value: number)=>IDotcssProp;
	textIndentPc:(value: number)=>IDotcssProp;
	textIndentPt:(value: number)=>IDotcssProp;
	textIndentPx:(value: number)=>IDotcssProp;
	textIndentRem:(value: number)=>IDotcssProp;
	textIndentVh:(value: number)=>IDotcssProp;
	textIndentVw:(value: number)=>IDotcssProp;
	textIndentVMax:(value: number)=>IDotcssProp;
	textIndentVMin:(value: number)=>IDotcssProp;

	top:(value: NumericLengthOrAuto)=>IDotcssProp;
	topCm:(value: number)=>IDotcssProp;
	topCh:(value: number)=>IDotcssProp;
	topEm:(value: number)=>IDotcssProp;
	topEx:(value: number)=>IDotcssProp;
	topIn:(value: number)=>IDotcssProp;
	topMm:(value: number)=>IDotcssProp;
	topP:(value: number)=>IDotcssProp;
	topPc:(value: number)=>IDotcssProp;
	topPt:(value: number)=>IDotcssProp;
	topPx:(value: number)=>IDotcssProp;
	topRem:(value: number)=>IDotcssProp;
	topVh:(value: number)=>IDotcssProp;
	topVw:(value: number)=>IDotcssProp;
	topVMax:(value: number)=>IDotcssProp;
	topVMin:(value: number)=>IDotcssProp;

	width:(value: NumericLengthOrAuto)=>IDotcssProp;
	widthCm:(value: number)=>IDotcssProp;
	widthCh:(value: number)=>IDotcssProp;
	widthEm:(value: number)=>IDotcssProp;
	widthEx:(value: number)=>IDotcssProp;
	widthIn:(value: number)=>IDotcssProp;
	widthMm:(value: number)=>IDotcssProp;
	widthP:(value: number)=>IDotcssProp;
	widthPc:(value: number)=>IDotcssProp;
	widthPt:(value: number)=>IDotcssProp;
	widthPx:(value: number)=>IDotcssProp;
	widthRem:(value: number)=>IDotcssProp;
	widthVh:(value: number)=>IDotcssProp;
	widthVw:(value: number)=>IDotcssProp;
	widthVMax:(value: number)=>IDotcssProp;
	widthVMin:(value: number)=>IDotcssProp;

	lineHeight:(value: NumericLength)=>IDotcssProp;
	lineHeightCm:(value: number)=>IDotcssProp;
	lineHeightCh:(value: number)=>IDotcssProp;
	lineHeightEm:(value: number)=>IDotcssProp;
	lineHeightEx:(value: number)=>IDotcssProp;
	lineHeightIn:(value: number)=>IDotcssProp;
	lineHeightMm:(value: number)=>IDotcssProp;
	lineHeightP:(value: number)=>IDotcssProp;
	lineHeightPc:(value: number)=>IDotcssProp;
	lineHeightPt:(value: number)=>IDotcssProp;
	lineHeightPx:(value: number)=>IDotcssProp;
	lineHeightRem:(value: number)=>IDotcssProp;
	lineHeightVh:(value: number)=>IDotcssProp;
	lineHeightVw:(value: number)=>IDotcssProp;
	lineHeightVMax:(value: number)=>IDotcssProp;
	lineHeightVMin:(value: number)=>IDotcssProp;

	fontSize:(value: NumericLength)=>IDotcssProp;
	fontSizeCm:(value: number)=>IDotcssProp;
	fontSizeCh:(value: number)=>IDotcssProp;
	fontSizeEm:(value: number)=>IDotcssProp;
	fontSizeEx:(value: number)=>IDotcssProp;
	fontSizeIn:(value: number)=>IDotcssProp;
	fontSizeMm:(value: number)=>IDotcssProp;
	fontSizeP:(value: number)=>IDotcssProp;
	fontSizePc:(value: number)=>IDotcssProp;
	fontSizePt:(value: number)=>IDotcssProp;
	fontSizePx:(value: number)=>IDotcssProp;
	fontSizeRem:(value: number)=>IDotcssProp;
	fontSizeVh:(value: number)=>IDotcssProp;
	fontSizeVw:(value: number)=>IDotcssProp;
	fontSizeVMax:(value: number)=>IDotcssProp;
	fontSizeVMin:(value: number)=>IDotcssProp;

	flexBasis:(value: NumericLengthOrAuto)=>IDotcssProp;
	flexBasisCm:(value: number)=>IDotcssProp;
	flexBasisCh:(value: number)=>IDotcssProp;
	flexBasisEm:(value: number)=>IDotcssProp;
	flexBasisEx:(value: number)=>IDotcssProp;
	flexBasisIn:(value: number)=>IDotcssProp;
	flexBasisMm:(value: number)=>IDotcssProp;
	flexBasisP:(value: number)=>IDotcssProp;
	flexBasisPc:(value: number)=>IDotcssProp;
	flexBasisPt:(value: number)=>IDotcssProp;
	flexBasisPx:(value: number)=>IDotcssProp;
	flexBasisRem:(value: number)=>IDotcssProp;
	flexBasisVh:(value: number)=>IDotcssProp;
	flexBasisVw:(value: number)=>IDotcssProp;
	flexBasisVMax:(value: number)=>IDotcssProp;
	flexBasisVMin:(value: number)=>IDotcssProp;
	
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
	opacity: number|string;

	//misc: 
	all: (value: BasicCommonValues)=>IDotcssProp;
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