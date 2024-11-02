const revenueChart = async (infoRevenue) => {
  try {
    const response = await fetch("/api/revenue/calc", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...infoRevenue }),
    });
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error revenue:", error);
  }
};

const exportRevenue = async (startDate, endDate) => {
	try {
		const response = await fetch("/api/revenue/exportCSV", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({startDate, endDate}),
		});
		const body = await response.json();
    return body;
	} catch (error) {
		console.error("Error export revenue:", error);
	}
}

const revenueApi = {
  revenueChart: revenueChart,
	exportRevenue: exportRevenue
};

export default revenueApi;
