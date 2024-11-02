import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import categoryApi from "../../../api/categoryApi";

function CategoryEdit() {
  const [cateItem, setCateItem] = useState(null);
  // const [attributes, setAttributes] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchCategoryItem = async () => {
        const response = await fetch(`/api/category/${id}`);
        const data = await response.json();

        if (data) {
          const { category } = data;

          if (category) {
            setCateItem(category);
          }

          // if (attribute?.lenth > 0) {
          //   setAttributes(attribute);
          // }
        }
      };

      fetchCategoryItem();
    }
  }, [id]);

  const handleUpdateCate = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", cateItem.name);
    formData.append("image", cateItem.image);

    const result = await categoryApi.updateCategory(id, formData);
    if (result) navigate("/admin/category");
  };

  return (
    <section className="block-category">
      <h3 className="title-admin">Cập nhập danh mục</h3>

      <div className="category-container background-radius">
        {cateItem && (
          <Form className="category-form" onSubmit={handleUpdateCate}>
            <Form.Group className="mb-4">
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={cateItem.name || ""}
                onChange={(event) =>
                  setCateItem({ ...cateItem, name: event.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="position-relative mb-4">
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept=".jpg, .jpeg, .png"
                onChange={(event) =>
                  setCateItem({ ...cateItem, image: event.target.files[0] })
                }
              />
            </Form.Group>
            <Button className="btn-add" type="submit">
              Cập nhập
            </Button>
          </Form>
        )}
      </div>
    </section>
  );
}

export default CategoryEdit;
