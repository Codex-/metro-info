import { ElementCompact } from 'xml-js';
import { Point } from './point.model';

export function mapToPoint(pointJson: ElementCompact): Point {
  return {
    lat: parseFloat(pointJson.$.Lat),
    long: parseFloat(pointJson.$.Long),
  };
}
