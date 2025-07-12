const Badge = ({children,textColor='black',backgroundColor='white',size='medium'}) => {
    const style={
        display: 'inline-flex',
        padding: size==='large'?'8px 19px':'4px 14px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        borderRadius:'8px',
        fontSize:size==='large'?'18px':'16px',
        fontWeight: 700,
        textTransform:'uppercase',
        height:children?'auto':size==='large'?'34px':'24px',
        backgroundColor:!children?'transparent':backgroundColor,
        textColor,
        color:textColor
    }
    return(
        <div className={'pointer-cursor scalable-icon'} style={style}>
            {children?children:<div></div>}
        </div>
    )
}
export default Badge