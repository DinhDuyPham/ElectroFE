import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import productApi from "../../../api/productApi";
import { convertCurrency } from "../../../helpers/convertCurrency";

function Blog() {
  const [productList, setProductList] = useState([]);

  const fetchListProduct = async () => {
    const data = await productApi.getListProduct();

    if (data && data.length > 0) setProductList(data);
  };

  const handleDeleteProItem = async (proId) => {
    const result = confirm("Bạn có muốn xóa");

    if (result && proId) {
      const result = await productApi.deleteProduct(proId);
      if (result) {
        toast.success("Xoá dữ liệu thành công");
        fetchListProduct();
      } else {
        toast.error("Có lỗi xoá dữ liệu. Vui lòng thử lại!");
      }
    }
  };

  useEffect(() => {
    fetchListProduct();
  }, []);

  return (
    <section className="block-product">
      <ToastContainer position="top-right" autoClose={3000} />
      <h3 className="title-admin">Danh sách sản phẩm</h3>

      <div className="product-container background-radius">
        <div className="product-add">
          <Link to="/admin/product/add">Thêm mới</Link>
        </div>

        <Table className="product-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên sản phẩm</th>
              <th>Hình ảnh</th>
              <th>Giá sản phẩm</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {productList?.length &&
              productList.map((productItem, index) => {
                const { _id, name, price, image, is_active } = productItem;

                return (
                  <tr key={index}>
                    <td>{index++}</td>
                    <td>{name}</td>
                    <td>
                      <img
                        src={`http://localhost:8080/static/images/${image}`}
                        alt={name}
                      />
                    </td>
                    <td>{ convertCurrency(price) }</td>
                    <td>
                      <span
                        className={`category-status ${is_active ? "active" : "inactive"}`}
                      >
                        {is_active ? "active" : "inactive"}
                      </span>
                    </td>
                    <td>
                      <Link to={`/admin/product/update/${_id}`}>
                        <FaRegEdit className="icon-update" />
                      </Link>

                      <MdDelete
                        onClick={() => handleDeleteProItem(_id)}
                        className="icon-delete"
                      />
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

export default Blog;
