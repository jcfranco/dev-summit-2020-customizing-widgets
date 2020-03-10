/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate"/>
/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends"/>

// dojo
import i18n = require("dojo/i18n!esri/widgets/ScaleRangeSlider/nls/ScaleRangeSlider");

// esri
import Layer = require("esri/layers/Layer");

// esri.core.accessorSupport
import { declared, property, subclass } from "esri/core/accessorSupport/decorators";

// esri.views
import MapView = require("esri/views/MapView");
import SceneView = require("esri/views/SceneView");

// esri.widgets
import Widget = require("esri/widgets/Widget");

import watchUtils = require("esri/core/watchUtils");

import {
  getScalePreviewSource,
  getScalePreviewSpriteBackgroundPosition
} from "esri/widgets/ScaleRangeSlider/scalePreviewUtils";
import ScaleRangeSliderViewModel = require("esri/widgets/ScaleRangeSlider/ScaleRangeSliderViewModel");

// esri.widgets.support
import { renderable, tsx } from "esri/widgets/support/widget";

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

type RangeType = "from" | "to";

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

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  layer
  //----------------------------------

  @property({
    aliasOf: "viewModel.layer"
  })
  layer: Layer = null;

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

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  renderThumbnail(index: number) {
    const {
      region,
      rangeType,
      viewModel,
      viewModel: { maxScale, minScale, scaleRanges }
    } = this;

    const thumbnailStyles = {
      backgroundImage: getScalePreviewSource(region),
      backgroundPosition: getScalePreviewSpriteBackgroundPosition(index)
    };

    const label = i18n.scaleRangeLabels[scaleRanges.findScaleRangeByIndex(index).id];
    const scale = viewModel.mapSliderToScale(index);
    const currentScale = rangeType === "to" ? maxScale : minScale;
    return (
      <li key={`thumbnail-${index}`} class={CSS.scaleItem}>
        <button
          class={this.classes(
            CSS.scaleButton,
            ((index === 0 && currentScale === 0) || currentScale === scale) && CSS.scaleButtonActive
          )}
          styles={thumbnailStyles}
          bind={this}
          onclick={() => (rangeType === "to" ? this._setScaleTo(scale) : this._setScaleFrom(scale))}
        >
          <div class={CSS.scaleLabel}>{label}</div>
        </button>
      </li>
    );
  }

  renderThumbnailList() {
    const {
      viewModel: { scaleRanges }
    } = this;

    const thumbnails = [];

    let i: number;

    for (i = 0; i < (scaleRanges as any).length; i++) {
      if (i === 0 || i % 2 === 0) {
        thumbnails.push(this.renderThumbnail(i));
      }
    }

    return thumbnails;
  }

  render() {
    const {
      rangeType,
      view,
      viewModel: { state }
    } = this;

    const rangeTypes: RangeType[] = ["from", "to"];

    const tabs = rangeTypes.map((type) => {
      return (
        <li class={CSS.tabItem}>
          <button
            class={this.classes(CSS.tabButton, rangeType === type && CSS.tabButtonActive)}
            bind={this}
            onclick={() => this._setRangeType(type)}
          >
            {type === "to" ? "To" : "From"}
          </button>
        </li>
      );
    });

    const tabsContainer = (
      <ul key="tab-list" class={CSS.tabList}>
        {tabs}
      </ul>
    );

    const thumbnailList = (
      <ol class={CSS.scaleList} key="thumbnail-list">
        {this.renderThumbnailList()}
      </ol>
    );

    return (
      <div class={CSS.base}>
        {state === "ready" && view ? [tabsContainer, thumbnailList] : null}
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private _setRangeType(type: RangeType) {
    this.rangeType = type;
  }

  private _setScaleFrom(scale: number): void {
    this.viewModel.minScale = scale;
  }

  private _setScaleTo(scale: number): void {
    this.viewModel.maxScale = scale;
  }
}

export = CustomScaleRange;
