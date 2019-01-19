import { ElementCompact } from 'xml-js';
import {
  Content,
  Destination,
  Platform,
  Route,
  Trip,
} from '../models/platformTimes';
import { propertyToArray } from '../utils';
import { mapToAlert } from './alert';

export function mapToPosition(positionJson: ElementCompact): Platform {
  const platform: ElementCompact = positionJson.JPRoutePositionET2.Platform;

  return {
    alerts: propertyToArray(platform.Alert).map(mapToAlert),
    content: mapToContent(positionJson.JPRoutePositionET2.Content),
    name: platform.$.Name,
    routes: propertyToArray(platform.Route).map(mapToRoute),
    tag: parseInt(platform.$.PlatformTag, 10),
  };
}

function mapToContent(contentJson: ElementCompact): Content {
  return {
    expires: new Date(contentJson.$.Expires),
    maxArrivalScope: parseInt(contentJson.$.MaxArrivalScope, 10),
  };
}

function mapToRoute(routeJson: ElementCompact): Route {
  return {
    destinations: propertyToArray(routeJson.Destination).map(mapToDestination),
    name: routeJson.$.Name,
    number: routeJson.$.RouteNo,
  };
}

function mapToDestination(destinationJson: ElementCompact): Destination {
  return {
    name: destinationJson.$.Name,
    trips: propertyToArray(destinationJson.Trip).map(mapToTrip),
  };
}

function mapToTrip(tripJson: ElementCompact): Trip {
  return {
    eta: tripJson.$.ETA,
    id: tripJson.$.TripNo,
    wheelchairAccess: tripJson.$.WheelchairAccess,
  };
}
