import { AiOutlineDesktop, AiOutlineDown } from 'react-icons/ai'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import { useNavigate } from 'react-router'

export function LeadCards({data}) {
    const navigate = useNavigate()
    return (
        <div className=" border-b flex flex-col ">

            <div className='flex flex-row justify-between text-sm items-center p-3'>
                <h5 style={{fontSize:"12px"}}>{data.sessionID}</h5>
                <div>
                    <h4 className='font'>{data.title}</h4>
                    <p>{data.locationInformation.Country}, {data.locationInformation.Region}</p>
                </div>
                <p>Makes as Lead</p>
                <div className='text-center text-xs'>
                    <p>CHROME</p>
                    <p>{data.Platform}</p>
                </div>
                <AiOutlineDesktop size="1.5rem" opacity='0.6' />
                <AiOutlineDown size="0.8rem" opacity='0.6' />
                <BsBoxArrowUpRight size="0.8rem" color='blue'  onClick={() => navigate('/leads/254669965')}/>

            </div>
      
        </div>
    )
}

