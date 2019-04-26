import { mapToPoint } from './point.mapper';
import { Point } from './point.model';

describe('mapToPoint', () => {
  describe('for valid point json', () => {
    it('maps a single point', () => {
      const pointJson = {
        $: {
          Lat: '-4.354269524000000e+001',
          Long: '1.726134222000000e+002',
        },
      };
      const point: Point = mapToPoint(pointJson);

      expect(point.lat).toEqual(parseFloat(pointJson.$.Lat));
      expect(point.long).toEqual(parseFloat(pointJson.$.Long));
    });
  });
});
