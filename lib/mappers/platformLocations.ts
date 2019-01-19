import { ElementCompact } from 'xml-js';
import { API_LOCATIONS } from '../constants';
import { Platform, PlatformLocations } from '../models/platformLocations';
import { propertyToArray } from '../utils';
import { mapToContent } from './content';
import { mapToPoint } from './point';

/**
 * This is due to an inconsistency between the schema design and the returned XML.
 */
const LOCATIONS = `${API_LOCATIONS}s`;

export function mapToPlatformLocations(
  locationJson: ElementCompact
): PlatformLocations {
  const platform: ElementCompact = locationJson[LOCATIONS].Platform;

  return {
    content: mapToContent(locationJson[LOCATIONS].Content),
    platforms: propertyToArray(platform).map(mapToPlatform),
  };
}

function mapToPlatform(platformJson: ElementCompact): Platform {
  return {
    bearingToRoad: parseFloat(platformJson.$.BearingToRoad),
    name: platformJson.$.Name,
    number: parseInt(platformJson.$.PlatformNo, 10),
    position: mapToPoint(platformJson.Position),
    roadName: platformJson.$.RoadName,
    tag: parseInt(platformJson.$.PlatformTag, 10),
    vehicleType: undefined,
  };
}
