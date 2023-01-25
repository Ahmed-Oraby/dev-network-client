export default function formatName(userName) {
  if (userName.length > 7) {
    return userName.slice(0, 5) + '...';
  }
  return userName;
}
