import { Chart } from 'react-google-charts'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { sankeyChart } from '../../api/api'

//reference data 

/* const data = [
    ["From", "To", "Weight"],
    ["A", "X", 5],
    ["A", "Y", 7],
    ["A", "Z", 6],
    ["B", "X", 2],
    ["B", "Y", 9],
    ["B", "Z", 4]

] */
var colors = ['#b2df8a', '#fb9a99', '#fdbf6f',
'#cab2d6', '#ffff99', '#1f78b4', '#33a02c'];

var options = {

sankey: {
node: {
colors: colors,
nodePadding: 2,
},
link: {
colorMode: 'gradient',
colors: colors
}
}
};

function SankeyChart({height , width}) {
    const token = localStorage.getItem('token');
    const [sankeydata, setSanketData] = useState()

    const createChartData = async (data) => {
        const key = Object.keys(data[0]).slice(1, -1);
        const SankD = [];
        SankD.push(key)
        await data.map(val => {
            const value = Object.values(val).slice(1, -1);
            SankD.push(value)

        })
        setSanketData(SankD)
        console.log(SankD);
    }
    useEffect(() => {
        const fetchCall = async () => {
            try {
                const { data } = await axios.get(sankeyChart, {
                    headers: {
                        authorization: token
                    }
                })
                console.log(data)
                await createChartData(data)
                console.log(sankeydata);
            }
            catch (e) {
                console.log(e)
            }
        }

        fetchCall();
    }, [/* sankeydata */])


    return (

        <>

            {
            sankeydata ?
                <Chart
                    chartType="Sankey"
                    data={sankeydata}
                    options={options}
                    width={width}
                    height={height}
                />
             :"wait ..."
            }
        </>





    )
}

export default SankeyChart