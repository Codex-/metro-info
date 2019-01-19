import { Alert } from './alert';
import { Content } from './content';
import { PlatformHeader } from './platformHeader';

/**
 * Interfaces provided as an adaptation of the Connexionz schema.
 */

export interface Destination {
  name: string;
  trips: Trip[];
}

/**
 * Arrival information at a given platform including service alerts.
 */
export interface PlatformTimes extends PlatformHeader {
  alerts?: Alert[];
  content: Content;
  routes?: Route[];
}

export interface Route {
  destinations: Destination[];
  name: string;
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
  id: number;

  wheelchairAccess: boolean;
}
