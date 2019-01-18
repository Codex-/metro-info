import * as request from 'request-promise-native';
import { ElementCompact, xml2js } from 'xml-js';

const API_PLATFORM = 'JPRoutePositionET2';

const API_URL_BASE = 'http://rtt.metroinfo.org.nz/rtt/public/utility/';
const API_URL_GET = 'file.aspx?ContentType=SQLXML&Name=';
const API_URL = `${API_URL_BASE}${API_URL_GET}`;

export async function fetchPlatformAsJson(
  platformNumber: number
): Promise<ElementCompact | string> {
  const getUrl = `${API_URL}${API_PLATFORM}&PlatformTag=${platformNumber}`;
  try {
    const apiResponse: string = await request(getUrl).promise();
    const platformJson: ElementCompact = xml2js(apiResponse, {
      attributesKey: '$',
      compact: true,
      nativeType: true,
    });

    return platformJson;
  } catch (err) {
    return 'Error: ' + err.message;
  }
}
