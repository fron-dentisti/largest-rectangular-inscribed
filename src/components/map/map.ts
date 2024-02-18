import L from "leaflet";

import { EventFactory } from "../events/EventFactory";
import { ZoomController } from "./controller/zoom";
import { MapHelper } from "./map.helper";
import "./map.scss";

export class MapView extends HTMLElement {
  static TagName = "map-view";
  static define() {
    if (!customElements.get(MapView.TagName)) {
      ZoomController.define();
      customElements.define(MapView.TagName, MapView);
    }
  }

  static ZoomChangedEvent = EventFactory.NewCustomEvent("zoom-changed", {
    bubbles: true,
  });

  map?: L.Map;
  onZoomChanged: (e: Event) => void = () => {};

  connectedCallback() {
    this.render();
    this.initLeafletMap();
  }

  render() {
    this.append(this.renderMapContainer(), this.renderZoom());
  }

  renderMapContainer() {
    let container = this.MapContainer;
    if (!container) {
      container = document.createElement("div");
      container.classList.add("map");
    }
    return container;
  }

  renderZoom() {
    let zoom = this.ZoomController;
    if (!zoom) {
      zoom = new ZoomController();
      zoom.onCenterMap = () => this.map?.setView([0, 0], 0);
      zoom.onZoomInMap = () => this.map?.zoomIn();
      zoom.onZoomOutMap = () => this.map?.zoomOut();
    }
    return zoom;
  }

  initLeafletMap() {
    let map = this.MapContainer;
    if (map) {
      this.map = MapHelper.NewMap(map);

      this.dispatchEvent(new MapView.ZoomChangedEvent());
      this.onZoomChanged(new MapView.ZoomChangedEvent());
      this.map?.on("zoomend", () => {
        this.dispatchEvent(new MapView.ZoomChangedEvent());
        this.onZoomChanged(new MapView.ZoomChangedEvent());
      });
    }
  }

  getZoom() {
    return this.map?.getZoom();
  }

  get MapContainer() {
    return this.querySelector(".map") as HTMLElement;
  }

  get ZoomController() {
    return this.querySelector(ZoomController.TagName) as ZoomController;
  }
}
