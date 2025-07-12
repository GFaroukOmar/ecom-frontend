import {ButtonText, Text} from "../../components/in-components-reuseable-components/TypographyComponents"
import TextField from '@mui/material/TextField';
import {useState} from "react";
import useSmallScreen from "../../hooks/useSmallScreen";

const CustomInput = ({label,placeHolder,value,helperText,multiline,onInput}) => {

    return (
        <div>
            <Text style={{marginBottom:'8px'}} size={12} weight={'Bald'}  color={'neutral-04'}>{label}</Text>
            <TextField
                onInput={event=>onInput(event.target.value)}
                style={{width:'100%'}}
                id="standard-multiline-static"
                // label="Multiline"
                // multiline
                value={value}
                // rows={4}
                helperText={helperText}
                multiline={multiline}
                rows={multiline?4:1}
                placeholder={placeHolder}

                // defaultValue="Default Value"
                variant="outlined"
            />
        </div>
    )
}
const Map=()=>{
    const [isSmallScreen]=useSmallScreen()
    return(
        <img width={isSmallScreen?'311px':'548px'} height={isSmallScreen?'311px':'404px'}
            src={'/images/contact-page/map.jpg'}
             alt={'map'} />
    )
}
const InputForm = () => {
    const [isSmallScreen]=useSmallScreen()
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const handleInputChange=(value,setState)=>{
        setState(value)
    }
    const handleSubmit=()=>{}
  return(
      <div className={'container'} style={{display:'flex',flexDirection:isSmallScreen?'column':'row' ,alignItems:'center',gap:'48px',justifyContent:'space-between'}} >
            <div className={'d-flex flex-column'} style={{gap:'24px',width:isSmallScreen?'100%':'50%'}}>
                <CustomInput label={'EMAIL ADDRESS'} onInput={(value)=>handleInputChange(value,setEmail)} value={email} placeHolder={'Your Email'} />
                <CustomInput label={'FULL NAME'} value={email} onInput={(value)=>handleInputChange(value,setName)} placeHolder={'Your Name'} />
                <CustomInput label={'Message'} value={email} onInput={(value)=>handleInputChange(value,setMessage)}  placeHolder={'Your Message'} multiline />
                <div onClick={handleSubmit} className={'d-flex justify-content-center align-items-center'} style={{width:'189px',height:'40px',padding:'6px,40px,6px,40px',backgroundColor:'black',borderRadius:'8px'}}>
                    <ButtonText size={'Small'} className={'mb-0'} color={'neutral-01'}>Send Message</ButtonText>
                </div>
            </div>
          <Map/>
      </div>
  )
}
export default InputForm