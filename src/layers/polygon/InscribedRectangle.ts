import { LargestInscribedRectangleInPolygonLibrary } from "../../lib";
import { Point, Bounds } from "../../lib/types";
import { Vertexes } from "../../lib/types/Vertexes";

export class InscribedRectangularView extends LargestInscribedRectangleInPolygonLibrary {
  #layerGroup: L.FeatureGroup;
  constructor(group: L.FeatureGroup) {
    super();
    this.#layerGroup = group;
  }

  NormalizeVertexes(points: Point[]): Vertexes {
    const vertexes = super.NormalizeVertexes(points);
    console.log(points, vertexes.get());
    return vertexes;
  }
}
