import React, { useMemo, useState, useCallback } from "react";
import Map, { Source, Layer } from "react-map-gl";
import { updatePercentiles } from "./utils";
import { dataLayer, symbolLayer } from "./map-styles";
import styles from "./RoiMap.module.css";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiaGVtYW50YS1vYmkiLCJhIjoiY2xoYnVweXJwMDZweTNxcDQ1NmxsaGE3MyJ9.sFwArILdkEahK-YJZSbkYA";

// const LEGEND_DATA = [
//   { id: 1001, range: "0-1", color: "#e53935" },
//   { id: 1002, range: "1-2", color: "#ef9a9a" },
//   // { id: 1003, range: "2-3", color: "#ffebee" },
//   { id: 1003, range: "2-3", color: "#fff176" },
//   { id: 1004, range: "3-4", color: "#e8f5e9" },
//   { id: 1005, range: "4-5", color: "#a5d6a7" },
//   { id: 1006, range: "5-6", color: "#81c784" },
//   { id: 1007, range: "6-7", color: "#66bb6a" },
//   { id: 1008, range: "7-8", color: "#4caf50" },
//   { id: 1009, range: "8-9", color: "#43a047" },
//   { id: 1100, range: "9-10", color: "#2e7d32" },
// ];

const RoiMap = ({
  campaignAnalysisData,
  legendData,
  stops,
  isRevenueLegend,
  rangeData,
}) => {
  const [hoverInfo, setHoverInfo] = useState(null);

  // const [rangeData, setRangeData] = useState(null);
  const [isShowingRevenue, setIsShowingRevenue] = useState(false);

  // Map data
  const data = useMemo(() => {
    if (rangeData && rangeData.length) {
      //to display revenue
      setIsShowingRevenue(true);
    } else {
      setIsShowingRevenue(false);
    }
    return (
      campaignAnalysisData &&
      updatePercentiles(
        campaignAnalysisData,
        (f) => (!isShowingRevenue ? f.ROI : f.Campaign_Revenue),
        rangeData
      )
    );
  }, [campaignAnalysisData, rangeData, isShowingRevenue]);

  /*** MAP HOVER */
  const onHover = useCallback((event) => {
    const {
      features,
      point: { x, y },
    } = event;
    const hoveredFeature = features && features[0];

    // prettier-ignore
    setHoverInfo(hoveredFeature && {feature: hoveredFeature, x, y});
  }, []);

  let legends = null;

  legends = legendData?.map((arrItem, i) => {
    return (
      <p
        key={arrItem.id}
        style={{
          backgroundColor: arrItem.color,
          borderRadius: "4px",
          padding: "4px",
          marginLeft: "4px",
          fontSize: "12px",
        }}
      >
        {arrItem.range}
      </p>
    );
  });

  return (
    <div>
      <Map
        initialViewState={{
          latitude: 40,
          longitude: -100,
          zoom: 3,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        style={{
          width: "100%",
          height: 600,
        }}
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={["data"]}
        onMouseMove={onHover}
      >
        <Source type="geojson" data={data}>
          <Layer {...dataLayer(stops)} />
          <Layer {...symbolLayer} />
        </Source>
        {hoverInfo && (
          <div
            className={styles.tooltip}
            style={{ left: hoverInfo.x, top: hoverInfo.y }}
          >
            <div>
              State :&nbsp;
              <span style={{ textTransform: "uppercase" }}>
                {hoverInfo.feature.properties.Region}
              </span>
            </div>
            {/* <div>
              Quarter :&nbsp;
              <span style={{ textTransform: "uppercase" }}>
                {hoverInfo.feature.properties.fiscal_year_quarter}
              </span>
            </div> */}
            {/* <div>
              Campaign :&nbsp;
              <span style={{ textTransform: "uppercase" }}>
                {hoverInfo.feature.properties.Campaign_Name}
              </span>
            </div> */}
            {hoverInfo.feature.properties?.Campaign_Revenue ? (
              <div>
                Revenue :&nbsp;${hoverInfo.feature.properties?.Campaign_Revenue}
              </div>
            ) : (
              ""
            )}

            {/* <div>Cost :&nbsp;${hoverInfo.feature.properties.Campaign_Cost}</div> */}
            {hoverInfo.feature.properties?.ROI ? (
              <div>Roi :&nbsp;{hoverInfo.feature.properties?.ROI}</div>
            ) : (
              ""
            )}
          </div>
        )}
      </Map>
      <div className="w-full bg-slate-300 p-2 mr-0 flex justify-end">
        <div className="bg-white rounded w-fit flex flex-row flex-wrap justify-end items-center p-1 ">
          <p className="text-xs font-medium">
            {isRevenueLegend ? "Revenue Range" : "ROI Range"}
          </p>
          {legends}
        </div>
      </div>
    </div>
  );
};
export default RoiMap;
