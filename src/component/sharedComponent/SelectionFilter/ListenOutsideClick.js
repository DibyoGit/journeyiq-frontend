

export function ListenOutsideClick(setToggler,dropdownRef) {

    document.addEventListener('click' , (event) =>{
        const curr = dropdownRef?.current;
        const evt = event?.target;
        if(curr.contains(evt)) return console.log(true)
        setToggler(false);
       
    })
}
