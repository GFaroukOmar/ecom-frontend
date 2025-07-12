import {ColoredSpan, Link, Text} from "../in-components-reuseable-components/TypographyComponents";
import React from "react";
import {FacebookIcon, InstagramIcon, YoutubeIcon} from "../in-components-reuseable-components/Icons";
import useSmallScreen from "../../hooks/useSmallScreen";
const LargeScreenFooter=()=> {
    const footerContainerStyle={
        width:'100%',
        backgroundColor:'black',
        padding:'80px 160px 32px 160px'
    }
    const emptyDivStyle={
        height:'50px',
        width:100,
    }
    return (
        <div style={footerContainerStyle}>
            <div className={'d-flex align-items-center justify-content-between'}>
                <div className={'d-flex align-items-center'}>
                    <Text color={'neutral-01'} size={24} weight={'SemiBald'}>3legant<ColoredSpan>.</ColoredSpan></Text>
                    <div style={{height:'24px',width:'1px',border:'solid var(--neutral-04) 1px',marginLeft:'32px',marginRight:'32px'}}></div>
                    <Text  color={'neutral-01'} size={14} weight={'AverageBald'}>Gift & Decoration Store</Text>
                </div>
                <ul className={"d-flex  mb-0 list-unstyled gap-4"}>
                    <li><Link to={"/home"}><Text size={14} weight={'AverageBald'} color={'neutral-01'}>Home</Text></Link></li>
                    <li><Link to={"/home"}><Text size={14} weight={'AverageBald'} color={'neutral-01'}>Shop</Text></Link></li>
                    <li><Link to={"/home"}><Text size={14} weight={'AverageBald'} color={'neutral-01'}>Product</Text></Link></li>
                    <li><Link to={"/home"}><Text size={14} weight={'AverageBald'} color={'neutral-01'}>Blog</Text></Link></li>
                    <li><Link to={"/home"}><Text size={14} weight={'AverageBald'} color={'neutral-01'}>Contact Us</Text></Link></li>
                </ul>
            </div>

            <div style={emptyDivStyle}></div>

            <div className={'d-flex align-items-center justify-content-between'}>
                <div className={'d-flex align-items-center'} style={{gap: '28px'}}>
                    <Text color={'neutral-01'} size={12} weight={'AverageBald'}>Copyright © 2023 3legant. All rights
                        reserved</Text>
                    <Text color={'neutral-01'} size={12} weight={'SemiBald'}>Privacy Policy</Text>
                    <Text color={'neutral-01'} size={12} weight={'SemiBald'}>Terms Of Use</Text>
                </div>
                <ul className={"d-flex  mb-0 list-unstyled gap-4"}>
                    <li><InstagramIcon color={'white'}/></li>
                    <li><FacebookIcon color={'white'}/></li>
                    <li><YoutubeIcon color={'white'}/></li>

                </ul>
            </div>

        </div>
    )
}
const SmallScreenFooter=()=>{
    const footerContainerStyle={
        padding: '48px 32px 48px 32px',
        background:'var(--primary)',
        display:'flex',
        flexDirection:'column',
        gap:'40px'
    }
    return (
        <div style={footerContainerStyle}>
            <div className={'d-flex flex-column align-items-center'} style={{gap:'16px'}}>
                <Text size={24} weight={'LittleBald'} color={'neutral-01'}>3legant<ColoredSpan>.</ColoredSpan></Text>
                <div style={{width:'24px',height:'1px',border:'solid var(--neutral-04)'}}></div>
                <Text size={14} weight={'AverageBald'} color={'neutral-01'}>Gift & Decoration Store</Text>
            </div>
            <div>
                <ul className={"d-flex align-items-center mb-0 list-unstyled gap-4 flex-column"}>
                    <li><Link to={"/home"}><Text size={14} weight={'AverageBald'} color={'neutral-01'}>Home</Text></Link></li>
                    <li><Link to={"/home"}><Text size={14} weight={'AverageBald'} color={'neutral-01'}>Shop</Text></Link></li>
                    <li><Link to={"/home"}><Text size={14} weight={'AverageBald'} color={'neutral-01'}>Product</Text></Link></li>
                    <li><Link to={"/home"}><Text size={14} weight={'AverageBald'} color={'neutral-01'}>Blog</Text></Link></li>
                    <li><Link to={"/home"}><Text size={14} weight={'AverageBald'} color={'neutral-01'}>Contact Us</Text></Link></li>

                </ul>
            </div>
            <div className={'d-flex flex-column'} style={{gap:'28px',borderTop:'solid var(--neutral-04)',padding:'24px 0 24px 0'}}>
                <div className={'d-flex justify-content-center'} style={{gap:'24px'}}>
                    <InstagramIcon color={'white'}/>
                    <FacebookIcon color={'white'}/>
                    <YoutubeIcon color={'white'}/>
                </div>
                <div className={'d-flex justify-content-center'} style={{gap:'28px',marginTop:'4px'}}>
                    <Text color={'neutral-01'} size={14} weight={'SemiBald'}>Privacy Policy</Text>
                    <Text color={'neutral-01'} size={14} weight={'SemiBald'}>Terms of Use</Text>
                </div>
                <div className={'d-flex justify-content-center'}>
                    <Text size={12} weight={'AverageBald'} color={'neutral-01'}>Copyright © 2023 3legant. All rights reserved</Text>
                </div>
            </div>
        </div>
    )
}
const Footer = () => {
    const [isSmallScreen]=useSmallScreen()
    if(isSmallScreen)return <SmallScreenFooter/>
    else return <LargeScreenFooter/>
}
export default Footer