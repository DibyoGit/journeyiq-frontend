import React, { useEffect, useRef, useState } from 'react'
import styles from './filter.module.scss'
import { MdArrowDropDown } from 'react-icons/md'
import { ListenOutsideClick } from './ListenOutsideClick';
import { sentenceCase } from 'sentence-case';

function SelectionFilter({ option ,  setSelection , selected, Placeholder , style}) {
   
    const [toggler, setToggler] = useState(false);
    const dropdownRef = useRef(null);

    

    useEffect(()=>{
        ListenOutsideClick(setToggler,dropdownRef)
    },[toggler])

    const Toggler = () => {
        setToggler(open => !open)
    }

    const OptionHandler = (Option) => {

      
    
        setSelection(Option.value || Option)
    
        Toggler();
 
    }
    return (
        <div className={styles.dropContainer }>
            <div ref={dropdownRef} className={styles.dropdown}>
                <div className={`${styles.dropDownSelect} ${style}`}>
                    <input value={selected?.label || selected } placeholder={Placeholder} className={styles.select} type="text" readOnly size="8"/>
                    <MdArrowDropDown className={styles.icon} onClick={Toggler } />
                </div>
                <div className={`${styles.dropdownOptions} ${!toggler ? styles.close : ""}`} >
                    {option?.map(Option => {
                        return (
                            <div key={Option.id} className={`${styles.option} flex flex-col m-0 p-0 border-b`} value={Option.name || Option.label}
                                onClick={(e) => { OptionHandler(Option) }}>
                                    <div className=''>
                                    <p>{Option.name || Option.label }</p>
                                    <h3 className='text-[10px] text-blue-400 '>{Option.domain ? Option.domain :""}</h3> 
                                    </div>
                                    </div>
                        )
                    })

                    }
                </div>

            </div>
        </div>
    )
}

export default SelectionFilter
