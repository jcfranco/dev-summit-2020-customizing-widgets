# Custom View Demo: Steps

## Look over

1. `index.html`
2. `app/main.ts`
3. `app/CustomScaleRangeSlider.tsx`

## Setup properties of custom view

### Add `layer` Property

```ts
//----------------------------------
//  layer
//----------------------------------

@property({
  aliasOf: "viewModel.layer"
})
layer: Layer = null;
```

```ts
// esri
import Layer = require("esri/layers/Layer");
```

### Add property for `rangeType` and `region`

```ts
//----------------------------------
//  rangeType
//----------------------------------

@property()
@renderable()
rangeType: RangeType = "from";

//----------------------------------
//  region
//----------------------------------

@property()
@renderable()
region: string = "US";
```

```ts
type RangeType = "from" | "to";
```

### Add `view` and `viewModel` properties

```ts
//----------------------------------
//  view
//----------------------------------

@property({
  aliasOf: "viewModel.view"
})
view: MapView | SceneView = null;

//----------------------------------
//  viewModel
//----------------------------------

@property()
@renderable([
  "viewModel.state",
  "viewModel.scaleRanges",
  "viewModel.scaleRanges.length",
  "viewModel.maxScale",
  "viewModel.minScale"
])
viewModel: ScaleRangeSliderViewModel = new ScaleRangeSliderViewModel();
```

```ts
// esri.views
import MapView = require("esri/views/MapView");
import SceneView = require("esri/views/SceneView");
```

```ts
import ScaleRangeSliderViewModel = require("esri/widgets/ScaleRangeSlider/ScaleRangeSliderViewModel");
```

## Compile

View console and inspect widget object.

## Rendering

Now we can start rendering our widget~

### Lets add CSS classes to use

The CSS has already been setup, we can just have a map of our classes.

```ts
const CSS = {
  base: "custom-scale-range",
  tabList: "custom-scale-range__tab-list",
  tabItem: "custom-scale-range__tab-item",
  tabButton: "custom-scale-range__tab-button",
  tabButtonActive: "custom-scale-range__tab-button--active",
  scaleList: "custom-scale-range__scale-list",
  scaleItem: "custom-scale-range__scale-item",
  scaleButton: "custom-scale-range__scale-button",
  scaleButtonActive: "custom-scale-range__scale-button--active",
  scaleLabel: "custom-scale-range__scale-label"
};
```

### Modify `render()` method

Lets setup our widget to have two lists.

```tsx
const {
  view,
  viewModel: { state }
} = this;

const tabsContainer = (
  <ul key="tab-list" class={CSS.tabList}>
    {this.renderTabs()}
  </ul>
);

const thumbnailList = (
  <ol class={CSS.scaleList} key="thumbnail-list">
    {this.renderThumbnailList()}
  </ol>
);

const content = state === "ready" && view ? [tabsContainer, thumbnailList] : null;

return <div class={CSS.base}>{content}</div>;
```

### Add empty methods for seperate lists

```tsx
protected renderTabs() {}
protected renderThumbnailList() {}
```

## Lets build the tabs for `To` and `From`

We'll start building a tabbed interface.

### Modify renderTabs method

```tsx
protected renderTabs() {
  const rangeTypes: RangeType[] = ["from", "to"];

  return rangeTypes.map((type) => this.renderTabItem(type));
}
```

```tsx
protected renderTabItem(type: RangeType) {
  return <li class={CSS.tabItem}>{this.renderTabButton(type)}</li>;
}
```

```tsx
protected renderTabButton(type: RangeType) {
  const { rangeType } = this;

  return (
    <button
      class={this.classes(CSS.tabButton, rangeType === type && CSS.tabButtonActive)}
    >
      {type}
    </button>
  );
}
```

## Compile

Lets compile and see the tabs.

### Add private method for onclick

Our button doesn't do anything so lets wire it up!

```
bind={this}
onclick={() => this._setRangeType(type)}
```

```tsx
private _setRangeType(type: RangeType) {
  this.rangeType = type;
}
```

## Compile

Lets compile and see the tabs that now work.

## Modify rendering thumbnails

```tsx
protected renderThumbnailList() {
  const {
    viewModel: { scaleRanges }
  } = this;

  const thumbnails = [];

  for (let i = 0; i < scaleRanges.length; i++) {
    const evenScaleRange = i === 0 || i % 2 === 0;

    if (evenScaleRange) {
      thumbnails.push(this.renderThumbnail(i));
    }
  }

  return thumbnails;
}
```

```tsx
protected renderThumbnail(index: number) {
  return (
    <li key={`thumbnail-${index}`} class={CSS.scaleItem}>
      {this.renderThumbnailButton(index)}
    </li>
  );
}
```

```tsx
protected renderThumbnailButton(index: number) {
  const {
    region,
    rangeType,
    viewModel,
    viewModel: { maxScale, minScale }
  } = this;

  const scale = viewModel.mapSliderToScale(index);

  const currentScale = rangeType === "to" ? maxScale : minScale;
  const isWorldScale = rangeType === "from" && minScale === 0 && index === 0;
  const isActive = isWorldScale || currentScale === scale;

  return (
    <button
      class={this.classes(CSS.scaleButton, isActive && CSS.scaleButtonActive)}
      bind={this}
      onclick={() => console.log(scale)}
    >
      {this.renderThumbnailLabel(index)}
    </button>
  );
}
```

```tsx
protected renderThumbnailLabel(index: number) {
  const {
    viewModel: { scaleRanges }
  } = this;

  const label = i18n.scaleRangeLabels[scaleRanges.findScaleRangeByIndex(index).id];

  return <div class={CSS.scaleLabel}>{label}</div>;
}
```

```ts
// dojo
import i18n = require("dojo/i18n!esri/widgets/ScaleRangeSlider/nls/ScaleRangeSlider");
```

## Compile

Lets see the scales.

## Add thumbnails

Lets add background images for our scales using existing utilites.

```ts
import {
  getScalePreviewSource,
  getScalePreviewSpriteBackgroundPosition
} from "esri/widgets/ScaleRangeSlider/scalePreviewUtils";
```

Create a styles object

```tsx
const thumbnailStyles = {
  backgroundImage: getScalePreviewSource(region),
  backgroundPosition: getScalePreviewSpriteBackgroundPosition(index)
};
```

Add styles to the button.

```
styles={thumbnailStyles}
```

## Compile

Lets compile and see the thumbnails.

## Add onclick to make the thumbnails work

```tsx
onclick={() => (rangeType === "to" ? this._setScaleTo(scale) : this._setScaleFrom(scale))}
```

```tsx
private _setScaleFrom(scale: number): void {
  this.viewModel.minScale = scale;
}

private _setScaleTo(scale: number): void {
  this.viewModel.maxScale = scale;
}
```

## Add `postInitialize()` watchers

```ts
import watchUtils = require("esri/core/watchUtils");
```

```ts
postInitialize(): void {
    this.own([
      watchUtils.init(this, "viewModel.minScale", (value) => {
        this.viewModel.layer["minScale"] = value;
      }),
      watchUtils.init(this, "viewModel.maxScale", (value) => {
        this.viewModel.layer["maxScale"] = value;
      })
    ]);
  }
```
