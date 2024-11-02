import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import categoryApi from "../../../api/categoryApi";

function CategoryAdd() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const [formGroups, setFormGroups] = useState([]);
  const [listAttributeCode, setListAttributeCode] = useState({});
  const [listAttribute, setListAttribute] = useState({});

  const handleAddAttribute = () => {
    const newId = `attr_${Date.now()}`;
    setFormGroups([
      ...formGroups,
      {
        id: newId,
        label_attribute_code: `Mã thuộc tính ${formGroups.length + 1}`,
        name_attribute_code: `attribute_code_${newId}`,
        label_attribute: `Thuộc tính ${formGroups.length + 1}`,
        name_attribute: `attribute_${newId}`,
        type: "text",
      },
    ]);
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleFileImage = (event) => {
    setImage(event.target.files[0]);
  };

  const handleAttributeCodeChange = (event, id) => {
    listAttributeCode[id] = event.target.value;
    setListAttributeCode({ ...listAttributeCode });
  };

  const handleAttributeChange = (event, id) => {
    listAttribute[id] = event.target.value;
    setListAttribute({ ...listAttribute });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name !== "" && image !== "") {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);

      if (Object.keys(listAttribute).length > 0) {
        const attributes = Object.keys(listAttribute).map((key) => ({
          code_name: listAttributeCode[key],
          name: listAttribute[key],
        }));
        formData.append("attributes", JSON.stringify(attributes));
      }

      const result = await categoryApi.createCategory(formData);

      if (result) {
        navigate("/admin/category");
      } else {
        toast.error("Có lỗi khi thêm mới dữ liệu.");
      }
    }
  };

  return (
    <section className="block-category" data-index="2">
      <ToastContainer position="top-right" autoClose={3000} />
      <h3 className="title-admin">Thêm mới danh mục</h3>

      <div className="category-container background-radius">
        <Form className="category-form" onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label>Tên danh mục</Form.Label>
            <Form.Control
              required
              type="text"
              value={name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="position-relative mb-4">
            <Form.Label>Hình ảnh</Form.Label>
            <Form.Control required type="file" onChange={handleFileImage} />
          </Form.Group>

          {formGroups.map((group) => (
            <div className="row" key={group.id}>
              <div className="col-6">
                <Form.Group className="mb-4">
                  <Form.Label>{group.label_attribute_code}</Form.Label>
                  <Form.Control
                    type={group.type}
                    onChange={(event) =>
                      handleAttributeCodeChange(event, group.id)
                    }
                  />
                </Form.Group>
              </div>
              <div className="col-6">
                <Form.Group className="mb-4">
                  <Form.Label>{group.label_attribute}</Form.Label>
                  <Form.Control
                    type={group.type}
                    onChange={(event) => handleAttributeChange(event, group.id)}
                  />
                </Form.Group>
              </div>
            </div>
          ))}

          <Button className="btn btn-add mr-4" type="submit">
            Thêm mới
          </Button>
          <Button
            className="btn btn-add"
            type="button"
            onClick={handleAddAttribute}
          >
            Thêm thuộc tính
          </Button>
        </Form>
      </div>
    </section>
  );
}

export default CategoryAdd;
