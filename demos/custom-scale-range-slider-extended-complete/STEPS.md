# Extending View Demo (pt 1): Steps

**Note**: Steps assume development environment has been previously set up.

Please refer to the following for more information:

- [Setting up TypeScript](https://developers.arcgis.com/javascript/latest/guide/typescript-setup/index.html)
- [Widget Development](https://developers.arcgis.com/javascript/latest/guide/custom-widget/index.html)
____________

1. Open `index.html`
    - simple app setup
    - imports custom widget

2. Open `CustomScaleRangeSlider.tsx`
    - widget extension boilerplate

```tsx
/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import { declared, subclass } from "esri/core/accessorSupport/decorators";
import { tsx } from "esri/widgets/support/widget";
import ScaleRangeSlider = require("esri/widgets/ScaleRangeSlider");

@subclass("esri.demo.CustomScaleRangeSlider")
class CustomScaleRangeSlider extends declared(ScaleRangeSlider) {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor(props: __esri.ScaleRangeSliderProperties) {
    super();
  }
}

export = CustomScaleRangeSlider;
```

3. Simply replace `render` with your custom rendering:

```tsx
const CSS = {
  scaleIndicatorIcon:
    "esri-scale-range-slider__scale-indicator-icon custom-scale-range-slider__scale-indicator-icon"
};
```

```tsx
//--------------------------------------------------------------------------
//
//  Protected Methods
//
//--------------------------------------------------------------------------

protected renderCurrentScaleIndicatorIcon() {
  return <div class={CSS.scaleIndicatorIcon}>☝️</div>;
}
```

4. Let's add some custom functionality:

```tsx 
import { on } from "esri/core/watchUtils";
import Slider = require("esri/widgets/Slider");

// use interface merging to access internals
interface CustomScaleRangeSlider {
  _slider: Slider;
  _minThumbNode: HTMLElement;
  _maxThumbNode: HTMLElement;
}
```

```tsx
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
```
