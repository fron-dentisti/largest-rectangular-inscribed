import L from "leaflet";

export const southWest = L.latLng(-90, -180);
export const northEast = L.latLng(90, 180);

export const mapMaxBounds = L.latLngBounds(southWest, northEast);
