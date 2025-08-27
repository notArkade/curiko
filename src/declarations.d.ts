// declarations.d.ts
declare module "three";

declare module "three/examples/jsm/controls/OrbitControls" {
  import { Camera, Renderer } from "three";
  import { EventDispatcher } from "three";

  export class OrbitControls extends EventDispatcher {
    constructor(object: Camera, domElement: HTMLElement);

    enabled: boolean;
    enableZoom: boolean;
    enableRotate: boolean;
    enablePan: boolean;
    update(): void;
  }
}