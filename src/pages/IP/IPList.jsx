import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { GETIpList } from '../../api/api'
import { AddIPModal } from '../../component/Modals/AddIPModal/AddIpModal'
import Table from '../../component/sharedComponent/DataTable/Table'
import CustomSelection from '../../component/sharedComponent/Select/CustomSelection'
import styles from './ip.module.scss'

const option = [
  {
    id: 1,
    name: "Filtered IP's",
    value: "blacklist"
  },
  {
    id: 2,
    name: "Unfiltered IP's",
    value: "whitelist"
  }
]
function IPList() {
  const [selected, setSelected] = useState(option[0].value)
  const [update , setUpdate] = useState(false)
  const [close, setClose] = useState(true);
  const [modal, setModal] = useState();
  const [ IpData , setIPData] = useState([])
  const [ filterData , setFilterData] = useState([])
  let ipData  = []
  const [loading , setLoading] = useState(false)

  function getIPListed(){
    setLoading(true)
           axios.get(GETIpList)
           .then(res =>{
            const { data } = res
            
            ipData = data
            setIPData(data)
            setFilterData(pre =>{
              return ipData?.filter(data =>  selected ==="blacklist" ? data.isBlock : !data.isBlock )
            })
            setLoading(false)
           })
           .catch(e => {
             console.log(e)
           })
  }

  useEffect(()=>{
       getIPListed()
       
  },[update ])

  function ModalHandler(){
    setModal(<AddIPModal setClose={setClose} setUpdate={setUpdate}/>)
    setClose(false)
  }

  useEffect(()=>{
      setFilterData(pre =>{
      return IpData.filter(data => selected ==="blacklist" ? data.isBlock : !data.isBlock)
    })
  },[selected  ])

  return (
    <div className=''>
       {
        modal && !close ?
          <div className={styles.modalView}>
            <div className={styles.view}>
            {modal}
            </div>
          </div>
          : ""
      }
      <div className='flex justify-between items-center pl-4 ' >
                <div >

                    <h3 className="text-lg">IP Settings</h3>
                    <h5 className='text-xs'>Manage your Filtered and Unfiltered IP's from here</h5>

                </div>
             
            </div>
      
      <div className='flex flex-col gap-3 p-4'>
        <div className='flex justify-between items-center'>
          <h1 className='font-medium text-sky-700'>Listed Internet Protocol (IP Adresses)</h1>
          <div className='flex items-center gap-2'>
            <button className="border p-2 bg-sky-800 text-white text-sm rounded-md pl-3 pr-3" 
            onClick={ModalHandler}> + Add Filter IP</button>
          <CustomSelection option={option} setSelection={setSelected} />
          </div>
          
        </div>
        <div>
        
          <Table  title={ selected ==="blacklist" ? "Filtered IP Adresses" : "Unfiltered IP Adresses " } data={filterData} loader={loading} 
           setLoader = {setLoading} setUpdate={setUpdate} setModal={setModal} setClose={setClose} />

        </div>
      </div>
    </div>
  )
}

export default IPList