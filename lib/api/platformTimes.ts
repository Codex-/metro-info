import { API_TIMES, API_URL } from '../constants';
import { fetchXmlAsJson } from './common';

export async function fetchPlatformTimesAsJson(platformNumber: number) {
  return fetchXmlAsJson(`${API_URL}${API_TIMES}&PlatformTag=${platformNumber}`);
}
