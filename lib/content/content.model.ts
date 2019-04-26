/**
 * Interfaces provided as an adaptation of the Connexionz schema.
 *
 * Schema: Content
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
