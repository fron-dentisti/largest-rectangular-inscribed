import "./PolygonLayer.scss";

import L from "leaflet";

export class PolygonLayer {
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
  layer: L.FeatureGroup;

  constructor(latLngs: L.LatLng[]) {
    this.vertexes = latLngs;
    this.layer = L.featureGroup([
      this.newPolygon(),
      ...this.vertexes.map((vertex) => this.newVertex(vertex)),
    ]);
  }

  getLayer() {
    return this.layer;
  }

  addLayer(l: L.Layer) {
    this.layer.addLayer(l);
  }

  private newPolygon() {
    return L.polygon(this.vertexes, PolygonLayer.Options);
  }

  private newVertex(vertex: L.LatLng) {
    return L.circle(vertex, PolygonLayer.CircleOptions).bindPopup(
      `(${vertex.lng}; ${vertex.lat})`
    );
  }
}
