const BASE = import.meta.env.VITE_API_URL;

export const getNotificationStats = async () => {
  const res = await fetch(`${BASE}/api/notifications/stats`);
  return res.json();
};

export const getNotifications = async ({ search, channel, startDate, endDate, page, limit = 5 }) => {
  const params = new URLSearchParams({ page, limit });
  if (search)    params.append("search", search);
  if (channel && channel !== "All Channel") params.append("channel", channel);
  if (startDate) params.append("startDate", startDate);
  if (endDate)   params.append("endDate", endDate);

  const res = await fetch(`${BASE}/api/notifications?${params}`);
  return res.json();
};

export const sendNotification = async (data) => {
  const res = await fetch(`${BASE}/api/notifications`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(data),
  });
  return res.json();
};