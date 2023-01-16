import { httpDelete, httpGet, httpPost } from './httpService';

export function getPosts(pageSize, pageNumber) {
  return httpGet(`/posts?page_size=${pageSize}&page_number=${pageNumber}`);
}

export function createPost(text) {
  return httpPost('/posts', { text });
}

export function addComment(postId, text) {
  return httpPost(`/posts/comment/${postId}`, { text }, 'PUT');
}

export function likePost(postId) {
  return httpPost(`/posts/like/${postId}`, {}, 'PUT');
}

export function unLikePost(postId) {
  return httpPost(`/posts/unlike/${postId}`, {}, 'PUT');
}

export function deletePost(postId) {
  return httpDelete(`/posts/${postId}`);
}

export function editPost(postId, text) {
  return httpPost(`/posts/${postId}`, { text }, 'PUT');
}

export function deleteComment(postId, commentId) {
  return httpDelete(`/posts/comments/${postId}/${commentId}`);
}

export function editComment(postId, commentId, text) {
  return httpPost(`/posts/comments/${postId}/${commentId}`, { text }, 'PUT');
}
