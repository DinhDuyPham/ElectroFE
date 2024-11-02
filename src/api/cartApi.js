const initCart = async (access_token) => {
  try {
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error init cart:", error);
  }
};

const getCart = async (access_token) => {
  try {
    const response = await fetch("/api/cart", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error get cart:", error);
  }
};

const addCart = async (access_token, productInfo) => {
  try {
    const response = await fetch("/api/cart/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listItem: productInfo }),
    });
    return response.ok;
  } catch (error) {
    console.error("Error add cart:", error);
  }
};

const updateCart = async (access_token, infoUpdate) => {
  try {
    const response = await fetch("/api/cart/update", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listItem: infoUpdate }),
    });
    return response.ok;
  } catch (error) {
    console.error("Error update cart:", error);
  }
};

export const deleteCart = async (accessToken, cartItemId) => {
  try {
    const response = await fetch(`/api/cart/${cartItemId}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.ok;
  } catch (error) {
    console.error("Error delete cart:", error);
  }
};

const cartApi = {
  initCart: initCart,
  getCart: getCart,
  addCart: addCart,
  updateCart: updateCart,
  deleteCart: deleteCart,
};

export default cartApi;
