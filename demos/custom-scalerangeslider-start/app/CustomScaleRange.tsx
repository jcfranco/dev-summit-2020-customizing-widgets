/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate"/>
/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends"/>

// esri.core.accessorSupport
import { declared, subclass } from "esri/core/accessorSupport/decorators";

// esri.widgets
import Widget = require("esri/widgets/Widget");

const CSS = {};

@subclass("demo.CustomScaleRange")
class CustomScaleRange extends declared(Widget) {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor(params?: {}) {
    super(params);
  }

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  render() {}

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
}

export = CustomScaleRange;
