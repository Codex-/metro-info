import { ElementCompact } from 'xml-js';
import {
  Alert,
  Content,
  Destination,
  Platform,
  Route,
  Trip,
} from './models/position';

// TODO add defense around bad number and date/time strings

export function mapToPosition(positionJson: ElementCompact): Platform {
  const position: ElementCompact = positionJson.JPRoutePositionET2;

  return {
    alerts: (positionJson.Alert && Array.isArray(positionJson.Alert)
      ? positionJson.Alert
      : positionJson.Alert || []
    ).map(mapToAlert),
    content: mapToContent(position.Content),
    // name: positionJson.$.Name,
    // routes: (positionJson.Route || []).map(mapToRoute),
    // tag: parseInt(positionJson.$.PlatformTag, 10),
  };
}

function mapToAlert(alertJson: ElementCompact): Alert {
  return {
    detail: alertJson.Detail._text,
    new: true,
    number: alertJson.Route.$.RouteNo,
    routes: [],
    title: alertJson.$.Title,
    validFrom: new Date(alertJson.$.ValidFrom),
    validTo: new Date(alertJson.$.ValidTo),
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
    destinations: (routeJson.Destination || []).map(mapToDestination),
    name: routeJson.$.Name,
    number: routeJson.$.RouteNo,
  };
}

function mapToDestination(destinationJson: ElementCompact): Destination {
  return {
    name: destinationJson.$.Name,
    trips: (destinationJson.Trip || []).map(mapToTrip),
  };
}

function mapToTrip(tripJson: ElementCompact): Trip {
  return {
    eta: tripJson.$.ETA,
    id: tripJson.$.TripNo,
    wheelchairAccess: tripJson.$.WheelchairAccess,
  };
}
