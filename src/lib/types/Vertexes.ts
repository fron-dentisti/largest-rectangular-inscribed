import { Point } from ".";

export class Vertexes {
  #vertexes: Point[];

  constructor(v: Point[]) {
    this.#vertexes = v;
    this.#vertexes.forEach((v, i) => {
      if (v.x < this.#vertexes[this.#minXIndex].x) {
        this.#minXIndex = i;
      }
      if (v.y < this.#vertexes[this.#minYIndex].y) {
        this.#minYIndex = i;
      }
      if (v.x > this.#vertexes[this.#maxXIndex].x) {
        this.#maxXIndex = i;
      }
      if (v.y > this.#vertexes[this.#maxYIndex].y) {
        this.#maxYIndex = i;
      }
    });
  }

  #minXIndex: number = 0;
  get minXVertex(): Point {
    return this.#vertexes[this.#minXIndex];
  }

  get minXIndex(): number {
    return this.#minXIndex;
  }

  #minYIndex: number = 0;
  get minYVertex(): Point {
    return this.#vertexes[this.#minYIndex];
  }

  get minYIndex(): number {
    return this.#minYIndex;
  }

  #maxXIndex: number = 0;
  get maxXVertex(): Point {
    return this.#vertexes[this.#maxXIndex];
  }

  get maxXIndex(): number {
    return this.#maxXIndex;
  }

  #maxYIndex: number = 0;
  get maxYVertex(): Point {
    return this.#vertexes[this.#maxYIndex];
  }

  get maxYIndex(): number {
    return this.#maxYIndex;
  }

  get() {
    return this.#vertexes;
  }
}
