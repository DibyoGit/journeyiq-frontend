import { SET_DOMAIN_SLUG, SET_DOMAIN_SLUG_lOCALLY } from "../constant";

const initialState = {
    DomainID: ""
}

export const DIDSetter = (state = initialState, action) => {
    switch (action.type) {

        case SET_DOMAIN_SLUG:
            localStorage.setItem('domainID', action.payload)
            return ({
                DomainID: action.payload
            })

        case SET_DOMAIN_SLUG_lOCALLY:
                
                return ({
                    DomainID: action.payload
                })
        

        default:
            return state
    }
}