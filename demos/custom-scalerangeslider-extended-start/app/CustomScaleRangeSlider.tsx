/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import { declared, subclass } from "esri/core/accessorSupport/decorators";
import { tsx } from "esri/widgets/support/widget";
import ScaleRangeSlider = require("esri/widgets/ScaleRangeSlider");

@subclass("esri.demo.CustomScaleRangeSlider")
class CustomScaleRangeSlider extends declared(ScaleRangeSlider) {

}

export = CustomScaleRangeSlider;
