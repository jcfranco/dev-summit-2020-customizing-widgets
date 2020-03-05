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

import {
  getScalePreviewSource,
  getScalePreviewSpriteBackgroundPosition
} from "esri/widgets/ScaleRangeSlider/scalePreviewUtils";
import ScaleRangeSliderViewModel = require("esri/widgets/ScaleRangeSlider/ScaleRangeSliderViewModel");

// esri.widgets.support
import { renderable, tsx } from "esri/widgets/support/widget";

const CSS = {
  base: "esri-scale-range-slider",

  // common
  widget: "esri-widget"
};

@subclass("app.CustomScaleRange")
class CustomScaleRange extends declared(Widget) {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  /**
   * @constructor
   * @alias module:esri/widgets/ScaleRangeSlider
   * @extends module:esri/widgets/Widget
   * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
   *                              that may be passed into the constructor.
   */
  constructor(params?: {}) {
    super(params);
  }

  postInitialize(): void {
    this.own([]);
  }

  destroy(): void {}

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  layer
  //----------------------------------

  /**
   * When provided, the initial [minScale](#minScale) and [maxScale](#maxScale) values will match the layer's.
   *
   * @name layer
   * @instance
   * @type {module:esri/layers/Layer}
   */

  @property({
    aliasOf: "viewModel.layer"
  })
  layer: Layer = null;

  //----------------------------------
  //  region
  //----------------------------------

  /**
   * The region that the scale thumbnails will focus on.
   * Each region comes from the [ISO 3166-1 alpha-2 code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes).
   * See [SupportedRegion](#SupportedRegion) for the list of regions that are currently supported.
   *
   * @name region
   * @instance
   * @type {module:esri/widgets/ScaleRangeSlider~SupportedRegion}
   * @default "US"
   */

  @property()
  @renderable()
  region: string = "US";

  //----------------------------------
  //  view
  //----------------------------------

  /**
   * A reference to the {@link module:esri/views/MapView} or {@link module:esri/views/SceneView}.
   * Set this to link the widget to a specific view.
   *
   * @name view
   * @instance
   * @type {module:esri/views/MapView | module:esri/views/SceneView}
   */
  @property({
    aliasOf: "viewModel.view"
  })
  view: MapView | SceneView = null;

  //----------------------------------
  //  viewModel
  //----------------------------------

  /**
   * The view model for this widget. This is a class that contains all the logic
   * (properties and methods) that controls this widget's behavior. See the
   * {@link module:esri/widgets/ScaleRangeSlider/ScaleRangeSliderViewModel} class to access
   * all properties and methods on the widget.
   *
   * @name viewModel
   * @instance
   * @type {module:esri/widgets/ScaleRangeSlider/ScaleRangeSliderViewModel}
   * @autocast
   */
  @property()
  @renderable(["viewModel.state", "viewModel.scaleRanges", "viewModel.scaleRanges.length"])
  viewModel: ScaleRangeSliderViewModel = new ScaleRangeSliderViewModel();

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  renderThumbnail(index: number) {
    const {
      region,
      viewModel: { scaleRanges }
    } = this;

    const thumbnailStyles = {
      padding: "64px",
      width: "64px",
      overflow: "hidden",
      backgroundImage: getScalePreviewSource(region),
      backgroundPosition: getScalePreviewSpriteBackgroundPosition(index)
    };

    const label = i18n.scaleRangeLabels[scaleRanges.findScaleRangeByIndex(index).id];

    const scale = this.viewModel.mapSliderToScale(index);

    return (
      <li key={`thumbnail-${region}-${index}`}>
        <button
          styles={thumbnailStyles}
          bind={this}
          onclick={() => {
            console.log(scale);
            this.viewModel.minScale = scale;
          }}
        >
          <div>{label}</div>
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
      thumbnails.push(this.renderThumbnail(i));
    }

    return thumbnails;
  }

  render() {
    const {
      view,
      viewModel: { state }
    } = this;

    const thumbnailList = <ul>{this.renderThumbnailList()}</ul>;

    return (
      <div class={this.classes(CSS.base, CSS.widget)}>
        {state === "ready" && view ? thumbnailList : null}
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
}

export = CustomScaleRange;
