const getListProduct = async () => {
  try {
    const response = await fetch("/api/product");
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const getListProductByCategory = async (category_id) => {
  try {
    const response = await fetch(`/api/product/category/${category_id}`);
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error list products by category:", error);
  }
};

const getProductById = async (product_id) => {
  try {
    const response = await fetch(`/api/product/${product_id}`);
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error get product by id:", error);
  }
};

const createProduct = async (data) => {
  try {
    const response = await fetch("/api/product", {
      method: "POST",
      body: data,
    });
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error create product:", error);
  }
};

const updateProduct = async (id, data) => {
  try {
    const response = await fetch(`/api/product/${id}`, {
      method: "PUT",
      body: data,
    });
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error update product:", error);
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await fetch(`/api/product/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  } catch (error) {
    console.error("Error delete product:", error);
  }
};

const filterProduct = async (category_id, priceMin, priceMax) => {
  try {
    const response = await fetch(
      `/api/product/filter/${category_id}/${priceMin}/${priceMax}`,
    );
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error filter product:", error);
  }
};

const searchProduct = async (keyword) => {
  try {
    const response = await fetch(`/api/product/search/${keyword}`);
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error search product:", error);
  }
};

const recommendProduct = async () => {
  console.log("recommendProduct");
};

const newProduct = async () => {
  try {
    const response = await fetch("/api/product/new");
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const topSelling = async () => {
  try {
    const response = await fetch("/api/product/topsell");
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const productApi = {
  getListProduct: getListProduct,
  getListProductByCategory: getListProductByCategory,
  getProductById: getProductById,
  createProduct: createProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  filterProduct: filterProduct,
  searchProduct: searchProduct,
  recommendProduct: recommendProduct,
  newProduct: newProduct,
  topSelling: topSelling,
};

export default productApi;
