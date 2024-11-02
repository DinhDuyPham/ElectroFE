import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Cookies from "js-cookie";
import moment from "moment";

import { statusOrder } from "../../../config/statusOrder";
import orderApi from "../../../api/orderApi";
import { convertCurrency } from "../../../helpers/convertCurrency";

function OrderDetail() {
  const [orderDetail, setOrderDetail] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const { orderId } = useParams();
  const accessToken = Cookies.get("access_token");

  useEffect(() => {
    fetchOrderDetail(orderId, accessToken);
  }, [orderId, accessToken]);

  const fetchOrderDetail = async (orderId, accessToken) => {
    const result = await orderApi.getOrder(accessToken, orderId);

    if (result) {
      setOrderDetail(result.order);
      setOrderItems(result.orderItems);
      return;
    }
  };

  const handleConfirmOrder = async (orderId) => {
    if (orderId && accessToken) {
      const result = await orderApi.updateStatusOrder(
        orderId,
        accessToken,
        statusOrder.CONFIRMED,
      );

      if (result) {
        window.location.reload();
      }
    }
  };

  const handleProcessingOrder = async (orderId) => {
    if (orderId && accessToken) {
      const result = await orderApi.updateStatusOrder(
        orderId,
        accessToken,
        statusOrder.PROCESSING,
      );

      if (result) {
        window.location.reload();
      }
    }
  };

  const handleCompleteOrder = async (orderId) => {
    if (orderId && accessToken) {
      const result = await orderApi.updateStatusOrder(
        orderId,
        accessToken,
        statusOrder.COMPLETED,
      );

      if (result) {
        window.location.reload();
      }
    }
  };

  // const handlePayment = async (orderId) => {
  //   if (orderId) {
  //     const result = await orderApi.updateIsPayment(orderId, true);

  //     if (result) {
  //       window.location.reload();
  //     }
  //   }
  // };

  return (
    <div className="order__detail">
      <h3 className="title-admin">
        Đơn hàng: #{orderDetail && orderDetail.id}
      </h3>

      <div className="order__detail-container background-radius">
        <div className="order__detail-head">
        <label>
        Name: <span>{orderDetail && orderDetail.first_name + " " + orderDetail.last_name}</span><br />
        Phone: <span>{orderDetail && orderDetail.phone}</span><br />
        Email: <span>{orderDetail && orderDetail.email}</span><br />
        Address: <span>{orderDetail && orderDetail.address}</span><br />
        Type Order: <span>{orderDetail && orderDetail.type_order}</span><br />
        Comment: <span>{orderDetail && orderDetail.comment}</span><br />
</label>

          <label>
            Ngày đặt hàng:{" "}
            <span>
              {orderDetail &&
                moment(orderDetail.createdAt).format("DD-MM-YYYY")}
            </span>
          </label>
        </div>
        <div className="order__detail-group">
          <Row>
            {orderItems &&
              orderItems.map((item, index) => {
                const { product_name, product_image, qty } = item;

                return (
                  <Col xs={6} className="" key={index}>
                    <div className="order__detail-item" key={index}>
                      <img
                        src={`http://localhost:8080/static/images/${product_image}`}
                        alt=""
                      />
                      <div className="detail-item-info">
                        <label>
                          Tên sản phẩm: <span>{product_name}</span>
                        </label>
                        <label>
                          Số lượng: <span>{qty}</span>
                        </label>
                      </div>
                    </div>
                  </Col>
                );
              })}
          </Row>
        </div>
        <div className="order__detail-foot">
          <div className="order__detail-status">
            <label>
              Trạng thái đơn hàng:
              <span className="order-status">
                {orderDetail && orderDetail.status}
              </span>
            </label>
            <label>
              Tổng thanh toán:
              <span>
                {orderDetail && convertCurrency(orderDetail.total_price)}
              </span>
            </label>
            <label>
              Trạng thái thanh toán:
              <span>
                {orderDetail && orderDetail.is_payment
                  ? "Đã thanh toán"
                  : "Chưa thanh toán"}
              </span>
            </label>
          </div>
          <div className="order__detail-group-btn">
            <button
              disabled={orderDetail && orderDetail.status !== statusOrder.NEW}
              className="btn btn-confirm"
              onClick={() => handleConfirmOrder(orderDetail && orderDetail.id)}
            >
              Xác thực đơn
            </button>
            <button
              disabled={
                orderDetail && orderDetail.status !== statusOrder.CONFIRMED
              }
              className="btn btn-processing"
              onClick={() =>
                handleProcessingOrder(orderDetail && orderDetail.id)
              }
            >
              Vận chuyển
            </button>
            <button
              disabled={
                orderDetail && orderDetail.status !== statusOrder.PROCESSING
              }
              className="btn btn-complete"
              onClick={() => handleCompleteOrder(orderDetail && orderDetail.id)}
            >
              Hoàn thành
            </button>

            {/* <button
              hidden={orderDetail && orderDetail.is_payment}
              className="btn btn-primary"
              onClick={() => handlePayment(orderDetail && orderDetail.id)}
            >
              Đã thanh toán
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
