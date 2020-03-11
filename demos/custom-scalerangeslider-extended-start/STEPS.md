# Extending View Demo (pt 1): Steps

**Note**: Steps assume development environment has been previously set up.

Please refer to the following for more information:

- [Setting up TypeScript](https://developers.arcgis.com/javascript/latest/guide/typescript-setup/index.html)
- [Widget Development](https://developers.arcgis.com/javascript/latest/guide/custom-widget/index.html)
____________

1. Open `index.html`
    - simple app setup
    - imports custom widget

1. Open `CustomScaleRangeSlider.tsx`
    - widget extension boilerplate

```tsx
/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import { declared, subclass } from "esri/core/accessorSupport/decorators";
import { tsx } from "esri/widgets/support/widget";
import ScaleRangeSlider = require("esri/widgets/ScaleRangeSlider");

@subclass("esri.demo.CustomScaleRangeSlider")
class CustomScaleRangeSlider extends declared(ScaleRangeSlider) {

}

export = CustomScaleRangeSlider;
```

1. Next up, we'll customize rendering. Namely, the current scale indicator icon. We can do this by simply replacing `render` with our custom render method:

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

This method references a CSS lookup object, which we can bring over.

```tsx
const CSS = { 
  scaleIndicatorIcon: "esri-scale-range-slider__scale-indicator-icon" 
};
```

Note that we referenced the original class plus a custom one. 

1. We've customized rendering for this widget and we can now preview our changes.  

1. Now, we can focus on adding custom functionality. We'll enhance this widget by making it zoom to the min/max scale when a slider thumb is clicked. We'll do this by leveraging the widget lifecycle and using some of the widget internals.  

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
