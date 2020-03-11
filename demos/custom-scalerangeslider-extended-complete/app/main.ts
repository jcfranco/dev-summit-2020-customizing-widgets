import MapView = require("esri/views/MapView");
import Map = require("esri/Map");
import CustomScaleRangeSlider = require("./CustomScaleRangeSlider");
import FeatureLayer = require("esri/layers/FeatureLayer");

//----------------
//  map setup
//----------------

const layer = new FeatureLayer({
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0"
});

var map = new Map({
  basemap: "gray",
  layers: [layer]
});

const view = new MapView({
  container: "viewDiv",
  map: map,
  zoom: 6,
  extent: {
    xmin: -9177811.545859301,
    ymin: 4246995.804744991,
    xmax: -9176791.02105112,
    ymax: 4247783.679823045,
    spatialReference: {
      wkid: 102100
    }
  }
});

//----------------
//  widget setup
//----------------

const widget = new CustomScaleRangeSlider({
  // slider's minimum/maximum
  view,

  // values for min/max slider thumbs
  layer
});

view.ui.add(widget, "manual");
