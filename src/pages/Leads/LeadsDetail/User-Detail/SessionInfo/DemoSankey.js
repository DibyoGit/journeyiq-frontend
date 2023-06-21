import React, { useState, useEffect } from 'react';

import { Sankey } from '@ant-design/plots';
import moment from 'moment';

export const DemoSankey = ({DATA}) => {
  const sankey = DATA?.Navigation || []
  const [ sankD , setSankD] = useState([])
  

  function gen(val) {
    const sd = []
    for (let i = 0; i < val.length ; i++) {
      const x = new moment(val[i].loadTime);
      const y = new moment(val[i].unloadTime)
      const interactionTime = parseFloat((moment.duration(y.diff(x))._milliseconds)/360).toFixed(2)
       console.log(val[i].baseURI , val[i].prevPage)
   /*    let jour = {
        source: `${i + 1}: ${val[i].PageTitle} `,
        target: `${i + 2}: ${!(i === val.length - 1) ? val[i + 1].PageTitle : "LEFT"} `,
        value: val[i].event?.length,
      } */
      const curr = val[i].baseURI;
      const prev =  val[i].prevPage
      console.log(curr && curr.split("/") , prev && prev.split("/"))
       
      let jour = {
        target: (  val[i].baseURI != ""  && val[i].baseURI != null ) ? curr.replace('https://test-ecommerce-app.herokuapp.com/',""): "Left",
        source: (val[i].prevPage != "" && val[i].prevPage != null  ) ?  prev.replace('https://test-ecommerce-app.herokuapp.com/',""): "Direct",
        value: val[i].event?.length ,
      }
      
      sd.push(jour)
    }
    return sd
  }
  useEffect(()=>{
    setSankD(gen(sankey))
  },[DATA])
  
    const config = {
        data: sankD,
        sourceField: 'source',
        targetField: 'target',
        weightField: 'value',
        nodeWidthRatio: 0.004,
        color:['#82AAE3',
        '#91D8E4',
        '#BFEAF5',
        '#F383A2',
        '#247FEA',],
        edgeStyle: {
           fill:"green"
        },
        nodePaddingRatio: 0.04 ,
        nodeDraggable: true,
       
      };
      return <Sankey {...config} />;
    };

