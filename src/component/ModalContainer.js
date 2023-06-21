import styles from '../global.module.scss'


function ModalContainer({modal}) {
    return(
        <div>
            {
                modal ?
                    <div className={styles.modalView}>
                        <div className={styles.view}>
                           {modal}
                        </div>
                    </div>
                    : ""
            }
        </div>
    )

}

export default ModalContainer