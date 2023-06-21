import styles from './card.module.scss'


const  Card = ({children , propsStyle})=>{
    
    return(
        <div  className={`p-2 rounded-md shadow-md bg-white  border ${propsStyle}`}  >
            {children}
        </div>
    )
}


export default Card

