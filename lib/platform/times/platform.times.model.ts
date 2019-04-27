import { Alert } from '../../alert/alert.model';
import { Content } from '../../content/content.model';
import { PlatformHeader } from '../header/platform.header.model';

/**
 * Interfaces provided as an adaptation of the Connexionz schema.
 *
 * Schema: JPRoutePositionET2
 */

export interface Destination {
  name: string;
  trips: Trip[];
}

/**
 * Arrival information at a given platform including service alerts.
 */
export interface PlatformTimes extends PlatformHeader {
  alerts: Alert[];
  content: Content;
  routes: Route[];
}

export interface Route {
  destinations: Destination[];
  name: string;

  /**
   * Route numbers can be letters or numbers.
   */
  number: string;
}

export interface Trip {
  /**
   * Number of minutes to the expected arrival.
   */
  eta: number;

  /**
   * Trip identifier as contained in GTFS dataset.
   */
  id?: number;

  /**
   * True when vehicle has wheelchair access.
   */
  wheelchairAccess?: boolean;
}
