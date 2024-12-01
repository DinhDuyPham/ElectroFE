import { useEffect, useState } from "react";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import blogApi from "../../../api/blogApi";

function BlogEdit() {
  const [blogItem, setblogItem] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchblogItem = async () => {
        const data = await blogApi.getBlogById(id);

        if (data) setblogItem(data);
      };

      fetchblogItem();
    }
  }, [id]);

 

  const handleUpdateBlog = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", blogItem.title);
    formData.append("image", blogItem.image);
    formData.append("author", blogItem.author);
    formData.append("content", blogItem.content);

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "put",
        body: formData,
      });

      if (response.ok) navigate("/admin/blog");
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
        {blogItem && (
          <Form className="product-form" onSubmit={handleUpdateBlog}>
            <Form.Group className="mb-4">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={blogItem.title}
                onChange={(event) =>
                  setblogItem({ ...blogItem, title: event.target.value })
                }
              />
            </Form.Group>

         

            <Form.Group className="mb-4">
              <Form.Label>Tác giả</Form.Label>
              <Form.Control
                onChange={(event) =>
                  setblogItem({ ...blogItem, author: event.target.value })
                }
                type="text"
                name="price"
                value={blogItem.author}
              />
            </Form.Group>

      

            <Form.Group className="position-relative mb-4">
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={(event) =>
                  setblogItem({
                    ...blogItem,
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
                  value={blogItem.content}
                  onChange={(event) =>
                    setblogItem({
                      ...blogItem,
                      content: event.target.value,
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
