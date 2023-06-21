import React from 'react'
import TrendsAnalysis from '../../DashboardV2/components/TrendsAnalysis'
import { InsightDetail } from './InsightDetail'
import { CardData, DashobardFakeData, Insights, productSummary, ProducttableData, tableData } from "../components/fakeData";
import ProductAnalysis from '../../DashboardV2/components/ProductAnalysis';

const columns = [
  {
    name: 'Product',
    selector: row => row.Product,
  },
  {
    name: 'Category',
    selector: row => row.category,
  },
  {
    name: 'Channel Name',
    selector: row => row.channel,
  },
  {
    name: 'Conversions',
    selector: row => row.conversions,
  },
  {
    name: 'Profit',
    selector: row => row.profit,
  },
  
 

];

export default function ProductSales() {
  return (
    <div>
      <h4 className="text-xl font-md ml-4">Product Sale Details</h4> 

     

      <InsightDetail
       Graph={ <ProductAnalysis/>}
       data={ProducttableData}
       columns ={columns}
       kpi ={CardData}
       Insights = {productSummary[0].insight}
       
       />

    </div>
    
  )
}
