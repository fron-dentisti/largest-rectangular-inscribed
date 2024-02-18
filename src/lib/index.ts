import { NotAnArray, NotTypeError } from "./errors/NotTypeOfError";
import { NotEnoughVertexesError } from "./errors/PolygonsErrors";
import { Bounds, InscribedRectangleFinder, Point } from "./types";
import { Vertexes } from "./types/Vertexes";

// Largest Inscribed Rectangle in Polygon Libray
export class LargestInscribedRectangleInPolygonLibrary extends InscribedRectangleFinder {
  /**
   * This function do 2 things
   * 1) pop the last element of the array if is equal to the first one;
   * 2) rearrange the array to put the element with min-x in first position
   * @param vertexes Point[]
   */
  NormalizeVertexes(vertexes: Point[]): Vertexes {
    if (!Array.isArray(vertexes)) {
      throw new NotAnArray("vertexes", vertexes);
    }
    if (vertexes.length <= 2) {
      throw new NotEnoughVertexesError();
    }
    if (vertexes.some((el) => el?.x === undefined || el?.y === undefined)) {
      throw new NotTypeError("Point[]", "vertexes", vertexes);
    }

    // copy the array, to avoid problems with the original one
    vertexes = vertexes.map((el) => new Point(el.x, el.y));

    // delete the first element if they are equal
    if (vertexes[0].equals(vertexes[vertexes.length - 1])) {
      // pop the last element
      vertexes.length = vertexes.length - 1;
    }

    // find minX
    const minXIndex = vertexes.reduce((acc, curr, i) => {
      if (curr.x < vertexes[acc].x) {
        acc = i;
      }
      return acc;
    }, 0);

    if (minXIndex === 0) {
      return new Vertexes(vertexes);
    }

    return new Vertexes([
      ...vertexes.slice(minXIndex),
      ...vertexes.slice(0, minXIndex),
    ]);
  }

  DividingIntoSubareas(vertexes: Vertexes): unknown {
    throw new Error("Method not implemented.");
  }

  IdentifyingSubareas(subareas: unknown): unknown {
    throw new Error("Method not implemented.");
  }

  NewRAGraph(init: unknown): unknown {
    throw new Error("Method not implemented.");
  }

  IdentifyingLargestArea(graph: unknown): Bounds {
    throw new Error("Method not implemented.");
  }
}

export * from "./zoom/ZoomUtils";
