import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import categoryApi from "../../../api/categoryApi";

function Category() {
  const [categoryList, setCategoryList] = useState([]);

  const fetchListCate = async () => {
    const data = await categoryApi.getListCategory();
    if (data && data.length > 0) setCategoryList(data);
  };

  useEffect(() => {
    fetchListCate();
  }, []);

  const handleDeleteCateItem = async (cateId) => {
    const result = confirm("Bạn có muốn xóa");

    if (result && cateId) {
      await fetchDelete(cateId);
      fetchListCate();
    }
  };

  const fetchDelete = async (cateId) => {
    const result = await categoryApi.deleteCategory(cateId);
    if (result) {
      toast.success("Xoá dữ liệu thành công");
    }
  };

  return (
    <section className="block-category">
      <ToastContainer position="top-right" autoClose={3000} />
      <h3 className="title-admin">Danh sách danh mục</h3>

      <div className="category-container background-radius">
        <div className="category-add">
          <Link to="/admin/category/add">Thêm mới</Link>
        </div>

        <Table className="category-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên danh mục</th>
              <th>Hình ảnh</th>
              <th>Thuộc tính</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {categoryList &&
              categoryList.length > 0 &&
              categoryList.map((cateItem, index) => {
                const { category, attribute } = cateItem;
                const { id, name, image, is_active } = category;

                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>
                      <img
                        src={`http://localhost:8080/static/images/${image}`}
                        alt={name}
                      />
                    </td>
                    <td>
                      {attribute?.length > 0 &&
                        attribute.map((attributeItem, index) => {
                          return <span key={index}>{attributeItem.name}</span>;
                        })}
                    </td>
                    <td>
                      <span
                        className={`category-status ${is_active ? "active" : "inactive"}`}
                      >
                        {is_active ? "active" : "inactive"}
                      </span>
                    </td>
                    <td>
                      <Link to={`/admin/category/update/${id}`}>
                        <FaRegEdit className="icon-update" />
                      </Link>

                      <MdDelete
                        onClick={() => handleDeleteCateItem(id)}
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

export default Category;
