import styles from './bttn.module.scss'

export const Button = ({callHandler , children }) =>{
    return(
        <button className={styles.bttn} onClick={callHandler} >{children}</button>
    )
}
