import * as request from 'request-promise-native';
import { ElementCompact, xml2js } from 'xml-js';

const API_URL_BASE = 'http://rtt.metroinfo.org.nz/rtt/public/utility/';
const API_URL_PLATFORM =
  'file.aspx?ContentType=SQLXML&Name=JPRoutePositionET&PlatformTag=';
const API_URL = `${API_URL_BASE}${API_URL_PLATFORM}`;

export async function fetchPlatformAsJson(
  platformNumber: number
): Promise<ElementCompact | string> {
  try {
    const apiResponse: string = await request(
      `${API_URL}${platformNumber}`
    ).promise();
    const platformJson: ElementCompact = xml2js(apiResponse, { compact: true });

    return platformJson;
  } catch (err) {
    return 'Error: ' + err.message;
  }
}
