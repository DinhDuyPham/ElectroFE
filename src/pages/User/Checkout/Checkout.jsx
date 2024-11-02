import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../Context";
import { convertCurrency } from "../../../helpers/convertCurrency";
import { toast } from "react-toastify";
import orderApi from "../../../api/orderApi";
import { setCart, setCartItems } from "../../../actions";

function Checkout() {
  let cartCheck;
  const { cart, cartItems, dispatch } = useGlobalContext();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderRequest, setOrderRequest] = useState({
    cartId: "",
    firstName: "",
    lastName: "",
    city: "",
    address: "",
    phone: "",
    comment: "",
  });
  const navigate = useNavigate();

  if (cartItems?.length > 0) {
    cartCheck = cartItems.filter((item) => item.is_active === true);
  }

  const handleCheckPaymentMethod = (e) => {
    const paymentValue = e.target.value;
    if (!paymentValue) return;

    setPaymentMethod(paymentValue);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      toast.error("Vui lòng chọn phương thức thanh toán");
      return;
    }

    if (paymentMethod === "cash") {
      const result = await orderApi.createCashOrder({
        ...orderRequest,
        cartId: cart.id,
      });

      if (result.success) {
        const cartAction = setCart(null);
        dispatch(cartAction);
        const cartItemsAction = setCartItems([]);
        dispatch(cartItemsAction);

        toast.success("Đặt hàng thành công");
        navigate("/order");
      }
    } else {
      const result = await orderApi.createTranferOrder({
        ...orderRequest,
        cartId: cart.id,
      });

      if (result && result.paymentUrl !== "") {
        window.location.href = `${result.paymentUrl}`;
      }
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("vnp_TransactionStatus");

    if (myParam === null) {
      return;
    } else if (myParam === "00") {
      const cartAction = setCart(null);
      dispatch(cartAction);
      const cartItemsAction = setCartItems([]);
      dispatch(cartItemsAction);

      toast.success("Đặt hàng thành công");
    } else {
      toast.success("Đặt hàng thất bại");
    }
    navigate("/order");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className="section checkout-order">
      <div className="container">
        {/* <form> */}
        <div className="row">
          <div className="col-md-7">
            {/* <div className="billing-details">
                <div className="section-title">
                  <h3 className="title">Billing address</h3>
                </div>
                <div className="form-group">
                  <input
                    className="input"
                    type="text"
                    name="first-name"
                    placeholder="First Name"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="input"
                    type="text"
                    name="last-name"
                    placeholder="Last Name"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="input"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="input"
                    type="text"
                    name="address"
                    placeholder="Address"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="input"
                    type="text"
                    name="city"
                    placeholder="City"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="input"
                    type="text"
                    name="country"
                    placeholder="Country"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="input"
                    type="tel"
                    name="tel"
                    placeholder="Telephone"
                  />
                </div>
              </div> */}

            <div className="shiping-details">
              <div className="section-title">
                <h3 className="title">Địa chỉ giao hàng</h3>
              </div>
              <div className="input-checkbox">
                {/* <input type="checkbox" id="shiping-address" />
                  <label htmlFor="shiping-address">
                    <span></span>
                    Ship to a diffrent address?
                  </label> */}
                <div className="caption">
                  <div className="form-group">
                    <input
                      className="input"
                      type="text"
                      name="first-name"
                      placeholder="Nhập tên"
                      onChange={(e) =>
                        setOrderRequest({
                          ...orderRequest,
                          firstName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="input"
                      type="text"
                      name="last-name"
                      placeholder="Nhập họ"
                      onChange={(e) =>
                        setOrderRequest({
                          ...orderRequest,
                          lastName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="input"
                      type="text"
                      name="city"
                      placeholder="Nhập thành phố"
                      onChange={(e) =>
                        setOrderRequest({
                          ...orderRequest,
                          city: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="input"
                      type="text"
                      name="address"
                      placeholder="Nhập địa chỉ"
                      onChange={(e) =>
                        setOrderRequest({
                          ...orderRequest,
                          address: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="input"
                      type="tel"
                      name="tel"
                      placeholder="Nhập số điện thoại"
                      onChange={(e) =>
                        setOrderRequest({
                          ...orderRequest,
                          phone: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="order-notes">
              <textarea
                className="input"
                placeholder="Ghi chú"
                onChange={(e) =>
                  setOrderRequest({ ...orderRequest, comment: e.target.value })
                }
              ></textarea>
            </div>
          </div>

          <div className="col-md-5 order-details">
            <div className="section-title text-center">
              <h3 className="title">Đơn hàng của bạn</h3>
            </div>
            <div className="order-summary">
              <div className="order-col">
                <div>
                  <strong>Sản phẩm</strong>
                </div>
                <div>
                  <strong>Đơn giá</strong>
                </div>
              </div>
              <div className="order-products">
                {cartCheck?.map((item) => {
                  const { id, product_name, price, qty } = item;

                  return (
                    <div className="order-col" key={id}>
                      <div>
                        {qty}x {product_name}
                      </div>
                      <div>{convertCurrency(price)}</div>
                    </div>
                  );
                })}
              </div>
              {/* <div className="order-col">
                  <div>Shiping</div>
                  <div>
                    <strong>FREE</strong>
                  </div>
                </div> */}
              <div className="order-col total">
                <div>
                  <strong>Thành tiền</strong>
                </div>
                <div>
                  <strong className="order-total">
                    {cart && convertCurrency(cart.total_price)}
                  </strong>
                </div>
              </div>
            </div>

            <div className="payment-method">
              <div className="order-col mb-3">
                <div>
                  <strong>Phương thức thanh toán</strong>
                </div>
              </div>
              <div className="input-radio">
                <input
                  type="radio"
                  name="payment"
                  id="cash"
                  value="cash"
                  readOnly
                  onChange={(e) => handleCheckPaymentMethod(e)}
                />
                <label htmlFor="cash">
                  <span></span>
                  Trả bằng tiền mặt
                </label>
                {/* <div className="caption">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div> */}
              </div>
              <div className="input-radio">
                <input
                  type="radio"
                  name="payment"
                  id="transfer"
                  value="transfer"
                  readOnly
                  onChange={(e) => handleCheckPaymentMethod(e)}
                />
                <label htmlFor="transfer">
                  <span></span>
                  Chuyển khoản ngân hàng
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="primary-btn order-submit"
              onClick={(e) => handleSubmitOrder(e)}
            >
              Đặt hàng
            </button>
          </div>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
}

export default Checkout;
