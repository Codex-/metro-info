import { ElementCompact } from 'xml-js';
import { fetchPlatformAsJson } from './api/platformTimes';
import { mapToPosition } from './mappers/platformTimes';
import { Platform } from './models/platformTimes';

(async () => {
  const platformJson = await fetchPlatformAsJson(3350);
  // tslint:disable-next-line:no-console
  console.log('%j', platformJson);

  const platform: Platform = mapToPosition(platformJson as ElementCompact);
  // tslint:disable-next-line:no-console
  console.log('%j', platform);
})();
