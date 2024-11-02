const getListCategory = async () => {
  try {
    const response = await fetch("/api/category");
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const getCategoryById = async (category_id) => {
  try {
    const response = await fetch(`/api/category/${category_id}`);
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error get category id:", error);
  }
};

const createCategory = async (data) => {
  try {
    const response = await fetch("/api/category", {
      method: "POST",
      body: data,
    });
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error create category:", error);
    return error;
  }
};

const updateCategory = async (id, data) => {
  try {
    const response = await fetch(`/api/category/${id}`, {
      method: "PUT",
      body: data,
    });
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error update category:", error);
  }
};

const deleteCategory = async (id) => {
  try {
    const response = await fetch(`/api/category/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  } catch (error) {
    console.error("Error delete category:", error);
  }
};

const categoryApi = {
  getListCategory: getListCategory,
  createCategory: createCategory,
  updateCategory: updateCategory,
  deleteCategory: deleteCategory,
  getCategoryById: getCategoryById,
};

export default categoryApi;
