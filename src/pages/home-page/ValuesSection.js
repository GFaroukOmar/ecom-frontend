import useSmallScreen from "../../hooks/useSmallScreen";
import {Heading, Text} from "../../components/in-components-reuseable-components/TypographyComponents";
import {DeliveryIcon, LockIcon, PaymentMethodIcon, PhoneIcon,} from "../../components/in-components-reuseable-components/Icons";

const ValueCard = ({icon:Icon,title,description}) => {
    const [isSmallScreen]=useSmallScreen()
    const valueCardStyle={
        backgroundColor:`var(--neutral-02)`,
        padding:isSmallScreen?'32px 16px':'48px 32px',
        display:'inline-flex',
        flexDirection:'column',
    }
    return(
        <div  style={valueCardStyle}>
            <Icon height={32} width={32}/>
            <Heading level={7}>{title}</Heading>
            <Text size={14} color={'neutral-05'}>{description}</Text>
        </div>
    )
}
const ValuesSection = () => {
  return(
      <div className={'container d-flex flex-wrap justify-content-center'} style={{gap:'24px',marginTop:'48px'}}>
        <div className={'d-flex'} style={{gap:'24px'}}>
            <ValueCard title={'Free Shipping'} description={'order above $200'} icon={DeliveryIcon}/>
            <ValueCard title={'Money Back'} description={'30 days Guarantee'} icon={PaymentMethodIcon}/>
        </div>
        <div className={'d-flex'} style={{gap:'24px'}}>
            <ValueCard title={'Secure Payment'} description={'Secured by Stripe'} icon={LockIcon}/>
            <ValueCard title={'24/7 support'} description={'Phone and Email Support'} icon={PhoneIcon}/>
        </div>
      </div>
  )
}
export default ValuesSection