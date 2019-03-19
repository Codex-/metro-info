import { mapToAlert } from './alert.mapper';
import { Alert } from './alert.model';

describe('mapToAlert', () => {
  describe('for valid alert json', () => {
    it('maps a single alert', () => {
      const singleAlertJson = {
        $: {
          ValidFrom: '2017-12-19',
          ValidTo: '2019-12-25',
          Title: 'Notification',
        },
        Detail: {
          _text: 'Express trip rules',
        },
        Route: { $: { RouteNo: 'Y' } },
      };
      const alert: Alert = mapToAlert(singleAlertJson);

      expect(alert.detail).toEqual(singleAlertJson.Detail._text);
      expect(alert.routes.length).toBe(1);
      expect(alert.routes[0].number).toBe(singleAlertJson.Route.$.RouteNo);
      expect(alert.title).toEqual(singleAlertJson.$.Title);
      expect(alert.validFrom).toBeInstanceOf(Date);
      expect(alert.validTo).toBeInstanceOf(Date);
    });
  });
});
