import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// import { GET_MAP_ROI_BY_STATE_DATA } from "../../../../../api/api";
import ReactApexChart from "react-apexcharts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "ROI by Quarters",
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
  },
};

function LineChart({ lineChartData }) {
  const campaignSet = [];
  // const roiSet = [];
  let categories = [];
  let seriesObj = {};
  lineChartData.forEach((data) => {
    //find the all unique campaings and the rois in array
    if (seriesObj[data.Campaign_Name]) {
      seriesObj[data.Campaign_Name].push(data.ROI);
    } else {
      seriesObj[data.Campaign_Name] = [data.ROI];
    }

    campaignSet.push(data.Campaign_Name);

    // roiSet.push(data.ROI);
    categories.push(data.fiscal_year_quarter.toUpperCase());
  });
  // console.log("roiSet", roiSet);
  // console.log("seriesObj", seriesObj);
  categories = [...new Set(categories)];
  // console.log("categories set", categories);

  // console.log('campaignSet', campaignSet)
  let series = [];
  Object.entries(seriesObj).forEach((arrItem) => {
    // console.log("arrItem", arrItem);
    series.push({ name: arrItem[0], data: arrItem[1] });
  });
  // console.log("series", series);
  const options = {
    // colors: ["#ffa500", "rgb(53, 162, 235)"],
    theme: {
      palette: "palette6",
    },
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },

    dataLabels: {
      enabled: false,
    },

    title: {
      text: "ROI by Quarters",
      align: "center",
    },
    legend: {
      tooltipHoverFormatter: function (val, opts) {
        return (
          val +
          " - " +
          opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
          ""
        );
      },
      // markers: { fillColors: ["#ffa500", "rgb(53, 162, 235)"] },
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6,
      },
    },
    xaxis: {
      categories: [...categories],
    },

    grid: {
      borderColor: "#e8e8e8da",
    },
  };
  return (
    <div className="bg-white p-0.5 rounded my-1">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
}
export default LineChart;
