import React, { useEffect, useState } from 'react'
import { Line } from '@ant-design/plots'
import { ProductDetail } from './dataCenter'
import Card from '../../../component/sharedComponent/Card/Card'

const HeadingInfo = {
     title:"Max Profit Product" ,
     subTitle: "01, January 2022 - 31, January 2022",

}

function CostAnalysis() {
    
    const config = {
        data: ProductDetail,
        padding: 'auto',
        height:300,
        xField: 'ProductName',
        yField: 'profit',
        xAxis: {
            tickCount: 5
        }
    }

    return (
        <div className='flex flex-col gap-2'>
           
            <Card>
                <p className='pl-4 pt-2 pb-1 text-lg'>{HeadingInfo.title}</p>
                <p className='pl-4 pb-2 text-xs opacity-40'>{HeadingInfo.subTitle}</p>
                <div className='p-2'>
                    <Line {...config} />
                </div>
            </Card>

            

        </div>
    )
}

export default CostAnalysis