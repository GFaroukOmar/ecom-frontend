import  {useEffect, useState} from "react";
import {Small_Screen_Width} from '../Constants'
const smallScreenCheck = () => {
  return(window.innerWidth < Small_Screen_Width)
}
const useSmallScreen=()=>{
    const [isSmallScreen,setIsSmallScreen]=useState(smallScreenCheck())
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(smallScreenCheck())
        }
        window.addEventListener('resize',handleResize)
        return ()=>window.removeEventListener('resize',handleResize)
    }, []);
    return [isSmallScreen]
}
export default useSmallScreen