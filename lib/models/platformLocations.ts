import { Content } from './content';
import { PlatformHeader } from './platformHeader';
import { Point } from './point';

/**
 * Interfaces provided as an adaptation of the Connexionz schema.
 */

/**
 * Locations and names of all platforms in the system.
 */
export interface PlatformLocations {
  content: Content;

  platforms: Platform[];
}

export interface Platform extends PlatformHeader {
  /**
   * Bearing from platform to road in decimal degrees.
   */
  bearingToRoad?: number;

  position: Point;

  /**
   * Name of the road on which the platform is located.
   */
  roadName?: string;

  /**
   * Type of vehicle that can use platform.
   *
   * TODO: Not yet implemented.
   */
  vehicleType?: any;
}
