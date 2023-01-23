import { httpDelete, httpGet, httpPost } from './httpService';

export function createProfile(profile) {
  return httpPost('/profile', profile);
}

export function getOwnProfile() {
  return httpGet('/profile/me');
}

export function getUserProfile(userId) {
  return httpGet(`/profile/user/${userId}`);
}

export function getAllProfiles(pageSize, pageNumber) {
  return httpGet(`/profile?page_size=${pageSize}&page_number=${pageNumber}`);
}

export function addEducation(education) {
  return httpPost('/profile/education', education, 'PUT');
}

export function removeEducation(educationId) {
  return httpDelete(`/profile/education/${educationId}`);
}

export function addExperience(experience) {
  return httpPost('/profile/experience', experience, 'PUT');
}

export function removeExperience(experienceId) {
  return httpDelete(`/profile/experience/${experienceId}`);
}
