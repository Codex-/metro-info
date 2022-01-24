import { mapToPlatformTimes } from "./platform.times.mapper";
import {
  Destination,
  PlatformTimes,
  Route,
  Trip,
} from "./platform.times.model";

describe("mapToPlatformTimes", () => {
  let platformTimesJson: any;

  function assertDestinations(
    mappedDestinations: Destination[],
    originalDestinations: any[]
  ) {
    expect(mappedDestinations.length).toEqual(originalDestinations.length);
    for (let i = 0; i < originalDestinations.length; i++) {
      const mappedDestination = mappedDestinations[i];
      const originalDestination = originalDestinations[i];

      expect(mappedDestination.name).toEqual(originalDestination.$.Name);
      expect(Array.isArray(mappedDestination.trips)).toBe(true);
    }
  }

  function assertRoutes(mappedRoutes: Route[], originalRoutes: any[]) {
    expect(mappedRoutes.length).toEqual(originalRoutes.length);
    for (let i = 0; i < originalRoutes.length; i++) {
      const mappedRoute = mappedRoutes[i];
      const originalRoute = originalRoutes[i];

      expect(Array.isArray(mappedRoute.destinations)).toBe(true);
      expect(mappedRoute.name).toEqual(originalRoute.$.Name);
      expect(mappedRoute.number).toEqual(originalRoute.$.RouteNo);
    }
  }

  function assertTrips(mappedTrips: Trip[], originalTrips: any[]) {
    expect(mappedTrips.length).toEqual(originalTrips.length);
    for (let i = 0; i < originalTrips.length; i++) {
      const mappedTrip = mappedTrips[i];
      const originalTrip = originalTrips[i];

      expect(mappedTrip.eta).toEqual(parseInt(originalTrip.$.ETA, 10));
      expect(mappedTrip.id).toEqual(parseInt(originalTrip.$.TripID, 10));
      expect(mappedTrip.wheelchairAccess).toEqual(
        originalTrip.$.WheelchairAccess
          ? originalTrip.$.WheelchairAccess === "true"
          : undefined
      );
    }
  }

  beforeEach(() => {
    platformTimesJson = {
      _declaration: { $: { version: "1.0", encoding: "utf-8" } },
      JPRoutePositionET2: {
        $: {
          xmlns: "urn:connexionz-co-nz:jp",
          "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
          "xsi:schemaLocation": "urn:connexionz-co-nz:jp JourneyPlanner.xsd",
        },
        Content: {
          $: { Expires: "2019-04-26T23:34:31+12:00", MaxArrivalScope: "60" },
        },
        Platform: {
          $: {
            PlatformTag: "1499",
            Name: "Westfield (temporary)",
            PlatformNo: "1",
          },
          Route: [
            {
              $: { RouteNo: "Oa", Name: "Orbiter" },
              Destination: {
                $: { Name: "Orbiter via Barrington" },
                Trip: [
                  {
                    $: {
                      ETA: "10",
                      TripID: "3046",
                      WheelchairAccess: "true",
                    },
                  },
                  {
                    $: {
                      ETA: "41",
                      TripID: "3065",
                      WheelchairAccess: "true",
                    },
                  },
                ],
              },
            },
            {
              $: { RouteNo: "Y", Name: "Yellow Line" },
              Destination: {
                $: { Name: "New Brighton via City" },
                Trip: {
                  $: { ETA: "5", TripID: "1261", WheelchairAccess: "true" },
                },
              },
            },
          ],
          Alert: {
            $: {
              ValidFrom: "2017-12-19",
              ValidTo: "2019-12-25",
              Title: "Notification",
            },
            Detail: {
              _text:
                "Express trip rules - Buses travelling to the city do not pick up after Denton Park, Hornby (drop offs only). Buses travelling to Rolleston do not drop off before the Hub Hornby (pick ups only).",
            },
            Route: { $: { RouteNo: "Y" } },
          },
        },
      },
    };
  });

  describe("for valid platform times json", () => {
    it("maps platform times", () => {
      // TODO: Remove cast when typings resolved.
      // https://github.com/nashwaan/xml-js/issues/105
      const platformTimes: PlatformTimes = mapToPlatformTimes(
        platformTimesJson as any
      );

      expect(Array.isArray(platformTimes.alerts)).toBe(true);
      expect(typeof platformTimes.content).toBe("object");
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
    });

    it("maps platform times when source JSON has no number", () => {
      delete platformTimesJson.JPRoutePositionET2.Platform.$.PlatformNo;
      // TODO: Remove cast when typings resolved.
      // https://github.com/nashwaan/xml-js/issues/105
      const platformTimes: PlatformTimes = mapToPlatformTimes(
        platformTimesJson as any
      );

      expect(platformTimes.number).toEqual(undefined);
    });

    it("maps routes when source JSON has only one route", () => {
      platformTimesJson.JPRoutePositionET2.Platform.Route = {
        $: { RouteNo: "Y", Name: "Yellow Line" },
        Destination: {
          $: { Name: "New Brighton via City" },
          Trip: {
            $: { ETA: "5", TripID: "1261", WheelchairAccess: "true" },
          },
        },
      };
      const platformRoutes = mapToPlatformTimes(platformTimesJson).routes;

      expect(Array.isArray(platformRoutes)).toBe(true);
      expect(platformRoutes.length).toBeGreaterThan(0);
      assertRoutes(platformRoutes, [
        platformTimesJson.JPRoutePositionET2.Platform.Route,
      ]);
    });

    it("maps routes when source JSON has multiple routes", () => {
      const platformTimes = mapToPlatformTimes(platformTimesJson);

      expect(Array.isArray(platformTimes.routes)).toBe(true);
      expect(platformTimes.routes.length).toBeGreaterThan(0);
      assertRoutes(
        platformTimes.routes,
        platformTimesJson.JPRoutePositionET2.Platform.Route
      );
    });

    it("maps destinations when source JSON has only one destination", () => {
      platformTimesJson.JPRoutePositionET2.Platform.Route = {
        $: { RouteNo: "Y", Name: "Yellow Line" },
        Destination: {
          $: { Name: "New Brighton via City" },
          Trip: {
            $: { ETA: "5", TripID: "1261", WheelchairAccess: "true" },
          },
        },
      };
      const platformRoutes = mapToPlatformTimes(platformTimesJson).routes;

      for (const route of platformRoutes) {
        expect(Array.isArray(route.destinations)).toBe(true);
        assertDestinations(route.destinations, [
          platformTimesJson.JPRoutePositionET2.Platform.Route.Destination,
        ]);
      }
    });

    it("maps destinations when source JSON has multiple destinations", () => {
      const platformRoutes = mapToPlatformTimes(platformTimesJson).routes;
      const originalRoutes =
        platformTimesJson.JPRoutePositionET2.Platform.Route;

      for (let i = 0; i < originalRoutes.length; i++) {
        const mappedDestinations = platformRoutes[i].destinations;
        let originalDestinations = originalRoutes[i].Destination;
        if (!Array.isArray(originalDestinations)) {
          originalDestinations = [originalDestinations];
        }

        expect(Array.isArray(mappedDestinations)).toBe(true);
        assertDestinations(mappedDestinations, originalDestinations);
      }
    });

    it("maps trips when source JSON has only one trip", () => {
      platformTimesJson.JPRoutePositionET2.Platform.Route = {
        $: { RouteNo: "Y", Name: "Yellow Line" },
        Destination: {
          $: { Name: "New Brighton via City" },
          Trip: {
            $: { ETA: "5", TripID: "1261", WheelchairAccess: "true" },
          },
        },
      };
      const platformRoutes = mapToPlatformTimes(platformTimesJson).routes;
      const trips = platformRoutes[0].destinations[0].trips;

      expect(Array.isArray(trips)).toBe(true);
      assertTrips(trips, [
        platformTimesJson.JPRoutePositionET2.Platform.Route.Destination.Trip,
      ]);
    });

    it("maps trips when source JSON has multiple trips", () => {
      const platformRoutes = mapToPlatformTimes(platformTimesJson).routes;
      const trips = platformRoutes[0].destinations[0].trips;

      expect(Array.isArray(trips)).toBe(true);
      assertTrips(
        trips,
        platformTimesJson.JPRoutePositionET2.Platform.Route[0].Destination.Trip
      );
    });

    it("maps trips with no TripID", () => {
      platformTimesJson.JPRoutePositionET2.Platform.Route = {
        $: { RouteNo: "Y", Name: "Yellow Line" },
        Destination: {
          $: { Name: "New Brighton via City" },
          Trip: {
            $: { ETA: "5", WheelchairAccess: "true" },
          },
        },
      };
      const platformRoutes = mapToPlatformTimes(platformTimesJson).routes;
      const trip = platformRoutes[0].destinations[0].trips[0];
      const originalTrip =
        platformTimesJson.JPRoutePositionET2.Platform.Route.Destination.Trip;

      expect(trip.eta).toBe(parseInt(originalTrip.$.ETA, 10));
      expect(trip.id).toBe(undefined);
      expect(trip.wheelchairAccess).toBe(
        originalTrip.$.WheelchairAccess === "true"
      );
    });

    it("maps trips with no WheelchairAccess", () => {
      platformTimesJson.JPRoutePositionET2.Platform.Route = {
        $: { RouteNo: "Y", Name: "Yellow Line" },
        Destination: {
          $: { Name: "New Brighton via City" },
          Trip: {
            $: { ETA: "5", TripID: "1261" },
          },
        },
      };
      const platformRoutes = mapToPlatformTimes(platformTimesJson).routes;
      const trip = platformRoutes[0].destinations[0].trips[0];

      expect(trip.wheelchairAccess).toBe(undefined);
    });
  });
});
