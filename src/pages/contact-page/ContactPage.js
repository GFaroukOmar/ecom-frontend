import NavigationBar from "../../components/in-pages-reuseable-components/NavigationBar";
import ContactHero from "./ContactHero";
import CoolBanner from "../home-page/CoolBanner";
import Footer from "../../components/in-pages-reuseable-components/Footer";
import ContactDetails from "./ContactDetails";
import NewsLetter from "../../components/in-pages-reuseable-components/NewsLetter";
import InputForm from "./InputForm";
import {useEffect} from "react";

const ContactPage = () => {
    useEffect(() => {
        document.title='contact us'
    }, []);
  return (
      <>
          <NavigationBar activePage={"contact"}/>
          <ContactHero/>
          <div className={'container'}>
              <CoolBanner/>
          </div>
          <ContactDetails/>
          <InputForm/>
          <NewsLetter/>
          <Footer/>

      </>
  )
}
export default ContactPage