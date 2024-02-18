import L from "leaflet";

export abstract class AbstractLayer {
  protected layer: L.FeatureGroup;

  constructor(opts?: L.LayerOptions, ...layer: L.Layer[]) {
    this.layer = L.featureGroup(layer, opts);
  }

  addLayer(...layers: L.Layer[]) {
    layers.forEach((layer) => {
      this.layer.addLayer(layer);
    });
  }

  getLayer() {
    return this.layer;
  }
}
