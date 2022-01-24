import { ElementCompact } from "xml-js";
import { API_LOCATIONS } from "../../constants";
import { mapToContent } from "../../content/content.mapper";
import { mapToPoint } from "../../point/point.mapper";
import { propertyToArray } from "../../utils";
import { Platform, PlatformLocations } from "./platform.locations.model";

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
