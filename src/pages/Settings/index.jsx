import React, { useState,} from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import ModalContainer from '../../component/ModalContainer';
import { settingslink } from '../../data/settings';
import styles from './settings.module.scss';
import Breadcrumbs from '../../component/sharedComponent/Breadcrumbs';

function Settings() {

    const [modal, setModal] = useState()
    
    


    return (
        <div className="flex flex-col  w-full h-full  gap-2 ">
            <ModalContainer modal={modal} />
            <div className='pl-10'>
                <div className={`${styles.navlinks} text-xl font-medium `}>

                    {
                        settingslink.map((link, i) => {
                            return (
                                <NavLink to={link.link}
                                key={i}
                                    className={({ isActive }) =>
                                        isActive ? styles.active : styles.link}
                                >{link.name}</NavLink>
                            )
                        })

                    }

                </div>
                <Breadcrumbs/>

            </div>
            
            
   {/* <Button callHandler={() => setModal(<Modal close={setModal} title="Create User " ><CreateUser setModal={setModal} /></Modal>)}>+ Add New User</Button> */}

             


            <div className='px-10 p-5'>



                <Outlet />


            </div>

        </div>
    )
}

export default Settings

