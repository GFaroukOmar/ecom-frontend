import NavigationBar from "../../components/in-pages-reuseable-components/NavigationBar";
import BlogHero from "./BlogHero";
import NewsLetter from "../../components/in-pages-reuseable-components/NewsLetter";
import Footer from "../../components/in-pages-reuseable-components/Footer";
import Blogs from "./Blogs";
import {useEffect} from "react";

const BlogPage= () => {
    useEffect(() => {
        document.title='blogs'
    }, []);
    return(
        <>
            <NavigationBar activePage={'blog'}/>
            <BlogHero/>
            <Blogs/>
            <NewsLetter/>
            <Footer/>
      </>
  )
}
export default BlogPage