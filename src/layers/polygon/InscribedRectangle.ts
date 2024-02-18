import L from "leaflet";
import { LargestInscribedRectangleInPolygonLibrary } from "../../lib";
import { Point, Subareas, Vertexes } from "../../lib/types";

export class InscribedRectangularView extends LargestInscribedRectangleInPolygonLibrary {
  static BoundsOptions: L.PolylineOptions = {
    color: "rgb(var(--slate-500))",
    opacity: 0.1,
  };

  static SubAreas: L.PolylineOptions = {
    color: "rgb(var(--slate-400))",
    opacity: 0.1,
  };

  #layerGroup: L.FeatureGroup;
  constructor(group: L.FeatureGroup) {
    super();
    this.#layerGroup = group;
  }

  private getBounds(vertexes: Vertexes) {
    const southWest = new Point(vertexes.minXVertex.x, vertexes.minYVertex.y);
    const northEast = new Point(vertexes.maxXVertex.x, vertexes.maxYVertex.y);
    return [
      [southWest.y, southWest.x],
      [southWest.y, northEast.x],
      [northEast.y, northEast.x],
      [northEast.y, southWest.x],
      [southWest.y, southWest.x],
    ];
  }

  DividingIntoSubareas(vertexes: Vertexes): Subareas {
    const { minXVertex, maxXVertex, minYVertex, maxYVertex } = vertexes;
    this.#layerGroup.addLayer(
      L.polyline(
        // @ts-ignore
        this.getBounds(vertexes),
        InscribedRectangularView.BoundsOptions
      )
    );
    vertexes
      .get()
      .filter(
        (p) =>
          p.x !== minXVertex.x ||
          p.x !== maxXVertex.x ||
          p.y !== minYVertex.y ||
          p.y !== maxYVertex.y
      )
      .forEach((p) => {
        const { x, y } = p;
        [
          [
            [minXVertex.x, y],
            [maxXVertex.x, y],
          ],
          [
            [x, minYVertex.y],
            [x, maxYVertex.y],
          ],
        ].forEach((v) => {
          this.#layerGroup.addLayer(
            L.polyline(
              v.map((e) => L.latLng(e[1], e[0])),
              InscribedRectangularView.SubAreas
            )
          );
        });
      });
    return super.DividingIntoSubareas(vertexes);
  }
}
