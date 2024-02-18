import { Point } from "../types/Point";

export class LeafletAdapter {
  static LatLngToPoint(latLng: L.LatLng[]): Point[] {
    return latLng.map((el) => new Point(el.lng, el.lat));
  }
}
