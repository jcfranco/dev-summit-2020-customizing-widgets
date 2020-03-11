/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/widgets/ScaleRangeSlider", "esri/core/watchUtils"], function (require, exports, __extends, __decorate, decorators_1, widget_1, ScaleRangeSlider, watchUtils_1) {
    "use strict";
    var CSS = {
        scaleIndicatorIcon: "custom-scale-range-slider__scale-indicator-icon"
    };
    var CustomScaleRangeSlider = /** @class */ (function (_super) {
        __extends(CustomScaleRangeSlider, _super);
        function CustomScaleRangeSlider() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        CustomScaleRangeSlider.prototype.postInitialize = function () {
            var _this = this;
            ScaleRangeSlider.prototype.postInitialize.call(this);
            var dragging = false;
            this.own([
                watchUtils_1.on(this, "_slider", "thumb-drag", function (event) {
                    dragging = true;
                }),
                watchUtils_1.on(this, "container", "click", function (event) {
                    if (!dragging) {
                        var targetNode = event.target;
                        if (targetNode.classList.contains("esri-slider__thumb")) {
                            _this.view.goTo({
                                scale: targetNode === _this._minThumbNode ? _this.minScale : _this.maxScale
                            });
                        }
                    }
                    dragging = false;
                })
            ]);
        };
        //--------------------------------------------------------------------------
        //
        //  Protected Methods
        //
        //--------------------------------------------------------------------------
        CustomScaleRangeSlider.prototype.renderCurrentScaleIndicatorIcon = function () {
            return widget_1.tsx("div", { class: CSS.scaleIndicatorIcon }, "\u261D\uFE0F");
        };
        CustomScaleRangeSlider = __decorate([
            decorators_1.subclass("esri.demo.CustomScaleRangeSlider")
        ], CustomScaleRangeSlider);
        return CustomScaleRangeSlider;
    }(decorators_1.declared(ScaleRangeSlider)));
    return CustomScaleRangeSlider;
});
//# sourceMappingURL=CustomScaleRangeSlider.js.map