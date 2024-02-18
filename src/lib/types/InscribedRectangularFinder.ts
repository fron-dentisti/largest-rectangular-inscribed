import { Subareas } from ".";
import { Bounds } from "./Bounds";
import { Point } from "./Point";
import { Vertexes } from "./Vertexes";

export abstract class InscribedRectangleFinder {
  FindPolygon(points: Point[]): Bounds {
    // 0 Normalize vertexes
    const vertexes = this.NormalizeVertexes(points);

    // 1 Dividing polygon into subareas
    const subareas = this.DividingIntoSubareas(vertexes!);

    // 2 Identifying Rectangular Subareas
    const insideAreas = this.IdentifyingSubareas(subareas);

    // 3 Forming RA graph
    const graph = this.NewRAGraph(insideAreas);

    // 4 Identifying cycles and paths and the largest subarea
    return this.IdentifyingLargestArea(graph);
  }

  abstract NormalizeVertexes(vertexes: Point[]): Vertexes;

  abstract DividingIntoSubareas(vertexes: Vertexes): Subareas;

  abstract IdentifyingSubareas(subareas: Subareas): unknown;

  abstract NewRAGraph(init: unknown): unknown;

  abstract IdentifyingLargestArea(graph: unknown): Bounds;
}
