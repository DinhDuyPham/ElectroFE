import { useEffect, useState } from "react";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import productApi from "../../../api/productApi";
import categoryApi from "../../../api/categoryApi";

function BlogAdd() {
  const [categoryList, setCategoryList] = useState([]);
  const [productAdd, setProductAdd] = useState({
    name: "",
    category_id: "",
    detail: "",
    price: 0,
    quantity: 0,
    image: null,
  });
  const navigate = useNavigate();

  const fetchListCate = async () => {
    const data = await categoryApi.getListCategory();
    if (data?.length > 0) {
      setCategoryList(data);
    }
  };

  const handleSubmit = async () => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", productAdd.name);
    formData.append("category_id", productAdd.category_id);
    formData.append("detail", productAdd.detail);
    formData.append("price", productAdd.price);
    formData.append("qty", productAdd.quantity);
    formData.append("image", productAdd.image);

    const result = await productApi.createProduct(formData);

    if (result) {
      navigate("/admin/product");
    } else {
      toast.error("Có lỗi khi thêm mới dữ liệu.");
    }
  };

  useEffect(() => {
    fetchListCate();
  }, []);

  return (
    <section className="block-product">
      <ToastContainer position="top-right" autoClose={3000} />
      <h3 className="title-admin">Thêm mới sản phẩm</h3>

      <div className="product-container background-radius">
        <form className="product-form" onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label>Tên sản phẩm</Form.Label>
            <Form.Control
              required
              onChange={(event) =>
                setProductAdd({ ...productAdd, name: event.target.value })
              }
              type="text"
              name="name"
            />
          </Form.Group>

          <Form.Group className="position-relative mb-4">
            <Form.Label>Danh mục</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(event) =>
                setProductAdd({
                  ...productAdd,
                  category_id: event.target.value,
                })
              }
            >
              <option>Chọn danh mục</option>
              {categoryList &&
                categoryList.map((cateItem, index) => {
                  const { category } = cateItem;
                  const { id, name } = category;

                  return (
                    <option key={index} value={id}>
                      {name}
                    </option>
                  );
                })}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Giá sản phẩm</Form.Label>
            <Form.Control
              required
              onChange={(event) =>
                setProductAdd({ ...productAdd, price: event.target.value })
              }
              type="number"
              name="price"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Số lượng</Form.Label>
            <Form.Control
              required
              onChange={(event) =>
                setProductAdd({ ...productAdd, quantity: event.target.value })
              }
              type="number"
              name="quantity"
            />
          </Form.Group>

          <Form.Group className="position-relative mb-4">
            <Form.Label>Hình ảnh</Form.Label>
            <Form.Control
              type="file"
              required
              name="image"
              accept=".jpg, .jpeg, .png"
              onChange={(event) =>
                setProductAdd({ ...productAdd, image: event.target.files[0] })
              }
            />
          </Form.Group>

          <Form.Group className="position-relative mb-4">
            <Form.Label>Mô tả</Form.Label>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "200px" }}
                onChange={(event) =>
                  setProductAdd({ ...productAdd, detail: event.target.value })
                }
              />
            </FloatingLabel>
          </Form.Group>

          <Button className="btn btn-add" type="submit">
            Thêm mới
          </Button>
        </form>
      </div>
    </section>
  );
}

export default BlogAdd;
