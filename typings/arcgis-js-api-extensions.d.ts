declare namespace __esri {
  interface scalePreviewUtils {
    getScalePreviewSpriteBackgroundPosition(index: number): string;
    getScalePreviewSource(region: string): string;
  }
}

declare module "esri/widgets/ScaleRangeSlider/scalePreviewUtils" {
  const scalePreviewUtils: __esri.scalePreviewUtils;
  export = scalePreviewUtils;
}
