import { mapToPlatformLocations } from "./platform.locations.mapper";
import { PlatformLocations } from "./platform.locations.model";

describe("mapToPlatformLocations", () => {
  describe("for valid platform locations json", () => {
    it("maps platform locations", () => {
      const platformLocationsJson = {
        _declaration: { $: { version: "1.0", encoding: "utf-8" } },
        JPPlatforms: {
          $: {
            xmlns: "urn:connexionz-co-nz:jp",
            "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
            "xsi:schemaLocation": "urn:connexionz-co-nz:jp JourneyPlanner.xsd",
          },
          Content: { $: { Expires: "2019-04-27T03:30:00+12:00" } },
          Platform: [
            {
              $: {
                PlatformTag: "1219",
                PlatformNo: "28142",
                Name: "Addington Village",
                BearingToRoad: "3.2193924e+002",
                RoadName: "Lincoln Rd",
              },
              Position: {
                $: {
                  Lat: "-4.354269524000000e+001",
                  Long: "1.726134222000000e+002",
                },
              },
            },
            {
              $: {
                PlatformTag: "1220",
                PlatformNo: "44108",
                Name: "Addington Village",
                BearingToRoad: "1.4198888e+002",
                RoadName: "Lincoln Rd",
              },
              Position: {
                $: {
                  Lat: "-4.354386705000000e+001",
                  Long: "1.726111654000000e+002",
                },
              },
            },
            {
              $: {
                PlatformTag: "2940",
                PlatformNo: "45477",
                Name: "Aidanfield Dr near Bibiana St",
                BearingToRoad: "2.1811232e+002",
                RoadName: "Aidanfield Dr",
              },
              Position: {
                $: {
                  Lat: "-4.356581921000000e+001",
                  Long: "1.725743414000000e+002",
                },
              },
            },
            {
              $: {
                PlatformTag: "2941",
                PlatformNo: "47192",
                Name: "Aidanfield Dr near Bibiana St",
                BearingToRoad: "3.8112324e+001",
                RoadName: "Aidanfield Dr",
              },
              Position: {
                $: {
                  Lat: "-4.356595693000000e+001",
                  Long: "1.725742336000000e+002",
                },
              },
            },
          ],
        },
      };

      // TODO: Remove cast when typings resolved.
      // https://github.com/nashwaan/xml-js/issues/105
      const platformLocations: PlatformLocations = mapToPlatformLocations(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        platformLocationsJson as any
      );

      expect(typeof platformLocations.content).toBe("object");
      expect(Array.isArray(platformLocations.platforms)).toBe(true);
      expect(platformLocations.platforms.length).toBeGreaterThan(0);

      for (
        let i = 0;
        i < platformLocationsJson.JPPlatforms.Platform.length;
        i++
      ) {
        const mappedPlatform = platformLocations.platforms[i];
        const originalPlatform = platformLocationsJson.JPPlatforms.Platform[i];

        expect(mappedPlatform.bearingToRoad).toEqual(
          parseFloat(originalPlatform.$.BearingToRoad)
        );
        expect(mappedPlatform.name).toEqual(originalPlatform.$.Name);
        expect(mappedPlatform.number).toEqual(
          parseInt(originalPlatform.$.PlatformNo)
        );
        expect(typeof mappedPlatform.position).toBe("object");
        expect(mappedPlatform.roadName).toEqual(originalPlatform.$.RoadName);
        expect(mappedPlatform.tag).toEqual(
          parseInt(originalPlatform.$.PlatformTag)
        );
      }
    });
  });
});
