import React from "react";
import HomePage from "./pages/home-page/HomePage";
import {Route, Routes} from "react-router-dom";
import ShopPage from "./pages/shop-page/ShopPage";

import BlogPage from "./pages/blog-page/BlogPage";
import ContactPage from "./pages/contact-page/ContactPage";
import CartPage from "./pages/cart-page/CartPage";
import CreateNewProduct from "./pages/admin/CreateNewProduct";


import ProductsManagement from "./pages/admin/ProductsManagement";
import EditProduct from "./pages/admin/EditProduct";
import RegistrationForm from "./pages/client/Register";
import ConfirmAccount from "./pages/client/ConfirmAccount";
import LoginForm from "./pages/client/LogIn";
import ProductPage2 from "./pages/product-page-v2/ProductPage2";
import CreateEditProduct from "./pages/admin/CreateNewProduct";
import ProductPage from "./pages/product-page/ProductPage";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path={"/"} element={<HomePage/>}></Route>
          <Route path={"/shop"} element={<ShopPage/>}></Route>
          <Route path={"/shop/product/:productId"} element={<ProductPage/>}/>
          {/*<Route path={"/shop/product/:productId"} element={<ProductPage2/>}/>*/}
          <Route path={"/blog"} element={<BlogPage/>}/>
          <Route path={"/contact-us"} element={<ContactPage/>}/>
          <Route path={"/cart"} element={<CartPage/>}/>
          <Route path={"/admin"} element={<CreateEditProduct mode={"create"}/>}/>
          <Route path={"/admin/edit-product/:productId"} element={<CreateEditProduct mode={"edit"}/>}/>
          <Route path={"/admin/products"} element={<ProductsManagement/>}/>
          <Route path={"/register"} element={<RegistrationForm/>}/>
          <Route path={"/login"} element={<LoginForm/>}/>
          <Route path={"/confirm"} element={<ConfirmAccount/>}/>


      </Routes>
    </div>
  );
}

export default App;
