import {useEffect, useState} from "react";
import {adminRoute, publicRoute} from "../../api";
import {useNotification} from "../../hooks/NotificationContext";
import {redirect, useNavigate} from "react-router-dom";

const ProductCell=({productName,quantity,thumbnail,productId,onDeleteProduct})=>{
    const editProduct=()=>{
        window.location.href=`/admin/edit-product/${productId}`
    }
    return(
        <div className={"card"}>
            <div className={'gap-4 row align-items-center p-4'} >
                <img className={'col-2'}  alt={'product Image'} src={thumbnail}/>

                <h6 align={"center"} className={'col-2'}>{productId}</h6>

                <h6 align={"center"} className={'col-2'}>{productName}</h6>

                <h6 align={"center"} className={'col-2'}>{quantity}</h6>

                <div className={'col-2'}>
                    <button onClick={()=>onDeleteProduct(productId)}>Delete</button>
                    <button onClick={editProduct}>Edit</button>
                </div>
            </div>
        </div>
    )
}
const ProductsManagement=()=>{
    const navigator = useNavigate();

    const createNewProduct = () => {
        window.location.href="/admin"
    };
    const [products, setProducts] = useState([])
    const {addNotification}=useNotification()
    const deleteProduct=async (productId)=>{
        try{
            await adminRoute.delete(`/product/${productId}`)
            addNotification('success',"Product Delete",'Product Deleted successfully')
            setProducts(products.filter(p=>p.productId!==productId))
        }
        catch (e){
            addNotification('error',"Product Delete",e.message)
        }
    }
    useEffect( () => {
        adminRoute.get('/products').then((response)=>setProducts(response.data)).catch(e=>addNotification('error','Can\'t get products',e.message))

    }, []);
    return(
        <div className={"container"}>
            <h1>Manage products</h1>
            <button className={"mb-4 mt-4"} onClick={createNewProduct}>Create New Product</button>
            {/*products table*/}
            <div className={" card"}>
                <div className="row gap-4 p-4">
                    <h6 className="col-2 text-start">Thumbnail</h6>
                    <h6 className="col-2 text-center">Product ID</h6>
                    <h6 className="col-2 text-start">Product Name</h6>
                    <h6 className="col-2 text-center">Stock Quantity</h6>
                    <h6 className="col-2 text-center">Options</h6>
                </div>
                {products.map(p=>{
                    {console.log(p.images.find(i=>i.isMainImage)?.imageUrl)}
                    return (<ProductCell
                        key={p.productId}
                        productName={p.productName}
                        productId={p.productId}
                        quantity={p.quantity}
                        onDeleteProduct={deleteProduct}
                        thumbnail={p.images.find(i=>i.isMainImage)?.imageUrl}
                    />)
                })}
            </div>
        </div>
    )
}
export default ProductsManagement