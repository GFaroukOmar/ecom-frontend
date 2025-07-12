import createDataContext from "./createDataContext";

const reducer=(state,action)=>{
    switch (action.type){
        case "product":
            state.product=action.payload
            return {...state}
        case "image":
            state.selectedImage=action.payload
            return {...state}
    }
}
const setProduct=(dispatcher)=>{
    return (product)=>{
        dispatcher({type:"product",payload:product})
    }
}

const setSelectedImage=(dispatcher)=>{
    return (image)=>{
        dispatcher({type:"image",payload:image})
    }
}
export const {Context,Provider}=createDataContext(reducer,{setProduct},{product:{},})

