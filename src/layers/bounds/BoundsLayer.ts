import L from "leaflet";
import { AbstractLayer } from "../AbstractLayer";

export class BoundsLayer extends AbstractLayer {
  constructor(
    bounds: L.LatLngBounds,
    opts: L.PolylineOptions = { color: "var(--map-bounds-color)" }
  ) {
    super();
    this.addLayer(
      L.polyline(
        [
          bounds.getSouthWest(),
          bounds.getNorthWest(),
          bounds.getNorthEast(),
          bounds.getSouthEast(),
          bounds.getSouthWest(),
        ],
        opts
      )
    );
  }
}
