import React from 'react'
import ScriptSettings from './ScriptSettings'
import AddEditUserPermission from './AddEditUserPermission'

function DomainSettings() {
  return (
    <div>
      <div className='flex justify-between items-center pl-4 ' >
        <div >

          <h3 className="text-lg">Domain Settings</h3>
          <h5 className='text-xs'>Manage your domain permissions from here</h5>

        </div>

      </div>
      <ScriptSettings />
      <AddEditUserPermission />
    </div>
  )
}

export default DomainSettings