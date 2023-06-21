
import React, { useEffect, useRef, useState } from 'react'
import styles from './addpackage.module.scss';
import { IoClose } from 'react-icons/io5';
import { BsArrowsExpand, BsClockHistory, BsCalendarWeek } from 'react-icons/bs';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import SwitchToggler from '../../sharedComponent/toogler/SwitchToggler';
import  RingLoader from '../../sharedComponent/RingLoader/RingLoader';
import {GrFormClose} from 'react-icons/gr' 
import Uploader from '../../sharedComponent/Uploader/Uploader';

function AddPackageModal({ setViewModal , setMessage }) {
  const [showEditor, setShowEditor] = useState(false);
  const [TodayTime , setDuration] = useState(
   { TodayDate:"",
     TimeNow:""
  }
  )
 
  const [packageDetail, setpackageDetail] = useState({
    category: {
      _id: "",
      category: "",
      created_by: ""
    },

    duration: {
      _id: "",
      duration: ""
    },

    activity: {
      _id: "",
      activity: ""
    },

    place: {
      _id: "",
      place: ""
    },

    theme: [],

    inclusion: [],

    special_package: false,

    description: "",

    itinerary: "",

    price: "",
    image: "628bb70e8492fe1fc6932ddc",

  });
  
  const [ close , setClose] = useState(true);
  const [message, setmessage] = useState("");
  const resetform = useRef();
  const [isLoading , setLoading] =useState(false);
  const [checked, setChecked] = useState(false);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    console.log(message)
    setpackageDetail((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  useEffect(() => {
    console.log(packageDetail);
  }, [packageDetail]);

  const submitHandler = async (e) => {
    e.preventDefault();
  /*  if(packageDetail.activity && packageDetail.category && packageDetail.description && packageDetail.place && packageDetail.inclusion
    && packageDetail.place && packageDetail.place && packageDetail.price){
    try {
      setLoading(true);
      const packageDetailSchema = {
        category: packageDetail.category._id,
        duration: packageDetail.duration._id,
        activity: packageDetail.activity._id,
        place: packageDetail.place._id,
        price: packageDetail.price,
        itinerary: packageDetail.itinerary,
        themes: packageDetail.theme,
        include: packageDetail.inclusion,
        about_the_place: packageDetail.description,
        image: packageDetail.image,
        is_special: packageDetail.special_package,
        created_by:Auth.uuid 
      }
      await axios.post(cmsApi.CREATE_PACKAGE, packageDetailSchema)
      setMessage(()=>{
        return{
          res:"Package created Successfully",
          status:201
        }
      }); */

   /*  setLoading(false);

    }
    catch (e) {
      setMessage(()=>{
        return{
          res:"Something went wrong",
          status:401
        }
      })
      console.log(e);
      
    setLoading(false);
    }
    setViewModal(false);
  }
  else{
    setmessage("All field must be filled");
  } */
     
  };

  const getDuration = () =>{
    const Doptions = {
      day: "2-digit",
      month: "numeric",
      year: "numeric",
    };
    let date = new Date();
    const TodayDate  = date.toLocaleDateString(
      "en-US",
      Doptions
    );
    let TimeNow = date.toLocaleString("en-US",{ hour12:false , minute:"numeric" , hour:"numeric"});

    return {
      TodayDate , TimeNow
    }
  }
  
  useEffect(() =>{
   
    setDuration(getDuration);
  },[])
  
  useEffect(()=>{
    setpackageDetail(prev=>{
      return {
        ...prev,
        special_package:checked,
      }
    })
  },[checked])

  

  return (
    <>
      {
        ! isLoading ?
      <div className={styles.addPackageContainer}>

        <form
          className={styles.packageForm} onSubmit={submitHandler}>

          <div className={styles.formHeading}>
            <p className={styles.headingText}>Create Suggestion </p>
          
            { 
              message && close ?
           <div className={styles.message}>
             <p>{message}</p>
             <GrFormClose onClick={()=>setClose(false)}/>
             </div>
           :"" }
            <div className={styles.headactions}>
              <button className={styles.submitBttn} type="submit">Publish</button>
              <div className={styles.close} >
                <IoClose onClick={() => setViewModal(false)} className={styles.icon} />
              </div>
            </div>

          </div>

          <div className={styles.formBody}>
            <div className={styles.navs}>
              <div className={styles.nav}>
                Content
              </div>
              
            </div>
            <div className={styles.navPage}>
              <section className={styles.col}>
                <div className={styles.description}>
                  <div className={styles.contentheading}>
                    <p className={styles.text}>Description</p>
                    <div className={styles.contentAction}>
                      <RiDeleteBin5Line className={styles.icon} />
                      <BsArrowsExpand className={styles.icon} />
                    </div>
                  </div>
                  <div className={styles.contentbody}>
                    <CKEditor
                      className={styles.editor}
                      editor={ClassicEditor}
                      data="<p>Write your Suggestion here</p>"

                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setpackageDetail((prev)=>{
                          return{
                            ...prev,
                            description:data,
                          }
                        })
                        console.log({ event, editor, data });
                      }}
                      onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                      }}
                      onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                      }}
                      onReady={(editor) => {
                        editor.editing.view.change((writer) => {
                          writer.setStyle(
                            "height", "100px",
                            editor.editing.view.document.getRoot()
                          )
                          writer.setStyle(
                            'border', "1 px solid red",
                            editor.editing.view.document.getRoot()

                          )
                        })
                      }

                      }
                    />
                  </div>
                </div>
                <div className={styles.imageupload}>
                  <div className={styles.contentheading}>
                    <p className={styles.text}>Image upload </p>
                    <div className={styles.contentAction}>

                      <RiDeleteBin5Line className={styles.icon} />
                      <BsArrowsExpand className={styles.icon} />
                    </div>

                  </div>
                  <div className={styles.contentbody}>
                    <div className={styles.contentheading}>
                      <p className={styles.text}>images</p>
                      <Uploader/>
                    </div>

                  </div>
                </div>
               
               



              </section>
              <section className={styles.col}>

              {/*   <div className={styles.package_row}>
                  <h3 className={styles.package_row_title}>Post Date</h3>
                  <div className={styles.package_row_desc_container}>
                    <p className={styles.package_row_desc}>{TodayTime.TodayDate}<BsCalendarWeek className={styles.icons} /></p>
                    <p className={styles.package_row_desc}>{TodayTime.TimeNow}<BsClockHistory className={styles.icons} /></p>
                  </div>
                </div> */}
                <div className={styles.toggler_option}>
                  <p className={styles.text}>Priority</p>
                  <SwitchToggler setChecked={setChecked} checked={checked} setvalue = {setpackageDetail} />
                </div>
                <div className={styles.package_row}>
                  <h3 className={styles.package_row_title}>Category</h3>
                  <div className={styles.package_row_desc_container}>
                    <input type="text" placholder="test"  className='p-2 rounded'/>
                  </div>
                </div>
        
              
              </section>
            </div>
          </div>



        </form>
      </div>
      : <RingLoader/>
       }
     </>
  )
}

export default AddPackageModal