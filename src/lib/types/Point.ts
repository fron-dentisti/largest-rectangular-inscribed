export class Point {
  x: number = 0;
  y: number = 0;

  constructor(x: number, y: number) {
    [this.x, this.y] = [x, y];
  }

  equals(p2: Point): boolean {
    return this.x == p2.x && this.y == p2.y;
  }
}
