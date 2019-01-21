import { fetchXmlAsJson } from '../../api';
import { API_LOCATIONS, API_URL } from '../../constants';

export async function fetchPlatformLocationsAsJson() {
  return fetchXmlAsJson(`${API_URL}${API_LOCATIONS}`);
}
