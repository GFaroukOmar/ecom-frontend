import {Heading, Text} from "../../components/in-components-reuseable-components/TypographyComponents";

const ShopHeroSection = () => {
    const backgroundImage = {
        background: `linear-gradient(
            180deg,rgba(243, 245, 247, 0.00) 27.68%,
            rgba(243, 245, 247, 0.60) 66.63%,
            rgba(243, 245, 247, 0.20) 100%)`,
        backgroundImage: `url('/images/shop-page/shop-page.jpg')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll', // You can adjust this based on your preference
        backgroundColor: 'lightgray',
        backgroundBlendMode :'normal, multiply, normal'
    };

    const heroStyle={
        ...backgroundImage,
        width:'100%',
        height:'392px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundImage: `url(/images/shop-page/shop-page.jpg)`,
        backgroundColor: '#lightgray',
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply, normal',
        backgroundRepeat:'no-repeat',
        backgroundPosition:'center'
    }
  return(
      <div class={'container'} style={heroStyle}>
            <div className={'d-flex flex-column justify-content-center align-items-center'}>
                <Heading level={3}>Shop Page</Heading>
                <Text style={{color:'#121212'}} size={20} weight={'AverageBald'}>Let’s design the place you always imagined.</Text>
            </div>
      </div>
  )
}
export default ShopHeroSection