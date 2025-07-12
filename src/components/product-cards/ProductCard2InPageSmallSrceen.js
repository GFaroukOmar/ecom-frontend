import Badge from "../in-components-reuseable-components/Badge";
import AddToFavorite from "../in-components-reuseable-components/AddToFavorite";


import {useContext, useState} from "react";
import {Context} from "../../hooks/CartContext";
import {Text} from "../in-components-reuseable-components/TypographyComponents";
import RatingStars from "../in-components-reuseable-components/RatingStars";
import {useLocation, useNavigate} from "react-router-dom";

const AddToCartButton = ({product}) => {
    const value=useContext(Context)
    const addToCart=value.addToCart
    const removeFromCart=value.removeFromCart
    const cartProducts=value.products;
    const isInCart =cartProducts.some(p=>p===product)
    const buttonStyle={
        padding: '4px 16px 4px 16px',
        backgroundColor: 'var(--primary)',
        borderRadius: '8px',
        height:'32px',
        width:'128px',
        display: 'flex',
        justifyContent:'center',
        alignItems:'center'
    }
    return (
        <>
            {!isInCart?(
                    <div onClick={()=>addToCart(product)} className={'d-flex justify-content-center align-items-end'}>
                        <div  style={buttonStyle} className={'scalable-icon pointer-cursor'}>
                            <Text size={14} color={'neutral-01'}>Add to cart</Text>
                        </div>
                    </div>
                )
                :
                <div onClick={()=>removeFromCart(product)} className={'d-flex justify-content-center align-items-end'}>
                    <div  style={buttonStyle} className={'scalable-icon pointer-cursor'}>
                        <Text size={14} color={'neutral-01'}>Remove</Text>
                    </div>
                </div>
            }
        </>
    )
}

const ProductCard2InPageSmallScreen = ({product}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleProductClick = (product) => {
        const newPath = `/shop/${product.category}/${product.productId}/`;
        // Use the state property to force a rerender of the current route
        navigate(newPath, { state: { key: location.key + 1 } });
        window.scrollTo(0, 0);
    };
    const imageHolderStyle={
        borderRadius:'8px',
        backgroundImage: `url(${product.mainImage})`,
        backgroundColor: '#F3F5F7',
        backgroundBlendMode: 'multiply, normal',
        // backgroundRepeat:'no-repeat',
        display:'flex',
        flexDirection:'column',
        justifyContent: 'space-between',
        backgroundPosition:'center',
        height:'203px',
        width:'152px',
        backgroundSize:'100%',
        backgroundRepeat:'no-repeat'
    }
    const [inSelect, setInSelect] = useState(false)
    const handleSelect=()=>setInSelect(!inSelect)
    const handleMouseEnter=()=>setInSelect(true)
    const handleMouseLeave=()=>setInSelect(false)

    return(
        <div className={'d-flex flex-column'} style={{gap:'12px'}}>
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleSelect} style={imageHolderStyle}>
                <div onClick={(e)=> e.stopPropagation()} className={'d-flex justify-content-between '} style={{gap:'8px',padding:'16px 12px 0 16px'}}>
                    <div className={'d-inline-flex flex-column'} >
                        {inSelect && product.isNew &&<Badge>New</Badge>}
                        {inSelect && product.discount!==0 && <Badge backgroundColor={'var(--green)'}> {`-$${product.discount}`}</Badge>}
                    </div>
                    {inSelect && <AddToFavorite isFavorite={product.isFavorite}  removeFromFavorite={() => {
                    }} addToFavorite={() => {}} />}
                </div>
                {inSelect &&
                    <div className={'d-flex flex-column align-items-center'}>
                        <div className={'pointer-cursor'} onClick={()=>handleProductClick(product)}>more details-></div>
                        <div style={{marginBottom:'16px'}}><AddToCartButton product={product} /></div>
                    </div>}
            </div>
            <div className={'d-flex flex-column'} style={{gap: '4px'}}>
                <RatingStars rating={product.rating}/>
                <Text weight={'SemiBald'} size={14}>{product.name}</Text>
                <div className={'d-flex gap-2'}>
                    <Text weight={'SemiBald'} size={12}>{`$${product.originalPrice}`}</Text>
                    {product.priceAfterDiscount!==product.originalPrice && <Text weight={'SemiBald'} color={'neutral-04'} style={{textDecoration:'line-through',textDecorationThickness:'2px'}} size={12}>{`$${product.priceAfterDiscount}`}</Text>}
                </div>
            </div>
        </div>
    )
}
export default ProductCard2InPageSmallScreen