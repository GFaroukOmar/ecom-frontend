import useSmallScreen from "../../hooks/useSmallScreen";
import {Heading, Text} from "../../components/in-components-reuseable-components/TypographyComponents";

const ContactHero = () => {
    const [isSmallScreen]= useSmallScreen()
    const text='Our features timeless furniture, with natural fabrics, curved lines, plenty of mirrors and classic design, which can be incorporated into any decor project. The pieces enchant for their sobriety, to last for generations, faithful to the shapes of each period, with a touch of the present'
    const title='We believe in sustainable decor. We’re passionate about life at home.'
  return(
      <div className={'container'} style={{marginTop:'80px'}}>
          {isSmallScreen?
              <Heading style={{width:'311px'}} level={6}>
                  {title}
              </Heading>:
              <Heading level={3} style={{width:'843px'}}>
                  {title}
              </Heading>}
          <Text size={16} style={{width:isSmallScreen?'312px':'834px'}}>{text}</Text>

      </div>
  )
}
export default ContactHero
