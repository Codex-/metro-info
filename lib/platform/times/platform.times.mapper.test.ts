import { mapToPlatformTimes } from './platform.times.mapper';
import { Destination, PlatformTimes, Trip } from './platform.times.model';

interface RawTrip {
  $: { ETA: string; TripID: string; WheelchairAccess: string };
}

describe('mapToPlatformTimes', () => {
  const platformTimesJson = {
    _declaration: { $: { version: '1.0', encoding: 'utf-8' } },
    JPRoutePositionET2: {
      $: {
        xmlns: 'urn:connexionz-co-nz:jp',
        'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        'xsi:schemaLocation': 'urn:connexionz-co-nz:jp JourneyPlanner.xsd',
      },
      Content: {
        $: { Expires: '2019-04-26T23:34:31+12:00', MaxArrivalScope: '60' },
      },
      Platform: {
        $: {
          PlatformTag: '1499',
          Name: 'Westfield (temporary)',
          PlatformNo: '1',
        },
        Route: [
          {
            $: { RouteNo: 'Oa', Name: 'Orbiter' },
            Destination: {
              $: { Name: 'Orbiter via Barrington' },
              Trip: [
                {
                  $: {
                    ETA: '10',
                    TripID: '3046',
                    WheelchairAccess: 'true',
                  },
                },
                {
                  $: {
                    ETA: '41',
                    TripID: '3065',
                    WheelchairAccess: 'true',
                  },
                },
              ],
            },
          },
          {
            $: { RouteNo: 'Y', Name: 'Yellow Line' },
            Destination: {
              $: { Name: 'New Brighton via City' },
              Trip: {
                $: { ETA: '5', TripID: '1261', WheelchairAccess: 'true' },
              },
            },
          },
        ],
        Alert: {
          $: {
            ValidFrom: '2017-12-19',
            ValidTo: '2019-12-25',
            Title: 'Notification',
          },
          Detail: {
            _text:
              'Express trip rules - Buses travelling to the city do not pick up after Denton Park, Hornby (drop offs only). Buses travelling to Rolleston do not drop off before the Hub Hornby (pick ups only).',
          },
          Route: { $: { RouteNo: 'Y' } },
        },
      },
    },
  };

  function assertTrips(
    mappedTrips: Trip[],
    originalTrips: RawTrip | RawTrip[]
  ) {
    if (Array.isArray(originalTrips)) {
      expect(mappedTrips.length).toEqual(originalTrips.length);
      for (let i = 0; i < originalTrips.length; i++) {
        assertTrip(mappedTrips[i], originalTrips[i]);
      }
    } else {
      expect(mappedTrips.length).toEqual(1);
      assertTrip(mappedTrips[0], originalTrips);
    }
  }

  function assertTrip(
    mappedTrip: Trip,
    originalTrip: {
      $: { ETA: string; TripID: string; WheelchairAccess: string };
    }
  ) {
    expect(mappedTrip.eta).toEqual(parseInt(originalTrip.$.ETA, 10));
    expect(mappedTrip.id).toEqual(parseInt(originalTrip.$.TripID, 10));
    expect(mappedTrip.wheelchairAccess).toEqual(
      originalTrip.$.WheelchairAccess
        ? originalTrip.$.WheelchairAccess === 'true'
        : undefined
    );
  }

  describe('for valid platform times json', () => {
    it('maps platform times', () => {
      // TODO: Remove cast when typings resolved.
      // https://github.com/nashwaan/xml-js/issues/105
      const platformTimes: PlatformTimes = mapToPlatformTimes(
        platformTimesJson as any
      );

      expect(Array.isArray(platformTimes.alerts)).toBe(true);
      expect(typeof platformTimes.content).toBe('object');
      expect(platformTimes.name).toEqual(
        platformTimesJson.JPRoutePositionET2.Platform.$.Name
      );
      expect(platformTimes.number).toEqual(
        parseInt(platformTimesJson.JPRoutePositionET2.Platform.$.PlatformNo, 10)
      );
      expect(platformTimes.tag).toEqual(
        parseInt(
          platformTimesJson.JPRoutePositionET2.Platform.$.PlatformTag,
          10
        )
      );

      expect(Array.isArray(platformTimes.routes)).toBe(true);
      expect(platformTimes.routes!.length).toBeGreaterThan(0);

      for (
        let i = 0;
        i < platformTimesJson.JPRoutePositionET2.Platform.Route.length;
        i++
      ) {
        const mappedPlatform = platformTimes.routes![i];
        const originalPlatform =
          platformTimesJson.JPRoutePositionET2.Platform.Route[i];

        expect(mappedPlatform.name).toEqual(originalPlatform.$.Name);
        expect(mappedPlatform.number).toEqual(originalPlatform.$.RouteNo);

        expect(Array.isArray(mappedPlatform.destinations)).toBe(true);
        expect(mappedPlatform.destinations.length).toBeGreaterThan(0);

        if (Array.isArray(originalPlatform.Destination)) {
          for (let j = 0; j < originalPlatform.Destination.length; j++) {
            const mappedDestination = mappedPlatform.destinations[j];
            const originalDestination = originalPlatform.Destination[j];

            expect(mappedDestination.name).toEqual(originalDestination.$.Name);
          }
        } else {
          expect(mappedPlatform.destinations[0].name).toEqual(
            originalPlatform.Destination.$.Name
          );
          assertTrips(
            mappedPlatform.destinations[0].trips,
            originalPlatform.Destination.Trip
          );
        }
      }
    });

    it('maps destinations when source JSON has multiple destinations', () => {
      // TODO
    });

    it('maps destinations when source JSON has only one destination', () => {
      // TODO
    });

    it('maps trips when source JSON has multiple trips', () => {
      // TODO
    });

    it('maps trips when source JSON has only one trip', () => {
      // TODO
    });

    it('maps trips with no TripID', () => {
      // TODO
    });

    it('maps trips with no WheelchairAccess', () => {
      // TODO
    });
  });
});
