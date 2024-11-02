import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";

import logo from "../../../assets/images/logo.png";
import cartApi from "../../../api/cartApi";
import { useGlobalContext } from "../../../Context";
import { setCart, setCartItems } from "../../../actions";
import { convertCurrency } from "../../../helpers/convertCurrency";

function Header(props) {
  // eslint-disable-next-line react/prop-types
  const { isUIHidden } = props;

  const { cart, cartItems, dispatch } = useGlobalContext();
  const [isShowCart, setIsShowCart] = useState(false);
  const [keyword, setKeyword] = useState("");

  const cookiesUser = Cookies.get("user");
  const access_token = Cookies.get("access_token");
  const user = cookiesUser && JSON.parse(cookiesUser);
  const navigate = useNavigate();

  function handleOutsideClick() {
    if (event.target.closest(".dropdown")) return;
    setIsShowCart(false);
  }

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const fetchCartList = useCallback(async () => {
    const result = await cartApi.getCart(access_token);
    if (!result) return;

    const { cart, cartItems } = result;

    if (!cart || !cartItems) return;

    const cartAction = setCart(cart);
    dispatch(cartAction);
    const cartItemsAction = setCartItems(cartItems);
    dispatch(cartItemsAction);
  }, [access_token, dispatch]);

  useEffect(() => {
    if (access_token) {
      fetchCartList();
    }
  }, [access_token, fetchCartList]);

  const handleClickSearch = (e) => {
    e.preventDefault();

    if (keyword === "") return;

    navigate(`/store?search=${keyword}`);
  };

  const handleClickLogOut = () => {
    Cookies.remove("user");
    Cookies.remove("access_token");
    window.location.href = "/";
  };

  return (
    <header>
      <div id="header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-2">
              <div className="header-logo">
                <Link to={"/"} className="logo">
                  <img src={logo} alt="logo" />
                </Link>
              </div>
            </div>

            {isUIHidden && (
              <>
              
              

                <div className="col-md-7 clearfix">
                  <div className="header-ctn d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center mr-1" >
                        <Link to="/" className="mx-1"> Home</Link>
                        <Link to="/store" className="mx-3"> Shop</Link>
                        <Link to="/" className="mx-3"> Page</Link>
                        <Link to="/Blog" className="mx-3"> Blog</Link>
                        <Link to="/c" className="mx-3"> ContactUs</Link>
                        </div>
                      </div>
                    <div className="d-flex align-items-center">
                      {user ? (
                        <Link to="#" className="header-ctn-user">
                          <span>
                            <MdOutlineAccountCircle />
                          </span>

                          <div className="dropdown-user d-flex flex-column">
                            {
                              <Link
                                to="/profile"
                                className="dropdown-user-link"
                              >
                                Thông tin tài khoản
                              </Link>
                            }
                            <Link to="/order" className="dropdown-user-link">
                              Đơn hàng của tôi
                            </Link>
                            <Link
                              className="dropdown-user-link"
                              onClick={handleClickLogOut}
                            >
                              Đăng xuất
                            </Link>
                          </div>
                        </Link>
                      ) : (
                        <>
                          <Link to="/login">Đăng nhập </Link>
                          <span className="mx-3">|</span>
                          <Link to="/register">Đăng ký </Link>
                        </>
                      )}
                     
                    </div>

                    {user && (
                      <div
                        className={isShowCart ? "dropdown open" : "dropdown"}
                        onClick={() => setIsShowCart(!isShowCart)}
                      >
                        <a
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                          aria-expanded="true"
                        >
                          <FaShoppingCart />
                          <div className="qty">{cart && cart.total_item}</div>
                        </a>
                        <div className="cart-dropdown">
                          {cart && cartItems?.length > 0 ? (
                            <>
                              <div className="cart-list">
                                {cartItems.map((item) => {
                                  const {
                                    product_id,
                                    product_name,
                                    product_image,
                                    price,
                                    qty,
                                  } = item;

                                  return (
                                    <div
                                      className="product-widget"
                                      key={product_id}
                                    >
                                      <div className="product-img">
                                        <img
                                          src={`http://localhost:8080/static/images/${product_image}`}
                                          alt={product_name}
                                        />
                                      </div>
                                      <div className="product-body">
                                        <h3 className="product-name">
                                          <Link
                                            to={`/product-detail/${product_id}`}
                                          >
                                            {product_name}
                                          </Link>
                                        </h3>
                                        <h4 className="product-price">
                                          <span className="qty">{qty}x</span>
                                          {convertCurrency(price)}
                                        </h4>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="cart-summary">
                                <small>
                                  Tổng số lượng: {cart && cart.total_item}
                                </small>
                                <h5>
                                  Tông tiền:{" "}
                                  {cart && convertCurrency(cart.total_price)}
                                </h5>
                              </div>
                              <div className="cart-btns">
                                <Link to="/cart">View Cart</Link>
                              </div>
                            </>
                          ) : (
                            <h3>Không có sản phẩm</h3>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="menu-toggle">
                      <a href="#">
                        <i className="fa fa-bars"></i>
                        <span>Menu</span>
                      </a>
                    </div>

                    
                  </div>
                </div>
                
                <div className="col-md-3">
                  <div className="header-search">
                    <form>
                      {/* <select className="input-select">
                        <option value="0">All Categories</option>
                        <option value="1">Category 01</option>
                        <option value="1">Category 02</option>
                      </select> */}
                      <input
                        className="input"
                        placeholder="Nhập sản phẩm"
                        onChange={(e) => setKeyword(e.target.value)}
                      />
                      <button
                        className="search-btn"
                        onClick={handleClickSearch}
                      >
                        Tìm kiếm
                      </button>
                    </form>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
