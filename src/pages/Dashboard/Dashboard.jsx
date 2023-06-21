import React, { useEffect, useState } from 'react'
import SankeyChart from '../../component/sankeyChart/Chart'
import { FcCandleSticks, FcExternal } from 'react-icons/fc'
import CustomSelection from '../../component/sharedComponent/Select/CustomSelection'
import { graphOption, option } from '../../data/ServerStaticData'
import CustomDateModal from '../../component/Modals/customdate/CustomDateModal'
import styles from './dashboard.module.scss'
import axios from 'axios'
import {  GET_MAP_DATA, lead, locationSummary } from '../../api/api';
import LineChart from '../../component/Chart/LineChart'
import Card from '../../component/sharedComponent/Card/Card'
import { sentenceCase } from 'sentence-case'
import { RSM } from '../../component/Map/RSM'




function Dashboard() {
  const [close, setClose] = useState(true);
  const [modal, setModal] = useState();
  const token = localStorage.getItem('token');
  const [dateselected, setdateSelected] = useState("today");
  const [leadselected, setleadSelected] = useState();
  const [leadData, setLeadData] = useState();
  const [locationsummary, setLocationSummary] = useState([])
  const [LeadSummary, setMisLeadSummary] = useState(
    {
      date: "" /*  date.getDay() */,
      misLeads: 0,
      totalLeads: 0,
      totalVisit: 0
    }
  )



  useEffect(() => {
    const filterdata = {
      "date": dateselected
    }

    const summaryFetch = async (filterdata) => {


      try {
        const { data } = await axios.post(lead, filterdata,
          {
            headers: {
              authorization: token
            }
          }

        )
        setMisLeadSummary(data[0]?.summary)

        console.log(data)

        setLeadData(data)

        console.log(leadData)



      }
      catch (e) {
        console.log(e)
      }
    }
    if (dateselected !== "custom") {

      summaryFetch(filterdata);
    }

  }, [dateselected])

  useEffect(() => {
   
    const locationSummaryCall = async () => {
      try {
        const { data } = await axios.get(GET_MAP_DATA, {
          headers: {
            authorization: token
          }
        })
        console.log(data)
        setLocationSummary(data)
      }
      catch (e) {
        console.log(e)
      }
    }

    locationSummaryCall();
  }, [])


  /* flex p-4 flex-row flex-wrap gap-3 justify-between */
  return (
    <div className='grid grid-cols-2 gap-6 p-4 '>
      {
        modal && !close ?
          <div className={styles.modalView}>
            <div className={styles.view}>
              <CustomDateModal
                setClose={setClose}
                setModal={setModal}
                setMisLeadSummary={setMisLeadSummary}
                setLeadData={setLeadData}
              />

            </div>
          </div>
          : ""
      }
      <div className='flex flex-col gap-2  '>
        <div className='flex flex-row  justify-between '>
          <h1 className='text-sm font-medium text-sky-800'>YOUR MISSLEADS SUMMARY</h1>
          <CustomSelection option={option} close={setClose} setModal={setModal} setSelection={setdateSelected} />
        </div>
        <Card>
          <div className='flex flex-row gap-6 justify-between margin rounded-md'>
            <div className='m-4'>
              <p className='text-sm text-slate-600 items-center gap-2 '>Total Missed Leads </p>
              <div className='flex flex-row justify-center items-center gap-1'>
                <h2 className='text-3xl'>{LeadSummary?.totalmislead}</h2>
                <FcExternal className='text-2xl' />
              </div>
            </div>
            <div className='m-4'>
              <p className='text-sm text-slate-600 '>Total Leads</p>
              <div className='flex flex-row justify-center items-center gap-1'>
                <h2 className='text-3xl'>{LeadSummary?.totallead}</h2>
                <FcCandleSticks className='text-2xl' />
              </div>
            </div>
            <div className='m-4'>
              <p className='text-sm text-slate-600 '>Total Visit</p>
              <div className='flex flex-row justify-center'>
                <h2 className='text-3xl'>{LeadSummary?.totalvisit}</h2>

              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className='flex flex-col gap-4 '>
        <div className='flex flex-row justify-between'>
          <h1 className='text-sm font-medium text-sky-800'>YOUR LOCATION SUMMARY</h1>

        </div>
        <Card>
          <div className='flex flex-row   gap-6 justify-between margin rounded-md  min-h-500 max-h-96 overflow-auto font-primary'>
            <table className='flex flex-col items-stretch w-full '>
              <tr className='text-left flex rounded flex-row items-stretch justify-between text-white bg-sky-700 p-2 pl-4 pr-4' style={{ background: "#0c5caa" }}>
                <th>Location</th>
                <th>Leads</th>
              </tr>
              {
                locationsummary?.filter(data => data.leadSummary.length > 0).sort((a, b) => b.leadSummary.length - a.leadSummary.length).map(data => {
          
                  let ml = 0
                  data?.leadSummary?.map(ls => {
                    if(!ls.lead){
                      ml++;
                    }
                    
                  })

                  console.log(data.leadSummary)
                  return (
                    <tr className='text-left flex flex-row items-stretch justify-between bg p-4 pt-1 pb-1'>
                      <th className=' text-lg font-semibold '>{sentenceCase(data.countryName)}</th>

                      <th>{ml}</th>

                    </tr>
                  )
                })

              }


            </table>
          </div>
        </Card>

      </div>


      <div className='flex flex-col gap-2 '>
        <div className='flex flex-row justify-between items-start'>
          <h1 className='text-sm font-medium text-sky-800'>YOUR OVERVIEW</h1>
          <CustomSelection option={graphOption} setSelection={setleadSelected} />
        </div>
        <Card>
          <div className='flex flex-row  border-sky-700 p-4 gap-6 justify-between margin rounded-md'>

            <LineChart leadData={leadData} leadselected={leadselected} />
          </div>
        </Card>

      </div>

      <div className=''>
        <RSM data={locationsummary} />
      </div>
      <div className='flex flex-col gap-4 '>
        <div className='flex flex-row justify-between'>
          <h1 className='text-sm font-medium text-sky-800'>YOUR OVERVIEW (Sankey Diagram) </h1>
          {/*   <CustomSelection option={graphOption} setSelection={setleadSelected} /> */}
        </div>
        <Card>
          <div className='flex flex-row   p-4 gap-6 justify-between margin rounded-md'>

            <SankeyChart width={500} height='250px' />
          </div>
        </Card>

      </div>
      
      {/* <Map/> */}





    </div>
  )
}

export default Dashboard
