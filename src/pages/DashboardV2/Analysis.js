import React from 'react'
import AnalysisLineChart from './components/AnalysisLineChart'
import CostAnalysis from './components/CostAnalysis'
import ProductAnalysis from './components/ProductAnalysis'
import TrendsAnalysis from './components/TrendsAnalysis'
import SalesAnalysis from "./components/SalesAnalysis";

function Analysis() {

  return (
    <div>
      <p className='text-lg text-sky-700 pl-8 font-normal'>Dashboard</p>


      <div className='p-8 pt-4 grid grid-cols-2 gap-4'>

       
    
        <SalesAnalysis />
        <CostAnalysis />
        
        <AnalysisLineChart />
        <TrendsAnalysis />
        <ProductAnalysis />
        

      </div>

    </div>
  )
   
}

export default Analysis