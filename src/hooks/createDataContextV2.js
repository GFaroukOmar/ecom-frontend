import React, {useReducer} from "react";
const createDataContextV2 = (defaultValue,reducer,actions) => {
    const context=React.createContext(defaultValue)
    const Provider=({children})=>{

        const [state, dispatcher] = useReducer(reducer,defaultValue)
        let dispatchedActions={}
        for (let key in actions){
            dispatchedActions[key]=actions[key](dispatcher)
        }
        return(
            <context.Provider  value={{...state,...dispatchedActions}}>
                {children}
            </context.Provider>
        )
    }
    return({context, Provider})
}
export default createDataContextV2