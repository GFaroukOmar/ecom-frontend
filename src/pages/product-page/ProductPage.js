// import {useParams} from "react-router-dom";
import NavigationBar from "../../components/in-pages-reuseable-components/NavigationBar";
import ProductImagesSlider from "./ProductImagesSlider";
import ProductPresentation from "./ProductPresentation";
import {useEffect, useState} from "react";
import useSmallScreen from "../../hooks/useSmallScreen";
import ProductCarousel from "../home-page/ProductCarousel";
import NewsLetter from "../../components/in-pages-reuseable-components/NewsLetter";
import Footer from "../../components/in-pages-reuseable-components/Footer";

import {useParams} from "react-router-dom";
const description='Super-soft cushion cover in off-white with a tactile pattern that enhances the different tones in the pile and base.'
const product={
    quantity:3,
    stockQuantity:10,
    productId:1,
    name:'Tray table',
    description:"<div>this is a  desciption tag in h1</div>",
    rating:5,
    reviews:11,
    isNew:true,
    isFavorite:false,
    discount:50,
    originalPrice:400.00,
    priceAfterDiscount:200.10,
    defaultColor:'black',
    measurements:'17 1/2x20 5/8',
    colors:[
        {color:'black',mainImage:'/images/products/tray-table/black.jpg',images:[],stockQuantity:10,},
        {color:'red',mainImage:'/images/products/tray-table/red.jpg',images:[],stockQuantity:10,},
        {color:'brown',mainImage:'/images/products/tray-table/brown.jpg',images:[],stockQuantity:10,},
        {color:'white',mainImage:'/images/products/tray-table/white.jpg',images:[],stockQuantity:10,},
    ],
    images:['/images/products/tray-table/tray-table-1.jpg','/images/products/tray-table/tray-table-2.jpg',
        '/images/products/tray-table/tray-table-3.jpg',
        '/images/products/tray-table/tray-table-4.jpg']}
const ProductPage = () => {
    const [productId, setProductId] = useState('');
    const { category, productId: paramProductId } = useParams();

    // Use useEffect to update the state when the route parameter changes
    useEffect(() => {
        document.title='product'
        setProductId(paramProductId);
    }, [paramProductId]);

    console.log('product id:'+productId)
    useEffect(() => {

    }, [productId]);
    const [currentColor, setCurrentColor] = useState(product.defaultColor)
    const updateCurrentColor=(chosenColor)=>{
        setCurrentColor(chosenColor)
    }
    const [isSmallScreen]=useSmallScreen()
  return(
      <>
          <NavigationBar activePage={'shop'}/>
          <div className={'container'} style={!isSmallScreen ?{display:'flex',marginTop:'56px',gap:'64px'}:{display:'flex',flexDirection:'column',alignItems:'center'}}>
              <ProductImagesSlider product={product} currentColor={currentColor}/>
              <ProductPresentation product={product} currentColor={currentColor} updateCurrentColor={updateCurrentColor}/>
          </div>
          <ProductCarousel title={'You may also like'}/>
          <NewsLetter/>
          <Footer/>
      </>
  )
}
export default ProductPage