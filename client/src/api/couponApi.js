const BASE = import.meta.env.VITE_API_URL;

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getCouponStats = async () => {
  const res = await fetch(`${BASE}/api/coupons/stats`, { headers: authHeaders() });
  return res.json();
};

export const getCoupons = async ({ status, type, startDate, endDate, page, limit = 4 }) => {
  const params = new URLSearchParams({ page, limit });
  if (status && status !== "All")  params.append("status", status);
  if (type   && type   !== "All")  params.append("type", type);
  if (startDate) params.append("startDate", startDate);
  if (endDate)   params.append("endDate", endDate);

  const res = await fetch(`${BASE}/api/coupons?${params}`, { headers: authHeaders() });
  return res.json();
};

export const getCouponById = async (id) => {
  const res = await fetch(`${BASE}/api/coupons/${id}`, { headers: authHeaders() });
  return res.json();
};

export const createCoupon = async (data) => {
  const res = await fetch(`${BASE}/api/coupons`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateCoupon = async (id, data) => {
  const res = await fetch(`${BASE}/api/coupons/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteCoupon = async (id) => {
  const res = await fetch(`${BASE}/api/coupons/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return res.json();
};