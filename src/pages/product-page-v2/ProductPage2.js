import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {publicGetProductById, publicRoute} from "../../api";
import {useNotification} from "../../hooks/NotificationContext";
import NavigationBar from "../../components/in-pages-reuseable-components/NavigationBar";
import RatingStars from "../../components/in-components-reuseable-components/RatingStars";
import {Heading, Text} from "../../components/in-components-reuseable-components/TypographyComponents";
import {Currency} from "../../Constants";
import useSmallScreen from "../../hooks/useSmallScreen";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import {HalfRightArrow, MinusIcon, PlusIcon} from "../../components/in-components-reuseable-components/Icons";
import Loader from "../../components/in-pages-reuseable-components/Loader";
import {Context} from "../../hooks/CartContext";
import ProductInCartQuantityControl
    from "../../components/in-components-reuseable-components/ProductInCartQuantityControl";
import ProductImagesSlider from "../product-page/ProductImagesSlider";


const VariationSelectForm = ({ product,setParentSelectedVariation }) => {
    // State for selected attribute values
    const [selectedAttributes, setSelectedAttributes] = useState({});
    const [selectedVariation, setSelectedVariation] = useState();
    const [variationAvailable, setVariationAvailable] = useState(true);
    useEffect(() => {
        console.log(selectedVariation)
        setParentSelectedVariation(selectedVariation)
    }, [selectedVariation]);
    // Handle attribute selection from the dropdown
    const handleAttributeChange = (attributeId, value) => {
        const updatedAttributes = { ...selectedAttributes, [attributeId]: value };
        setSelectedAttributes(updatedAttributes);

        // Find a matching variation based on selected attributes
        const matchingVariation = product.variations.find((variation) =>
            variation.attributeValues.every(
                (attrValue) =>
                    updatedAttributes[attrValue.attributeId] === attrValue.value
            )
        );

        setSelectedVariation(matchingVariation || null);
        setVariationAvailable(!!matchingVariation);  // Set availability based on matching variation
    };

    // Handle selecting a variation by clicking an image
    const handleImageClick = (variation) => {
        const updatedAttributes = {};
        variation.attributeValues.forEach((attrValue) => {
            updatedAttributes[attrValue.attributeId] = attrValue.value;
        });

        setSelectedAttributes(updatedAttributes);
        setSelectedVariation(variation);
        setVariationAvailable(true);
    };

    return (
        <div>
            <h2>{product.productName}</h2>
            <p>{product.description}</p>

            {/* Render attribute dropdowns dynamically */}
            {product.attributes.map((attribute) => (
                <div key={attribute.attributeId}>
                    <label htmlFor={`attribute-${attribute.attributeId}`}>
                        {attribute.name}:
                    </label>
                    <select
                        id={`attribute-${attribute.attributeId}`}
                        value={selectedAttributes[attribute.attributeId] || ""}
                        onChange={(e) =>
                            handleAttributeChange(attribute.attributeId, e.target.value)
                        }
                    >
                        {[
                            ...new Set(
                                product.variations
                                    .flatMap((variation) =>
                                        variation.attributeValues
                                            .filter(
                                                (attrValue) => attrValue.attributeId === attribute.attributeId
                                            )
                                            .map((attrValue) => attrValue.value)
                                    )
                            )
                        ].map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>
            ))}

            {/* Display variation images below dropdowns */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {product.variations.map((variation) => (
                    <div
                        key={variation.variationId}
                        onClick={() => handleImageClick(variation)}
                        style={{
                            cursor: 'pointer',
                            border: selectedVariation?.variationId === variation.variationId ? '2px solid black' : 'none',
                            display: 'inline-block',
                        }}
                    >
                        <img
                            src={variation.variationImageUrl}
                            alt={`Variation ${variation.variationId}`}
                            style={{ width: '200px', height: '200px' }}
                        />
                    </div>
                ))}
            </div>

            {/* Display selected variation or not available message */}
            {variationAvailable ? (
                selectedVariation ? (
                    <></>
                    // <div>
                    //     <h3>Selected Variation</h3>
                    //     <img
                    //         src={selectedVariation.variationImageUrl}
                    //         alt="Selected variation"
                    //         style={{ width: '200px', height: 'auto' }}
                    //     />
                    // </div>
                ) : (
                    <p>Please select all attributes to see the variation.</p>
                )
            ) : (
                <p>Not Available for the selected combination.</p>
            )}
        </div>
    );
};
// const QuantityControl=({product,currentColor,quantityCounter,setQuantityCounter})=>{
//     const [isSmallScreen]=useSmallScreen()
//     const value = useContext(Context)
//     const cartCompatibleProduct=toCartCompatibleProduct(product,currentColor)
//     const targetProduct=value.products.find(p=>p.productId===cartCompatibleProduct.productId && cartCompatibleProduct.color===p.color);
//     const ii=targetProduct&&targetProduct.quantity
//     useEffect(() => {
//         if (targetProduct)setQuantityCounter(targetProduct.quantity)
//         else setQuantityCounter(1)
//     }, [currentColor,targetProduct,setQuantityCounter,ii]);
//     const increaseQuantity=()=>{
//         if (quantityCounter+1>cartCompatibleProduct.stockQuantity)return
//         setQuantityCounter(quantityCounter+1)
//         if(targetProduct)
//             value.increaseQuantity(targetProduct)
//     }
//     const decreaseQuantity=()=>{
//         if (quantityCounter-1<1)return
//         setQuantityCounter(quantityCounter-1)
//         if(targetProduct)
//             value.decreaseQuantity(targetProduct)
//     }
//     const style={
//         maxWidth:isSmallScreen?'80px':'127px',
//         width:isSmallScreen?'80px':'127px',
//         backgroundColor:'var(--neutral-02)',
//         gap:'12px',
//         padding:isSmallScreen?'12px 8px 12px 8px':'12px 16px 12px 16px',
//         borderRadius:'8px',
//         height:isSmallScreen?'32px':'52px'
//     }
//     return(
//         <div className={'d-inline-flex align-items-center justify-content-between'} style={style}>
//             <div className={'pointer-cursor'} onClick={decreaseQuantity}><MinusIcon/></div>
//             <div style={{}} className={'text-center'}>{quantityCounter}</div>
//             <div className={'pointer-cursor'} onClick={increaseQuantity}><PlusIcon/></div>
//         </div>)
// }





const ProductPage=({productId,productName,description,discountPrice,price,discountEndTime,variations,attributes,quantity,images})=>{
    const [selectedVariation, setSelectedVariation] = useState()
    const [isSmallScreen]=useSmallScreen()
    // const {addNotification} = useNotification()
    // const { productId } = useParams();
    // const [product, setProduct] = useState(null)

    useEffect(() => {
        publicRoute.get(`/product/${productId}`)
            .then(response=>console.log(response.data))
            // .catch(e=>addNotification("error","Network Error",e?.response?.data ||e.message))
    }, []);
    console.log("produsct description")
    const cartValue=useContext(Context)
    const addToCart=()=>{
        cartValue.addToCart({
            productId:selectedVariation?.variationId,
            productName,
            stockQuantity:100,
            price,
            discountPrice,
            mainImage:selectedVariation?.variationImageUrl,
        })
    }
    return(
        <>
            <NavigationBar/>
            <div className={"container"}>
                <div className={'d-flex gap-4'}>
                    <ProductImagesSlider product={{images:images.map(img=>`http://localhost:8000/${img.imageUrl}`)}} currentMainImage={selectedVariation?.variationImageUrl}/>
                    <div className={'d-flex flex-column'} style={{gap:"24px",alignItems:isSmallScreen &&'center'}}>
                    {/*information section*/}
                        <div style={{borderBottom:'solid var(--neutral-03) 2px',gap:'16px'}} className={'d-flex flex-column'}>

                            <Heading level={4} >{productName}</Heading>
                            <Text style={{}} color={'neutral-04'} size={16}>
                                <div dangerouslySetInnerHTML={{__html: description}}></div>
                            </Text>

                            <div className={'d-flex gap-4'}>
                                <Heading level={6}>{Currency}{discountPrice?.toFixed(2)}</Heading>
                                <Heading color={'neutral-04'} style={{textDecoration:'line-through'}} level={6}>{Currency}{price?.toFixed(2)}</Heading>
                            </div>
                        </div>
                    {/* countdown section*/}
                        <div style={{padding: '24px 0 24px ', borderBottom: 'solid var(--neutral-03) 2px', gap: isSmallScreen?'12px':'16px'}}
                             className={'d-flex flex-column'}>
                            Offer expires in:
                            <FlipClockCountdown
                                // to={discountEndTime}
                                to={Date.now()+24*60*60 *60*6}
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
                        </div>
                    {/* variations section*/}
                        <VariationSelectForm  setParentSelectedVariation={setSelectedVariation} product={{variations,attributes}}></VariationSelectForm>
                    {/*    call to action */}
                        <div className={'d-flex flex-column'} style={{padding:'0 0 32px',gap:'16px'}}>
                            <div style={{display: 'flex', alignItems: 'center', gap: '24px',}}>
                                {/*quantity control*/}
                                {/*add to cart*/}
                                {/*<ProductInCartQuantityControl product={{productId:selectedVariation?.variationId,stockQuantity:100}}/>*/}
                                <button onClick={addToCart}>
                                    ADD TO CART
                                </button>
                                {/*<AddToWishlist/>*/}
                            </div>
                            {/*<AddToCartButton product={product} quantity={quantityCounter} currentColor={currentColor}/>*/}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
const ProductPage2=()=>{
    const [product, setProduct] = useState(null)
    const {addNotification} = useNotification()
    const {productId}=useParams()
    useEffect(() => {
        publicRoute.get(`/product/${productId}`)
            .then(response=> {
                console.log(response.data)
                setProduct(response.data)
                console.log(response.data)
            })
        .catch(e=>addNotification("error","Network Error",e?.response?.data ||e.message))
    }, []);
    if(product)
        return <ProductPage productId={productId} {...product}/>
    // else return <Loader/>
}
export default ProductPage2