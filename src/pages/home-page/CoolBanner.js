import useSmallScreen from "../../hooks/useSmallScreen";
import {Heading, Text} from "../../components/in-components-reuseable-components/TypographyComponents";
import GoToLinkUnderlined from "../../components/in-components-reuseable-components/GoToLinkUnderlined";

const imageSource='/images/home-page/banner.jpg'
const CoolBanner = () => {
    const  [isSmallScreen]=useSmallScreen()
    const containerStyle={
        marginTop:'48px',
        display:'flex',
        flexDirection:isSmallScreen?'column':'row',
        justifyContent:isSmallScreen?'start':'center',
        alignItems:isSmallScreen?'center':'start',
    }
    const imageStyle={

        height:isSmallScreen?'367px':'532px',
        width:isSmallScreen?'100%':'720px',
    }
    const contentTextContainerStyle={
        height:isSmallScreen?'auto':'532px',
        width:'100%',
        backgroundColor:'var(--neutral-02)',
    }
    const contentTextWrapperStyle={
        paddingLeft:isSmallScreen?'32px':'72px',
        paddingRight:isSmallScreen?'8px':'196px',
        paddingTop:isSmallScreen?'58px':'172px',
    }

    return(
        <div style={containerStyle}>
            <img style={imageStyle} src={imageSource}  alt={'banner'}/>
            <div style={contentTextContainerStyle}>
                <div className={'d-flex flex-column'} style={contentTextWrapperStyle}>
                    <Text size={16} weight={'Bald'} color={'blue'}>SALE UP TO 35% OFF</Text>
                    <Heading level={4}>HUNDREDS of New lower prices!</Heading>
                    <Text weight={'AverageBold'} size={20} style={{marginBottom:'8px'}}>It’s more affordable than ever to give every room in your home a stylish makeover</Text>
                    <GoToLinkUnderlined link={''}>Shop Now</GoToLinkUnderlined>
                </div>
            </div>
        </div>
    )
}
export default CoolBanner