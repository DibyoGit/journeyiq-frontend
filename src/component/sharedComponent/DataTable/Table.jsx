import DataTable, { createTheme } from 'react-data-table-component';
import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import moment from 'moment/moment';
import axios from 'axios';
import RingLoader from '../RingLoader/RingLoader';
import { BlockModal } from '../../Modals/BlockModal/BlockModal';
import { MdDelete } from 'react-icons/md';
import { DeleteModal } from '../../Modals/DeleteModal/DeleteModal';





createTheme('default', {
  text: {
    fontSize: "24px"
  }
})

function Table({ title , data , setLoader , loader  , setUpdate , setModal , setClose}) {
  const [selectedRows, setSelectedRows] = useState(false);
  const [toggledClearRows, setToggleClearRows] = useState(false);

  const Action = ({row}) =>{
    return (
      <div className='flex flex-row gap-4 items-center '>
         
        <button onClick={()=>ModalHandler(row)} style={{ padding:"5px" , backgroundColor:"rgba(13, 92,  169, 255)" , color:"white" , borderRadius:"4px" , fontSize:"12px"}}>{ row.isBlock ? "Unfilter" :"Filter"}</button>
        <MdDelete onClick={()=>DeleteHandler(row)} className='text-lg text-red-500' title='Delete'/>
       

      </div>
    )
  }

  function ModalHandler(data){
    setModal(<BlockModal  setClose={setClose} ipInfo={data} setUpdate={setUpdate}/>)
    setClose(false)
  }

  function DeleteHandler(data){
    setModal(<DeleteModal  setClose={setClose} ipInfo={data} setUpdate={setUpdate}/>)
    setClose(false)
  }
  const columns = [
    {
      name: 'IP Address',
      selector: row => row.IP,
    },
    {
      name: 'Created at',
      selector: row => moment(row.createdAt).toLocaleString(),
    },
    ,
    {
      name: 'Updated at',
      selector: row => moment(row.UpdatedAt).toLocaleString(),
    },
    {
      name: 'Action',
      button:true ,
      cell: row =><Action row= {row}/>,
    }
  
  ];

  const customStyles = {
    rows: {
        style: {
          
            textAlign:'center'
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', 
            paddingRight: '8px',
            backgroundColor: "#0d5ca9" ,
            textAlign:'center' ,
            color:"white"
        },
    },
    cells: {
        style: {
            padding: '10px', 
            textAlign:'center' ,
        },
    },
};
  const handleChange = ({ selectedRows , data }) => {
    setSelectedRows(selectedRows);
  };



  const NEWTHEME = {
    rows: {
      fontSize: '25px',
  
    }
  }

  // Toggle the state so React Data Table changes to clearSelectedRows are triggered
  const handleClearRows = () => {
    setToggleClearRows(!toggledClearRows);
  }

  return (
    <div className='bg-white h-full pt-2 pb-2 border  rounded-md shadow-6xl'>
         {/* <button onClick={handleClearRows} className="border p-2 bg-sky-800 text-white text-sm rounded-md mb-2">
          Add IP
        </button>  */}
      <DataTable
        title={title}
        columns={columns}
        data={data}
        selectableRows
        onSelectedRowsChange={handleChange}
        clearSelectedRows={toggledClearRows}
        customTheme={NEWTHEME}
        progressPending={loader}
        progressComponent={<RingLoader/>}
        customStyles={customStyles}
        pagination
        className="shadow-4xl text-lg"
      />
    </div>
  );
};
export default Table
