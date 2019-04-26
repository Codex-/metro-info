/**
 * Interfaces provided as an adaptation of the Connexionz schema.
 *
 * Schema: PlatformHdr
 */

export interface PlatformHeader {
  /**
   * The common name of the platform defaulting to the nearest intersection.
   */
  name: string;

  /**
   * Platform number attached to the street furniture.
   * Used for public identification and may change due to maintenance (vandalism, furniture replacement etc).
   */
  number?: number;

  /**
   * Internal key for platform. This key will remain constant for this platform.
   */
  tag: number;
}
