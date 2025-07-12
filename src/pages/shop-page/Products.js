import FilterArea from './FilterArea.js'
import React, {useEffect, useState} from "react";
import {Text} from "../../components/in-components-reuseable-components/TypographyComponents";
import {
    Grid1X2Active, Grid1X2Inactive,
    Grid2X1Active,
    Grid2X1Inactive,
    Grid2X2Active,
    Grid2X2Inactive,
    Grid3X3Active,
    Grid3X3Inactive
} from "../../components/in-components-reuseable-components/Icons";
import ProductCard from "../../components/product-cards/ProductCard";
import ProductCard2InPageLargeScreens from "../../components/product-cards/ProductCard2InPageLargeScreens";
import useSmallScreen from "../../hooks/useSmallScreen";
import ProductCard2InPageSmallScreen from "../../components/product-cards/ProductCard2InPageSmallSrceen";
import ProductCard1InPageSmallScreen from "../../components/product-cards/ProductCard1InPageSmallScreen";
import {publicRoute} from "../../api";

const demoProducts=[
    {badges:[{badgeName:"New",backgroundColor:"white",textColor:"black"},{badgeName:"-50%",backgroundColor:"green",textColor:"white"}],stockQuantity:10,productId:1,name:'Closet',isNew:true,discount:50,rating:5,originalPrice:400,priceAfterDiscount:200,color:'default',mainImage:'/images/products/closet.jpg',isFavorite:false,description:'Super-soft cushion cover in off-white with a tactile pattern that enhances the different tones in the pile and base.'},
    {stockQuantity:10,
        badges:[{badgeName:"New",backgroundColor:"white",textColor:"black"},
            {badgeName:"-50%",backgroundColor:"green",textColor:"white"}],
        productId:2,
        name:'Table Lamp',
        // productName:'Table Lamp',
        isNew:true,
        discount:50,
        rating:5,
        originalPrice:400,
        price:400,
        priceAfterDiscount: 200,
        color:'default',
        mainImage:'/images/products/lamp-short.jpg',
        isFavorite: false,
        description:'Super-soft cushion cover in off-white with a' +
            ' tactile pattern that enhances the different tones in the pile and base.'},
    {stockQuantity:10,productId:3,name:'Beige Lamp',isNew:false,discount:20,rating:5,originalPrice:400,priceAfterDiscount:200,color:'default',mainImage:'/images/products/lamp-middle.jpg',isFavorite: false},
    {stockQuantity:10,productId:4,name:'LoveSeat Sofa',isNew:false,discount:20,rating:5,originalPrice:400,priceAfterDiscount:200,color:'default',mainImage:'/images/products/holder.jpg',isFavorite: false},
    {stockQuantity:10,productId:5,name:'LoveSeat Sofa',isNew:false,discount:20,rating:5,originalPrice:400,priceAfterDiscount:200,color:'default',mainImage:'/images/products/toast.jpg',isFavorite: false},
    {stockQuantity:10,productId:6,name:'LoveSeat Sofa',isNew:false,discount:20,rating:5,originalPrice:400,priceAfterDiscount:200,color:'default',mainImage:'/images/products/table-black.jpg',isFavorite: false},
    {stockQuantity:11,productId:1,name:'Closet',isNew:true,discount:50,rating:5,originalPrice:400,priceAfterDiscount:200,color:'default',mainImage:'/images/products/closet.jpg',isFavorite:false},
    {stockQuantity:12,productId:2,name:'Table Lamp',isNew:true,discount:0,rating:5,originalPrice:400,priceAfterDiscount:200,color:'default',mainImage:'/images/products/lamp-short.jpg',isFavorite: false},
    {stockQuantity:13,productId:3,name:'Beige Lamp',isNew:false,discount:20,rating:5,originalPrice:400,priceAfterDiscount:200,color:'default',mainImage:'/images/products/lamp-middle.jpg',isFavorite: false},
    {stockQuantity:14,productId:4,name:'LoveSeat Sofa',isNew:false,discount:20,rating:5,originalPrice:400,priceAfterDiscount:200,color:'default',mainImage:'/images/products/holder.jpg',isFavorite: false},
    {stockQuantity:15,productId:5,name:'LoveSeat Sofa',isNew:false,discount:20,rating:5,originalPrice:400,priceAfterDiscount:200,color:'default',mainImage:'/images/products/toast.jpg',isFavorite: false},
    {stockQuantity:16,productId:6,name:'LoveSeat Sofa',isNew:false,discount:20,rating:5,originalPrice:400,priceAfterDiscount:200,color:'default',mainImage:'/images/products/table-black.jpg',isFavorite: false},
]
const ProductCardsFormatter=({products,activeGrid})=>{
    const [isSmallScreen]=useSmallScreen();
    const productCards=products.map((product)=>{
        if ((activeGrid===1 || activeGrid===2) && !isSmallScreen)
            return <ProductCard {...product} product={product}/>
        if (activeGrid===3) return <ProductCard2InPageLargeScreens product={product}/>
        if (activeGrid===1 && isSmallScreen)
            return <ProductCard2InPageSmallScreen product={product}/>
        if(activeGrid===2 && isSmallScreen) return <ProductCard1InPageSmallScreen product={product}/>
        else return null
    })
    return(
        <div className={'d-flex flex-wrap'} style={{marginTop:'40px',justifyContent:activeGrid===1 &&!isSmallScreen ?'space-around':"center",gap:'20px'}}>
            {productCards}
        </div>
    )
}
const Grid=({children,isActive,onClick})=>{
    return(
        <div className={'pointer-cursor'} onClick={()=>{if (onClick)onClick()}} style={
            {

                padding:'9px 12px 9px 12px',
                backgroundColor:isActive?'var(--neutral-03)':'white'
            }
        }>
            {children}
        </div>
    )
}
const DisplayControl = ({style={},setActiveGrid,activeGrid}) => {
    const [isSmallScreen]=useSmallScreen()
    if (isSmallScreen)
        return (
            <div style={style} className={'d-flex'}>
                <Grid isActive={activeGrid===1} onClick={()=>setActiveGrid(1)}>
                    {activeGrid===1?<Grid1X2Active/>:<Grid1X2Inactive/>}
                </Grid>
                <Grid isActive={activeGrid===2} onClick={()=>setActiveGrid(2)}>
                    {activeGrid===2?<Grid2X1Active/>:<Grid2X1Inactive/>}
                </Grid>
            </div>
    )
     return(
            <div style={style} className={'d-flex w-auto'}>
                <Grid isActive={activeGrid===1} onClick={()=>setActiveGrid(1)}>
                    {activeGrid===1?<Grid3X3Active/>:<Grid3X3Inactive/>}
                </Grid>
                <Grid isActive={activeGrid===2} onClick={()=>setActiveGrid(2)}>
                    {activeGrid===2?<Grid2X2Active/>:<Grid2X2Inactive/>}
                </Grid>
                <Grid isActive={activeGrid===3} onClick={()=>setActiveGrid(3)}>
                    {activeGrid===3?<Grid2X1Active/>:<Grid2X1Inactive/>}
                </Grid>
            </div>
    )
}
const Products = () => {
    const [products, setProducts] = useState(demoProducts)
    // useEffect(() => {
    //     publicRoute.get("/products").then((response)=>{setProducts(response.data)
    //     console.log(response)})
    // }, []);
    const [isSmallScreen]=useSmallScreen();
    const [activeGrid, setActiveGrid] = useState(1)
    const [currentCategory, setCurrentCategory] = useState('Living Room')
    const [currentPriceRange, setCurrentPriceRange] = useState()
    console.log(currentPriceRange)

    return(
        <div className={'container d-flex'} style={{gap:'24px',marginTop: '60px'}}>
            {activeGrid===1 &&!isSmallScreen && <FilterArea type={1} updateCurrentPriceRange={setCurrentPriceRange}
                            updateCurrentCategory={setCurrentCategory}/>}
            <div>
                <div className={'d-flex justify-content-between gap-3'} style={{flexDirection:isSmallScreen?'column':"row",alignItems:isSmallScreen?'center':"start"}}>
                    {activeGrid===1 && !isSmallScreen &&<Text size={20} weight={'SemiBald'}>{currentCategory}</Text>}
                    {(activeGrid===2 ||activeGrid===3) && !isSmallScreen && <FilterArea type={2} updateCurrentCategory={setCurrentCategory} updateCurrentPriceRange={setCurrentPriceRange}/>}
                    <DisplayControl setActiveGrid={setActiveGrid} activeGrid={activeGrid}/>
                    {isSmallScreen && <FilterArea type={3} updateCurrentCategory={setCurrentCategory} updateCurrentPriceRange={setCurrentPriceRange}/>}
                </div>
                <ProductCardsFormatter products={products} activeGrid={activeGrid}/>
            </div>

        </div>
    )
}
export default Products