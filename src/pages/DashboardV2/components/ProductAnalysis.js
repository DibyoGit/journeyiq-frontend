import { Column } from '@ant-design/plots'
import React, { useState , useEffect } from 'react'
import Card from '../../../component/sharedComponent/Card/Card'
import { ProductDetail } from './dataCenter'


const HeadingInfo = {
  title:"Product Sold" ,
  subTitle: "Sales details of last month",

}


function ProductAnalysis() {
    const [ filtereData , setfilterData] = useState([])
    useEffect(() => {
     const data =  ProductDetail.sort((a,b) => (b.visit - a.visit))
     setfilterData(data)
    }, [filtereData])

    const config = {
        data:filtereData,
        xField: 'ProductName',
        yField: 'visit',
        height:300,
        
      }
    
  return (
    <div className='col-span-full '>
          
        <Card>
          
          <div>
              <p className='pl-4 pt-2 pb-1 text-lg'>{HeadingInfo.title}</p>
              <p className='pl-4 pb-2 text-xs opacity-40'>{HeadingInfo.subTitle}</p>
          </div>
         <div className='p-4'>
            { filtereData && <Column {...config} />}
         </div>

        

        </Card>

    </div>
  )
}

export default ProductAnalysis