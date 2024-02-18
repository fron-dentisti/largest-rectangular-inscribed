import { Point } from "../lib/types";

export class GeometryUtil {
  static GaussArea(points: Point[]): number {
    const n = points.length;

    const area = points.reduce((acc, p1, i) => {
      const p2 = points[(i + 1) % n];
      return acc + p1.x * p2.y - p1.y * p2.x;
    }, 0);

    return Math.abs(area) / 2;
  }

  static GeodesicArea(latLngs: L.LatLng[]) {
    const n = latLngs.length;

    if (n > 2) {
      const d2r = Math.PI / 180;

      const area = latLngs.reduce((acc, p1, i) => {
        const p2 = latLngs[(i + 1) % n];
        return (
          acc +
          (p2.lng - p1.lng) *
            d2r *
            (2 + Math.sin(p1.lat * d2r) + Math.sin(p2.lat * d2r))
        );
      }, 0);

      return (area * 6378137.0 * 6378137.0) / 2.0;
    }

    return 0;
  }
}
