import React, { useState, useEffect } from "react";
import RoiMap from "./Maps/RoiMap";

import CountryMenu from "../DropdownMenus/CountryMenu";

import {
  GET_CAMPAIGNS_ANALYSIS_GEOJSON_DATA,
  GET_CAMPAIGNS_DATA,
  GET_MAP_REVENUE_FILTER,
  GET_MAP_ROI_BY_STATE_DATA,
  GET_MAP_ROI_FILTER,
} from "../../../../../api/api";
import RoiSortDropdown from "../TopSortDropdown/RoiSortDropdown";
import RevenueSortDropdown from "../TopSortDropdown/RevenueSortDropdown";
import { getRange } from "../../../../../Utility/functions/findRange";


const LEGEND_DATA = [
  { id: 1001, range: "0-1", color: "#e53935" },
  { id: 1002, range: "1-2", color: "#ef9a9a" },
  // { id: 1003, range: "2-3", color: "#ffebee" },
  { id: 1003, range: "2-3", color: "#fff176" },
  { id: 1004, range: "3-4", color: "#bae3bc" },
  { id: 1005, range: "4-5", color: "#a5d6a7" },
  { id: 1006, range: "5-6", color: "#81c784" },
  { id: 1007, range: "6-7", color: "#66bb6a" },
  { id: 1008, range: "7-8", color: "#4caf50" },
  { id: 1009, range: "8-9", color: "#43a047" },
  { id: 1100, range: "9-10", color: "#2e7d32" },
];
const STOPS = [
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
];

