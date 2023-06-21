import { useEffect, useState } from "react";
import Card from "../sharedComponent/Card/Card";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
    ComposableMap,
    Geographies,
    Geography,
    Sphere,
    Graticule,
    ZoomableGroup,
    Marker
} from "react-simple-maps";
import axios from "axios";
import { GET_MAP_DATA } from "../../api/api";


const geoUrl = "/feature.json";

const markers = [
    {
        markerOffset: -30,
        name: "INDIA",
        coordinates: [78.8718, 21.7679]
    },
    {
        markerOffset: -30,
        name: "USA",
        coordinates: [-95.665, 37.6]
    },
    {
        markerOffset: -30,
        name: "JAPAN",
        coordinates: [139.839478, 35.652832]
    },

];

const colorScale = scaleLinear()
    .domain([50, 1])
    .range([ "#002D62", "#F0F8FF"]);

export const RSM = ({data}) => {
/*     const [data, setData] = useState([]); */

  /*   async function getRegionData() {
        try {
            const { data } = await axios.get(GET_MAP_DATA,{})
            console.log(data)
            setData(data)
        } catch (error) {
            console.log(error)
        }
    } */

   /*  useEffect(() => {
         csv(`/vulnerability.csv`).then((data) => {
              setData(data);
          });

        getRegionData()
    }, []);
 */
    console.log(data)

    return (
        <Card  propsStyle=" bg-[#6CB4EE] "  >
            <ComposableMap
                projectionConfig={{
                    rotate: [-10, 0, 0],
                    scale: 160
                }}
            >
                <ZoomableGroup center={[0, 0]} zoom={1}>
                <Sphere stroke="#F0F8FF" strokeWidth={0.3} /> 
                   <Graticule stroke="#F0F8FF" strokeWidth={0.3} /> 
                    {data.length > 0 && (
                        <Geographies geography='/feature.json'>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const d = data.find((s) => s.countryISO === geo.id);
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={d ? colorScale(d?.visits) : "#F0F8FF"}
                                        />
                                    );
                                })
                            }
                        </Geographies>
                    )}
                    {markers.map(({ name, coordinates, markerOffset }) => (
                        <Marker key={name} coordinates={coordinates}>
                            <g
                                fill="none"
                                stroke="#FF5533"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                transform="translate(-12, -24)"
                            >
                                <circle cx="12" cy="10" r="3" />
                                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                            </g>
                            <text
                                textAnchor="middle"
                                y={markerOffset}
                                style={{ fontFamily: "system-ui", fill: 'black' , fontWeight:"bolder"}}
                            >
                                {name}
                            </text>
                        </Marker>
                    ))}
                </ZoomableGroup>
            </ComposableMap>
        </Card>
    )
}