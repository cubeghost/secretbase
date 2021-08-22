export function domainRoot() {
  return `${window.location.protocol}//${window.location.host}`;
}

export function randomId() {
  return Math.random().toString(36).substr(2, 9);
}
