import { ElementCompact } from 'xml-js';
import { API_TIMES } from '../constants';
import {
  Destination,
  PlatformTimes,
  Route,
  Trip,
} from '../models/platformTimes';
import { propertyToArray } from '../utils';
import { mapToAlert } from './alert';
import { mapToContent } from './content';

export function mapToPlatformTimes(
  positionJson: ElementCompact
): PlatformTimes {
  const platform: ElementCompact = positionJson[API_TIMES].Platform;

  return {
    alerts: propertyToArray(platform.Alert).map(mapToAlert),
    content: mapToContent(positionJson[API_TIMES].Content),
    name: platform.$.Name,
    routes: propertyToArray(platform.Route).map(mapToRoute),
    tag: parseInt(platform.$.PlatformTag, 10),
  };
}

function mapToDestination(destinationJson: ElementCompact): Destination {
  return {
    name: destinationJson.$.Name,
    trips: propertyToArray(destinationJson.Trip).map(mapToTrip),
  };
}

function mapToRoute(routeJson: ElementCompact): Route {
  return {
    destinations: propertyToArray(routeJson.Destination).map(mapToDestination),
    name: routeJson.$.Name,
    number: routeJson.$.RouteNo,
  };
}

function mapToTrip(tripJson: ElementCompact): Trip {
  return {
    eta: tripJson.$.ETA,
    id: tripJson.$.TripNo,
    wheelchairAccess: tripJson.$.WheelchairAccess,
  };
}
