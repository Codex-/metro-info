/**
 * Enums provided as an adaptation of the Connexionz schema.
 *
 * Omitted:
 *  - enum-service
 *  - enum-vehicletype
 */

/**
 * Perceived direction from the start to the end of the route pattern.
 */
export enum Direction {
  AC = 'Anti-Clockwise',
  CC = 'Counterclockwise',
  CL = 'Clockwise',
  DN = 'Down',
  EB = 'Eastbound',
  IB = 'Inbound',
  IW = 'Inward',
  NB = 'Northbound',
  OB = 'Outbound',
  OW = 'Outward',
  SB = 'Southbound',
  UP = 'Up',
  WB = 'Westbound',
}

/**
 * Indicates status of schedule.
 */
export enum Schedule {
  Active,
  Pending,
}
