declare namespace __esri {
  interface scalePreviewUtils {
    getScalePreviewSpriteBackgroundPosition(index: number): string;
    getScalePreviewSource(region: string): string;
  }

  interface ScaleRanges {
    length: number;
  }
}

declare module "esri/widgets/ScaleRangeSlider/scalePreviewUtils" {
  const scalePreviewUtils: __esri.scalePreviewUtils;
  export = scalePreviewUtils;
}
