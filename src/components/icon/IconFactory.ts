import "./icon.scss";

class Icon extends HTMLElement {
  static TagName = "app-icon";

  static define() {
    if (!customElements.get(Icon.TagName)) {
      customElements.define(Icon.TagName, Icon);
    }
  }

  static AttributesName = {
    src: "src",
  };

  static get observedAttributes() {
    return Object.values(Icon.AttributesName);
  }

  #src?: string;

  set src(v: string) {
    this.#src = v;
    this.renderSrc();
  }

  get src(): string {
    return this.#src || "";
  }

  attributeChangedCallback(name: string, _: string, newVal: string) {
    if (name !== Icon.AttributesName.src) {
      return;
    }
    this.src = newVal;
  }

  private renderSrc() {
    this.style.setProperty(
      "-webkit-mask",
      `url(${this.#src}) no-repeat center`
    );
    this.style.setProperty("mask", `url(${this.#src}) no-repeat center`);
  }
}

Icon.define();

export class IconFactory {
  static NewIcon(src?: string) {
    const icon = new Icon();
    if (src) {
      icon.src = src;
    }
    return icon;
  }
}
