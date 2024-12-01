import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

import blogApi from "../../../api/blogApi";

function Blog() {
  // const [productList, setProductList] = useState([]);
  const [blogList, setBlogList] = useState([]);
  const fetchListBlog = async () => {
    const data = await blogApi.getListBlog();

    if (data && data.length > 0) setBlogList(data);
  };

  const handleDeleteBlogItem = async (proId) => {
    const result = confirm("Bạn có muốn xóa");

    if (result && proId) {
      const result = await blogApi.deleteBlog(proId);
      if (result) {
        toast.success("Xoá dữ liệu thành công");
        fetchListBlog();
      } else {
        toast.error("Có lỗi xoá dữ liệu. Vui lòng thử lại!");
      }
    }
  };

  useEffect(() => {
    fetchListBlog();
  }, []);

  return (
    <section className="block-product">
      <ToastContainer position="top-right" autoClose={3000} />
      <h3 className="title-admin">Danh sách Blog</h3>

      <div className="product-container background-radius">
        <div className="product-add">
          <Link to="/admin/blog/add">Thêm mới</Link>
        </div>

        <Table className="product-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tiêu đề </th>
              <th>Hình ảnh</th>
              <th>Tác Giả</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {blogList?.length &&
              blogList.map((blogItem, index) => {
                const { _id, title, image, author } = blogItem;
// chắc do gọi tên biến sai qu
                return (
                  <tr key={index}>
                    <td>{index++}</td>
                    <td>{title}</td>
                    <td>
                      <img
                        src={`http://localhost:8080/static/images/${image}`}
                        alt={title}
                      />
                    </td>
                  
                    <td>
                      <span
                        className={`category-sta tus ${author ? "active" : "inactive"}`}
                      >
                        {author}
                      </span>
                    </td>
                    <td>
                      <Link to={`/admin/blog/update/${_id}`}>
                        <FaRegEdit className="icon-update" />
                      </Link>

                      <MdDelete
                        onClick={() => handleDeleteBlogItem(_id)}
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
