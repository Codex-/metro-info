import { mapToContent } from "./content.mapper";
import { Content } from "./content.model";

describe("mapToContent", () => {
  describe("for valid content json", () => {
    it("maps content", () => {
      const contentJson = {
        $: { Expires: "2019-04-26T23:34:31+12:00", MaxArrivalScope: "60" },
      };
      const content: Content = mapToContent(contentJson);

      expect(content.expires).toBeInstanceOf(Date);
      expect(content.expires).toEqual(new Date(contentJson.$.Expires));
      expect(content.maxArrivalScope).toEqual(
        parseInt(contentJson.$.MaxArrivalScope)
      );
    });
  });
});
