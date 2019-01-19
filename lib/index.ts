import { ElementCompact } from 'xml-js';
import { fetchPlatformLocationsAsJson } from './api/platformLocations';
import { fetchPlatformTimesAsJson } from './api/platformTimes';
import { mapToPlatformLocations } from './mappers/platformLocations';
import { mapToPlatformTimes } from './mappers/platformTimes';
import { PlatformLocations } from './models/platformLocations';
import { PlatformTimes } from './models/platformTimes';

(async () => {
  const platformJson = await fetchPlatformTimesAsJson(3350);
  // tslint:disable-next-line:no-console
  console.log('%j', platformJson);

  const platformTimes: PlatformTimes = mapToPlatformTimes(
    platformJson as ElementCompact
  );
  // tslint:disable-next-line:no-console
  console.log(platformTimes);

  const platformLocationJson = (await fetchPlatformLocationsAsJson()) as ElementCompact;
  // platformLocationJson.JPPlatforms.Platform = [
  //   platformLocationJson.JPPlatforms.Platform[0],
  // ];
  // tslint:disable-next-line:no-console
  console.log('%j', platformLocationJson);

  const platformLocations: PlatformLocations = mapToPlatformLocations(
    platformLocationJson as ElementCompact
  );
  // tslint:disable-next-line:no-console
  console.log(platformLocations);
  // tslint:disable-next-line:no-console
  console.log(platformLocations.platforms[0].position);
})();
