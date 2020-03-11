/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import { declared, subclass } from "esri/core/accessorSupport/decorators";
import { tsx } from "esri/widgets/support/widget";
import ScaleRangeSlider = require("esri/widgets/ScaleRangeSlider");
import { on } from "esri/core/watchUtils";
import Slider = require("esri/widgets/Slider");

const CSS = {
  scaleIndicatorIcon: "custom-scale-range-slider__scale-indicator-icon"
};

// use interface merging to access internals
interface CustomScaleRangeSlider {
  _slider: Slider;
  _minThumbNode: HTMLElement;
  _maxThumbNode: HTMLElement;
}

@subclass("esri.demo.CustomScaleRangeSlider")
class CustomScaleRangeSlider extends declared(ScaleRangeSlider) {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  postInitialize(): void {
    ScaleRangeSlider.prototype.postInitialize.call(this);

    let dragging = false;

    this.own([
      on(this, "_slider", "thumb-drag", (event: MouseEvent): void => {
        dragging = true;
      }),

      on(this, "container", "click", (event: MouseEvent): void => {
        if (!dragging) {
          const targetNode = event.target as HTMLElement;

          if (targetNode.classList.contains("esri-slider__thumb")) {
            this.view.goTo({
              scale: targetNode === this._minThumbNode ? this.minScale : this.maxScale
            });
          }
        }

        dragging = false;
      })
    ]);
  }

  //--------------------------------------------------------------------------
  //
  //  Protected Methods
  //
  //--------------------------------------------------------------------------

  protected renderCurrentScaleIndicatorIcon() {
    return <div class={CSS.scaleIndicatorIcon}>☝️</div>;
  }
}

export = CustomScaleRangeSlider;
