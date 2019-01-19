import { Alert } from './alert';

/**
 * Interfaces provided as an adaptation of the Connexionz schema.
 */

/**
 * Information provided on the content of the original XML document.
 */
export interface Content {
  /**
   * Local time at which the documents content may change.
   * This is time that the document cache will be refreshed.
   */
  expires: Date;

  /**
   * Maximum ETA (in minutes) included.
   */
  maxArrivalScope: number;
}

export interface Destination {
  name: string;
  trips: Trip[];
}

/**
 * Arrival information at a given platform including service alerts.
 */
export interface Platform {
  alerts?: Alert[];
  content: Content;
  name?: string;
  routes?: Route[];
  tag?: number;
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
