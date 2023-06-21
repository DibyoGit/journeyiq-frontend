import React, { useEffect, useState } from 'react'
import { Column } from '@ant-design/plots';
import { LessSales, sellProduct } from './dataCenter';
import Card from '../../../component/sharedComponent/Card/Card';

const options = [
  {
    id: 1,
    name: "Most Drop-Off",
    value: "most_sold",

  },
  {
    id: 2,
    name: "less Visited",
    value: "less_sold"
  },
]
const HeadingInfo = {
     title:"Behaviour Overview" ,
     subTitle: "01, January 2022 - 31, January 2022",

}
function AnalysisLineChart() {
  const [selected, setSelected] = useState('most_sold')
  const [ data , setData] = useState(sellProduct)
  
  const config = {
    data,
    xField: 'ProductName',
    yField: 'visit',
    height:300,
    xAxis:{
      label:{
        formatter: (v) => ``
      }
    },
    columnStyle: {
      radius: [30, 30, 0, 0],
    },
  }
  useEffect(() => {
     if(selected === "most_sold"){
        setData(sellProduct)
     }
     else{
      setData(LessSales)
     }
   
  }, [selected])
  
  return (
    <div className='flex flex-col gap-2'>
     
      <Card>
        <div className='flex flex-row  justify-between items-center'>
          <div>
              <p className='pl-4 pt-2 pb-1 text-lg'>{HeadingInfo.title}</p>
              <p className='pl-4 pb-2 text-xs opacity-40'>{HeadingInfo.subTitle}</p>
          </div>

      {/*   <CustomSelection option={options} setSelection={setSelected} /> */}

        </div>
        <div className='p-4'>
        <Column {...config} />
        <p className='pl-4 text-sm font-semibold'>Please hover over the items to see the Page Details.</p>
        </div>
     
      </Card>
    </div>

  )
}

export default AnalysisLineChart