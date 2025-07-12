import useSmallScreen from "../../hooks/useSmallScreen";
import {useContext} from "react";
import {Context} from "../../hooks/CartContext";
import {Text} from "./TypographyComponents";

const AddToCartButton = ({product}) => {
    const [isSmallScreen]=useSmallScreen()
    const value=useContext(Context)
    const addToCart=value.addToCart
    const removeFromCart=value.removeFromCart
    const cartProducts=value.products;
    const isInCart =cartProducts.some(p=>p.productId===product.productId && p.color===product.color)
    const buttonStyle={
        padding: '8px 24px',
        backgroundColor: 'var(--primary)',
        borderRadius: '8px',
        height:isSmallScreen?'40px':'48px',
        width:isSmallScreen?'202px':'230px',
        display: 'flex',
        justifyContent:'center',
        alignItems:'center'
    }
    return (
        <>
            {!isInCart?(
                    <div onClick={(e)=> {
                        addToCart(product)
                        e.stopPropagation()
                    }} className={'d-flex justify-content-center align-items-end'}>
                        <div  style={buttonStyle} className={'scalable-icon pointer-cursor'}>
                            <Text size={16} color={'neutral-01'}>Add to cart</Text>
                        </div>
                    </div>
                )
                :
                <div onClick={(e)=>{
                    removeFromCart(product)
                    e.stopPropagation()}}
                     className={'d-flex justify-content-center align-items-end'}>
                    <div  style={buttonStyle} className={'scalable-icon pointer-cursor'}>
                        <Text size={16} color={'neutral-01'}>Remove From Cart</Text>
                    </div>
                </div>
            }
        </>
    )
}
export default AddToCartButton