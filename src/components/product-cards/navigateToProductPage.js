import {useLocation, useNavigate} from "react-router-dom";


const NavigateToProductPage = (product) => {
    const navigate = useNavigate();
    const location = useLocation();
    const newPath = `/shop/${product.category}/${product.productId}/`;
    // Use the state property to force a rerender of the current route
    navigate(newPath, { state: { key: location.key + 1 } });
    window.scrollTo(0, 0);
};
const navigateToProductPage=(product)=>{
    return NavigateToProductPage(product)
}
export default navigateToProductPage