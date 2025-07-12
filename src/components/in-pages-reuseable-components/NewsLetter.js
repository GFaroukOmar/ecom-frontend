import useSmallScreen from "../../hooks/useSmallScreen";
import {Heading, Link, Text} from "../in-components-reuseable-components/TypographyComponents";
import {InputAdornment, TextField} from "@mui/material";
import {EmailIcon} from "../in-components-reuseable-components/Icons";
import React from "react";

const NewsLetter = () => {
    const [isSmallScreen]=useSmallScreen()
  const containerStyle={
        marginTop:'48px',
        background:isSmallScreen?'lightgray':'url(/images/home-page/news-letter.png)',
        padding:isSmallScreen?'95px 32px 95px 32px':'0',
        backgroundSize:'100%', backgroundRepeat:'no-repeat',
        height:'318px',
        width:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
  }
    return(
        <div style={containerStyle}>
            <Heading level={4}>Join Our News Letter</Heading>
            <Text size={18}>Sign up for deals, new products and promotions</Text>
            <TextField
                id="input-with-icon-textfield" placeholder={'faroukomarguidoum@gmail.com'}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <EmailIcon/>
                        </InputAdornment>
                    ),
                    endAdornment:(<InputAdornment position="end">
                        <div><Link to={'/articles'} color={'neutral-04'}>Sign up</Link></div>
                    </InputAdornment>)
                }}
                variant="standard"
            />
        </div>
  )
}
export default NewsLetter