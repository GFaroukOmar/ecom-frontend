import NavigationBar from "../../components/in-pages-reuseable-components/NavigationBar";
//
import CheckOutProcess from "./CheckOutProcess";
import {useEffect, useState} from "react";
import CheckOutContent from "./CheckOutContent";
import Footer from "../../components/in-pages-reuseable-components/Footer";
import {useClient} from "../../hooks/ClientContext";
const CartPage = () => {
    const [step, setStep] = useState(1)
    const {client}=useClient()
    useEffect(() => {
        if(!client)
            // window.location.href="/login"
        // else if(!client.isConfirmed)
        //     window.location.href="/confirm"
        document.title='cart'
        console.log("client",client)
    }, []);
    return(
        <>
            <NavigationBar/>
            <CheckOutProcess step={step}/>
            <CheckOutContent step={step} setStep={setStep}/>
            <Footer/>
        </>
    )
}
export default CartPage