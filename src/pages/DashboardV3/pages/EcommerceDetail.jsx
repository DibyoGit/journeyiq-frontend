import React from 'react'
import TrendsAnalysis from '../../DashboardV2/components/TrendsAnalysis'
import { InsightDetail } from './InsightDetail'
import { CardData, DashobardFakeData, EcommercetableData, Insights, tableData } from "../components/fakeData";
import SalesAnalysis from '../../DashboardV2/components/SalesAnalysis';

const columns = [
  {
    name: 'Product',
    selector: row => row.name,
  },
  {
    name: 'Category',
    selector: row => row.category,
  },
  {
    name: 'Profit',
    selector: row => row.profit,
  },
  ,
  {
    name: 'Sales',
    selector: row => row.sells,
  }

];

export default function EcommerceDetail() {
  return (
    <div>
      <h4 className="text-xl font-md ml-4" >Ecommerce Details</h4> 

      <div className='breadcums'>

      </div>

      <InsightDetail
       Graph={ <SalesAnalysis/>}
       data={EcommercetableData}
       columns ={columns}
       kpi ={CardData}
       Insights = {DashobardFakeData[2].insight}
       
       />

    </div>
    
  )
}
