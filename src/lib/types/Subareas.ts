import { Vertexes } from ".";

export class Subareas {
  vertexes: Vertexes;
  lngs: number[];
  lats: number[];
  grid: number[][];

  constructor(v: Vertexes, { lngs, lats }: { lngs: number[]; lats: number[] }) {
    this.vertexes = v;
    this.lats = lats;
    this.lngs = lngs;

    this.grid = [...Array(this.m)].map(() => [...Array(this.n)].fill(0));
  }

  get n() {
    return this.lngs.length - 1;
  }

  get m() {
    return this.lats.length - 1;
  }
}
