import React, {useEffect} from "react";
import NavigationBar from "../../components/in-pages-reuseable-components/NavigationBar";
import HeroSection from "./HeroSection";
import BannerGrid from "./BannerGrid";
import ProductCarousel from "./ProductCarousel";
import ValuesSection from "./ValuesSection";
import CoolBanner from "./CoolBanner";
import Articles from "./Articles";
import NewsLetter from "../../components/in-pages-reuseable-components/NewsLetter";
import Footer from "../../components/in-pages-reuseable-components/Footer";
import {Heading} from "../../components/in-components-reuseable-components/TypographyComponents";
const HomePage=()=>{
    useEffect(() => {
        document.title='Elegant'
    }, []);
    return(
        <>
            <NavigationBar activePage={"home"}/>
            <HeroSection/>
            <BannerGrid/>
            <ProductCarousel title={<Heading className={'LittleBald'} level={4} c>New<br/>Arrivals</Heading>}/>
            <ValuesSection/>
            <CoolBanner/>
            <Articles/>
            <NewsLetter/>
            <Footer/>
        </>
    )
}
export default HomePage