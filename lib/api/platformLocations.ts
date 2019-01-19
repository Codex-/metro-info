import { API_LOCATIONS, API_URL } from '../constants';
import { fetchXmlAsJson } from './common';

export async function fetchPlatformLocationsAsJson() {
  return fetchXmlAsJson(`${API_URL}${API_LOCATIONS}`);
}
