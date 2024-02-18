import { App } from "./app";
import { coordinates } from "./components/constants/coordinates";
import { Names } from "./components/constants/names";
import { BoundsLayer } from "./layers/bounds/BoundsLayer";
import { PolygonLayer } from "./layers/polygon/PolygonLayer";
import "./style/style.scss";
import { mapMaxBounds } from "./utils/coordinates";

App.define();

const app = new App();

document.body.append(app);

coordinates.forEach((el, i) => {
  app.addLayer(new PolygonLayer(el, Names[i]).getLayer());
});

app.addLayer(new BoundsLayer(mapMaxBounds).getLayer());
