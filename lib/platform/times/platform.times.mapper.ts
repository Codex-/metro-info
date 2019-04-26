import { ElementCompact } from 'xml-js';
import { mapToAlert } from '../../alert/alert.mapper';
import { API_TIMES } from '../../constants';
import { mapToContent } from '../../content/content.mapper';
import { propertyToArray } from '../../utils';
import {
  Destination,
  PlatformTimes,
  Route,
  Trip,
} from './platform.times.model';

export function mapToPlatformTimes(
  positionJson: ElementCompact
): PlatformTimes {
  const platform: ElementCompact = positionJson[API_TIMES].Platform;

  return {
    alerts: propertyToArray(platform.Alert).map(mapToAlert),
    content: mapToContent(positionJson[API_TIMES].Content),
    name: platform.$.Name,
    number: platform.$.PlatformNo
      ? parseInt(platform.$.PlatformNo, 10)
      : undefined,
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
    eta: parseInt(tripJson.$.ETA, 10),
    id: tripJson.$.TripID ? parseInt(tripJson.$.TripID, 10) : undefined,
    wheelchairAccess: tripJson.$.WheelchairAccess
      ? tripJson.$.WheelchairAccess === 'true'
      : undefined,
  };
}