const MapContainer = () => {
  const [campaignAnalysisData, setCampaignAnalysisData] = useState(null);
  const [campaignData, setCampaignData] = useState([]);
  const [quarterData, setQuarterData] = useState([]);
  const [country, setCountry] = useState("United States");
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedCampaing, setSelectedCampaing] = useState("All");
  const [selectedQuarter, setSelectedQuarter] = useState("All");
  const [lineChartData, setLineChartData] = useState([]);

  const [sortByRoi, setSortByRoi] = useState({ text: "Select", value: 0 });
  const [sortByRevenue, setSortByRevenue] = useState({
    text: "Select",
    value: 0,
  });

  const [mapLegendData, setMapLegendData] = useState(LEGEND_DATA);
  const [stops, setStops] = useState(STOPS);
  const [rangeData, setRangeData] = useState([]);

  //fetch campaingn analysis (geoJson data)
  useEffect(() => {
    fetch(GET_CAMPAIGNS_ANALYSIS_GEOJSON_DATA, { method: "POST" })
      .then((resp) => resp.json())
      .then((json) => {
        setCampaignAnalysisData(json);
      })
      .catch((err) => console.error("Could not load data", err)); // eslint-disable-line
    // .finally(() => {
    //   setLoading(false);
    // });
  }, []);

  // fetch [campaigns,quarters,country,regions] lists
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
        // setCountry(country);   //will be required in future
        setRegions(regionsData);
      })
      .catch((err) => console.error("Could not load data", err)); // eslint-disable-line
  }, []);

  // fetch roi-by-campaign data
  useEffect(() => {
    fetch(GET_MAP_ROI_BY_STATE_DATA)
      .then((resp) => resp.json())
      .then((json) => {
        setLineChartData(json);
      });
  }, []);

  /*** Country Filter */
  const countryDropdownChangeHandler = (country) => {
    setCountry(country);
    setSelectedCampaing("All");
    setSelectedQuarter("All");
    setSelectedRegion("All");
    setCampaignData([]);
    setQuarterData([]);
    setSortByRoi({
      text: "Select",
      value: 0,
    });
    setSortByRevenue({
      text: "Select",
      value: 0,
    });

    setMapLegendData(LEGEND_DATA);
    setStops(STOPS);
    //fetch campaingn analysis (geoJson data)
    fetch(GET_CAMPAIGNS_ANALYSIS_GEOJSON_DATA, {
      method: "POST",
      body: JSON.stringify({ country: country }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((json) => {
        setCampaignAnalysisData(json);
      })
      .catch((err) => console.error("Could not load data", err));

    // fetch [campaigns,quarters,country,regions] lists
    fetch(`${GET_CAMPAIGNS_DATA}?country=${country}`)
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
        // setCountry(country);   //will be required in future
        setRegions(regionsData);
      })
      .catch((err) => console.error("Could not load data", err));

    // fetch roi-by-campaign data
    fetch(`${GET_MAP_ROI_BY_STATE_DATA}?country=${country}`)
      .then((resp) => resp.json())
      .then((json) => {
        setLineChartData(json);
      })
      .catch((err) => console.error("Could not load data", err)); // eslint-disable-line
  };

  /*** Region Filter */
  const regionDropdownChangeHandler = (region) => {
    setSelectedRegion(region);
    setSelectedCampaing("All");
    setSelectedQuarter("All");
    setCampaignData([]);
    setQuarterData([]);

    //fetch campaingn analysis (geoJson data)
    fetch(GET_CAMPAIGNS_ANALYSIS_GEOJSON_DATA, {
      method: "POST",
      body: JSON.stringify({
        country: country,
        region: region === "All" ? "" : region,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((json) => {
        setCampaignAnalysisData(json);
      })
      .catch((err) => console.error("Could not load data", err)); // eslint-disable-line

    // fetch [campaigns,quarters,country,regions] lists
    fetch(
      `${GET_CAMPAIGNS_DATA}?country=${country}&region=${region === "All" ? "" : region
      }`
    )
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
        // setCountry(country);   //will be required in future
      })
      .catch((err) => console.error("Could not load data", err));

    // fetch roi-by-campaign data
    fetch(
      `${GET_MAP_ROI_BY_STATE_DATA}?country=${country}&region=${region === "All" ? "" : region
      }`
    )
      .then((resp) => resp.json())
      .then((json) => {
        setLineChartData(json);
      })
      .catch((err) => console.error("Could not load data", err)); // eslint-disable-line
  };

  /*** Quarter Filter */
  const quarterDropdownChangeHandler = (quarter) => {
    setSelectedQuarter(quarter);
    setSelectedCampaing("All");
    if (quarter === "All") {
      fetch(GET_CAMPAIGNS_ANALYSIS_GEOJSON_DATA, {
        method: "POST",
        body: JSON.stringify({
          country: country,
          region: selectedRegion === "All" ? "" : selectedRegion,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((json) => {
          setCampaignAnalysisData(json);
        })
        .catch((err) => console.error("Could not load data", err)); // eslint-disable-line
    } else {
      fetch(GET_CAMPAIGNS_ANALYSIS_GEOJSON_DATA, {
        method: "POST",
        body: JSON.stringify({
          quarter: quarter,
          country: country,
          region: selectedRegion === "All" ? "" : selectedRegion,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((json) => {
          setCampaignAnalysisData(json);
        })
        .catch((err) => console.error("Could not load data", err));
    }
    // fetch roi-by-campaign data
    fetch(
      `${GET_MAP_ROI_BY_STATE_DATA}?country=${country}&region=${selectedRegion === "All" ? "" : selectedRegion
      }&quarter=${quarter === "All" ? "" : quarter}`
    )
      .then((resp) => resp.json())
      .then((json) => {
        setLineChartData(json);
      })
      .catch((err) => console.error("Could not load data", err)); // eslint-disable-line
  };

  /*** Campaign Filter */
  const campaignDropdownChangeHandler = (campaign) => {
    setSelectedCampaing(campaign);
    setSelectedQuarter("All");
    if (campaign === "All") {
      fetch(GET_CAMPAIGNS_ANALYSIS_GEOJSON_DATA, {
        method: "POST",
        body: JSON.stringify({
          country: country,
          region: selectedRegion === "All" ? "" : selectedRegion,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((json) => {
          setCampaignAnalysisData(json);
        })
        .catch((err) => console.error("Could not load data", err)); // eslint-disable-line
    } else {
      fetch(GET_CAMPAIGNS_ANALYSIS_GEOJSON_DATA, {
        method: "POST",
        body: JSON.stringify({
          campaign: campaign,
          country: country,
          region: selectedRegion === "All" ? "" : selectedRegion,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((json) => {
          setCampaignAnalysisData(json);
        })
        .catch((err) => console.error("Could not load data", err));
    }

    // fetch roi-by-campaign data
    fetch(
      `${GET_MAP_ROI_BY_STATE_DATA}?country=${country}&region=${selectedRegion === "All" ? "" : selectedRegion
      }&campaign=${campaign === "All" ? "" : campaign}`
    )
      .then((resp) => resp.json())
      .then((json) => {
        setLineChartData(json);
      })
      .catch((err) => console.error("Could not load data", err)); // eslint-disable-line
  };

  const sortByRoiHandler = (option) => {
    setSortByRevenue({ text: "Select", value: 0 });
    if (option.value && option.value !== sortByRoi.value) {
      setSortByRoi(option);
      fetch(`${GET_MAP_ROI_FILTER}?country=${country}&limit=${option.value}`)
        .then((resp) => resp.json())
        .then((json) => {
          setCampaignAnalysisData(json);
          const { min, max } = json.roiRange;
          const range = getRange(min, max, 10);
          setRangeData([]); //to show color when clicked on the roi sort
          let data = []; // legend Data
          let newStops = []; //color stop data
          for (let index = 0; index < LEGEND_DATA.length; index++) {
            if (range[index] > 0) {
              if (index === LEGEND_DATA.length - 1) {
                const element = {
                  ...LEGEND_DATA[index],
                  range: range[index] + "-" + (range[index] + 1),
                };
                data.push(element);
              } else {
                const element = {
                  ...LEGEND_DATA[index],
                  range: range[index] + "-" + range[index + 1],
                };
                data.push(element);
              }
              //for color stop
              const stopElm = [range[index], STOPS[index][1]];
              newStops.push(stopElm);
            }
          }
          setMapLegendData(data);
          setStops(newStops);
        });
    }
  };

  const sortByRevenueHandler = (option) => {
    setSortByRoi({ text: "Select", value: 0 });
    if (option.value && option.value !== sortByRevenue.value) {
      setSortByRevenue(option); //reset sort by roi
      fetch(
        `${GET_MAP_REVENUE_FILTER}?country=${country}&limit=${option.value}`
      )
        .then((resp) => resp.json())
        .then((json) => {
          setCampaignAnalysisData(json);

          const { min, max } = json.revenueRange;
          const range = getRange(min, max, 10);
          setRangeData(range); //to display colors on the map when click revenue sort
          let data = []; // legend Data
          let newStops = []; //color stop data
          for (let index = 0; index < LEGEND_DATA.length; index++) {
            if (range[index] > 0) {
              if (index === LEGEND_DATA.length - 1) {
                const element = {
                  ...LEGEND_DATA[index],
                  range: range[index] + "-" + (range[index] + 1),
                };
                data.push(element);
              } else {
                const element = {
                  ...LEGEND_DATA[index],
                  range: range[index] + "-" + range[index + 1],
                };
                data.push(element);
              }
              //for color stop
              const stopElm = [range[index], STOPS[index][1]];
              newStops.push(stopElm);
            }
          }
          setMapLegendData(data);
          setStops(newStops);
        });
    }
  };
  return (
    <div>
      {/*** Filters */}
      <div className="flex w-full items-end bg-slate-300 rounded-t">
        <CountryMenu
          country={country}
          countryChangeHandler={countryDropdownChangeHandler}
        />
        {/* <RegionsMenu
          regionChangeHandler={regionDropdownChangeHandler}
          regions={regions}
          selectedRegion={selectedRegion}
        /> */}
  

        <RoiSortDropdown onSort={sortByRoiHandler} sortObj={sortByRoi} />
        <RevenueSortDropdown
          onSort={sortByRevenueHandler}
          sortObj={sortByRevenue}
        />
      </div>
      {/*** MAP */}
      <RoiMap
        campaignAnalysisData={campaignAnalysisData}
        legendData={mapLegendData}
        stops={stops}
        isRevenueLegend={sortByRevenue.value}
        rangeData={rangeData}
      />




    </div>
  );
};

export default MapContainer;
