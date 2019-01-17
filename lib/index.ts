import { ElementCompact } from 'xml-js';
import { Platform } from './models';
import { fetchPlatformAsJson } from './platformApi';
import { mapToPlatform } from './platformMapper';

(async () => {
  const platformJson = await fetchPlatformAsJson(3350);

  const platform: Platform = mapToPlatform(platformJson as ElementCompact);

  // tslint:disable-next-line:no-console
  console.log('%j', platform);
})();
