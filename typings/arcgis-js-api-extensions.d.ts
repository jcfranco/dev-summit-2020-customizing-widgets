declare namespace __esri {

  export interface Axes {
    x: number;
    y: number;
    z: number;
  }

  export interface WidgetInterfaces {
    foo: Axes;
  }

}

declare module "esri/widgets/interfaces" {
  import WidgetInterfaces = __esri.WidgetInterfaces;
  export = WidgetInterfaces;
}
