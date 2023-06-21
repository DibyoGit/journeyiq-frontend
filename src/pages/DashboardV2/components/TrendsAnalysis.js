import { faker } from '@faker-js/faker';
import React , {useEffect} from 'react'
import { Line } from '@ant-design/plots';
import Card from '../../../component/sharedComponent/Card/Card';
import { HeadingInfo } from './dataCenter';

function random_item(items)
{
  
return items[Math.floor(Math.random()*items.length)];
     
}
const data = () => {
    const fakeData = []
    let referrer = ['Facebook' , 'Google', 'Amazon',  'Quora']
    Array.from({ length: 30 }).forEach((element, index) => {

        const fake = {
            date: `12/${index + 1}/2022`,
            source: random_item(referrer),
            value: faker.datatype.number({ min: 0, max: 4 }),
            lead: faker.datatype.number({min: 1000 , max:8000})

        }
        fakeData.push(fake)

    });
    return fakeData
}

function GetCount(arr) {

    const result = Object.values(arr.reduce((r, e) => {
      let k = `${e.source}`;
      if (!r[k]) r[k] = { Source:e.source  ,date: e.date, count:1}
      else r[k].count += 1;
      return r;
    }, {}))
    return result
  }








function TrendsAnalysis() {
    const d = data() ;

    
    const config1 = {
        data: data(),
        height: 200,
        xField: 'date',
        yField: 'value',
        seriesField: 'source',
        xAxis: {
            type: 'time'
        }, yAxis: {
            label: {
                formatter: (v) => `${v} %`
            },
        }
    }

    const config2 = {
        data:data(),
        height: 200,
        xField: 'date',
        yField: 'lead',
        seriesField: 'source',
        xAxis: {
            type: 'time'
        }, yAxis: {
            label: {
           
                formatter: (v) => `${v}`
            },
        }
    }
    return (
        <div className='col-span-full box-border'>
            <div className='grid grid-cols-2 gap-2'>
            <Card className=''>
                <p className='pl-4 pt-2 pb-1 text-lg'>{HeadingInfo[0].title}</p>
                <p className='pl-4 pb-0 text-xs opacity-40'>{HeadingInfo[0].subTitle}</p>
                <div className='p-4'>
                    <Line {...config1} />
                </div>
            </Card>
            <Card>
            <p className='pl-4 pt-2 pb-1 text-lg'>{HeadingInfo[1].title}</p>
            <p className='pl-4 pb-0 text-xs opacity-40'>{HeadingInfo[1].subTitle}</p>
                <div className='p-4'>
                    <Line {...config2} />
                </div>
            </Card>
            </div>
        </div>
    )
}

export default TrendsAnalysis