import React, { useState } from 'react'
import styles  from './uploader.module.scss';
import {BsImages ,BsUpload} from 'react-icons/bs'
/* import axios from '../../../api/axios';
import { ImageUpload } from '../../../api/api'; */

function Uploader() {
    const [image, setImage] = useState([]);
    
    var ImageFiles = new FormData() ;

    const ImageHandler = (e) => {
        e.preventDefault();     
        let files = e.target.files[0];
        ImageFiles.append('photos', files );
        setImage(pre => {
            return [
                ...pre,
                ImageFiles


            ]
        })

        console.log(files);
        console.log(e.target.files[0].size);
        console.log(ImageFiles.getAll("photos"));
    }
    const OnUpload = async  ()=> {
     /*    
       try {
        const res = await axios.post(ImageUpload , image, {
          headers:{
               "Content-Type":'multipart/form-data',
          }
          ,
        })
        console.log(res);
           
       } catch (error) {
           console.log(error)
       } */
    }
    
    console.log(image);
    console.log(ImageFiles)

    return (
        <div className={styles.imageContainer}>
            <label className={styles.imgUploader}>
                <BsImages className={styles.icon}/>
                <p>Click here to upload your file</p>
                <input type="file" name="upload_file" className={styles.input} accept="image/png, image/jpg, image/gif, image/jpeg" onChange={ImageHandler} />
            </label>
            <button className={styles.bttn} onClick={OnUpload}><BsUpload/> Upload</button>

        </div>
    )
}

export default Uploader