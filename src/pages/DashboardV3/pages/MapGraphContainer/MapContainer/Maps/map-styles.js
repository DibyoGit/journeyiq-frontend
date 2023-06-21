// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export function dataLayer(stops) {
  return {
    id: "data",
    type: "fill",
    paint: {
      "fill-color": {
        property: "percentile",
        stops: stops || [
          [0, "#e53935"],
          [1, "#ef9a9a"],
          [2, "#fff176"],
          // [2, "#ffebee"],
          [3, "#bae3bc"],
          [4, "#a5d6a7"],
          [5, "#81c784"],
          [6, "#66bb6a"],
          [7, "#4caf50"],
          [8, "#43a047"],
          [9, "#2e7d32"],
        ],
      },
      "fill-opacity": 1,
      "fill-outline-color": "#fff",
    },
  };
}
// export const dataLayer = {
//   id: "data",
//   type: "fill",
//   paint: {
//     "fill-color": {
//       property: "percentile",
//       stops: [
//         [0, "#e53935"],
//         [1, "#ef9a9a"],
//         [2, "#fff176"],
//         // [2, "#ffebee"],
//         [3, "#e8f5e9"],
//         [4, "#a5d6a7"],
//         [5, "#81c784"],
//         [6, "#66bb6a"],
//         [7, "#4caf50"],
//         [8, "#43a047"],
//         [9, "#2e7d32"],
//       ],
//     },
//     "fill-opacity": 1,
//     "fill-outline-color": "#fff",
//   },
// };

export const symbolLayer = {
  id: "points",
  type: "symbol",
  source: "points",
  layout: {
    // "icon-image":
    //   "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
    // get the title name from the source's "title" property
    "text-field": ["get", "Region"],
    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
    "text-offset": [0, 1.25],
    "text-anchor": "bottom",
  },
  paint: {
    // "text-color": "#eaeaea",
    "text-color": "#333537",
    "text-halo-width": 10,
  },
};

// const circleLayer = {
//   id: "point",
//   type: "circle",
//   paint: {
//     "circle-radius": 10,
//     "circle-color": "#007cbf",
//   },
// };
