import {useState} from "react";
import Badge from "../in-components-reuseable-components/Badge";
import AddToFavorite from "../in-components-reuseable-components/AddToFavorite";
import {Text} from "../in-components-reuseable-components/TypographyComponents";
import useSmallScreen from "../../hooks/useSmallScreen";
import {useLocation, useNavigate} from "react-router-dom";


import AddToCartButton from "../in-components-reuseable-components/AddToCartButton";
import RatingStars from "../in-components-reuseable-components/RatingStars";
// import GoToLinkUnderlined from "../in-components-reusable-components/GoToLinkUnderlined";

// old product object structure
const ProductCard = ({productId,images,mainImage, name, originalPrice, priceAfterDiscount, isFavorite, badges = [{ badgeName: "", textColor: "white", backgroundColor: "white" }], rating }) => {
    // const mainImage = "http://localhost:8000/"+images?.find(image => image.isMainImage)?.imageUrl;  // Get the main image URL
    const productObj = {productId, name, originalPrice, priceAfterDiscount, isFavorite, mainImage, badges, rating }
    const navigate = useNavigate();
    const location = useLocation();

    const handleProductClick = () => {
        const newPath = `/shop/product/${productId}/`;
        navigate(newPath, { state: { key: location.key + 1 } });
        window.location.href=newPath
        window.scrollTo(0, 0);
    };

    const [isSmallScreen] = useSmallScreen();
    const [isOnHover, setIsOnHover] = useState(false);

    const badgesStyle = {
        gap: '16px',
        display: 'inline-flex'
    };

    const handleClick = () => {
        if (isSmallScreen && isOnHover) {
            handleProductClick();
        }
        else if (isSmallScreen && !isOnHover)
            setIsOnHover(true)
        else handleProductClick()
    };

    const handleMouseEnter = () => setIsOnHover(true);
    const handleMouseLeave = () => setIsOnHover(false);
    console.log("product images:",images)
    return (
        <div className={'product-card-type1'}>
            <div className={'card-upper'}
                 style={{ backgroundImage: `url(${mainImage})` }}
                 onMouseEnter={handleMouseEnter}
                 onClick={handleClick}
                 onMouseLeave={handleMouseLeave}>
                {/*<div style={{ backgroundImage: `url(${mainImage})` }} className={'image-container'}>*/}
                <div>
                    <div style={{display:isOnHover?"flex":"none" }} className={'content-container'}>
                        <div className={'badges-container'} style={badgesStyle}>
                            {badges.map(b => <Badge backgroundColor={b.backgroundColor} textColor={b.textColor}>{b.badgeName}</Badge>)}
                        </div>
                        {isOnHover && <AddToFavorite isFavorite={isFavorite} removeFromFavorite={() => { console.log('remove from favorites') }} addToFavorite={() => { console.log('add to favorites') }} />}
                    </div>
                </div>

                {isOnHover &&
                    <div className={'button container d-flex flex-column align-items-center'}>
                        <div style={{ marginBottom: '16px', flexGrow: '1', display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                            <AddToCartButton product={productObj} />
                        </div>
                    </div>
                }
            </div>
            <div className={"card-lower"}>
                <RatingStars rating={rating} />
                <Text size={16} weight={'SemiBald'}>{name}</Text>
                <div className={'d-flex gap-4'}>
                    <Text size={14} weight={'SemiBald'}>{`$${originalPrice}`}</Text>
                    {originalPrice !== priceAfterDiscount &&
                        <Text style={{ textDecoration: 'line-through', textDecorationThickness: '2px' }}
                              size={14} color={'neutral-04'}
                              weight={'SemiBald'}>{`$${priceAfterDiscount}`}
                        </Text>}
                </div>
            </div>
        </div>
    );
};




export default ProductCard