import jwtDecode from 'jwt-decode';
import { authToken } from '../../config.json';
import * as http from './httpService';

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

export async function login(loginData) {
  const { token } = await http.post('/users/login', loginData);
  setAuthToken(token);
}

// export { getAuthToken, setAuthToken };
