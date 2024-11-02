import Navbar from "../../../components/User/Navbar/Navbar";

import { Link } from "react-router-dom";
import shop1 from "../../../assets/images/shop01.png";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Product from "../../../components/User/Product/Products";
import "./ExploreMenu.css";
import menu_1 from "../../../assets/images/menu_1.png";
import menu_2 from "../../../assets/images/menu_2.png";
import menu_3 from "../../../assets/images/menu_3.png";
import menu_4 from "../../../assets/images/menu_4.png";
import menu_5 from "../../../assets/images/menu_5.png";
import menu_6 from "../../../assets/images/menu_6.png";
import menu_7 from "../../../assets/images/menu_7.png";
import menu_8 from "../../../assets/images/menu_8.png";
import slider1 from "../../../assets/images/1.png";
import slider2 from "../../../assets/images/2.png";
import slider3 from "../../../assets/images/3.png";
import SliderComponent from "../SliderComponent/SliderComponent";


const menu_list = [
  {
    menu_name: "Body Care",
    menu_image: menu_1,
  },
  {
    menu_name: "Skincare",
    menu_image: menu_2,
  },
  {
    menu_name: "Moisturizers",
    menu_image: menu_3,
  },
  {
    menu_name: "Whitening",
    menu_image: menu_4,
  },
  {
    menu_name: "Fragrance and Body Mist",
    menu_image: menu_5,
  },
  {
    menu_name: "Lips",
    menu_image: menu_6,
  },
  {
    menu_name: "Exfoliants",
    menu_image: menu_7,
  },
  {
    menu_name: "Makeup",
    menu_image: menu_8,
  },
];

function Home({ category, setCategory }) {
  const a = [1, 2, 3];
  
  return (
    <>

      
      <SliderComponent arrImages={[slider1, slider2, slider3]} />
      <div className="exploreMenu">
      <div className="explore-menu" id="explore-menu">
        
        <div className="explore-menu-list">
          {menu_list.map((item, index) => (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className={`explore-menu-list-item ${
                category === item.menu_name ? "active" : ""
              }`}
            >
              <img
                src={item.menu_image}
                alt=""
                className={`explore-menu-item-image ${
                  category === item.menu_name ? "active" : ""
                }`}
              />
              <p>{item.menu_name}</p>
            </div>
          ))}
        </div>
        <hr />
      </div>
      </div>
      {/* New product */}
      <Product title={"Sản phẩm mới nhất"} type={"new-product"} />

      <div id="hot-deal">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="hot-deal">
                <h2 className="text-uppercase">Các ưu đãi tuần này</h2>
                <p>Các mặt hàng giảm giá lên đến 10%</p>
                <Link className="primary-btn cta-btn" to="/store">
                  Đến cửa hàng
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Selling */}
      <Product title={"Sản phẩm bán chạy"} type={"top-selling"} />
    </>
  );
}

export default Home;
