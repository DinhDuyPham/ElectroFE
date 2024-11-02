import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../../components/Admin/Header/Header";
import SideBar from "../../components/Admin/SideBar/SideBar";

import HomeAdmin from "./Home/Home";
import Product from "./Product/Product";
import ProductAdd from "./Product/ProductAdd";
import ProductEdit from "./Product/ProductEdit";
import Category from "./Category/Category";
import CategoryAdd from "./Category/CategoryAdd";
import CategoryEdit from "./Category/CategoryEdit";
import Login from "./Login/Login";
import Order from "./Order/Order";
import OrderDetail from "./Order/OrderDetail";
import Revenue from "./Revenue/Revenue";
import Blog from "../Admin/Blog/Blog";

function Admin() {
  const navigate = useNavigate();
  const user = Cookies.get("user");

  useEffect(() => {
    if (!user) {
      navigate("/admin/login");
    }
  }, [navigate, user]);

  if (location.pathname.includes("/login") && !user) {
    return (
      <>
        <Routes>
          <Route path="/admin/login" element={<Login />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <SideBar />
      <div className="main-content">
        <Header />
        <div className="block-content">
          <Routes>
            <Route path="/admin" element={<HomeAdmin />} />
            <Route path="/admin/category" element={<Category />} />
            <Route path="/admin/category/add" element={<CategoryAdd />} />
            <Route
              path="/admin/category/update/:id"
              element={<CategoryEdit />}
            />
            <Route path="/admin/product" element={<Product />} />
            <Route path="/admin/product/add" element={<ProductAdd />} />
            <Route path="/admin/product/update/:id" element={<ProductEdit/>}/>
            <Route path="/admin/order" element={<Order />} />
            <Route path="/admin/order/:orderId" element={<OrderDetail/>}/>
            <Route path="/admin/revenue" element={<Revenue />} />
            <Route path="/admin/blog" element={<Blog/>} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Admin;
