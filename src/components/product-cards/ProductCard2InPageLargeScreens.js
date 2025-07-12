import Badge from "../in-components-reuseable-components/Badge";
import RatingStars from "../in-components-reuseable-components/RatingStars";
import {Text} from "../in-components-reuseable-components/TypographyComponents";
import AddToCartButton from "../in-components-reuseable-components/AddToCartButton";
import AddToFavorite from "../in-components-reuseable-components/AddToFavorite";
import {useLocation, useNavigate} from "react-router-dom";

const ProductCard2InPageLargeScreens = ({product}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleProductClick = (product) => {
    const newPath = `/shop/${product.category}/${product.productId}/`;
    // Use the state property to force a rerender of the current route
    navigate(newPath, { state: { key: location.key + 1 } });
    window.scrollTo(0, 0);
  };
  const containerStyle={
    borderRadius:'8px',
    display:'flex',
    height:'349px',
    width:'548px'
  }
  const imageHolderStyle={
    borderRadius:'8px',
    width: '262px',
    height: '100%',
    background:`url(${product.mainImage})`,
    backgroundSize:'100%',
    backgroundRepeat:'no-repeat',
    backgroundPosition:'center',
    backgroundColor: '#F3F5F7',
    backgroundBlendMode: 'multiply, normal',
  }
  const contentStyle={
    padding:'24px',
    display:'flex',
    flexDirection:'column',
    gap:'16px'
  }
  return(
      <div style={containerStyle}>
        <div className={'pointer-cursor'} onClick={()=>handleProductClick(product)} style={imageHolderStyle}>
        <div style={{gap:'8px'}} class={'w-100 d-flex flex-column justify-content-start align-items-start mt-3 ms-3'}>
          {product.isNew&&<Badge>New</Badge>}
          {product.discount!==0 && <Badge textColor={'black'} backgroundColor={"var(--green)"}>{`-${product.discount}%`}</Badge>}
        </div>
        </div>
        <div style={contentStyle}>
          <RatingStars rating={product.rating}/>
            {/*name and price div*/}
          <div>
            <Text size={16} weight={'SemiBald'}>{product.name}</Text>
            <div style={{gap:'12px'}} class={'d-flex'}>
              <Text size={14} weight={'SemiBald'}>{`$${product.priceAfterDiscount}`}</Text>
              {product.originalPrice!==product.priceAfterDiscount &&
                  <Text  style={{textDecoration:'line-through',textDecorationThickness:'2px'}}
                         size={14} color={'neutral-04'}
                         weight={'SemiBald'}>{`$${product.priceAfterDiscount}`}
                  </Text>}
            </div>
          </div>
          <Text weight={'AverageBald'} size={14} color={'neutral-04'} style={{width:'230px',height:'88px'}}>{!product.description?null:product.description.length<130?product.description:product.description.substring(0,127)+'...'}</Text>
          <AddToCartButton product={product}/>
          <div className={'d-flex align-items-center justify-content-center'}>
            <AddToFavorite isFavorite={product.isFavorite} addToFavorite={()=>{}} removeFromFavorite={()=>{}}/>
            Wish List
          </div>
        </div>
  </div>)
}
export default ProductCard2InPageLargeScreens