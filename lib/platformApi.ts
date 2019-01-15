import * as request from 'request-promise-native';
import * as convert from 'xml-js';

const API_URL_BASE = 'http://rtt.metroinfo.org.nz/rtt/public/utility/';
const API_URL_PLATFORM =
  'file.aspx?ContentType=SQLXML&Name=JPRoutePositionET&PlatformTag=';
const API_URL = `${API_URL_BASE}${API_URL_PLATFORM}`;

export async function fetchPlatform(platformNumber: number): Promise<any> {
  try {
    const apiResponse = await request(`${API_URL}${platformNumber}`).promise();
    // const responseText = await apiResponse.text();

    return convert.xml2js(apiResponse, { compact: true });
  } catch (err) {
    return 'Error: ' + err.message;
  }
}
