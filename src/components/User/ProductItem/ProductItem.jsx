import { IoIosCart } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import cartApi from "../../../api/cartApi";
import { useGlobalContext } from "../../../Context";
import { setCart, setCartItems } from "../../../actions";
import { convertCurrency } from "../../../helpers/convertCurrency";
import { useEffect, useState } from "react";
import productApi from "../../../api/productApi";
import categoryApi from "../../../api/categoryApi";

function ProductItem(props) {
  const { id, name, image, price } = props;
  const [cateProduct, setCateProduct] = useState(null);
  const { dispatch } = useGlobalContext();
  const navigate = useNavigate();
  const access_token = Cookies.get("access_token");

  const fetchProductID = async () => {
    if (!id) return;

    try {
      const productData = await productApi.getProductById(id);
      if (productData && productData.category_id) {
        const categoryData = await categoryApi.getCategoryById(productData.category_id);
        setCateProduct(categoryData?.category || null);
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  useEffect(() => {
    fetchProductID();
  }, [id]);

  const handleAddToCart = async (product_id) => {
    if (access_token) {
      let productInfo = [{ id: product_id, qty: 1 }];
      const result = await cartApi.addCart(access_token, productInfo);

      if (result) {
        toast.success("Sản phẩm đã được thêm vào giỏ hàng.");
        const data = await cartApi.getCart(access_token);
        const { cart, cartItems } = data;

        if (cart && cartItems) {
          dispatch(setCart(cart));
          dispatch(setCartItems(cartItems));
        }
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="product" key={id} id={id}>
      <div className="product-img">
        <img src={`http://localhost:8080/static/images/${image}`} alt={name} />
      </div>
      <div className="product-body">
        <p className="product-category">
          Danh mục:{" "}
          {cateProduct ? (
            <Link to={`/store/${cateProduct.id}`}>{cateProduct.name}</Link>
          ) : (
            "Đang cập nhật..."
          )}
        </p>
        
        <Link to={`/product-detail/${id}`}>
          <h3 className="product-name">{name}</h3>
        </Link>
        <h4 className="product-price">
          {convertCurrency(price)}
        </h4>
      </div>
      <div className="add-to-cart">
        <button className="add-to-cart-btn" onClick={() => handleAddToCart(id)}>
          <IoIosCart size={24} />
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
