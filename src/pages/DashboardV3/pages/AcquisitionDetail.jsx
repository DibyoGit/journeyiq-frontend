import React from 'react'
import TrendsAnalysis from '../../DashboardV2/components/TrendsAnalysis'
import { InsightDetail } from './InsightDetail'
import { CardData, DashobardFakeData, Insights, tableData } from "../components/fakeData";

const columns = [
  {
    name: 'Channel Name',
    selector: row => row.channel,
  },
  {
    name: 'Conversions',
    selector: row => row.conversions,
  },
  ,
  {
    name: 'Users',
    selector: row => row.users,
  }

];

export default function AcquisitionDetail() {
  return (
    <div>
      <h4 className="text-xl font-md ml-4">Acquisition Details</h4> 

      <div className='breadcums'>

      </div>

      <InsightDetail
       Graph={ <TrendsAnalysis/>}
       data={tableData}
       columns ={columns}
       kpi ={CardData}
       Insights = {DashobardFakeData[0].insight}
       
       />

    </div>
    
  )
}
