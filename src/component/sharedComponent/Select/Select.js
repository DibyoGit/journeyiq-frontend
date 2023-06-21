import React from 'react'

const option = [
    {
        id:1 , 
        value:"Domain-1.com",
        name:"Domain-1",
        
    },
    {
        id:2 , 
        value:"Domain-2.com",
        name:"Domain-2",
        
    },
    {
        id:3 , 
        value:"Domain-3.com",
        name:"Domain-3",
        
    },
  

]



function Select() {
  return (
    <div>
       <select className='bg-transparent focus:outline-none text-xs p-2' >
          {
            option.map(option =>{
                return(
                    <option className='text-blue  ' value={option.value} key={option.id}>
                        <p className='text-xs p-1'>{option.name} </p>
                    </option>
                )
            })
          }
       </select>


    </div>
  )
}

export default Select