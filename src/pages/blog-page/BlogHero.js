import useSmallScreen from "../../hooks/useSmallScreen";
import {Heading, Text} from "../../components/in-components-reuseable-components/TypographyComponents";

const BlogHero = () => {
      const [isSmallScreen]=useSmallScreen();
      const smallScreenStyle={
          width: '311px',
          height: '308px',
          background: `url(/images/blog-page/hero.jpg)`,
          backgroundSize:'100%',
          backgroundBlendMode: `multiply, normal`,
          display:'flex',
          flexDirection:'column',
          gap:'column',
          justifyContent:'center',
          alignItems:'center'

      }
    const largeScreenStyle={
        width: '1120px',
        height: '392px',
        // backgroundPosition:'center',
        background: `url(/images/blog-page/hero.jpg)`,
        backgroundSize:'100%',
        backgroundBlendMode: `multiply, normal`,
        display:'flex',
        flexDirection:'column',
        gap:'column',
        justifyContent:'center',
        alignItems:'center'
    }
  return(
      <div className={'container'} style={isSmallScreen?smallScreenStyle:largeScreenStyle}>
          <Heading level={3}>Our Blog</Heading>
          <Text style={{color:'#121212',textAlign:'center'}} size={20} weight={'AverageBald'}>Home ideas and design inspiration</Text>
      </div>
  )
}
export default BlogHero