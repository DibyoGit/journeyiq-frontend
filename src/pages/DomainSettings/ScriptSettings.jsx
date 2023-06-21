import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { MdOutlineFileCopy } from 'react-icons/md'
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { GETUSERDOMAIN, GET_ALL_DOMAIN, GET_DOMAIN } from '../../api/api';
import AddDomainModal from '../../component/Modals/AddDomainModal/AddDomainModal';
import { Button } from '../../component/sharedComponent/Button/Button';
import Card from '../../component/sharedComponent/Card/Card';
import RingLoader from '../../component/sharedComponent/RingLoader/RingLoader';
import styles from '../Dashboard/dashboard.module.scss'

function ScriptSettings() {
  const [close, setClose] = useState(true);
  const [modal, setModal] = useState();
  const [loading, setloading] = useState(null)

  const { DomainID } = useSelector(state => state.DomainIDSetter)

  const [script, setScript] = useState([])

  const ModalHandler = () => {
    setClose(false)
    setModal()
  }

  const CopyClickHandler = (value) => {
    navigator.clipboard.writeText(value);

  }

  useEffect(() => {
    const getScript = () => {
      setloading(true)
      axios.get(`${GET_DOMAIN}/${DomainID}`)
        .then(res => {
          const { data } = res;
          
          setScript(data)
          setloading(false)
        })
        .catch(err => {
          console.log(err)
          setloading(false)
        }

        )
    }
    getScript()
  }, [close , DomainID])

  let val = `<script type="text/javascript" src="https://stark-sea-62993.herokuapp.com/JourneyScript/project.js"></script><script>trackInit("${script.domainSlug}");</script>`


return (
  <div  className='p-4' >
    {
       /*  modal && */ !close ?
        <div className={styles.modalView}>
          <div className={styles.view}>
            <AddDomainModal
              setClose={setClose}
              setModal={setModal}
              setloader={setloading}
              loader={loading}
            />

          </div>
        </div>
        : ""
    }
    <div className='flex flex-col gap-2'>
      <div className='flex  justify-between items-center '>
        <h1 className='text-sm font-semibold text-sky-800'>YOUR SCRIPT</h1>
        <Button callHandler={ModalHandler}>Add Domain</Button>
      </div>
      {
        !loading ?
          <Card>
            {
              script != "" ?
                <>
                  <div style={{ padding: "20px" }}>
                    <p className='text-xs text-slate-800 mb-3'>Paste this script code into header</p>
                    <div className='flex flex-col gap-4'>


                      <div className='flex flex-col gap-2'>
                        <div className='flex justify-between'>
                          <h3 className='text-lg font-medium text-sky-800'>{script.label}</h3>
                          <button title='copy script' className=' hover:scale-150' onClick={() => CopyClickHandler(val)}><MdOutlineFileCopy /></button>
                        </div>
                        <input type="text" readOnly={true} value={val} className='w-full border p-3 rounded text-sm bg-gray-100 text-slate-500 ' />
                      </div>


                    </div>
                  </div>
                </>
                : <p className='font-xl  font-semibold text-center m-8'>There were no domains discovered. Please add a domain.</p>
            }
          </Card>
          : <RingLoader />}
    </div>
  </div>
)
}

export default ScriptSettings