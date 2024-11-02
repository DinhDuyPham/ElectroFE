import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from "react-toastify";

import Cookies from "js-cookie";
import cartApi from "../../../api/cartApi";
import { debounceFn } from "../../../helpers/debounce";
import { useGlobalContext } from "../../../Context";
import { setCart, setCartItems } from "../../../actions";
import { convertCurrency } from "../../../helpers/convertCurrency";

function Cart() {
  const { cart, cartItems, dispatch } = useGlobalContext();

  const [cartPage, setCartPage] = useState(cart);
  const [cartItemsPage, setCartItemsPage] = useState(cartItems);
  const access_token = Cookies.get("access_token");
  const inputQtyRef = useRef();
  const navigate = useNavigate();

  // get api cart
  const fetchCartList = useCallback(async () => {
    const result = await cartApi.getCart(access_token);
    const { cart, cartItems } = result;

    if (!cart || !cartItems) return;

    const cartAction = setCart(cart);
    dispatch(cartAction);
    const cartItemsAction = setCartItems(cartItems);
    dispatch(cartItemsAction);

    setCartPage(cart);
    setCartItemsPage(cartItems);
  }, [access_token, dispatch]);

  useEffect(() => {
    if (access_token) {
      fetchCartList();
    }
  }, [access_token, fetchCartList]);

  // update api cart
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchUpdateCart = useCallback(
    debounceFn(async (infoUpdate) => {
      await cartApi.updateCart(access_token, infoUpdate);
      await fetchCartList();
    }, 1000),
    [],
  );

  // handle quantity plus
  const handleClickQtyPlus = (product_id, qty, is_active) => {
    let qtyPlus = qty + 1;

    setCartItemsPage((prevCartItems) =>
      prevCartItems.map((item) => {
        if (item.product_id === product_id) {
          return { ...item, qty: qtyPlus };
        } else {
          return item;
        }
      }),
    );

    let infoUpdate = [{ id: product_id, qty: qtyPlus, is_active }];
    fetchUpdateCart(infoUpdate);
  };

  // handle quantity minus
  const handleClickQtyMinus = (product_id, qty, is_active) => {
    if (qty <= 1) return;
    let qtyMinus = qty - 1;

    setCartItemsPage((prevCartItems) =>
      prevCartItems.map((item) =>
        item.product_id === product_id ? { ...item, qty: qtyMinus } : item,
      ),
    );

    let infoUpdate = [{ id: product_id, qty: qtyMinus, is_active }];
    fetchUpdateCart(infoUpdate);
  };

  // handle change quantity
  const handleChangeQty = (event, product_id) => {
    let newQty = Number(event.target.value);
    if (newQty <= 1) return;

    setCartItemsPage((prevCartItems) =>
      prevCartItems.map((item) =>
        item.product_id === product_id ? { ...item, qty: newQty } : item,
      ),
    );
  };

  // handle blur input
  const handleBlurQty = (product_id, qty, is_active) => {
    let infoUpdate = [{ id: product_id, qty: qty, is_active }];
    fetchUpdateCart(infoUpdate);
  };

  // handle delete cart item
  const handleDeleteCartItem = async (cartItemId) => {
    const result = await cartApi.deleteCart(access_token, cartItemId);
    if (result) {
      toast.success("Xóa sản phẩm thành công");
      await fetchCartList();
    }
  };

  const handleCheckProductItem = (product_id, qty, is_active) => {
    let new_is_active = !is_active;

    setCartItemsPage((prevCartItems) =>
      prevCartItems.map((item) =>
        item.product_id === product_id
          ? { ...item, is_active: new_is_active }
          : item,
      ),
    );
    let infoUpdate = [{ id: product_id, qty, is_active: new_is_active }];
    fetchUpdateCart(infoUpdate);
  };

  const handleCheckAllProductItem = (e) => {
    let isCheckedAll = e.target.checked;

    setCartItemsPage((prevCartItems) =>
      prevCartItems.map((item) => {
        return { ...item, is_active: isCheckedAll };
      }),
    );

    let infoUpdate = cartItemsPage.map((item) => ({
      id: item.product_id,
      qty: item.qty,
      is_active: isCheckedAll,
    }));
    fetchUpdateCart(infoUpdate);
  };

  const handleSubmitOrder = () => {
    if (cartPage && cartPage.total_item_active <= 0) return;

    navigate("/checkout");
  };

  return (
    <div className="section">
      <div className="container">
        <div className="cart">
          <h3 className="mb-4">Danh sách giỏ hàng</h3>
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>
                  <div className="input-checkbox">
                    <input
                      type="checkbox"
                      id="checkbox-all"
                      name="product"
                      onChange={(e) => handleCheckAllProductItem(e)}
                    />
                    <label htmlFor="checkbox-all">
                      <span></span>
                    </label>
                  </div>
                </th>
                <th scope="col">Sản phẩm</th>
                <th scope="col">Hình ảnh</th>
                <th scope="col">Đơn giá</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Số tiền</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {cartItemsPage?.length > 0 &&
                cartItemsPage.map((item) => {
                  const {
                    id,
                    product_id,
                    product_name,
                    product_image,
                    qty,
                    price,
                    total_price,
                    is_active,
                  } = item;

                  return (
                    <tr key={id}>
                      <td>
                        <div className="input-checkbox" key={id}>
                          <input
                            type="checkbox"
                            id={`checkbox-` + id}
                            checked={is_active}
                            name="product"
                            onChange={() =>
                              handleCheckProductItem(product_id, qty, is_active)
                            }
                          />
                          <label htmlFor={`checkbox-` + id}>
                            <span></span>
                          </label>
                        </div>
                      </td>
                      <td>{product_name}</td>
                      <td>
                        <img
                          src={`http://localhost:8080/static/images/${product_image}`}
                          alt={product_name}
                        />
                      </td>
                      <td>{convertCurrency(price)}</td>
                      <td>
                        <div className="input-number">
                          <input
                            type="number"
                            min={1}
                            ref={inputQtyRef}
                            value={qty}
                            onBlur={() =>
                              handleBlurQty(product_id, qty, is_active)
                            }
                            onChange={(event) =>
                              handleChangeQty(event, product_id)
                            }
                          />
                          <span
                            className="qty-up"
                            onClick={() =>
                              handleClickQtyPlus(product_id, qty, is_active)
                            }
                          >
                            +
                          </span>
                          <span
                            className="qty-down"
                            onClick={() =>
                              handleClickQtyMinus(product_id, qty, is_active)
                            }
                          >
                            -
                          </span>
                        </div>
                      </td>
                      <td>{convertCurrency(total_price)}</td>
                      <td>
                        <button
                          className="btn btn-delete"
                          onClick={() => handleDeleteCartItem(id)}
                        >
                          <IoCloseSharp size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <div className="cart__info d-flex justify-content-between align-items-center">
            <div className="cart__info-total">
              <div className="d-flex justify-content-between flex-column">
                <label>
                  Tổng thanh toán:{" "}
                  <span>
                    ({cartPage && cartPage.total_item_active} Sản phẩm)
                  </span>
                </label>
                <span className="price">
                  {cartPage && convertCurrency(cartPage.total_price_active)}
                </span>
              </div>
            </div>
            <button
              className="primary-btn"
              onClick={handleSubmitOrder}
              disabled={cartPage?.total_item_active >= 1 ? false : true}
            >
              Mua hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
