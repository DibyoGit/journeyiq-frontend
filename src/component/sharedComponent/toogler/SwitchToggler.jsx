import React, { useState } from 'react'
import styles from './toogle.module.scss';
import Switch from "react-switch";
function SwitchToggler({setChecked ,checked}) {

    return (
      <div className={styles.togglerCotainer}>
        <Switch
        
        onChange={()=>setChecked(!checked)} 
        checked = {checked}
        handleDiameter={28}
        onColor="#08f"
        offColor="#fff"
        onHandleColor="#fff"
        offHandleColor="#08f"
        height={40}
        width={70}
        border="1px solid black"
        borderRadius={6}
        activeBoxShadow="none"
        uncheckedIcon={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              fontSize: 12,
              paddingRight: 2 ,
              color:"#000",
            }}
          >
            NO
          </div>
        }
        checkedIcon={
          <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: 12,
            paddingRight: 2,
            color:"white"
          }}
        >
          YES
        </div>
        }
        uncheckedHandleIcon={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              fontSize: 20
            }}
          >{/* 
            ☹ */}
          </div>
        }
        checkedHandleIcon={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              color: "red",
              fontSize: 18
            }}
          >{/* 
            ♥ */}
          </div>
        }
        className="react-switch"
        id="small-radius-switch"
      />
      </div>
    )
}

export default SwitchToggler