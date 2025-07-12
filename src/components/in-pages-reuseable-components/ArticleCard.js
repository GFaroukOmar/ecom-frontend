import useSmallScreen from "../../hooks/useSmallScreen";
import {Text} from "../in-components-reuseable-components/TypographyComponents";
import GoToLinkUnderlined from "../in-components-reuseable-components/GoToLinkUnderlined";

const ArticleCard = ({image,title,link}) => {
    const [isSmallScreen]=useSmallScreen()
    const articleImageStyle={
        width:isSmallScreen?'311px':'357px',
        height:isSmallScreen?'283px':'325px'
    }
    return(
        <div className={'d-flex flex-column justify-content-center gap-2 align-items-center align-items-lg-start'}>
            <img src={image}  alt={'article'} style={articleImageStyle}/>
            <Text size={20} weight={'LittleBald'}>{title}</Text>
            <GoToLinkUnderlined link={link}>Read More</GoToLinkUnderlined>
        </div>
    )

}
export default ArticleCard