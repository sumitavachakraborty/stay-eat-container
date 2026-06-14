import { PROPERTIES, CATEGORIES, EXPERIENCES } from './fallbackData.js';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  return res.json();
}

export async function getProperties(params = {}) {
  try {
    const qs = new URLSearchParams(params).toString();
    const data = await apiFetch(`/properties${qs ? `?${qs}` : ''}`);
    // Normalise: accept { properties: [...] } or plain array
    return Array.isArray(data) ? data : (data.properties ?? PROPERTIES);
  } catch {
    return PROPERTIES;
  }
}

export async function getProperty(id) {
  try {
    const data = await apiFetch(`/properties/${id}`);
    return data.property ?? data;
  } catch {
    return PROPERTIES.find((p) => p.id === id) ?? PROPERTIES[0];
  }
}

export async function getCategories() {
  try {
    const data = await apiFetch('/categories');
    return Array.isArray(data) ? data : (data.categories ?? CATEGORIES);
  } catch {
    return CATEGORIES;
  }
}

export async function login(email, password) {
  // Does NOT fall back — login must hit the real API.
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  return data; // expects { token, user } or similar
}

export async function signup(email, password, name) {
  const data = await apiFetch('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
  });
  return data;
}

export { PROPERTIES as fallbackProperties, CATEGORIES as fallbackCategories, EXPERIENCES as fallbackExperiences };
