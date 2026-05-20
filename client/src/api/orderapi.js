const BASE = import.meta.env.VITE_API_URL;

export const getOrderStats = async () => {
  const res = await fetch(`${BASE}/api/orders/stats`);
  return res.json();
};

export const getOrders = async ({ status, search, page, limit = 6 }) => {
  const params = new URLSearchParams({ page, limit });
  if (status && status !== "ALL") params.append("status", status);
  if (search) params.append("search", search);

  const res = await fetch(`${BASE}/api/orders?${params}`);
  return res.json();
};

export const updateOrderStatus = async (id, status) => {
  const res = await fetch(`${BASE}/api/orders/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res.json();
};