import * as request from 'request-promise-native';
import { ElementCompact, xml2js } from 'xml-js';
import { API_POSITION, API_URL } from '../constants';

export async function fetchPlatformAsJson(
  platformNumber: number
): Promise<ElementCompact | string> {
  const getUrl = `${API_URL}${API_POSITION}&PlatformTag=${platformNumber}`;
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
