import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';
import { sentenceCase } from 'sentence-case';
import { IMAGES_CACHE } from '@antv/l7plot/dist/lib/core/map/register';
import Card from '../../../../../component/sharedComponent/Card/Card';

function CheckTag(value){
        switch (value) {
          case "IMG":
            return "IMAGES";
          case "A":
              return "LINK";

          case "DIV":
              return "CONTENT VIEWER"

          case 'P':
                return "TEXT"

          case 'B':
                    return "HIGHLIGHTED TEXT"    
          default:
            return value.toUpperCase()
        }
}


function GetCount(arr, idx) {

  const result = Object.values(arr.reduce((r, e) => {
    let k = `${e.tagName}`;
    if (!r[k]) r[k] = { tagName: CheckTag(e.tagName) , page: `Page:${idx + 1}`, count: 1 }
    else r[k].count += 1;
    return r;
  }, {}))
  return result
}
export const DemoBar = ({ BarData }) => {
  const [data, setData] = useState([]);
  const bd = BarData || [];

  function gen(val) {

    let t = []
    val?.forEach((element, idx) => {
      t.push(GetCount(element?.event, idx))

    });
    setData(t.flat(1))
  }

  useEffect(() => {
    gen(bd)
  }, [BarData])



  const config = {
    data,
    xField: 'page',
    yField: 'count',
    seriesField: 'tagName',
    
    isGroup: true,
    columnStyle: {
      radius: [30, 30, 0, 0],
    },
  };
  return <>{data.length > 0 && <Card><Column {...config} /></Card> }</>  ;
}