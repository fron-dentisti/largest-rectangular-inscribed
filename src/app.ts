import "./app.scss";
import { IconFactory } from "./components/icon/IconFactory";
import { MapInfo } from "./components/map-info/MapInfo";
import { MapView } from "./components/map/map";

import iconSvg from "/icon.svg";

export class App extends HTMLElement {
  static TagName = "lirp-app";
  static define() {
    if (!customElements.get(App.TagName)) {
      MapView.define();
      customElements.define(App.TagName, App);
    }
  }

  connectedCallback() {
    this.setAttribute("id", "app");
    this.render();
  }

  render() {
    const title = this.renderTitle();
    const infoPane = this.renderInfo();
    const map = this.renderMap();
    const actions = this.renderActions();

    map.addEventListener(MapView.ZoomChangedEvent.EventName, () => {
      infoPane.zoom = `${map.getZoom() || 0}`;
    });

    this.replaceChildren(title, infoPane, map, actions);
  }

  renderTitle() {
    const span = document.createElement("span");
    span.innerHTML = "Largest Inscribed Rectangle in Polygon";

    const icon = IconFactory.NewIcon(iconSvg);
    icon.classList.add("logo");

    const link = document.createElement("a");
    link.href = "/docs/JAC_Volume 51_Issue 1_Page 29-41.pdf";
    link.innerHTML = "doc ref";
    link.classList.add("doc");

    const h2 = document.createElement("h2");
    h2.classList.add("title");

    h2.append(icon, span, link);
    return h2;
  }

  renderInfo(): MapInfo {
    let info = this.MapInfo;
    if (!info) {
      MapInfo.define();
      info = new MapInfo();
    }
    return info;
  }

  renderMap() {
    let mapView = this.MapView;
    if (!mapView) {
      mapView = new MapView();
    }
    return mapView;
  }

  renderActions() {
    const actions = document.createElement("div");
    return actions;
  }

  private get MapView() {
    return this.querySelector(MapView.TagName) as MapView;
  }

  private get MapInfo() {
    return this.querySelector(MapInfo.TagName) as MapInfo;
  }

  addLayer(layer: L.Layer) {
    this.MapView?.addLayer(layer);
  }
}
