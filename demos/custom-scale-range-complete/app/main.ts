import MapView = require("esri/views/MapView");
import FeatureLayer = require("esri/layers/FeatureLayer");
import Map = require("esri/Map");
import CustomScaleRange = require("./CustomScaleRange");

//----------------
//  map setup
//----------------

const layer = new FeatureLayer({
  portalItem: {
    id: "f9e348953b3848ec8b69964d5bceae02"
  },
  outFields: ["SEASON"]
});

const map = new Map({
  basemap: "gray-vector",
  layers: [layer]
});

const view = new MapView({
  container: "viewDiv",
  map: map,
  zoom: 4,
  center: [-99, 39]
});

//----------------
//  widget setup
//----------------

const widget = new CustomScaleRange({
  view: view,
  layer,
  region: "us"
});

view.ui.add(widget, "manual");
