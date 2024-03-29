import { ElementCompact } from "xml-js";
import { propertyToArray } from "../utils";
import { Alert, AlertRoute } from "./alert.model";

export function mapToAlert(alertJson: ElementCompact): Alert {
  return {
    detail: alertJson.Detail._text,
    new: true,
    routes: propertyToArray(alertJson.Route).map(mapToAlertRoute),
    title: alertJson.$.Title,
    validFrom: new Date(alertJson.$.ValidFrom),
    validTo: new Date(alertJson.$.ValidTo),
  };
}

function mapToAlertRoute(alertRouteJson: ElementCompact): AlertRoute {
  return {
    number: alertRouteJson.$.RouteNo,
  };
}
