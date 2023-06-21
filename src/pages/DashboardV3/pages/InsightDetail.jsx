import Card from "../../../component/sharedComponent/Card/Card";
import { Expander } from "../../../component/sharedComponent/Expander";
import { CardData, Insights, tableData } from "../components/fakeData";
import ProductAnalysis from "../../DashboardV2/components/ProductAnalysis";
import { Table } from "../components/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  GETALLSESSION,
  GET_CAMPAIGNS_ANALYSIS_GEOJSON_DATA,
  GET_MAP_ROI_BY_STATE_DATA,
} from "../../../api/api";
import SessionTable from "../../Leads/SessionTable";
import { Link, useLocation } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { sentenceCase } from "sentence-case";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlinePreview } from "react-icons/md";
import Breadcrumbs from "../../../component/sharedComponent/Breadcrumbs";
import MapGraphContainer from "./MapGraphContainer/MapGraphContainer";

const routes = [
  { path: "/dashboard/acquisition", breadcrumb: "Acquisition Details" },
  { path: "/dashboard/ecommerce", breadcrumb: "Ecommerce Details" },
  { path: "/dashboard/behaviour", breadcrumb: "Behaviour Details " },

  { path: "/", breadcrumb: "" },
];

export function InsightDetail({ Graph, columns, data, kpi, Insights }) {
  return (
    <>
      <div className="px-4 mt-2 flex  items-center">
        <Breadcrumbs />
      </div>
      <div className="flex flex-row m-2   p-2 gap-4">
        <div
          /* className="col-span-1 grid grid-rows-1 grid-cols-2 h-48 gap-4 " */ className="flex flex-col w-[25%] gap-2"
        >
          <div className="flex flex-row flex-wrap gap-2 ">
            {kpi.map((data, i) => {
              return (
                <Card key={i} propsStyle="items-center  w-36 p-4 min-h-36 h-20">
                  <p className="text-xs">{data.title}</p>
                  <span className="text-2xl ">{data.value}</span>
                </Card>
              );
            })}
          </div>

          <div className="col-span-1 row-span-3 bg-white shadow-md rounded-xl  ">
            <div className="flex flex-col ">
              <div className="flex flex-gap gap-2 p-3 border-b items-center">
                <span className="bg-blue-400 text-white text-sm rounded-full w-6 h-6 p-2 flex justify-center items-center shadow-2xl hover:scale-110 cursor-pointer ease-in-out duration-300 ">
                  {Insights.length}
                </span>
                <h1 className=" text-xs text-sky-600 ">Insights</h1>
              </div>
              <div className="flex flex-col gap-1 p-1 ">
                {Insights.map((data, idx) => {
                  return (
                    <Expander title={data.title} key={data.title + "_" + idx}>
                      <div className="p-4 text-sm">{data.des}</div>
                    </Expander>
                  );
                })}
              </div>

              <div className="flex flex-row justify-start items-center ml-2 ">
                <MdOutlinePreview className="text-blue-400 text-2xl" />
                <Link
                  to="/dashboard/feedback"
                  className="text-left p-2 text-md font-md  text-blue-400 "
                >
                  Explore More
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className=" w-[75%] flex flex-col gap-2 ">
          {/* {Map, BarChart} */}
          <MapGraphContainer />

          <div className=" col-span-3 row-span-2">
            <Table data={data} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
}
