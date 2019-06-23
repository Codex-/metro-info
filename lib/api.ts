import { ElementCompact, xml2js } from 'xml-js';

if (
  typeof (global as any).fetch === 'undefined' &&
  typeof window.fetch === 'undefined'
) {
  // tslint:disable-next-line: no-var-requires no-implicit-dependencies
  (global as any).fetch = require('node-fetch');
}

const fetch = (global as any).fetch || window.fetch;

export async function fetchXmlAsJson(uri: string): Promise<ElementCompact> {
  const apiResponse: Response = await fetch(uri);
  const apiText: string = await apiResponse.text();

  return xml2js(apiText, {
    attributesKey: '$',
    compact: true,
    nativeType: true,
  });
}
