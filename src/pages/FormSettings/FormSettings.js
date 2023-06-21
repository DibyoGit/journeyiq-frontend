import React, { useState } from 'react'
import { useRef } from 'react';
import RingLoader from '../../component/sharedComponent/RingLoader/RingLoader';
import AllForms from './components/AllForms'
import UpdateFrom from './components/UpdateFrom'

function FormSettings() {

  const [formUrl, setformUrl] = useState(null);

  const formsSettings  = useRef(null)

  const [loading , setloading] = useState(false)
  
  const handleEditForm = (url) => {
    
    setformUrl(url);
    formsSettings.current.scrollIntoView()    
  } 

  return (
    <div>
      <div className='flex justify-between items-center pl-4 ' >
                <div >

                    <h3 className="text-lg">Forms Settings</h3>
                    <h5 className='text-xs'>Manage your forms settings from here</h5>

                </div>
             
            </div>
     
         <>
      <AllForms onEdit={handleEditForm} formSettingsref = {formsSettings} />
      <UpdateFrom domainUrl={formUrl} onEdit={handleEditForm} formSettingsref = {formsSettings} />
      </>  
     
      
    </div>
  )
}

export default FormSettings