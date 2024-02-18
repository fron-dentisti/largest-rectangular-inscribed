import { ZoomUtils } from "../../lib";
import { LeafletAdapter } from "../../lib/adapters/LeafletAdapter";
import { AbstractLayer } from "../AbstractLayer";
import { InscribedRectangularView } from "./InscribedRectangle";
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

  irView: InscribedRectangularView;

  constructor(latLngs: L.LatLng[], name?: string) {
    super();
    this.irView = new InscribedRectangularView(this.layer);

    const polygon = this.newPolygon(latLngs);
    this.addLayer(
      polygon,
      ...latLngs.map((vertex, i) =>
        this.newVertex(vertex, `${i} (${vertex.lng}; ${vertex.lat})`)
      )
    );

    this.layer.once("add", () => {
      if (name) {
        const epsilon = (7 * name.length + 16) * 66;

        const zoom = ZoomUtils.findMinZoom(
          LeafletAdapter.LatLngToPoint(latLngs),
          epsilon,
          1083,
          609.18
        );
        const maxZoom = 19;

        const className = ["name-label"];
        for (let i = Math.min(maxZoom, zoom); i <= maxZoom; i++) {
          className.push(`see-with-zoom-${i}`);
        }

        this.layer.addLayer(
          L.marker(polygon.getCenter(), {
            icon: L.divIcon({
              html: `<span>${name}<span>`,
              className: className.join(" "),
            }),
          })
        );
      }
    });

    try {
      console.log(name);
      this.irView.FindPolygon(LeafletAdapter.LatLngToPoint(latLngs));
      console.log("---");
    } catch (err) {
      // console.warn(err);
    }
  }

  private newPolygon(vertexes: L.LatLng[]) {
    return L.polygon(vertexes, PolygonLayer.Options);
  }

  private newVertex(vertex: L.LatLng, popup?: string) {
    return L.circle(vertex, PolygonLayer.CircleOptions).bindPopup(popup || "");
  }
}
