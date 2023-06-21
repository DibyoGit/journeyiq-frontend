import { SET_STATE_COMPLETED, SET_STATE_PENDING } from "../constant"

export const PendingAction = () => (dispatch) =>{
    
    dispatch({
        type:SET_STATE_PENDING,
        payload:true
    })
}

export const CompleteAction = () => (dispatch) =>{
    
    dispatch({
        type:SET_STATE_COMPLETED,
        payload:false
    })
}
