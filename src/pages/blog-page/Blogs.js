import {Heading,} from "../../components/in-components-reuseable-components/TypographyComponents";
import useSmallScreen from "../../hooks/useSmallScreen";
import {Small_Screen_Width} from "../../Constants";
import {useEffect, useState} from "react";
// import useSmallScreen from "../../hooks/useSmallScreen";
const BlogCard = ({title,img,publishDate}) => {
    const [isSmallScreen]=useSmallScreen()
    // const style={
    // }
  return(
      <div className={'d-flex flex-column'} style={{gap:'24px'}}>
          <img alt={'blog'} src={img} height={isSmallScreen?'238px':'325px'} width={isSmallScreen?'312px':'357px'} />
          <div className={'d-flex flex-column'} style={{gap:'8px',marginBottom:isSmallScreen?'0':'40px'}}>
              <Heading style={{width:isSmallScreen?'312px':'357px'}} level={7}>{title}</Heading>
              {publishDate}
          </div>

      </div>
  )
}
const blogs=[
    {img:'/images/blog-page/blog1.jpg',title:'7 ways to decor your home like a professional',publishDate:'October 16, 2023'},
    {img:'/images/blog-page/blog2.jpg',title:'Inside a beautiful kitchen organization',publishDate:'October 16, 2023'},
    {img:'/images/blog-page/blog3.jpg',title:'Decor your bedroom for your children',publishDate:'October 16, 2023'},
    {img:'/images/blog-page/blog4.jpg',title:'Modern texas home is beautiful and completely kid-friendly',publishDate:'October 16, 2023'},
    {img:'/images/blog-page/blog5.jpg',title:'Modern texas home is beautiful and completely kid-friendly',publishDate:'October 16, 2023'},
    {img:'/images/blog-page/blog6.jpg',title:'Modern texas home is beautiful and completely kid-friendly',publishDate:'October 16, 2023'},
    {img:'/images/blog-page/blog7.jpg',title:'Modern texas home is beautiful and completely kid-friendly',publishDate:'October 16, 2023'},
    {img:'/images/blog-page/blog8.jpg',title:'Modern texas home is beautiful and completely kid-friendly',publishDate:'October 16, 2023'},
    {img:'/images/blog-page/blog9.jpg',title:'Modern texas home is beautiful and completely kid-friendly',publishDate:'October 16, 2023'},

]
const Blogs = () => {


        const [isSmallScreen,setIsSmallScreen]=useState(window.innerWidth < 992)
        useEffect(() => {
            const handleResize = () => {
                setIsSmallScreen(window.innerWidth < 992)
            }
            window.addEventListener('resize',handleResize)
            return ()=>window.removeEventListener('resize',handleResize)
        }, []);


  return(
      <div className={'container mt-5'}>
            <Heading style={{marginBottom:'32px'}} level={5}>Blogs</Heading>
            <div style={{display:'flex' ,flexWrap:'wrap',justifyContent:isSmallScreen?'center':'space-between'}} className={'d-flex flex-wrap'}>
                {
                    blogs.map((blog)=> {
                    return (<BlogCard title={blog.title}  img={blog.img} publishDate={blog.publishDate} />)
                })}
            </div>
      </div>
  )
}
export default Blogs