import RatingStars from "../../components/in-components-reuseable-components/RatingStars";
import {ButtonText, Heading, Text} from "../../components/in-components-reuseable-components/TypographyComponents";
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import React, {useContext, useEffect, useMemo, useState} from "react";
import {Context} from "../../hooks/CartContext";
import {
    HalfRightArrow,
    HeartIcon,
    MinusIcon,
    PlusIcon
} from "../../components/in-components-reuseable-components/Icons";
import useSmallScreen from "../../hooks/useSmallScreen";

const toCartCompatibleProduct = (detailedProduct,color) => {
    const colorObject=detailedProduct.colors.find(colorObject=>colorObject.color===color)
    return{
        productId:detailedProduct.productId,
        name:detailedProduct.name,
        color,
        stockQuantity:colorObject.stockQuantity,
        mainImage:colorObject.mainImage,
    }
};
const InformationSection=({product})=>{
    const [isSmallScreen]=useSmallScreen()
    return(
        <div style={{borderBottom:'solid var(--neutral-03) 2px',gap:'16px'}} className={'d-flex flex-column'}>
            <div className={'d-flex align-items-start gap-2'}>
                <div className={'mt-1'}><RatingStars rating={product.rating}/></div>
                <p>{product.reviews} Reviews</p>
            </div>
            <Heading level={4} >{product.name}</Heading>
            <Text style={{width:isSmallScreen&&'310px'}} color={'neutral-04'} size={16}>
                <div dangerouslySetInnerHTML={{__html: product.description}}></div>
            </Text>
            <div className={'d-flex gap-4'}>
                <Heading level={6}>${product.originalPrice.toFixed(2)}</Heading>
                <Heading style={{textDecoration:'line-through'}} color={'neutral-04'} level={6}>${product.priceAfterDiscount.toFixed(2)}</Heading>
            </div>
        </div>
    )
}
const AddToWishlist = ({product,currentColor}) => {
    const isSmallScreen=useSmallScreen()
  const style={
      display: 'flex',
      width: isSmallScreen?'223px':'357px',
      padding: '10px 40px',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      borderRadius: '8px',
      height: isSmallScreen&&'32px',
      border: '1px solid var(--neutral-07100, #141718)'
  }
  return(
      <div style={style}>
          <HeartIcon/>
          <ButtonText size={'Medium mb-0'}>Wishlist</ButtonText>
      </div>
  )
}
const AddToCartButton = ({product,currentColor,quantity}) => {
    const [isSmallScreen]=useSmallScreen()
    const value=useContext(Context)
    const cartCompatibleProduct=toCartCompatibleProduct(product,currentColor);
    cartCompatibleProduct.quantity=quantity
    const isInCart=value.products.some(product=>product.productId===cartCompatibleProduct.productId && product.color===cartCompatibleProduct.color)
    const style={
        display: 'flex',
        width: isSmallScreen?'100%':'508px',
        padding: '10px 40px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        backgroundColor:'#141718',
        borderRadius: '8px'
    }
    if(!isInCart)
    return(
        <div onClick={()=>value.addToCart(cartCompatibleProduct)} style={style} className={'pointer-cursor'}>
            <ButtonText size={'Medium mb-0 text-white'}>Add To Cart</ButtonText>
        </div>)
    return(
        <div onClick={()=>value.removeFromCart(cartCompatibleProduct)} style={style} className={'pointer-cursor'}>
            <ButtonText size={'Medium mb-0 text-white'}>Remove From Cart</ButtonText>
        </div>)
}
const QuantityControl=({product,currentColor,quantityCounter,setQuantityCounter})=>{
    const [isSmallScreen]=useSmallScreen()
    const value = useContext(Context)
    const cartCompatibleProduct=toCartCompatibleProduct(product,currentColor)
    const targetProduct=value.products.find(p=>p.productId===cartCompatibleProduct.productId && cartCompatibleProduct.color===p.color);
    const ii=targetProduct&&targetProduct.quantity
    useEffect(() => {
        if (targetProduct)setQuantityCounter(targetProduct.quantity)
         else setQuantityCounter(1)
    }, [currentColor,targetProduct,setQuantityCounter,ii]);
    const increaseQuantity=()=>{
        if (quantityCounter+1>cartCompatibleProduct.stockQuantity)return
        setQuantityCounter(quantityCounter+1)
        if(targetProduct)
        value.increaseQuantity(targetProduct)
    }
    const decreaseQuantity=()=>{
        if (quantityCounter-1<1)return
        setQuantityCounter(quantityCounter-1)
        if(targetProduct)
        value.decreaseQuantity(targetProduct)
    }
    const style={
        maxWidth:isSmallScreen?'80px':'127px',
        width:isSmallScreen?'80px':'127px',
        backgroundColor:'var(--neutral-02)',
        gap:'12px',
        padding:isSmallScreen?'12px 8px 12px 8px':'12px 16px 12px 16px',
        borderRadius:'8px',
        height:isSmallScreen?'32px':'52px'
    }
    return(
        <div className={'d-inline-flex align-items-center justify-content-between'} style={style}>
            <div className={'pointer-cursor'} onClick={decreaseQuantity}><MinusIcon/></div>
            <div style={{}} className={'text-center'}>{quantityCounter}</div>
            <div className={'pointer-cursor'} onClick={increaseQuantity}><PlusIcon/></div>
        </div>)
}
const ColoredProductImage = ({image,onClick,color,isCurrentColor}) => {

  return(
      <img onClick={()=>onClick(color)} className={'pointer-cursor'} alt={'colored product'} width={'72px'} style={{minWidth:'72px',border:isCurrentColor&&'solid black 2px'}} height={'72px'} src={image}/>
  )
}
const CallToActionSection = ({product,currentColor}) => {
    const [quantityCounter, setQuantityCounter] = useState(1)
    return(
        <div className={'d-flex flex-column'} style={{padding:'0 0 32px',gap:'16px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '24px',}}>
                <QuantityControl currentColor={currentColor} setQuantityCounter={setQuantityCounter} quantityCounter={quantityCounter} product={product} />
                <AddToWishlist/>
            </div>
            <AddToCartButton product={product} quantity={quantityCounter} currentColor={currentColor}/>
        </div>
    )
}
const ColorSelectionSection = ({product,currentColor,updateCurrentColor}) => {
    return(<div className={'w-100'}>
        <Text size={16} weight={'SemiBald'} color={'neutral-04'}>Choose Color<HalfRightArrow/></Text>
        <Text>{currentColor.charAt(0).toUpperCase() + currentColor.slice(1)}</Text>
        <div className={'d-flex overflow-x-auto'}>
            {product.colors.map(productColorObject=><ColoredProductImage color={productColorObject.color} isCurrentColor={currentColor === productColorObject.color} onClick={updateCurrentColor} image={productColorObject.mainImage}/> )}
        </div>
    </div>)
}
const MeasurementsSection = ({product}) => {
    // const [isSmallScreen]=useSmallScreen()
    // const smallScreenStyle={
    //     display:'flex',
    //     flexDirection:'column',
    //     alignItems:'start'
    // }
    return (<diV className={'w-100'}  >
        <Text size={16} weight={'SemiBald'} color={'neutral-04'}>Measurements</Text>
        <Text size={20} >{product.measurements}</Text>
    </diV>)
}
const CounterSection=()=>{
    const [isSmallScreen]=useSmallScreen()
    return useMemo(() => {
        return (
            <div style={{padding: '24px 0 24px ', borderBottom: 'solid var(--neutral-03) 2px', gap: isSmallScreen?'12px':'16px'}}
                     className={'d-flex flex-column'}>
            Offer expires in:
            <FlipClockCountdown
                to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
                labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
                labelStyle={{fontSize: 12, fontWeight: 500, textTransform: 'uppercase', color: 'var(--neutral-04)'}}
                digitBlockStyle={{
                    width:isSmallScreen?30: 60,
                    height:isSmallScreen?30:60,
                    fontSize: 34,
                    backgroundColor: 'var(--neutral-02)',
                    color: 'black'
                }}
                showSeparators={!isSmallScreen}
                duration={0.5}>
                <Heading level={4}>No Offer!</Heading>
            </FlipClockCountdown>
        </div>)
    }, [isSmallScreen])

}
const ProductPresentation = ({product,currentColor,updateCurrentColor}) => {
    const [isSmallScreen]=useSmallScreen()
    return(
        <div className={'d-flex flex-column'} style={{gap:"24px",alignItems:isSmallScreen &&'center'}}>
            <InformationSection product={product}/>
            <CounterSection/>
            <MeasurementsSection product={product}/>
            <ColorSelectionSection updateCurrentColor={updateCurrentColor} currentColor={currentColor} product={product}/>
            <CallToActionSection currentColor={currentColor}  product={product}/>
        </div>
    )
}
export default ProductPresentation