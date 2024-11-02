import { Link } from "react-router-dom";

import { FaBox, FaChartPie, FaHome, FaShoppingCart } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";

const mennus = [
  {
    url: "/admin",
    icon: <FaHome size={24} />,
    name: "Trang chủ",
  },
  {
    url: "/admin/order",
    icon: <FaShoppingCart size={24} />,
    name: "Đơn hàng",
  },
  {
    url: "/admin/category",
    icon: <BiSolidCategoryAlt size={24} />,
    name: "Danh mục",
  },
  {
    url: "/admin/product",
    icon: <FaBox size={24} />,
    name: "Sản phẩm",
  },
  {
    url: "/admin/revenue",
    icon: <FaChartPie size={24} />,
    name: "Doanh thu",
  },
  {
    url: "/admin/blog",
    icon: <FaChartPie size={24} />,
    name: "Blog",
  },
];

function Menu() {
  return (
    <div className="sidebar__menu">
      <ul className="sidebar__menu-list">
        {mennus.map((item, index) => {
          const { url, icon, name } = item;

          return (
            <li
              className="sidebar__menu-item active`:`sidebar__menu-item"
              key={index}
              // onClick={()=>handleClick(index)}
            >
              <Link to={url} className="sidebar__menu-link">
                {icon}
                <p className="sidebar__menu-name">{name}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Menu;
