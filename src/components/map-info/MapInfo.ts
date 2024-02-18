import "./map-info.scss";

export class MapInfo extends HTMLElement {
  static TagName = "map-info";

  static define() {
    if (!customElements.get(MapInfo.TagName)) {
      customElements.define(MapInfo.TagName, MapInfo);
    }
  }

  #zoom: string = "";

  set zoom(z: string | number) {
    this.#zoom = `${z}`;
    this.renderZoom();
  }

  get zoom() {
    return this.#zoom;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.replaceChildren(this.renderZoom());
  }

  renderZoom() {
    let zoom = this.ZoomCounter;
    if (!zoom) {
      zoom = document.createElement("span");
      zoom.classList.add("zoom");
    }
    zoom.innerHTML = `Zoom: ${this.#zoom}`;
    return zoom;
  }

  get ZoomCounter() {
    return this.querySelector(".zoom");
  }
}
