import React, { useState, useEffect } from "react";
import CountryMenu from "../DropdownMenus/CountryMenu";
import QuarterMenu from "../DropdownMenus/QuarterMenu";
import CampaignMenu from "../DropdownMenus/CampaignMenu";
import BarChart from "../BarChart/BarChart";
import LineChart from "../LineChart/LineChart";
import {
  GET_CAMPAIGNS_ANALYSIS_GEOJSON_DATA,
  GET_CAMPAIGNS_DATA,
  GET_CAMPAIGN_GRAPH,
  GET_MAP_ROI_BY_STATE_DATA,
} from "../../../../../api/api";

const GrapchContainer = () => {
  const [country, setCountry] = useState("United States");
  const [quarterData, setQuarterData] = useState([]);
  const [selectedQuarter, setSelectedQuarter] = useState("All");
  const [campaignData, setCampaignData] = useState([]);
  const [selectedCampaing, setSelectedCampaing] = useState("All");
  const [campaignAnalysisData, setCampaignAnalysisData] = useState(null);
  const [lineChartData, setLineChartData] = useState([]);

  //fetch campaingn analysis (geoJson data) onMount
  // useEffect(() => {
  //   fetch(GET_CAMPAIGNS_ANALYSIS_GEOJSON_DATA, { method: "POST" })
  //     .then((resp) => resp.json())
  //     .then((json) => {
  //       setCampaignAnalysisData(json);
  //     })
  //     .catch((err) => console.error("Could not load data", err)); // eslint-disable-line
  // }, []);
  //fetch line chart data onMount

  useEffect(() => {
    fetch(
      `${GET_CAMPAIGN_GRAPH}?country=${country}&campaign=${
        selectedCampaing === "All" ? "" : selectedCampaing
      }&quarter=${selectedQuarter === "All" ? "" : selectedQuarter}`
    )
      .then((resp) => resp.json())
      .then((json) => {
        setLineChartData(json.data);
      });
  }, [country, selectedCampaing, selectedQuarter]);

  // fetch [campaigns,quarters,country,regions] lists onMount
  useEffect(() => {
    fetch(GET_CAMPAIGNS_DATA)
      .then((resp) => resp.json())
      .then((json) => {
        const { quarters, campaigns, country, regions } = json;
        let campaignsData = ["All"];
        let quartersData = ["All"];
        let regionsData = ["All"];
        campaignsData.push(...campaigns);
        quartersData.push(...quarters);
        regionsData.push(...regions);
        setCampaignData(campaignsData);
        setQuarterData(quartersData);
      })
      .catch((err) => console.error("Could not load data", err)); // eslint-disable-line
  }, []);

  // execute when a user select a country from the dropdown
  const countryDropdownChangeHandler = (country) => {
    setCountry(country);
    setSelectedCampaing("All");
    setSelectedQuarter("All");

    //fetch campaingn analysis (geoJson data)
    // fetch(GET_CAMPAIGNS_ANALYSIS_GEOJSON_DATA, {
    //   method: "POST",
    //   body: JSON.stringify({ country: country }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((resp) => resp.json())
    //   .then((json) => {
    //     setCampaignAnalysisData(json);
    //   })
    //   .catch((err) => console.error("Could not load data", err));

    // fetch [campaigns,quarters,country,regions] lists
    // fetch(`${GET_CAMPAIGNS_DATA}?country=${country}`)
    //   .then((resp) => resp.json())
    //   .then((json) => {
    //     const { quarters, campaigns, country, regions } = json;
    //     let campaignsData = ["All"];
    //     let quartersData = ["All"];
    //     campaignsData.push(...campaigns);
    //     quartersData.push(...quarters);
    //     setCampaignData(campaignsData);
    //     setQuarterData(quartersData);
    //   })
    //   .catch((err) => console.error("Could not load data", err));
  };
  /*** Quarter Filter */
  const quarterDropdownChangeHandler = (quarter) => {
    setSelectedQuarter(quarter);
    // let filterData = { country: country };
    // if (quarter !== "All") {
    //   filterData["quarter"] = quarter;
    // }
    // fetch(GET_CAMPAIGNS_ANALYSIS_GEOJSON_DATA, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     ...filterData,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((resp) => resp.json())
    //   .then((json) => {
    //     setCampaignAnalysisData(json);
    //   })
    //   .catch((err) => console.error("Could not load data", err)); // eslint-disable-line

    // fetch roi-by-campaign data

    // fetch(
    //   `${GET_CAMPAIGN_GRAPH}?country=${country}&quarter=${
    //     quarter === "All" ? "" : quarter
    //   }&campaign=${selectedCampaing === "All" ? "" : selectedCampaing}`
    // )
    //   .then((resp) => resp.json())
    //   .then((json) => {
    //     setLineChartData(json.data);
    //   })
    //   .catch((err) => console.error("Could not load data", err)); // eslint-disable-line

    // setSelectedCampaing("All");
  };

  /*** Campaign Filter */
  const campaignDropdownChangeHandler = (campaign) => {
    setSelectedCampaing(campaign);
    // setSelectedQuarter("All");
    // let filterData = { country: country };
    // if (campaign !== "All") {
    //   filterData["campaign"] = campaign;
    // }

    // fetch(GET_CAMPAIGNS_ANALYSIS_GEOJSON_DATA, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     ...filterData,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((resp) => resp.json())
    //   .then((json) => {
    //     setCampaignAnalysisData(json);
    //   })
    //   .catch((err) => console.error("Could not load data", err)); // eslint-disable-line

    // // fetch roi-by-campaign data
    // fetch(
    //   `${GET_CAMPAIGN_GRAPH}?country=${country}&campaign=${
    //     campaign === "All" ? "" : campaign
    //   }`
    // )
    //   .then((resp) => resp.json())
    //   .then((json) => {
    //     setLineChartData(json.data);
    //   })
    //   .catch((err) => console.error("Could not load data", err)); // eslint-disable-line
  };
  return (
    <div className="bg-slate-300 my-2">
      <div className="flex justify-start">
        <CountryMenu
          country={country}
          countryChangeHandler={countryDropdownChangeHandler}
        />
        <CampaignMenu
          campaignData={campaignData}
          country={country}
          selectedCampaing={selectedCampaing}
          campaignChangeHandler={campaignDropdownChangeHandler}
        />
        <QuarterMenu
          quarterData={quarterData}
          country={country}
          selectedQuarter={selectedQuarter}
          quarterChangeHandler={quarterDropdownChangeHandler}
        />
      </div>
      <BarChart campaignAnalysisData={lineChartData} />
      <LineChart lineChartData={lineChartData} />
    </div>
  );
};

export default GrapchContainer;
