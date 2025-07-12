import HeroSlider from "../../components/in-pages-reuseable-components/HeroSlider";
import {ColoredSpan, Hero, Text} from "../../components/in-components-reuseable-components/TypographyComponents";
import "../../styles/Colors.css"
const HeroSection=()=>{
    return(
            <div className={"container"}>
                <HeroSlider/>
                <div className={"d-flex flex-column flex-lg-row mt-5 justify-content-between"}>
                    <Hero>Simply Unique<ColoredSpan>/</ColoredSpan><br/>Simply Better<ColoredSpan>.</ColoredSpan></Hero>
                    <div style={{width:"auto"}}><Text size={16} color={"neutral-04"}><ColoredSpan style={{fontSize:"24px",color:"black"}} className={"SemiBald"}>3legant</ColoredSpan> is a gift & decorations store based in MCMC, Vietnam. Est since 2019. </Text></div>
                </div>
                <div></div>
            </div>
    )
}
export default HeroSection