import { ElementCompact } from "xml-js";
import { fetchPlatformLocationsAsJson } from "./platform.locations.api";
import { mapToPlatformLocations } from "./platform.locations.mapper";
import { PlatformLocations } from "./platform.locations.model";

/**
 * Fetch all Platform locations from the MetroInfo API.
 *
 * @returns parsed PlatformLocations object.
 */
export async function getPlatformLocations(): Promise<PlatformLocations> {
  const json: ElementCompact = await fetchPlatformLocationsAsJson();
  return mapToPlatformLocations(json);
}
