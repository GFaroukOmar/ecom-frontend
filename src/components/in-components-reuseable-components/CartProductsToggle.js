import {useContext, useState} from "react";
import {Context as CartContext} from "../../hooks/CartContext";
import useSmallScreen from "../../hooks/useSmallScreen";
import {Heading, Text} from "./TypographyComponents";
import {CancelIcon, MinusIcon, PlusIcon} from "./Icons";
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import ProductInCartQuantityControl from "./ProductInCartQuantityControl";
import {colors} from "@mui/joy";
const ProductCell = ({ productId, category, productName, color, price, discountPrice, mainImage, hideCart }) => {
    const [redirect, setRedirect] = useState(false)
    const value = useContext(CartContext)
    const productCellContainerStyle = {
        padding: '24px 0 24px 0',
        borderBottom: 'solid var(--neutral-04)',
        borderBottomWidth: '2px',
        height: '100px',
        background: 'white',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
    }

    console.log("productId=%s, category=%s", productId, category)

    if (redirect && productId !== parseInt(productId)) {
        hideCart()
        return (
            <Navigate to={`/shop/${category}/${productId}/`} />
        )
    }

    return (
        <div style={productCellContainerStyle}>
            <img className={"pointer-cursor"} onClick={() => setRedirect(true)} src={mainImage} height={'96px'} width={'80px'} alt={"product"} />
            <div className={'d-flex w-100 justify-content-between'}>
                <div className={'d-flex flex-column'} style={{ gap: '8px' }}>
                    <Text size={14} weight={'SemiBald'}>{productName}</Text>
                    {/*<Text size={12} weight={'AverageBald'} color={'neutral-04'}>Color: {color}</Text>*/}
                    <ProductInCartQuantityControl product={{productId,stockQuantity:100}} />
                </div>
                <div className={'d-flex flex-column align-items-end'} style={{ gap: '8px' }}>
                    <div className={'d-flex gap-3'}>
                        <Text size={14} weight={'SemiBald'}>${price}</Text>
                        {discountPrice && <Text style={{ textDecoration: 'line-through' }} color={"red"} size={14} weight={'SemiBald'}>${discountPrice}</Text>}
                    </div>
                    <div className={'pointer-cursor'} onClick={() => value.removeFromCart({ productId, category })}><CancelIcon /></div>
                </div>
            </div>
        </div>
    )
}

const CartProductsToggle = ({hideCart}) => {
    const [isSmallScreen]=useSmallScreen()
    const value=useContext(CartContext)
    const overlayStyle={
        position: 'fixed',
        top: 0,
        zIndex:2,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.45)',
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'start',
        overflow:'auto'
    }
    const container={
        width:isSmallScreen?'342px':'412px',
        height:'100vh',
        padding:isSmallScreen?'24px':'40px 24px 40px 24px',
        background: 'white',
        overflow:'auto',
    }

    const handleChildClick = (event) => {
        event.stopPropagation();
    };
    const navigate = useNavigate();
    const location = useLocation();
    const handleButtonClick= () => {
        const newPath = `/cart`;
        // Use the state property to force a rerender of the current route
        navigate(newPath, { state: { key: location.key + 1 } });
        window.scrollTo(0, 0);
    };
    let sum =0;
    value.products.forEach(p=> {if(p.price) sum += p.originalPrice})
    return(

                <div style={overlayStyle} onClick={()=>hideCart()}>
                        <div onClick={handleChildClick} style={container}>
                            <div  className={'d-flex justify-content-between position-relative justify-content-lg-start'}>
                                <Heading level={6}>Cart</Heading>
                                {isSmallScreen &&
                                    <div className={'pointer-cursor'} onClick={()=>hideCart()}><CancelIcon/></div>}
                            </div>
                            <div class={'d-flex flex-column overflow-y-auto'}>
                                {value.products.map(p=><ProductCell {...p} hideCart={hideCart}/>)}
                            </div>
                            <div>
                                <div className={'py-3 d-flex justify-content-between'}>
                                    <Text size={20} weight={'LittleBald'}>Total</Text>
                                    <Text size={20} weight={'LittleBald'}>${sum}</Text>
                                </div>
                                <div className={'pointer-cursor scalable-icon'} style={{color:'white',backgroundColor:'#141718',borderRadius:'6px',display: 'flex',padding: '10px 26px', justifyContent: 'center', alignItems: 'center',}} onClick={handleButtonClick}> go to cart </div>
                            </div>
                        </div>
                </div>

    )
}
export default CartProductsToggle
