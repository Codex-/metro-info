import { ElementCompact } from 'xml-js';
import { fetchPlatformTimesAsJson } from './platform.times.api';
import { mapToPlatformTimes } from './platform.times.mapper';
import { PlatformTimes } from './platform.times.model';

/**
 * Fetch all Platform times for a given platform from the MetroInfo API.
 *
 * @param platformNumber
 * @returns parsed PlatformTimes object.
 */
export async function getPlatformTimes(
  platformNumber: number
): Promise<PlatformTimes> {
  const json: ElementCompact = await fetchPlatformTimesAsJson(platformNumber);
  return mapToPlatformTimes(json);
}
