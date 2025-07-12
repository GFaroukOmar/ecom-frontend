import {Heading} from "../../components/in-components-reuseable-components/TypographyComponents";
import useSmallScreen from "../../hooks/useSmallScreen";
import {Text} from '../../components/in-components-reuseable-components/TypographyComponents'
import {EmailIcon, PhoneIcon, StoreOutlineIcon} from "../../components/in-components-reuseable-components/Icons";
const ContactDetailCard=({icon:Icon,title,info})=>{
    return(
        <div className={'d-inline-flex flex-column justify-content-center align-items-center'} style={{padding:'16px 32px 16px 32px',backgroundColor:'var(--neutral-02)',}}>
            <div style={{marginBottom:'16px'}}><Icon/></div>
            <div className={'d-flex flex-column justify-content-center align-items-center'} style={{width:'293px', gap:'8px'}}>
                <Text size={16} weight={'Bald'} color={'neutral-04'}>{title}</Text>
                <Text size={16} weight={'SemiBald'}>{info}</Text>
            </div>
        </div>
    )
}
const ContactDetails = () => {
     const [isSmallScreen]=useSmallScreen()
 return(
     <div className={'container'} style={{marginBottom:'48px',marginTop:'48px'}}>
         <div className={'w-100 mb-3 d-flex justify-content-center'}>
             <Heading level={isSmallScreen?7:4}>Contact Us</Heading>
         </div>
         <div className={'justify-content-center'} style={{display:'flex',flexDirection:isSmallScreen?'column':'row',gap:'24px'}}>
             <ContactDetailCard icon={PhoneIcon} title={'Contact Us'} info={'+84 234 567 890\n'}/>
             <ContactDetailCard icon={EmailIcon} title={'EMAIl'} info={'faroukomarguidoum@gmail.com'}/>
             <ContactDetailCard icon={StoreOutlineIcon} title={'ADDRESS'} info={'Somme where in the world'} />
         </div>
     </div>
 )
}
export default ContactDetails