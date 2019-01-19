import { ElementCompact } from 'xml-js';
import { mapToPosition } from './mappers/position';
import { Platform } from './models/position';
import { fetchPlatformAsJson } from './platformApi';

(async () => {
  const platformJson = await fetchPlatformAsJson(3350);
  // tslint:disable-next-line:no-console
  console.log('%j', platformJson);

  const platform: Platform = mapToPosition(platformJson as ElementCompact);
  // tslint:disable-next-line:no-console
  console.log('%j', platform);
})();
