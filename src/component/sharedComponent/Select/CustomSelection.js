import React, { useEffect, useRef, useState } from 'react'
import styles from './selection.module.scss'
import { MdArrowDropDown } from 'react-icons/md'
import { ListenOutsideClick } from './ListenOutsideClick';
import CustomDateModal from '../../Modals/customdate/CustomDateModal';

function CustomSelection({ option , setModal,close , setSelection }) {
    const data = option
    const [selected, setUserSelect] = useState(data[0]);
    const [toggler, setToggler] = useState(false);
    const dropdownRef = useRef(null);

    

    useEffect(()=>{
        ListenOutsideClick(setToggler,dropdownRef)
    },[toggler])

    useEffect(() =>{
        const setmodal = () =>{
            if( selected.name === 'Custom'){
                close(false);
                setModal(<CustomDateModal/>)
            }
        }
        setmodal()
    }, [ selected ])

    const Toggler = () => {
        setToggler(open => !open)
    }

    const OptionHandler = (Option) => {
        setUserSelect(Option)
        setSelection(Option.value)
        Toggler();
    }
    return (
        <div className={styles.dropContainer }>
            <div ref={dropdownRef} className={styles.dropdown}>
                <div className={styles.dropDownSelect}>
                    <input value={selected?.name} className={styles.select} type="text" readOnly size="6"/>
                    <MdArrowDropDown className={styles.icon} onClick={() => { Toggler() }} />
                </div>
                <div className={`${styles.dropdownOptions} ${!toggler ? styles.close : ""}`} >
                    {data?.map(Option => {
                        return (
                            <span key={Option.id} className={styles.option} value={Option.name}
                                onClick={(e) => { OptionHandler(Option) }}>{Option.name}</span>
                        )
                    })

                    }
                </div>

            </div>
        </div>
    )
}

export default CustomSelection


/* const listenOutsideClick = (setToggler,dropdownRef) =>{

    document.addEventListener('click' , (event) =>{
        const curr = dropdownRef.current;
        const evt = event.target;
        if(curr.contains(evt)) return console.log(true)
        setToggler(false);
       
    })
} */