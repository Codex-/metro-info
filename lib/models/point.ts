/**
 * Geo-coded location of platform in WGS84 format.
 */
export interface Point {
  /**
   * WGS84 Latitude in decimal degrees.
   */
  lat: number;

  /**
   * WGS84 Longitude in decimal degrees.
   */
  long: number;
}
