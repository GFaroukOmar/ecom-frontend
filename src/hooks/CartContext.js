
import createDataContext from "./createDataContext";

const isTargetProduct=(iterationProduct,actionProduct)=>{
    console.log("in is target product iteration product"+ JSON.stringify(iterationProduct)+"\n")
    console.log("in is target product target product"+ JSON.stringify(actionProduct)+"\n")
    return (iterationProduct?.productId===actionProduct.payload?.productId)
}
const cartReducer=(state,action)=> {
    /* expecting {productId:1,color:"black",quantity:1,stockQuantity
     ,priceAfterDiscount:300,mainImage:"/image"}*/
    switch (action.type) {
        case 'add_to_cart':
            if (state.products.some(product => isTargetProduct(product, action)))
                return state
            if (!action.payload.quantity) action.payload.quantity = 1;
            return {...state, products: [...state.products, action.payload]}
        case 'remove_from_cart':
            return {...state, products: [...state.products.filter(product => !isTargetProduct(product, action))]}
        case 'increase_quantity':
            console.log("state products:",state.products)
            state.products.find(product =>
                    product.productId===action.payload.productId).quantity+=1



            return {...state, products: [...state.products]}
        case 'decrease_quantity':
            state.products.forEach(product => {
                    if (isTargetProduct(product, action) && product.quantity > 1)
                        product.quantity -= 1;
                }
            )
            return {...state, products: [...state.products]}
        case 'set_quantity':
            state.products.forEach(product => {
                    if (product.productId===action.payload.product.productId &&
                        product.color===action.payload.color &&
                        product.quantity <= product.stockQuantity &&
                        action.payload.product.productId<0
                    )
                        console.log("int context cart quantity=%d",action.quantity)
                        product.quantity = action.payload.quantity;
                }
            )
            return {...state, products: [...state.products]}

        default:
            return state
    }
}
const increaseQuantity=(dispatch)=>{
    return (product)=>{dispatch({type:'increase_quantity',payload:product})}
}
const decreaseQuantity=(dispatch)=>{
    return (product)=>{dispatch({type:'decrease_quantity',payload:product})}
}
const addToCart = (dispatch) => {
    return (product)=>{dispatch({type:'add_to_cart',payload:product})}}
const removeFromCart = (dispatch) => {
    return (product)=>{dispatch({type:'remove_from_cart',payload:product})}
}
const setQuantity=(dispatch)=>{
    return (product,quantity)=>dispatch({type:'set_quantity',payload: {product,quantity}})
}

export const  {Context,Provider}=createDataContext(cartReducer,{addToCart,removeFromCart,increaseQuantity,decreaseQuantity,setQuantity},{products:[]})

