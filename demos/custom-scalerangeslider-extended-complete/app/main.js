define(["require", "exports", "esri/views/MapView", "esri/Map", "./CustomScaleRangeSlider", "esri/layers/FeatureLayer"], function (require, exports, MapView, Map, CustomScaleRangeSlider, FeatureLayer) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //----------------
    //  map setup
    //----------------
    var layer = new FeatureLayer({
        url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0"
    });
    var map = new Map({
        basemap: "gray",
        layers: [layer]
    });
    var view = new MapView({
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
    var widget = new CustomScaleRangeSlider({
        // slider's minimum/maximum
        view: view,
        // values for min/max slider thumbs
        layer: layer
    });
    view.ui.add(widget, "manual");
});
//# sourceMappingURL=main.js.map