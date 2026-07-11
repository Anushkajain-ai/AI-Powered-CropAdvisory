const API = import.meta.env.VITE_API_URL;

// Register
export async function registerUser(userData) {
  const res = await fetch(`${API}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
}

// Login
export async function loginUser(userData) {
  const res = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  // Save JWT
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
}

// Logout
export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

// Check login
export function isLoggedIn() {
  return !!localStorage.getItem("token");
}