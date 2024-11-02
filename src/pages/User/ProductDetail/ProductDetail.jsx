// import Slider from "react-slick";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

import { IoIosCart } from "react-icons/io";
// import productImg01 from "../../../assets/images/product01.png";
import Navbar from "../../../components/User/Navbar/Navbar";
import Product from "../../../components/User/Product/Products";
import productApi from "../../../api/productApi";
import categoryApi from "../../../api/categoryApi";
import cartApi from "../../../api/cartApi";
import { setCart, setCartItems } from "../../../actions";
import { useGlobalContext } from "../../../Context";
import { convertCurrency } from "../../../helpers/convertCurrency";

function ProductDetail() {
  // const a = [1, 2, 3, 4];
  // const [nav1, setNav1] = useState(null);
  // const [nav2, setNav2] = useState(null);
  // let sliderRef1 = useRef(null);
  // let sliderRef2 = useRef(null);

  const { dispatch } = useGlobalContext();
  const [product, setProduct] = useState({});
  const [attributes, setAttributes] = useState(null);
  const [cateProduct, setCateProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
  const access_token = Cookies.get("access_token");
  let { id } = useParams();

  const fetchProductID = async () => {
    if (!id) return;

    const productData = await productApi.getProductById(id);
    if (!productData) return;

    setProduct({ ...productData });
    console.log(productData);

    if (productData?.category_id) {
      const categoryData = await categoryApi.getCategoryById(
        productData.category_id,
      );
      const { attribute, category } = categoryData;

      if (attribute && category) {
        setAttributes(attribute);
        setCateProduct(category);
      }
    }
  };

  useEffect(() => {
    // setNav1(sliderRef1);
    // setNav2(sliderRef2);

    fetchProductID();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // handle quantity plus
  const handleClickQtyPlus = () => {
    if (quantity === product.qty) {
      toast.error("Số lượng đặt đã vượt quá số lượng trong kho");
      return;
    }
    setQuantity(quantity + 1);
  };

  // handle quantity minus
  const handleClickQtyMinus = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  // handle change quantity
  const handleChangeQty = (e) => {
    const value = +e.target.value;
    if (value >= product.qty) {
      toast.error("Số lượng đặt đã vượt quá số lượng trong kho");
      return;
    }

    setQuantity(value);
  };

  // handle add to cart
  const handleAddToCart = async (product_id) => {
    if (access_token) {
      let productInfo = [{ id: product_id, qty: quantity }];
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
    <>
      <Navbar categoryID={cateProduct?.id} />

      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 order-md-2">
              <div className="product-preview">
                <img
                  src={`http://localhost:8080/static/images/${product.image}`}
                  alt=""
                />
              </div>
              {/* <Slider
                className="product-main-img"
                asNavFor={nav2}
                infinite={true}
                speed={300}
                dots={false}
                arrows={true}
                fade={true}
                ref={(slider) => (sliderRef1 = slider)}
              >
                {a.map((item) => (
                  <div className="product-preview" key={item}>
                    <img src={productImg01} alt="" />
                  </div>
                ))}
              </Slider> */}
            </div>

            {/* <div className="col-md-2 order-md-1">
              <Slider
                className="product-imgs"
                asNavFor={nav1}
                ref={(slider) => (sliderRef2 = slider)}
                slidesToShow={3}
                swipeToSlide={true}
                focusOnSelect={true}
                vertical={true}
                arrows={false}
                centerPadding="0px"
                // centerMode={true}
                // slidesToScroll= {1}
              >
                {a.map((item) => (
                  <div className="product-preview" key={item}>
                    <img src={productImg01} alt="" />
                  </div>
                ))}
              </Slider>
            </div> */}

            <div className="col-md-6 order-md-3">
              <div className="product-details">
                <h2 className="product-name">{product.name}</h2>

                <div>
                  <h3 className="product-price">
                    {convertCurrency(product.price)}
                    {/* <del className="product-old-price">$990.00</del> */}
                  </h3>
                  <label className="product-available">
                    Số lượng: <span>{product.qty}</span>
                  </label>
                </div>
                {/* <p>{product.description ?? ""}</p> */}

                <div className="product-options">
                  {attributes &&
                    attributes.map((attribute) => {
                      const { id, name } = attribute;

                      return <label key={id}>{name}</label>;
                    })}
                  {/* <label>
                    Size
                    <select className="input-select">
                      <option value="0">X</option>
                    </select>
                  </label>
                  <label>
                    Color
                    <select className="input-select">
                      <option value="0">Red</option>
                    </select>
                  </label> */}
                </div>

                <div className="add-to-cart">
                  <div className="qty-label">
                    Qty
                    <div className="input-number">
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => handleChangeQty(e)}
                      />
                      <span className="qty-up" onClick={handleClickQtyPlus}>
                        +
                      </span>
                      <span className="qty-down" onClick={handleClickQtyMinus}>
                        -
                      </span>
                    </div>
                  </div>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product._id)}
                  >
                    <IoIosCart />
                    Thêm vào giỏ
                  </button>
                </div>

                <ul className="product-links">
                  <li>Danh mục:</li>
                  {cateProduct && (
                    <li>
                      <Link to={cateProduct.id}>{cateProduct.name}</Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="col-md-12 order-md-4">
              <div id="product-tab">
                <ul className="tab-nav">
                  <li className="active">Mô tả</li>
                </ul>

                <div className="tab-content">
                  <div id="tab1" className="tab-pane fade in active">
                    <div className="row">
                      <div className="col-md-12">
                        <p>{product.detail}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {product.category_id && (
        <Product
          title="Sản phẩm liên quan"
          type="category"
          paramId={product.category_id}
        />
      )}
    </>
  );
}

export default ProductDetail;
