import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import moment from "moment";
import { convertCurrency } from "../../../helpers/convertCurrency";
import orderApi from "../../../api/orderApi";
import { statusOrder } from "../../../config/statusOrder";

function Order() {
  const [orderList, setOrderList] = useState([]);
  const access_token = Cookies.get("access_token");

  const fetchOrderList = async () => {
    const result = await orderApi.getOrderList(access_token);
    if (result?.length > 0) {
      setOrderList(result);
    }
  };

  useEffect(() => {
    if (access_token) {
      fetchOrderList(access_token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access_token]);

  const handleCancelOrder = async (orderId) => {
    if (orderId && access_token) {
      var result = await orderApi.updateStatusOrder(
        orderId,
        access_token,
        "CANCELED",
      );

      if (result) {
        window.location.reload();
      }
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div className="history-order">
          {orderList.length > 0 && <h3 className="mb-4">Danh sách đơn hàng</h3>}

          <div className="history-order-list">
            {orderList.length > 0 ? (
              orderList.map((items, index) => {
                const { id, total_price, updatedAt } = items.order;
                let status = items.order.status;

                return (
                  <div className="history-order-item completed" key={index}>
                    <div className="history-order-head">
                      <label>
                        Mã đơn hàng: <span>#{id}</span>{" "}
                      </label>
                      <label>
                        Ngày đặt hàng:{" "}
                        <span className="order-time">
                          {moment(updatedAt.createdAt).format("DD-MM-YYYY")}
                        </span>{" "}
                      </label>
                    </div>

                    <div className="history-order-product">
                      <div className="row">
                        {items &&
                          items.orderItems.map((orderItem, index) => {
                            const { product_image, product_name, price, qty } =
                              orderItem;

                            return (
                              <div className="col-6" key={index}>
                                <div className="product-item">
                                  <img
                                    src={`http://localhost:8080/static/images/${product_image}`}
                                    alt=""
                                  />
                                  <div className="product-item-info">
                                    <label>
                                      Tên sản phẩm: <span>{product_name}</span>
                                    </label>
                                    <label>
                                      Số lượng: <span>{qty}</span>
                                    </label>
                                    <label>
                                      Giá tiền:{" "}
                                      <span>
                                        {price.toLocaleString("vi", {
                                          style: "currency",
                                          currency: "VND",
                                        })}
                                      </span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    <div className="history-order-footer">
                      <label>
                        Tổng thanh toán:{" "}
                        <span>{convertCurrency(total_price)}</span>
                      </label>

                      <div className="history-order-status">
                        {status === statusOrder.NEW && (
                          <button
                            onClick={() => handleCancelOrder(id)}
                            className="primary-btn"
                          >
                            Hủy đơn
                          </button>
                        )}
                        <span
                          className={`order-status ${
                            status === statusOrder.CANCELED
                              ? "canceled"
                              : status === statusOrder.CONFIRMED
                                ? "confirmed"
                                : status === statusOrder.COMPLETED
                                  ? "completed"
                                  : status === statusOrder.PROCESSING
                                    ? "processing"
                                    : "new"
                          }`}
                        >
                          {status === statusOrder.NEW
                            ? "Đơn mới"
                            : status === statusOrder.CONFIRMED
                              ? "Đã nhận đơn"
                              : status === statusOrder.PROCESSING
                                ? "Đang chờ giao hàng"
                                : status === statusOrder.COMPLETED
                                  ? "Hoàn thành"
                                  : "Đã hủy"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="history-order-not">
                <h3 className="text-center">Đơn hàng hiện tại đang trống</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
