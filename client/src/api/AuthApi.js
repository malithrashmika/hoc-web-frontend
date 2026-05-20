const BASE = import.meta.env.VITE_API_URL;

export const loginRequest = async ({ email, password }) => {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};