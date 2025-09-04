import axios from "axios";

const API_BASE = "http://10.0.2.2:3001/api";

export const getTransactionsByHisab = async (
  hisabId,
  token,
  page = 1,
  limit = 20
) => {
  try {
    const url = `${API_BASE}/transactions/Hisab/${hisabId}`;
    console.log("GET transactions URL:", url);
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        limit,
        sort_by: "date",
        sort_order: "desc",
      },
    });
    console.log("Transactions status:", res.status);
    const list = res.data?.data?.transactions || [];
    console.log("Transactions count:", Array.isArray(list) ? list.length : 0);
    return list;
  } catch (error) {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || error?.message;
    console.error("Error fetching transactions by hisab:", status, message);
    throw new Error(message || "Failed to fetch transactions");
  }
};


