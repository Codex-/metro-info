import { ElementCompact } from 'xml-js';
import { fetchXmlAsJson } from '../../api';
import { API_TIMES, API_URL } from '../../constants';

export async function fetchPlatformTimesAsJson(
  platformNumber: number
): Promise<ElementCompact> {
  return fetchXmlAsJson(`${API_URL}${API_TIMES}&PlatformTag=${platformNumber}`);
}
