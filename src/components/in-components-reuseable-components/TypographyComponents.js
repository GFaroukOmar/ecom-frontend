// TypographyComponents.js
import React, {useState} from 'react';
import '../../styles/Typography.css';
import PropTypes from 'prop-types';
import '../../styles/Colors.css'
import {Link as RouteLink} from 'react-router-dom'

const getColorVariable = (color) => `var(--${color})`;

const Hero = ({ children, color = 'primary' }) => (
    <div style={{ color: getColorVariable(color) }} className="Hero">
        {children}
    </div>
);

const Heading = ({ style={},className='', level=6, children, color = 'primary' }) => {
    const Tag = `h${level}`;
    return (
        <Tag style={{ color: getColorVariable(color),...style }} className={`H${level} ${className}`}>
            {children}
        </Tag>
    );
};

const Link=({ className='', size="16", children, color = 'primary',to="/"})=>{
    const [LinkColor, setLinkColor] = useState(color)
    return(
        <div onClick={()=>window.location.href=to}  onMouseEnter={()=>setLinkColor("primary")} onMouseLeave={()=>setLinkColor(color)} style={{textAlign:'center', color: getColorVariable(LinkColor),textDecoration:'none',cursor:"pointer"}} className={`Text${size} ${className}`} to={to}>
            {children}
        </div>
    )
}
const ButtonText = ({ size, children, color = 'primary',className='', inline=false}) => (
    <p  style={{ color: getColorVariable(color) }} className={`Button${size} ${className} ${inline?'d-inline-block':''}`}>
        {children}
    </p>
);

const ColoredSpan=({children,color="neutral-04",style={},className=''})=>{
    return (<span style={{color:getColorVariable(color),...style}} className={className}>{children}</span>)
}
const Text = ({style={},className='', size=26, children, color = 'primary',weight="medium" }) => (
    <div style={{ color: getColorVariable(color),...style }} className={`Text${size} ${className} ${weight}`}>
        {children}
    </div>
);

Hero.propTypes = {
    children: PropTypes.node.isRequired,
    color: PropTypes.string,
};

Heading.propTypes = {
    level: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
    color: PropTypes.string,
};

ButtonText.propTypes = {
    size: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    color: PropTypes.string,
};

Text.propTypes = {
    children: PropTypes.node.isRequired,
    color: PropTypes.string,
};

export { Hero, Heading, ButtonText, Text ,Link,ColoredSpan};
