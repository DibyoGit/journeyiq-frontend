import React from 'react'
import { useState } from 'react'
import { Button } from '../../component/sharedComponent/Button/Button'
import Card from '../../component/sharedComponent/Card/Card'
import SelectionFilter from '../../component/sharedComponent/SelectionFilter'
import { durationOptions, leadsOptions, sortOption } from '../../Statics/LeadsOptions'
import { AiOutlineDownload } from 'react-icons/ai'
import { LeadCards } from './LeadCards'
import { GETALLSESSION } from '../../api/api'
import { useEffect } from 'react'
import axios from 'axios'
import { ReactTable } from './LeadTable/LeadTable'
import SessionTable from './SessionTable'
import RingLoader from '../../component/sharedComponent/RingLoader/RingLoader'
import { useSelector } from 'react-redux'
import Breadcrumbs from '../../component/sharedComponent/Breadcrumbs'
import moment from 'moment'

function Leads() {
  const { DomainID } = useSelector(state => state.DomainIDSetter)
 
  const [loading , setloading ] = useState()

  const [sessions, setSessions] = useState([])

  const [ update  , setUpdate] = useState(false);

  const getSession = async () => {
    setloading(true)
    
    try {

      const { data } = await axios.get(`${GETALLSESSION}/${DomainID}`)
      
      setSessions(data)

      setloading(false)
    }
    catch (e) {
      console.log(e)
      setloading(false)
    }

  }

  useEffect(() => {

    getSession()
  },[DomainID , update])

  return (
    <div className=' pl-4 pr-10 flex  flex-col gap-3'>

      <h1 className='text font-bold text-sky-800 '>Your Leads</h1>
      <Breadcrumbs/>
      
         <SessionTable data={sessions} setUpdate={setUpdate} title="Your Misleads" loader={loading} />
     
     
    </div>
  )
}

export default Leads




/* 
<Card>
        <div className='p-3   flex  flex-col '>
          <div className='flex  flex-row justify-between items-center w-full '>
            {/* <div className='flex  flex-row gap-3'>
              <SelectionFilter option={sortOption} setSelection={setSelected} />
              <SelectionFilter option={leadsOptions} setSelection={setleadsSelected} />
              <SelectionFilter option={durationOptions} setSelection={setDuration} />
               <SelectionFilter option={durationOptions} setSelection={setSelected} /> 
            </div> */
            /* <div>
              <Button>
                <div className='flex  flex-row items-center gap-2 '>
                  <AiOutlineDownload size="1.5rem" /> Export CSV
                </div>
              </Button>
            </div> *
            </div>
            <div className='w-full  flex flex-col'>
            
              <ReactTable data={sessions}/>
              
            </div>
            
          </div>
        </Card>




*/