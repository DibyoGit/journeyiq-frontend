import { Table } from "../components/Table";
import { feedback } from "../components/fakeData";
import moment from "moment";
import Card from "../../../component/sharedComponent/Card/Card";
import { useState } from "react";
import {FcComments} from 'react-icons/fc';
import {IoIosEye} from 'react-icons/io'
import { Link } from "react-router-dom";
import { Button } from "../../../component/sharedComponent/Button/Button";
import styles from '../../../global.module.scss' 
import AddPackageModal from "../../../component/Modals/AddPackageModal/AddPackageModal";
import { Modal } from "../../../component/Modals/Modal";
import { Comment } from "../../../component/sharedComponent/Comment";
import Breadcrumbs from "../../../component/sharedComponent/Breadcrumbs";

function DateChanger(date){
  let res =  moment(date, ["MM-DD-YYYY", "DD-MM-YYYY"], 'fr'); 
  return res
}

const columns = [
  {
    name: 'Task ',
    selector: row => row.title
  },
  {
    name: 'Created By',
    selector: row => row.Author,
  },

  {
    name: 'Created At',
    selector: row => row.date,
  }
  ,
  {
    name: 'Active',
    selector: row => <div className="flex items-center gap-2">{row.active ? <div className="p-2 rounded bg-blue-400 text-white">Completed</div> : <div className="p-1 bg-red-400 text-white" >Pending </div>} <div> view more</div></div>,
  }

];


export function Feedback() {
  
  const [selected , setSelected] = useState(feedback[0])
  const [viewModal , setViewModal] = useState(false);

  const data = feedback[2].result

  return (
  <div>
    <h4 className="text-xl font-md ml-4" >Feedback Details</h4> 
    <div className=" ml-4  m-2">
    <Breadcrumbs/>
    </div>
      <div className=" grid grid-cols-4 gap-4 justify-start p-4">
        
     
         {
                            viewModal ?
                                <div className={styles.modalView}>
                                    <div className={styles.view}>

                                        {
                                            viewModal
                                        }

                                    </div>
                                </div>
                                : ""
                        }
        <Card propsStyle="col-span-1 gap-1 h-fit ">
          <h5 className="border-b p-1">Feedbacks</h5>
       
          <div className="mt-2 flex flex-col gap-1">
            {
              feedback.map((feed, i) => {
                let colors = ["bg-amber-400", "bg-red-400", "bg-orange-400", "bg-blue-400",]
                return (
                  <div className={`flex flex-row items-center gap-2 ${colors[i]} text-white p-2 border-b rounded`} key={i} onClick={()=>setSelected(feed)}>
                    {feed.icons}
                    <p>{feed.title}</p>
                  </div>
                )
              })
            }
            <Button callHandler={() => setViewModal(<AddPackageModal setViewModal={setViewModal} />) }>Add Suggestion</Button>
          </div>
          
        </Card>
        <div className='col-span-3'>
          <div className="p-2 flex items-center gap-2">
            {selected.icons}
            <p>{selected.title}</p>
          </div>
           <div className="flex flex-row flex-wrap justify-center gap-2">
              {
                selected?.result?.map((feeds , i)=>{
                  return(
                    <div key={i} className='shadow-md bg-white grow  rounded-xl w-60 min-h-60 grid grid-row-6'>
                       <div className="flex border-b p-2 items-center gap-2 rows-span-2">
                         <p className="h-10 w-10 justify-center bg-sky-400 m-0 rounded-full flex items-center">{feeds.Author[0]}</p>
                         
                         <p className="text-sm">{feeds.Author}</p>
                       </div>
                       <div className="p-2 rows-span-3">
                       <p className=" mb-4 text-sm">{feeds.title} </p>
                       <div className="flex justify-between items-center">
                       <p className="text-[8px]">{feeds.date}</p>
                       <p  className="text-[10px] text-sky-400 cursor-pointer" onClick={()=> setViewModal(<Modal title="Suggestion Detail" close={setViewModal}
                       ><Comment data={selected} /></Modal>)}>...Read more</p>
                       </div>
                       </div>
                       <div className="rows-span-1 flex justify-between p-1 px-2 border-t">
                        <div className="flex items-center gap-1"> <IoIosEye/> <p className="text-[10px]">{feeds.view}</p></div>
                         <div className="flex items-center gap-1"><FcComments/> <p className="text-[10px]" >{feeds.comment}
                         </p></div>
                       </div>
                    </div>
                  )
                })
              }
           </div>
         
    {/*     <Table columns={columns} data={selected.result} /> */}
        </div>
      </div>
      
  </div>
  )
}