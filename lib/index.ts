import { ElementCompact } from 'xml-js';
import { Platform } from './models/position';
import { fetchPlatformAsJson } from './platformApi';
import { mapToPosition } from './platformMapper';

(async () => {
  const platformJson = await fetchPlatformAsJson(3350);

  const platform: Platform = mapToPosition(platformJson as ElementCompact);

  // tslint:disable-next-line:no-console
  console.log('%j', platformJson);
  // tslint:disable-next-line:no-console
  console.log(platform);
})();
