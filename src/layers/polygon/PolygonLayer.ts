import { AbstractLayer } from "../AbstractLayer";
import "./PolygonLayer.scss";

import L from "leaflet";

export class PolygonLayer extends AbstractLayer {
  static Options: L.PolylineOptions = {
    color: "var(--line-color)",
    weight: 1,
    fill: true,
    fillColor: "none",
    className: "polygon-layer",
  };

  static CircleOptions: L.CircleMarkerOptions = {
    color: "var(--vertex-line-color)",
    weight: 2,
    fill: true,
    fillColor: "var(--vertex-fill-color)",
    className: "polygon-layer vertex",
    radius: 5,
  };

  vertexes: L.LatLng[];

  constructor(latLngs: L.LatLng[]) {
    super();
    this.vertexes = latLngs;
    this.addLayer(
      this.newPolygon(),
      ...this.vertexes.map((vertex, i) =>
        this.newVertex(vertex, `${i} (${vertex.lng}; ${vertex.lat})`)
      )
    );
  }

  private newPolygon() {
    return L.polygon(this.vertexes, PolygonLayer.Options);
  }

  private newVertex(vertex: L.LatLng, popup?: string) {
    return L.circle(vertex, PolygonLayer.CircleOptions).bindPopup(popup || "");
  }
}
