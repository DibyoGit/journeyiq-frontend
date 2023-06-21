import { SET_DOMAIN_SLUG, SET_DOMAIN_SLUG_lOCALLY } from "../constant"


export const DomainAction = (domainID) => (dispatch) =>{
       
    dispatch({
        type:SET_DOMAIN_SLUG ,
        payload:domainID
    })

}

export const LocalDomainSetter = () => (dispatch) =>{

    const domainSlug = localStorage.getItem('domainID')
    
    dispatch({
        type:SET_DOMAIN_SLUG_lOCALLY,
        payload:domainSlug
    })
}

