import { ElementCompact } from 'xml-js';
import { Alert, Destination, Platform, Route, Trip } from './models';

export function mapToPlatform(platformJson: ElementCompact): Platform {
  return {
    alerts: (platformJson.Alert || []).map(mapToAlert),
    name: platformJson.$.Name,
    routes: (platformJson.Route || []).map(mapToRoute),
    tag: parseInt(platformJson.$.PlatformTag, 10),
  };
}

function mapToAlert(alertJson: ElementCompact): Alert {
  return {
    detail: alertJson.Detail,
    number: alertJson.Route.$.RouteNo,
    title: alertJson.$.Title,
    validFrom: new Date(alertJson.$.ValidFrom),
    validTo: new Date(alertJson.$.ValidTo),
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
    number: tripJson.$.TripNo,
    wheelchairAccess: tripJson.$.WheelchairAccess,
  };
}
