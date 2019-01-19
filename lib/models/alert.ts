/**
 * Interfaces provided as an adaptation of the Connexionz schema.
 */

/**
 * Rider alert for a period. Gives warnings about issues on one or more routes.
 */
export interface Alert {
  /**
   * Commentary on the alert.
   */
  detail: string;

  /**
   * True where alert has been recently created or updated.
   */
  new?: boolean;

  routes: AlertRoute[];

  title: string;

  /**
   * Start date of alert.
   */
  validFrom: Date;

  /**
   * End date of alert, if omitted - perpetual.
   */
  validTo?: Date;
}

/**
 * Route affected by alert, if omitted all routes are affected.
 */
export interface AlertRoute {
  /**
   * Designator for route.
   */
  number: string;
}
