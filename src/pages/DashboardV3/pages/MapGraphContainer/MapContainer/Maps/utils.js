// import { range } from "d3-array";
import { scaleQuantile } from "d3-scale";

// function getRanges(number) {
//   let parts = 10;
//   let numbers = [];
//   let inc = number / parts;
//   for (let i = 0; i <= parts; i++) {
//     numbers.push(Math.floor(inc * i));
//   }
//   return numbers;
// }
export function updatePercentiles(featureCollection, accessor, rangeData) {
  const { features } = featureCollection;

  const domain = [...new Set(features.map(accessor))].sort((a, b) => a - b);
  // const largestNumber = domain[domain.length - 1];
  // let range = getRanges(largestNumber);
  // console.log("range", range);
  console.log("rangeData", rangeData);
  const scale = scaleQuantile()
    .domain(domain)
    .range(rangeData || [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
  console.log("scale", scale);
  // const scale = scaleQuantile().domain(features.map(accessor)).range(range(9));

  return {
    type: "FeatureCollection",
    features: features.map((f) => {
      const value = accessor(f);
      console.log("value", value);
      const properties = {
        Campaign_Cost: f.Campaign_Cost,
        ROI: f.ROI,
        Campaign_Revenue: f.Campaign_Revenue,
        Region: f.Region,
        fiscal_year_quarter: f.fiscal_year_quarter,
        Campaign_Name: f.Campaign_Name,
        value,
        // percentile: scale(value),
        percentile: value,
      };
      let obj = { ...f, properties };
      return obj;
    }),
  };
}
