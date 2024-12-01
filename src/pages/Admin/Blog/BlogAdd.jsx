import { useEffect, useState } from "react";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import categoryApi from "../../../api/categoryApi";
import blogApi from "../../../api/blogApi";
function BlogAdd() {

  const [blogAdd, setblogAdd] = useState({
    title: "",
    image: "",
    author: "",
    content: "",
    image: null,
  });
  const navigate = useNavigate();



  const handleSubmit = async () => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", blogAdd.title);
    formData.append("image", blogAdd.image);
    formData.append("author", blogAdd.author);
    formData.append("content", blogAdd.content);

    const result = await blogApi.createBlog(formData);

    if (result) {
      navigate("/admin/blog");
    } else {
      toast.error("Có lỗi khi thêm mới dữ liệu.");
    }
  };



  return (
    <section className="block-product">
      <ToastContainer position="top-right" autoClose={3000} />
      <h3 className="title-admin">Thêm mới Blog</h3>

      <div className="product-container background-radius">
        <form className="product-form" onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label> Tiêu đề</Form.Label>
            <Form.Control
              required
              onChange={(event) =>
                setblogAdd({ ...blogAdd, title: event.target.value })
              }
              type="text"
              name="title"
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
                setblogAdd({ ...blogAdd, image: event.target.files[0] })
              }
            />
          </Form.Group>
 

          <Form.Group className="mb-4">
            <Form.Label>Tác giả</Form.Label>
            <Form.Control
              required
              onChange={(event) =>
                setblogAdd({ ...blogAdd, author: event.target.value })
              }
              type="text"
              name="author"
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
                  setblogAdd({ ...blogAdd, content: event.target.value })
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
