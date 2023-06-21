import React from 'react'
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react'
import moment from 'moment/moment';

function LineChart({ leadData, leadselected }) {

    const [leads, setLeads] = useState([]);
    const [misleads, setMisleads] = useState([]);
    const [label, setLabel] = useState([])
    const ld = [];
    const md = [];
    const lbl = [];
  
    const ChartData = () => {

        for (let i = 1; i <= leadData?.length - 1; i++) {
            if(leadData[i].lead){
                ld.push(1);
                
                md.push(0);
            }
            else{
                ld.push(0);
                md.push(1);
            }
            const date = moment(leadData[i].createdAt).format("YY-MM-D")
            lbl.push(date)
        }

        setLeads(ld);
        setMisleads(md);
        setLabel(lbl)

    }

    console.log(leadselected)

   

    useEffect(() => {
        console.log(leadData)
        ChartData()

    }, [leadData])



    return (
        <div>



            <Line
                data={{
                    labels: label,
                    datasets: [{
                        label: "Leads",
                        data: leadselected ==="misleads" ? "" : leads,
                        borderColor: ["rgba(13, 38, 74, 0.863)"],
                        backgroundColor: ["rgba(255, 255, 255, 0.034)"],
                        fill: true,
                        tension: 0.5,
                        pointBorderColor: "rgba(13, 38, 74, 0.863)",
                        showLine: true,
                        pointRadius: 2,
                        pointBorderWidth: 3,

                    },
                    {
                        label: "MisLeads",
                        data: leadselected ==="leads" ? "" : misleads,
                        backgroundColor: ["rgba(255, 255, 255, 0.034)"],
                        borderColor: ["orange"],
                        fill: true,
                        tension: 0.5,
                        showLine: true,
                        pointRadius: 2,
                        pointBorderWidth: 3,

                    }
                    ]

                }}
                options={{
                    scales: {
                        y: {
                            grid: {
                                display: false,
                            }
                        },
                        x: {
                            grid: {
                                display: true
                            }
                        }
                    }

                }}

                height={250}
                width={500}
            />
        </div>
    )
}

export default LineChart