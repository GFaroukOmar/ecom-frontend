import {Heading, Text} from "../../components/in-components-reuseable-components/TypographyComponents";
import useSmallScreen from "../../hooks/useSmallScreen";
import {CheckIcon} from "../../components/in-components-reuseable-components/Icons";


const CheckOutProcess = ({step}) => {
    const [isSmallScreen]=useSmallScreen()
    const title=step===1?'Cart':step===2?'Check Out':'Complete!'
    if (isSmallScreen) return (
        <div style={{gap:24}} className={'container justify-content-center align-items-center d-flex flex-column'}>
            <Heading level={isSmallScreen?4:3}>{title}</Heading>
            <div className={'d-flex'} style={{gap:'32px'}}>
                {step ===1 && <SmallScreenStepper step={1} current={step===1} text={'Shopping cart'} />}
                {(step <3)  && <SmallScreenStepper step={2} current={step===2} text={'Checkout details'} />}
                {step>1 && <SmallScreenStepper step={3} current={step===3} text={'Order complete'} />}
            </div>
        </div>

    )
  return(
      <div style={{gap:48}} className={'container justify-content-center align-items-center d-flex flex-column'}>
          <Heading level={3}>{title}</Heading>
          <div className={'d-flex'} style={{gap:'32px'}}>
              <Stepper success={step>1} current={step===1} step={1} text={'Shopping Cart'}/>
              <Stepper success={step>2} current={step===2} step={2} text={'Checkout Details'}/>
              <Stepper current={step===3} step={3} text={'Order Complete'}/>
          </div>
      </div>
  )
}
const SmallScreenStepper=({current,step,text})=>{
    const circle = {
        display: 'inline-flex',
        padding: '8px 17px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '10px',
        borderRadius: '50%',
        background: current?'#23262F':'#B1B5C3',
    };
    const divStyle={
        width: current?'256px':'auto',
        borderBottom: current? '2px solid #141718':'none',
    }
    return(
        <div style={divStyle}>
            <div style={circle}>
                <Text size={16} color={'neutral-01'} weight={'SemiBald'}>{step}</Text>
            </div>
            {current && <Text size={16} weight={'SemiBald'} >{text}</Text>}
        </div>
    )
}
const Stepper=({step,current,success,text})=>{
    const circle = {
        display: 'inline-flex',
        padding: '8px 17px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '10px',
        borderRadius: '50%',
        background: success?'var(--green)':'var(--neutrals-2, #23262F)',
    };
    const divStyle = {
        display: 'flex',
        width: '256px',
        paddingBottom: '26px',
        alignItems: 'center',
        gap: '24px',
        borderBottom: current?'2px solid var(--neutral-07100, #141718)':success?'2px solid var(--green)':'none',
    };


    return(
        <div style={divStyle}>
        <div style={circle}>
            <Text size={16} color={'neutral-01'} weight={'SemiBald'}>{success?<CheckIcon/>: step}</Text>
        </div>
        <Text size={16} weight={'SemiBald'} color={success&&'green'}>{text}</Text>
</div>
    )
}
export default CheckOutProcess