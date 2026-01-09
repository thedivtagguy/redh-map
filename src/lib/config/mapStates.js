const LONDON_CENTER = [-0.1276, 51.5074];

import poisData from './pois.json';

function getPOI(label) {
  const feature = poisData.features.find((f) => f.properties.label === label);
  if (!feature) console.warn(`POI not found: ${label}`);
  return feature?.geometry.coordinates || [-0.1276, 51.5074];
}

export const mapStates = [
  {
    id: 'intro',
    title: 'Victorian London',
    description: 'Overview of London in the 1890s',
    center: LONDON_CENTER,
    zoom: 12,
    bearing: 0,
    pitch: 0,
    markerFilter: 'known'
  },
  {
    id: 'baker-street',
    title: '221B Baker Street',
    description: "Holmes's residence",
    center: getPOI('Baker Street'),
    zoom: 16,
    bearing: 0,
    pitch: 0,
    markerFilter: 'known'
  },
  {
    id: 'definite-locations',
    title: 'Known Locations',
    description: 'All definite locations from the story',
    center: [-0.1316, 51.5137],
    zoom: 12,
    bearing: 0,
    pitch: 0,
    markerFilter: 'known'
  },
  {
    id: 'transportation-routing',
    title: 'Transportation in London',
    description: 'Navigating the Victorian city',
    center: LONDON_CENTER,
    zoom: 12,
    bearing: 0,
    pitch: 0,
    showStations: true,
    markerFilter: 'all'
  },
  {
    id: 'aldersgate',
    title: 'Aldersgate Station',
    description: 'Now Barbican Station',
    center: getPOI('Aldersgate Station'),
    zoom: 16,
    bearing: 0,
    pitch: 0,
    showStations: true,
    markerFilter: 'known'
  },
  {
    id: 'saxe-coburg-square',
    title: 'Saxe-Coburg Square (Charterhouse Square)',
    description: "Mr. Jabez Wilson's pawnshop",
    center: getPOI('Charterhouse Square'),
    zoom: 17,
    bearing: 0,
    pitch: 0,
    pitch: 0,
    padding: { top: 50, bottom: 50, left: 50, right: 50 },
    markerFilter: 'known'
  },
  {
    id: 'bank',
    title: 'The Bank',
    description: 'City and Suburban Bank location',
    center: [-0.097681004912898, 51.520437246209106],
    zoom: 19,
    bearing: 0,
    pitch: 0,

    markerFilter: 'known'
  },
  {
    id: 'interlude-london-overview',
    title: 'London Overview',
    description: 'Zooming out...',
    center: LONDON_CENTER,
    zoom: 12,
    bearing: 0,
    pitch: 0,
    markerFilter: 'known'
  },
  {
    id: 'watson',
    title: "Dr. Watson's House",
    description: 'Church Street, Kensington',
    center: getPOI("Watson's House"),
    zoom: 18,
    bearing: 0,
    pitch: 0,

    markerFilter: 'known'
  },
  {
    id: 'fleet-street',
    title: "Pope's Court, Fleet Street",
    description: "Wilson's employment location (Poppins Court)",
    center: getPOI('Poppins Court'),
    zoom: 19,
    bearing: 0,
    pitch: 0,
    markerFilter: 'known'
  },
  {
    id: 'king-edward-street',
    title: 'King Edward Street',
    description: 'Wilson tracks Ross to a manufactory',
    center: getPOI('King Edward Street'),
    zoom: 17,
    bearing: 0,
    pitch: 0,
    markerFilter: 'known'
  },
  {
    id: 'st-james-hall',
    title: "St. James' Hall",
    description: 'Holmes and Watson attend a concert',
    center: getPOI("St. James's Hall"),
    zoom: 16,
    bearing: 0,
    pitch: 0,
    markerFilter: 'known'
  },
  {
    id: 'overview-all',
    title: 'All Locations',
    description: 'Complete map of all locations in the story',
    center: LONDON_CENTER,
    zoom: 12.5,
    bearing: 0,
    pitch: 0,
    showAll: true,
    fitToMarkers: true,
    markerFilter: 'all'
  },
  {
    id: 'paths-intro',
    title: 'Character Movements',
    description: 'Tracking routes through Victorian London',
    center: LONDON_CENTER,
    zoom: 13,
    bearing: 0,
    pitch: 0,
    markerFilter: 'all'
  },
  {
    id: 'path-jabez-commute',
    title: "Jabez Wilson's Commute",
    description: 'Daily journey to copy the Encyclopaedia',
    center: [-0.101, 51.517],
    zoom: 14,
    bearing: 0,
    pitch: 0,
    animatedPath: {
      layer: 'jabez-commute',
      duration: 3000,
      color: '#c2410c'
    },
    bounds: [[-0.105135, 51.513786], [-0.097862, 51.520655]],
    padding: { top: 50, bottom: 50, left: 50, right: 50 },
    markerFilter: 'all'
  },
  {
    id: 'path-holmes-watson-afternoon',
    title: 'To St. James\' Hall',
    description: 'Holmes and Watson attend a concert',
    center: [-0.133, 51.516],
    zoom: 13,
    bearing: 0,
    pitch: 0,
    animatedPath: {
      layer: 'holmes-and-watson',
      duration: 3000,
      color: '#7c3aed'
    },
    bounds: [[-0.158012, 51.509602], [-0.097407, 51.530623]],
    padding: { top: 50, bottom: 50, left: 50, right: 50 },

    markerFilter: 'all'
  },
  {
    id: 'path-holmes-day',
    title: "Holmes's Investigation",
    description: 'Examining Saxe-Coburg Square',
    center: [-0.117, 51.515],
    zoom: 14,
    bearing: 0,
    pitch: 0,
    showStations: true,
    animatedPath: {
      layer: 'holmes-day',
      duration: 3000,
      color: '#dc2626'
    },
    bounds: [[-0.157592, 51.508877], [-0.136858, 51.522302]],
    markerFilter: 'all'
  },
  {
    id: 'path-watson-day',
    title: "Watson's Journey to Baker Street",
    description: 'From Kensington to 221B',
    center: [-0.165, 51.512],
    zoom: 13,
    bearing: 0,
    pitch: 0,
    animatedPath: {
      layer: 'watson-day',
      duration: 3000,
      color: '#2563eb'
    },
    bounds: [[-0.191364, 51.501562], [-0.135433, 51.509546]],
    markerFilter: 'all',
    padding: { top: 50, bottom: 50, left: 50, right: 50 },

  },
  {
    id: 'path-watson-night',
    title: "Watson's evening Journey",
    description: 'Through Hyde Park to Baker Street',
    center: [-0.175, 51.507],
    zoom: 13,
    bearing: 0,
    pitch: 0,
    animatedPath: {
      layer: 'watson-night',
      duration: 3000,
      color: '#0891b2'
    },
    bounds: [[-0.191364, 51.502023], [-0.156402, 51.523366]],
    markerFilter: 'all'
  },
  {
    id: 'path-whole-party',
    title: "Catching John Clay",
    description: 'The party gathers to effect the capture',
    center: [-0.14, 51.515],
    zoom: 13,
    bearing: 0,
    pitch: 0,
    animatedPath: {
      layer: 'whole-party',
      duration: 3000,
      color: '#000000'
    },
    bounds: [[-0.158121, 51.517865], [-0.105334, 51.527184]],
    markerFilter: 'all'
  },
  {
    id: 'paths-all',
    title: 'All Character Routes',
    description: 'Complete movements through the story',
    center: LONDON_CENTER,
    zoom: 12.5,
    bearing: 0,
    pitch: 0,
    showAllPaths: true,
    paths: [
      { layer: 'jabez-commute', color: '#c2410c', opacity: 0.8 },
      { layer: 'holmes-and-watson', color: '#7c3aed', opacity: 0.8 },
      { layer: 'holmes-day', color: '#dc2626', opacity: 0.8 },
      { layer: 'watson-day', color: '#2563eb', opacity: 0.8 },
      { layer: 'watson-night', color: '#0891b2', opacity: 0.8 },
      { layer: 'whole-party', color: '#000000', opacity: 0.8 }
    ],
    hideLabels: true,
    markerFilter: 'all'
  }
];

export function getMapState(id) {
  return mapStates.find(state => state.id === id);
}

export function getAllLocations() {
  return mapStates
    .filter(state => state.locations && state.locations.length > 0)
    .flatMap(state => state.locations);
}

export const pathEntries = [
  { id: 'path-jabez-commute', label: "Jabez Wilson's Commute" },
  { id: 'path-holmes-watson-afternoon', label: "To Saxe-Coburg Square & Concert" },
  { id: 'path-holmes-day', label: "Holmes goes home" },
  { id: 'path-watson-day', label: "Watson's goes home" },
  { id: 'path-watson-night', label: "Watson's Evening Journey" },
  { id: 'path-whole-party', label: "Catching John Clay" }
];
