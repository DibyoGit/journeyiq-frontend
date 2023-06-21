import React, { useEffect, useState } from 'react'
import { InsightDetail } from './InsightDetail'
import { CardData, CountrytableData, DashobardFakeData, Insights, productSummary, tableData } from "../components/fakeData";
import axios from 'axios';
import { GET_MAP_DATA } from '../../../api/api';
import { RSM } from '../../../component/Map/RSM';

const columns = [
  {
    name: 'States ',
    selector: row => row.country,
  },
  {
    name: 'Profit Percentage',
    selector: row => row.profit,
  },
  ,
  {
    name: 'Sales',
    selector: row => row.sells,
  },

 


];

export default function CountrySales() {
    const token = localStorage.getItem('token');
    const [locationsummary, setLocationSummary] = useState([])

    useEffect(() => {
   
        const locationSummaryCall = async () => {
          try {
            const { data } = await axios.get(GET_MAP_DATA, {
              headers: {
                authorization: token
              }
            })
            setLocationSummary(data)
          }
          catch (e) {
            console.log(e)
          }
        }
    
        locationSummaryCall();
      }, [])
    
  return (
    <div>
      <h4 className="text-xl font-md ml-4">Sales From Countries Details</h4> 

    

      <InsightDetail
       Graph={  <img src="/us.png" alt="" />}
       data={CountrytableData}
       columns ={columns}
       kpi ={CardData}
       Insights = {productSummary[1].insight}
       
       />

    </div>
    
  )
}
