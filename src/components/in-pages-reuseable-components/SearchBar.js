import React, {useState} from "react";
import {CancelIcon, SearchIcon} from "../in-components-reuseable-components/Icons";
import "../../styles/index.css"

const SearchBar=()=>{
    const [input,setInput]=useState("")
    const [inputWidth, setInputWidth] = useState("0")
    const search=()=>{
        if (input.length===0){
            return;
        }
        console.log("do the search")
    }
    const handleKeyPress = (e) => {
        // Check if the pressed key is Enter
        if (e.key === 'Enter') {
            search()
        }
    };
    return(
        <div className={"search-bar d-flex px-1 justify-content-center align-items-center"}
        onMouseEnter={()=>setInputWidth("120px")}>
            <input onKeyDown={handleKeyPress} style={{width:inputWidth}} placeholder={"Search..."}  value={input} onChange={(e)=>setInput(e.target.value)}/>
            <div className={"pointer-cursor"} onClick={()=>{
                setInputWidth("0");setInput("")}} style={{display: inputWidth==="0"?"none":"block"}}><CancelIcon/></div>
            <div className={"pointer-cursor"}  onClick={()=>{search();setInputWidth("120px")}}><SearchIcon/></div>
        </div>
    )
}
export default SearchBar