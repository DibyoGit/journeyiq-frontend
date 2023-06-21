import { SET_STATE_COMPLETED, SET_STATE_PENDING } from "../constant";


const initialState = {
    loading:'false',

}

export const LoadingReducer = (state = initialState , action) =>{
    switch (action.type) {

        case SET_STATE_PENDING:
            return{
                loading:action.payload
            }
           
        case SET_STATE_COMPLETED:
                return{
                    loading:action.payload
                }
               
        default:
            return state
    }
}