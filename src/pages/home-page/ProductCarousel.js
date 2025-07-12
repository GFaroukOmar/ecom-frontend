import {Heading} from "../../components/in-components-reuseable-components/TypographyComponents";
import ProductCard from "../../components/product-cards/ProductCard";
import GoToLinkUnderlined from "../../components/in-components-reuseable-components/GoToLinkUnderlined";
import {useEffect, useState} from "react";
import {publicRoute} from "../../api";


//fetch api get data
const productsS=[
    {price :290,discountPrice:300,badges:[{backgroundColor:'white',badgeName:"New"}] ,category:'living room',stockQuantity:10,productId:1,name:'Closet',isNew:true,discount:50,rating:5,originalPrice:400,priceAfterDiscount:200,color:'black',mainImage:'/images/products/closet.jpg',isFavorite:false,images:['/images/products/tray-table/tray-table-1','/images/products/tray-table/tray-table-2','/images/products/tray-table/tray-table-3','/images/products/tray-table/tray-table-4']},
    {category:'living room',stockQuantity:10,productId:2,name:'Table Lamp',isNew:true,discount:0,rating:5,originalPrice:400,priceAfterDiscount:200,color:'default',mainImage:'/images/products/lamp-short.jpg',isFavorite: false},
    {category:'living room',stockQuantity:10,productId:3,name:'Beige Lamp',isNew:false,discount:20,rating:5,originalPrice:400,priceAfterDiscount:200,color:'default',mainImage:'/images/products/lamp-middle.jpg',isFavorite: false},
    {category:'living room',stockQuantity:10,productId:4,name:'LoveSeat Sofa',isNew:false,discount:20,rating:5,originalPrice:400,priceAfterDiscount:200,color:'default',mainImage:'/images/products/holder.jpg',isFavorite: false},
    {category:'living room',stockQuantity:10,productId:5,name:'LoveSeat Sofa',isNew:false,discount:20,rating:5,originalPrice:400,priceAfterDiscount:200,color:'default',mainImage:'/images/products/toast.jpg',isFavorite: false},
    {category:'living room',stockQuantity:10,productId:6,name:'LoveSeat Sofa',isNew:false,discount:20,rating:5,originalPrice:400,priceAfterDiscount:200,color:'default',mainImage:'/images/products/table-black.jpg',isFavorite: false},
]
const ProductCarousel = ({title=""}) =>{
    const carouselProductsNumber=8
    const [response, setResponse] = useState(null)
    const [products, setProducts] = useState(null)
    useEffect(async() => {
        try {
            let x = await publicRoute.get('/products')
            setResponse(x.data)
            setProducts(x.data)
        }
        catch (e){console.log(e)}
    }, []);


    if (!products)
        return (<></>)
  return(
      <div style={{marginTop:'48px'}} className={'container'}>
          <div className={'d-flex justify-content-between'}>
              <Heading className={'LittleBald'}  level={4} > {title} </Heading>
              {/*<h1>{response?JSON.stringify(response):"still fetching"}</h1>*/}
              <div className={'align-self-center'}><GoToLinkUnderlined link={`/shop`}>More Products</GoToLinkUnderlined></div>
          </div>
          <div className={'d-flex gap-3 overflow-x-scroll h-auto mb-3 custom-horizontal-scroll'} >
              { products.map(p=><div className={'mb-3'}>
                  <ProductCard
                      // productName={p.productName}
                      product={p}
                        productId={p.productId}
                      {...p}

                  ></ProductCard>
              </div>)}
          </div>
  </div>)
}
export default ProductCarousel