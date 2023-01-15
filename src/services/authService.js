import jwtDecode from 'jwt-decode';
import { authToken } from '../../config.json';
import { httpPost } from './httpService';

export function getTokenData() {
  const token = localStorage.getItem(authToken);
  if (!token) return null;
  return jwtDecode(token);
}

export function getAuthToken() {
  return localStorage.getItem(authToken);
}

export function setAuthToken(token) {
  localStorage.setItem(authToken, token);
}

export function removeToken() {
  localStorage.removeItem(authToken);
}

export async function register(userData) {
  const { token } = await httpPost('/users/register', userData);
  setAuthToken(token);
  window.location.replace('/dashboard');
}

export async function login(loginData) {
  const { token } = await httpPost('/users/login', loginData);
  setAuthToken(token);
}

export function logout() {
  removeToken();
  window.location.replace('/login');
}

// export { getAuthToken, setAuthToken };
