import L from "leaflet";
import { App } from "./app";
import "./style/style.scss";
import { coordinates } from "./components/constants/coordinates";
import { PolygonLayer } from "./layers/PolygonLayer";

App.define();

const app = new App();

document.body.append(app);

app.addLayer(
  L.polygon(
    [
      [51.509, -0.08],
      [51.503, -0.06],
      [51.51, -0.047],
    ]
      .map((el) => el.map((c) => c * 2))
      .map((coords) => {
        return L.latLng(coords[0], coords[1]);
      })
  )
);

coordinates.forEach((el) => {
  app.addLayer(new PolygonLayer(el).getLayer());
});

app.addLayer(
  L.polyline(
    [
      L.latLng(-90, -180),
      L.latLng(90, -180),
      L.latLng(90, 180),
      L.latLng(-90, 180),
      L.latLng(-90, -180),
    ],
    {
      color: "var(--map-bounds-color)",
    }
  )
);
