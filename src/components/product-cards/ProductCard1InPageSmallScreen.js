import Badge from "../in-components-reuseable-components/Badge";
import RatingStars from "../in-components-reuseable-components/RatingStars";
import AddToFavorite from "../in-components-reuseable-components/AddToFavorite";
import {useContext} from "react";
import {Context} from "../../hooks/CartContext";
import {Text} from "../in-components-reuseable-components/TypographyComponents";
import navigateToProductPage from "./navigateToProductPage";
import {useLocation, useNavigate} from "react-router-dom";

const AddToCartButton = ({product}) => {

    const value=useContext(Context)
    const addToCart=value.addToCart
    const removeFromCart=value.removeFromCart
    const cartProducts=value.products;
    const isInCart =cartProducts.some(p=>p===product)
    const buttonStyle={
        padding: '8px 24px',
        backgroundColor: 'var(--primary)',
        borderRadius: '8px',
        height:'40px',
        width:'312px',
        display: 'flex',
        justifyContent:'center',
        alignItems:'center'
    }

    return (
        <>
            {!isInCart?(
                    <div onClick={()=>addToCart(product)} className={'d-flex justify-content-center align-items-end'}>
                        <div  style={buttonStyle} className={'scalable-icon pointer-cursor'}>
                            <Text size={16} color={'neutral-01'}>Add to cart</Text>
                        </div>
                    </div>
                )
                :
                <div onClick={()=>removeFromCart(product)} className={'d-flex justify-content-center align-items-end'}>
                    <div  style={buttonStyle} className={'scalable-icon pointer-cursor'}>
                        <Text size={16} color={'neutral-01'}>Remove From Cart</Text>
                    </div>
                </div>
            }
        </>
    )
}

const ProductCard1InPageSmallScreen = ({product}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleProductClick = (product) => {
        const newPath = `/shop/${product.category}/${product.productId}/`;
        // Use the state property to force a rerender of the current route
        navigate(newPath, { state: { key: location.key + 1 } });
        window.scrollTo(0, 0);
    };
    const imageHolderStyle={
        height:'416px',
        width:'312px',
        borderRadius:'8px',
        backgroundImage: `url(${product.mainImage})`,
        backgroundColor: '#F3F5F7',
        backgroundBlendMode: 'multiply, normal',
        backgroundPosition:'center',
        backgroundSize:'100%',
        backgroundRepeat:'no-repeat',
    }
    const containerStyle={
        width:'321px',
        height: '416px',
    }
    return(

            <div className={'d-flex flex-column'} style={containerStyle}>
                <div className={'pointer-cursor'} onClick={()=>handleProductClick(product)} style={imageHolderStyle}>
                    <div className={'d-inline-flex mt-3 ms-3 flex-column'} style={{gap:'8px'}}>
                        {product.isNew && <Badge>New</Badge>}
                        {product.discount!==0 && <Badge backgroundColor={'var(--green)'}>{`-$${product.discount}`}</Badge>}
                    </div>
                </div>
                <div>
                    <div style={{marginTop:'16px'}}><RatingStars rating={product.rating}/></div>
                    <div className={'d-flex align-items-center justify-content-between'}>
                        <Text size={16} weight={'SemiBald'}>{product.name}</Text>
                        <AddToFavorite addToFavorite={()=>{}} removeFromFavorite={()=>{}} isFavorite={()=>{}}/>
                    </div>
                    <div className={'d-flex gap-2'}>
                        <Text weight={'SemiBald'} size={12}>{`$${product.originalPrice}`}</Text>
                        {product.priceAfterDiscount!==product.originalPrice && <Text weight={'SemiBald'} color={'neutral-04'} style={{textDecoration:'line-through',textDecorationThickness:'2px'}} size={12}>{`$${product.priceAfterDiscount}`}</Text>}
                    </div>
                    <Text color={'neutral-04'} weight={'AverageBald'} style={{marginTop:'8px',marginBottom:'16px'}} size={12}>
                        {product.description}
                    </Text>
                    <AddToCartButton product={product}/>
                </div>
            </div>

    )
}
export default ProductCard1InPageSmallScreen