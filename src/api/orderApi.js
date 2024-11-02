const createCashOrder = async (infoOrder) => {
  console.log("Info Order:", infoOrder);

  try {
    const response = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...infoOrder }),
    });
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error create order:", error);
  }
};

const createTranferOrder = async (infoOrder) => {
  try {
    const response = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...infoOrder, bankCode: "" }),
    });
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error create order:", error);
  }
};

const getOrder = async (accessToken, orderId) => {
  try {
    const response = await fetch(`/api/order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error get order:", error);
  }
};

const getOrderList = async (accessToken) => {
  try {
    const response = await fetch("/api/order", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error get order list:", error);
  }
};

const updateStatusOrder = async (orderId, accessToken, status) => {
  try {
    const response = await fetch("/api/order/status", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId: orderId, status: status }),
    });

    if (response.ok) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error update status order:", error);
  }
};

const updateIsPayment = async (orderId, isPayment) => {
  try {
    const response = await fetch("/api/order/status/payment", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId: orderId, isPayment: isPayment }),
    });
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error update payment order:", error);
  }
};

const orderApi = {
  createCashOrder: createCashOrder,
  createTranferOrder: createTranferOrder,
  getOrder: getOrder,
  getOrderList: getOrderList,
  updateStatusOrder: updateStatusOrder,
  updateIsPayment: updateIsPayment,
};

export default orderApi;
