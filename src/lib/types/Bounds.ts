import { Point } from "./Point";

export class Bounds {
  southWest: Point;
  northEast: Point;

  constructor(southWest: Point, northEast: Point) {
    [this.southWest, this.northEast] = [southWest, northEast];
  }
}
