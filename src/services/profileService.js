import { httpGet, httpPost } from './httpService';

export function createProfile(profile) {
  return httpPost('/profile', profile);
}

export function getOwnProfile() {
  return httpGet('/profile/me');
}

export function getUserProfile(userId) {
  return httpGet(`/profile/user/${userId}`);
}
