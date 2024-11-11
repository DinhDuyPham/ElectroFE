import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Footer from "../../components/User/Footer/Footer";
import Header from "../../components/User/Header/Header";
import Home from "./Home/Home";
import ProductDetail from "./ProductDetail/ProductDetail";
import Checkout from "./Checkout/Checkout";
import Store from "./Store/Store";
import Login from "./Login-Register/Login";
import Register from "./Login-Register/Register";
import Cart from "./Cart/Cart";
import Order from "./Order/Order";
import Blog from "./Blog/Blog";
import BlogDetails from "./Blog/Blogdetails";
import Profile from "./Profile/Profile";
import ContactUs from "./ContactUs/ContactUs";
function User() {
  let location = useLocation();
  const [isUIHidden, setIsUIHidden] = useState(false);

  useEffect(() => {
    if (
      location.pathname.includes("login") ||
      location.pathname.includes("register")
    ) {
      setIsUIHidden(false);
    } else {
      setIsUIHidden(true);
    }
  }, [location.pathname]);

  return (
    <>
      <Header isUIHidden={isUIHidden} />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />}>
          <Route path="?seach=:keyword" element={<Store />} />
          <Route path=":id" element={<Store />} />
        </Route>
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/order" element={<Order />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blogdetails" element={<BlogDetails />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/contactus" element={<ContactUs/>} />
      </Routes>
      {isUIHidden && <Footer />}
    </>
  );
}

export default User;
