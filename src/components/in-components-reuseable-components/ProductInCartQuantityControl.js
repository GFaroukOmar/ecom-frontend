import {useContext} from "react";
import {Context as CartContext} from "../../hooks/CartContext";
import {MinusIcon, PlusIcon} from "./Icons";

const ProductInCartQuantityControl=({product,style,className})=>{
    const value=useContext(CartContext)
    const targetProduct=value.products.find(p=>p.productId===product.productId)
    return(
        <div className={className?className:'d-inline-flex   align-items-center'} style={style?style:{gap:'12px',padding:'0 8px 0 8px',border:'solid var(--neutral-04) 1px',borderRadius:'4px'}}>
            <div className={'pointer-cursor'} onClick={()=>value.decreaseQuantity(product)}><MinusIcon/></div>
            <div>{targetProduct?targetProduct.quantity:'!'}</div>
            <div className={'pointer-cursor'} onClick={()=>value.increaseQuantity(product)}><PlusIcon/></div>
        </div>
    )
}
export default ProductInCartQuantityControl