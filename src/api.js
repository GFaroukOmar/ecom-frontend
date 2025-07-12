import axios, {isCancel, AxiosError} from 'axios';
import {useClient} from "./hooks/ClientContext";

const publicRoute = axios.create({
    baseURL: 'http://localhost:8000/api/public',
    timeout: 3000,
});
const adminRoute = axios.create({
    baseURL: 'http://localhost:8000/api/admin',
    timeout: 3000,
});

const authRoute=
    axios.create({
        baseURL: 'http://localhost:8000/api/auth',
        timeout: 3000,
    });
const clientRoute = (token) => {
    console.log("token from clientRoute function",token)
    return axios.create({
        headers: {
            Authorization:token
        },
        baseURL: "http://localhost:8000/api/client",
        timeout: 3000,
    });
};

async function uploadProductImage(blobUrl, isMainImage, productId) {

        // Fetch the file from the blob URL
        const response = await fetch(blobUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch blob: ${response.statusText}`);
        }
        const blob = await response.blob();

        // Create a FormData object
        const formData = new FormData();
        formData.append("image", blob, "product-image.jpg"); // Ensure a valid filename

        // Construct the API URL with query parameters
        const apiUrl = `http://127.0.0.1:8000/api/admin/images/product?product_id=${productId}&is_main_image=${isMainImage}`;

        // Make the API call
        return await fetch(apiUrl, {
            method: "POST",
            body: formData,
            headers: {
                // The browser sets `Content-Type` automatically for FormData
                Accept: "application/json",
            },
        }).catch(e=> {
            throw e
        });

}

async function uploadVariationImage(imageUrl, variationId) {


        // Fetch the file from the URL
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
        const blob = await response.blob();

        // Create a FormData object
        const formData = new FormData();
        formData.append("image", blob, "variation-image.jpg"); // Add image with a valid filename

        // Construct the API URL with the query parameter
        const apiUrl = `http://127.0.0.1:8000/api/admin/images/product-variation?variation_id=${variationId}`;

        // Make the API call
        return await fetch(apiUrl, {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json", // Explicitly state the expected response type
            },
        }).catch((e)=> {
            throw (e)
        });


}



const publicGetProductById=(id)=>{
    try{
        let result =  publicRoute.get(`http://127.0.0.1:8000/api/public/product/${id}`)
        return result[result]
    }
    catch (e){
        console.error(e)
    }
}
export {authRoute,publicRoute,publicGetProductById,adminRoute,uploadProductImage,uploadVariationImage,clientRoute}