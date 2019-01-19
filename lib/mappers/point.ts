import { ElementCompact } from 'xml-js';
import { Point } from '../models/point';

export function mapToPoint(pointJson: ElementCompact): Point {
  return {
    lat: parseFloat(pointJson.$.Lat),
    long: parseFloat(pointJson.$.Long),
  };
}
