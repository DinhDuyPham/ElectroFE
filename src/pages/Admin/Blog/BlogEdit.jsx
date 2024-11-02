import { useEffect, useState } from "react";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import productApi from "../../../api/productApi";
import categoryApi from "../../../api/categoryApi";

function BlogEdit() {
  const [productItem, setProductItem] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchProductItem = async () => {
        const data = await productApi.getProductById(id);

        if (data) setProductItem(data);
      };

      fetchProductItem();
    }
  }, [id]);

  const fetchListCate = async () => {
    const data = await categoryApi.getListCategory();

    if (data?.length > 0) setCategoryList(data);
  };

  useEffect(() => {
    fetchListCate();
  }, []);

  const handleUpdateProduct = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", productItem.name);
    formData.append("category_id", productItem.category_id);
    formData.append("image", productItem.image);
    formData.append("detail", productItem.detail);
    formData.append("price", productItem.price);
    formData.append("qty", productItem.quantity);

    try {
      const response = await fetch(`/api/product/${id}`, {
        method: "put",
        body: formData,
      });

      if (response.ok) navigate("/admin/product");
    } catch (error) {
      toast.error("Thêm sản phẩm thất bại");
      console.error("Submission failed:", error);
    }
  };

  return (
    <section className="block-product">
      <ToastContainer position="top-right" autoClose={3000} />
      <h3 className="title-admin">Cập nhập sản phẩm</h3>

      <div className="product-container background-radius">
        {productItem && (
          <Form className="product-form" onSubmit={handleUpdateProduct}>
            <Form.Group className="mb-4">
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={productItem.name}
                onChange={(event) =>
                  setProductItem({ ...productItem, name: event.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="position-relative mb-4">
              <Form.Label>Danh mục</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(event) =>
                  setProductItem({
                    ...productItem,
                    category_id: event.target.value,
                  })
                }
                value={productItem.category_id}
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
                onChange={(event) =>
                  setProductItem({ ...productItem, price: event.target.value })
                }
                type="number"
                name="price"
                value={productItem.price}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Số lượng</Form.Label>
              <Form.Control
                onChange={(event) =>
                  setProductItem({ ...productItem, quantity: event.target.value })
                }
                type="number"
                name="quantity"
                value={productItem.qty}
              />
            </Form.Group>

            <Form.Group className="position-relative mb-4">
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={(event) =>
                  setProductItem({
                    ...productItem,
                    image: event.target.files[0],
                  })
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
                  value={productItem.detail}
                  onChange={(event) =>
                    setProductItem({
                      ...productItem,
                      detail: event.target.value,
                    })
                  }
                />
              </FloatingLabel>
            </Form.Group>

            <Button className="btn btn-add" type="submit">
              Cập nhập
            </Button>
          </Form>
        )}
      </div>
    </section>
  );
}

export default BlogEdit;
