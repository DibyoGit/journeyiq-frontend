import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import SelectionFilter from './SelectionFilter';
import axios from 'axios'
import { GET_ALL_DOMAIN } from '../../api/api';
import { useDispatch } from 'react-redux';
import { DomainAction, LocalDomainSetter } from '../../Redux/action/DomainActions';
import { Select, Space } from 'antd';






function MenuPan({ options }) {

  const navigate = useNavigate()

  const [domain, setDomain] = useState({})

  
  const dispatch = useDispatch()

  const userName = localStorage.getItem("username")
 

  

  
  function HandleSelectionChange (value){
  
      setDomain(value);
      dispatch(DomainAction(value));
      const domainName = options.find( data => data.domainSlug === value)?.label ;

      localStorage.setItem('DomainName', domainName)
    
       
  }

  useEffect(() =>{
    const domainSlug = localStorage.getItem('domainID' )

    if(!domainSlug){
      setDomain(options[0]?.domainSlug)
   
      dispatch(DomainAction(options[0]?.domainSlug))
    }
    else{
      setDomain(domainSlug)
      dispatch(LocalDomainSetter())
    }
  },[])
  
  const { Option} = Select

  return (
    <div className='flex  flex-row justify-between w-full p-4 text-slate-400 items-center'>
      <span className='text-sm font-semibold'>WELCOME BACK, {userName?.toUpperCase()}</span>
      <div className='flex items-center text-slate-900 gap-2 text-sm'>
        <div>
         
         {/*  <div className='flex flex-col relative'>
            <Select
              options={options}
              placeholder="Domain"
              value={domain}
              dropdownRender={(opt) => {
               console.log(opt)
                return opt
              }}
                
              fieldNames={
             {
                label:'label' ,
                value:'domainSlug',
                options:[{
                  label:'domain'
                }]
             }
              }
              style={{
                width: 200,
                fontSize: 14,
                
                fontFamily:"'Nunito Sans' , san-serif"


              }}
              onChange={(e) => HandleSelectionChange(e)} size="large" />
            <span className='absolute -mt-2 ml-2 bg-[#eff6ff] text-xs text-sky-600'>Domains</span>
          </div> */}
          <div className='flex flex-col relative'>
            <Select
            
              placeholder="Domain"
            
             defaultValue= {localStorage.getItem('DomainName')|| options[0]?.label}
                
            /*   fieldNames={
             {
                label:'label' ,
                value:'domainSlug',
                options:[{
                  label:'domain'
                }]
             } 
              }*/
              style={{
                width: 260,
                fontSize: 14,
                
                fontFamily:"'Nunito Sans' , san-serif"


              }}
              optionLabelProp="label"
              onSelect={(e) => HandleSelectionChange(e)} size="large" 
              >
                 {
                     options.map((data , i) => {
                      return (
                         <Option value={data?.domainSlug} label={data?.label} key={i} >
                            <Space style={{ display: "flex", flexDirection: "column" , textAlign:'left', alignItems:'flex-start' }}>
                           {data?.label}
                          <span role="img" aria-label="Premiermounts" className='text-xs text-left text-blue-400'  >
                            {data?.domain}
                        </span>
                          </Space>
                         </Option>
                      )
                     })
                 }
                </Select>
            <span className='absolute -mt-2 ml-2 bg-[#eff6ff] text-xs text-sky-600'>Domains</span>
          </div>

          {/* <SelectionFilter option={options} selected={domain} setSelection={setDomain} Placeholder="Domains" style="w-[250px]" />   */}

        </div>
      </div>
    </div>
  )
}

export default MenuPan