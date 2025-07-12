import createDataContext from "./createDataContext";
const authReducer=(state,action)=>{
    switch (action.type){
        case 'log_in':
            return {...state,isLoggedIn:true}
        case 'log_out':
            return {...state,isLoggedIn:false}
        default: return state
    }
}
const logIn=(dispatch)=>{
    return ()=>{
        dispatch({type:'log_in'})}
}
const logout=(dispatch)=>{
    return ()=>{
        dispatch({type:'log_out'})}
}
export const {Context,Provider}=createDataContext(authReducer,{login:logIn,logout},{isLoggedIn:false,products:[]})
