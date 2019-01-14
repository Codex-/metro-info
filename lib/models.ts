export interface Alert {
  detail: string;
  number: string;
  title: string;
  validFrom: Date;
  validTo: Date;
}

export interface Destination {
  name: string;
  trips: Trip[];
}

export interface Platform {
  alerts: Alert[];
  name: string;
  routes: Route[];
  tag: number;
}

export interface Route {
  destinations: Destination[];
  name: string;
  number: string;
}

export interface Trip {
  eta: number;
  id: number;
  wheelchairAccess: boolean;
}
