import { App } from "./app";
import { coordinates } from "./components/constants/coordinates";
import { BoundsLayer } from "./layers/bounds/BoundsLayer";
import { PolygonLayer } from "./layers/polygon/PolygonLayer";
import "./style/style.scss";
import { mapMaxBounds } from "./utils/coordinates";

App.define();

const app = new App();

document.body.append(app);

coordinates.forEach((el) => {
  app.addLayer(new PolygonLayer(el).getLayer());
});

app.addLayer(new BoundsLayer(mapMaxBounds).getLayer());
