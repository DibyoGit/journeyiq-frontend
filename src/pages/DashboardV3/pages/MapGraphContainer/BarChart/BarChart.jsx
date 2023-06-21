import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Revenue vs COST",
    },
  },
};

const BarChart = ({ campaignAnalysisData }) => {
  const costDataSet = [];
  const revenueDataSet = [];
  let labels = [];

  let sortedCampaignAnalysisData = campaignAnalysisData.sort(
    (a, b) => a.fiscal_year_quarter - b.fiscal_year_quarter
  );
  sortedCampaignAnalysisData?.forEach((data) => {
    costDataSet.push(data.Campaign_Cost);
    revenueDataSet.push(data.Campaign_Revenue);
    const text =
      data.fiscal_year_quarter.toUpperCase() + "\r\n" + data.Campaign_Name;
    labels.push(text);
  });
  console.log("labels", labels);
  const data = {
    labels: labels.sort((a, b) => a - b) || ["Cost", "Revenue"],
    datasets: [
      {
        label: "Cost",
        data: costDataSet || [],
        backgroundColor: "#ffa500",
      },
      {
        label: "Revenue",
        data: revenueDataSet || [],
        backgroundColor: "rgb(53, 162, 235)",
      },
    ],
  };
  console.log("data", data);
  return (
    <div className="bg-white p-0.5 rounded my-2 h-96 ">
      <Bar options={options} data={data} datasetIdKey="id-001" />
    </div>
  );
};

export default BarChart;
