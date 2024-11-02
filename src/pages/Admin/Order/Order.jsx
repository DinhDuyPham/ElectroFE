import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Cookies from "js-cookie";
import { statusOrder } from "../../../config/statusOrder";
import orderApi from "../../../api/orderApi";
import { Link } from "react-router-dom";
import { convertCurrency } from "../../../helpers/convertCurrency";

function Order() {
  const [orderList, setOrderList] = useState([]);
  const access_token = Cookies.get("access_token");

  const fetchOrderList = async (access_token) => {
    const result = await orderApi.getOrderList(access_token);

    if (result?.length > 0) {
      setOrderList(result);
    }
  };

  useEffect(() => {
    if (access_token) {
      fetchOrderList(access_token);
    }
  }, [access_token]);

  return (
    <section className="block-order">
      <h3 className="title-admin">Danh sách đơn hàng</h3>

      <div className="order-container background-radius">
        <Table className="order-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã đơn hàng</th>
              <th>Tên khách hàng</th>
              <th>Email</th>
              <th>Số lượng sản phẩm</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orderList &&
              orderList.length > 0 &&
              orderList.map((orderItem, index) => {
                const { id, first_name, last_name, email, total_item, total_price, status } =
                  orderItem;

                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{id}</td>
                    <td>{first_name + " " + last_name}</td>
                    <td>{email}</td>
                    <td>{total_item}</td>
                    <td>
                      <span>{convertCurrency(total_price)}</span>
                    </td>
                    <td>
                      <span
                        className={`status ${
                          status === statusOrder.NEW
                            ? "status-new"
                            : status === statusOrder.CONFIRMED
                              ? "status-confirmed"
                              : status === statusOrder.PROCESSING
                                ? "status-processing"
                                : status === statusOrder.COMPLETED
                                  ? "status-completed"
                                  : "status-canceled"
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
                    </td>
                    <td>
                      <Link to={`/admin/order/${id}`}>Chi tiết</Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </section>
  );
}

export default Order;
