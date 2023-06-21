import React from 'react'
import TrendsAnalysis from '../../DashboardV2/components/TrendsAnalysis'
import { InsightDetail } from './InsightDetail'
import { BehaviourtableData, CardData, DashobardFakeData, Insights, tableData } from "../components/fakeData";
import AnalysisLineChart from '../../DashboardV2/components/AnalysisLineChart';

const columns = [
  {
    name: 'Page Path',
    selector: row => row.page,
  },
  {
    name: 'Users Visited',
    selector: row => row.visit,
  },
  {
    name: 'Drop-Off',
    selector: row => row.dropoff,
  },
  ,
 
  {
    name:"Impact" ,
     selector: row => row.impact ? "Positive" :"Negative"
  }

];

export default function BehaviourDetail() {
  return (
    <div>
      <h4 className="text-xl font-md ml-4">Behaviour Details</h4> 

      <div className='breadcums'>
      
      </div>

      <InsightDetail
       Graph={< AnalysisLineChart/>}
       data={BehaviourtableData}
       columns ={columns}
       kpi ={CardData}
       Insights = {DashobardFakeData[1].insight}
       
       />

    </div>
    
  )
}
