import * as request from 'request-promise-native';
import { ElementCompact, xml2js } from 'xml-js';

export async function fetchXmlAsJson(uri: string): Promise<ElementCompact> {
  const apiResponse: string = await request(uri).promise();

  return xml2js(apiResponse, {
    attributesKey: '$',
    compact: true,
    nativeType: true,
  });
}
