import L from "leaflet";
import { mapMaxBounds } from "../../utils/coordinates";

export class MapHelper {
  static NewMap(el: string | HTMLElement) {
    return L.map(el, {
      attributionControl: false,
      zoomControl: false,
      maxBoundsViscosity: 1,
      maxBounds: mapMaxBounds,
      center: [0, 0],
      zoom: 0,
      boxZoom: true,
    });
  }
}
