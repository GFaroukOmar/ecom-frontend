import NavigationBar from "../../components/in-pages-reuseable-components/NavigationBar";
import NewsLetter from "../../components/in-pages-reuseable-components/NewsLetter";
import Footer from "../../components/in-pages-reuseable-components/Footer";

import ShopHeroSection from "./ShopHeroSection";
import Products from "./Products";
import {useEffect} from "react";

const ShopPage=()=>{
    useEffect(() => {
        document.title='shop'
    }, []);
    return(
        <>
            <NavigationBar activePage={'shop'}/>
            <ShopHeroSection/>
            <Products/>
            <NewsLetter/>
            <Footer/>
        </>
    )
}
export default ShopPage
// Created by Farouk