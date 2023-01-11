import { get } from './httpService';

export function getPosts(pageSize, pageNumber) {
  return get(`/posts?page_size=${pageSize}&page_number=${pageNumber}`);
}
