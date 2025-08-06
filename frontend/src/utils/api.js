const BASE_URL = import.meta.env.VITE_API_URL;

// login + store JWT
export async function loginUser(username, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error('Login failed');

  const data = await res.json();
  localStorage.setItem('token', data.access_token);
}

// get categories with auth
export async function fetchCategories() {
  const token = localStorage.getItem('token');

  const res = await fetch(`${BASE_URL}/categories/`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!res.ok) throw new Error('Failed to fetch categories');

  return await res.json();
}
