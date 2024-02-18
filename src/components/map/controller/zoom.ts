import "./zoom.scss";

import ArrowsPointingIn from "/arrows-pointing-in.svg";
import MagnifyingGlassMinus from "/magnifying-glass-minus.svg";
import MagnifyingGlassPlus from "/magnifying-glass-plus.svg";

import { EventFactory } from "../../events/EventFactory";
import { IconFactory } from "../../icon/IconFactory";

export class ZoomController extends HTMLElement {
  static TagName = "zoom-controller";

  static define() {
    if (!customElements.get(ZoomController.TagName)) {
      customElements.define(ZoomController.TagName, ZoomController);
    }
  }

  onCenterMap = (_: Event) => {};
  static CenterMapEvent = EventFactory.NewCustomEvent(
    `${ZoomController.TagName}:center-map`
  );

  onZoomInMap = (_: Event) => {};
  static ZoomInMapEvent = EventFactory.NewCustomEvent(
    `${ZoomController.TagName}:zoom-in-map`
  );

  onZoomOutMap = (_: Event) => {};
  static ZoomOutMapEvent = EventFactory.NewCustomEvent(
    `${ZoomController.TagName}:zoom-out-map`
  );

  // mapViewer: MapView;
  // constructor(mapViewer: MapView) {
  //   super();
  //   this.mapViewer = mapViewer;
  // }

  connectedCallback() {
    this.render();
  }

  render() {
    this.replaceChildren(
      this.renderCenterBtn(),
      this.renderZoomInBtn(),
      this.renderZoomOutBtn()
    );
  }

  renderCenterBtn() {
    let btn = this.ZoomOutBtn;
    if (!btn) {
      btn = this.createBtn(this.createIcon(ArrowsPointingIn, "center"));
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        btn.dispatchEvent(new ZoomController.CenterMapEvent());
        this.onCenterMap(e);
      });
    }
    return btn;
  }

  renderZoomInBtn() {
    let btn = this.ZoomOutBtn;
    if (!btn) {
      btn = this.createBtn(this.createIcon(MagnifyingGlassPlus, "zoom-in"));
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        btn.dispatchEvent(new ZoomController.ZoomInMapEvent());
        this.onZoomInMap(e);
      });
    }
    return btn;
  }

  renderZoomOutBtn() {
    let btn = this.ZoomOutBtn;
    if (!btn) {
      btn = this.createBtn(this.createIcon(MagnifyingGlassMinus, "zomm-out"));
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        btn.dispatchEvent(new ZoomController.ZoomOutMapEvent());
        this.onZoomOutMap(e);
      });
    }
    return btn;
  }

  private createBtn(...content: HTMLElement[]) {
    const btn = document.createElement("button");
    btn.append(...content);
    return btn;
  }

  private createIcon(src: string, ...classes: string[]) {
    const icon = IconFactory.NewIcon(src);
    icon.classList.add("icon", ...classes);
    return icon;
  }

  get CenterBtn(): HTMLElement {
    return this.querySelector(".center") as HTMLElement;
  }

  get ZoomInBtn(): HTMLElement {
    return this.querySelector(".zoom-in") as HTMLElement;
  }

  get ZoomOutBtn(): HTMLElement {
    return this.querySelector(".zoom-out") as HTMLElement;
  }
}
