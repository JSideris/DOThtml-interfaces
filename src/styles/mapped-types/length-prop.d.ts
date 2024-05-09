import { IReactive } from "../../bindings/i-reactive";
import { IBinding } from "../../bindings/i-binding";
import { GKV } from "../css-types";
// import { NumericLength } from "./css-types";

type LengthUnitSuffix = "" | "Cm" | "Ch" | "Em" | "Ex" | "In" | "Mm" | "P" | "Pc" | "Pt" | "Px" | "Rem" | "Vh" | "Vw" | "VMax" | "VMin";

type V<S> = IBinding<any> | number | S;

type LengthProp<Prefix extends string, Qty extends 1|2|3|4 = 1, S extends string|IReactive = GKV> = {
	[Key in LengthUnitSuffix as `${Prefix}${Key}`]?: (
		(Qty extends 1 ? V<S>|[V<S>] : void) |
		(Qty extends 2 ? [V<S>, V<S>] : void) |
		(Qty extends 3 ? [V<S>, V<S>, V<S>] : void) |
		(Qty extends 4 ? [V<S>, V<S>, V<S>, V<S>] : void)
	);
};

export default LengthProp;
