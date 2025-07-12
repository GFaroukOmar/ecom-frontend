import {ButtonText, Link} from "./TypographyComponents";

const GoToLinkUnderlined =({link,children,onClick})=>{
    const UnderLine=()=>{
        return(
            <div onClick={()=> {
                if (onClick) onClick()
            }} style={{
                borderBottom: '2px solid #000', // Adjust the border style as needed
                display: 'inline-block',
                marginBottom: '5px', // Adjust the spacing between text and underline
                width:'100%'}}>
            </div>)
    }
    return(
        <Link className={"d-flex justify-content-start"} to={link}>
            <div className={"d-inline-flex flex-column"}>
                <ButtonText inline size={"Small"} className={"my-0"}>{children}<svg className={"ms-1"} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.16666 10H15.8333" stroke="#141718" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10.8333 15L15.8333 10" stroke="#141718" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10.8333 5L15.8333 10" stroke="#141718" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                </ButtonText>
                <UnderLine/>
            </div>
        </Link>)
}

export default GoToLinkUnderlined