import { IoIosCart } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import cartApi from "../../../api/cartApi";
import { useGlobalContext } from "../../../Context";
import { setCart, setCartItems } from "../../../actions";
import { convertCurrency } from "../../../helpers/convertCurrency";

function ProductItem(props) {
  // eslint-disable-next-line react/prop-types
  const { id, name, image, price } = props;

  const { dispatch } = useGlobalContext();
  const navigate = useNavigate();
  const access_token = Cookies.get("access_token");

  // handle add to cart
  const handleAddToCart = async (product_id) => {
    if (access_token) {
      let productInfo = [{ id: product_id, qty: 1 }];
      const result = await cartApi.addCart(access_token, productInfo);

      if (result) {
        toast.success("Sẩn phẩm đã được thêm vào giỏ hàng.");

        const data = await cartApi.getCart(access_token);
        const { cart, cartItems } = data;

        if (!cart || !cartItems) return;

        const cartAction = setCart(cart);
        dispatch(cartAction);
        const cartItemsAction = setCartItems(cartItems);
        dispatch(cartItemsAction);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="product" key={id} id={id}>
      <div className="product-img">
        <img src={`http://localhost:8080/static/images/${image}`} alt={name} />
        {/* <div className="product-label">
          <span className="sale">-30%</span>
          <span className="new">NEW</span>
        </div> */}
      </div>
      <div className="product-body">
        <p className="product-category">Danh mục</p>
        
        <Link to={`/product-detail/${id}`}>
          <h3 className="product-name">{name}</h3>
        </Link>
        <h4 className="product-price">
          {convertCurrency(price)}
          {/* <del className="product-old-price">{price}</del> */}
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
