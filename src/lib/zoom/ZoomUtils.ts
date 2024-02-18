import { GeometryUtil } from "../../utils/GeometryUtil";
import { Point } from "../types";

const { log2, ceil } = Math;

export class ZoomUtils {
  static MapArea = GeometryUtil.GaussArea([
    new Point(-180, -90),
    new Point(-180, 90),
    new Point(180, 90),
    new Point(180, -90),
  ]);

  static findMinZoom(
    points: Point[],
    epsilon: number,
    width: number,
    heigth: number
  ): number {
    const polygonArea = GeometryUtil.GaussArea(points);
    return (
      ceil(
        log2(
          (ZoomUtils.MapArea * epsilon * 1.5) / (width * heigth * polygonArea)
        ) / 2
      ) + 1
    );
  }
}
