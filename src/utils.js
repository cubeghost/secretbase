export function domainRoot() {
  const directory = process.env.NODE_ENV === 'production' ? '/secretbase' : '';
  return `${window.location.protocol}//${window.location.host}${directory}`;
}

export function randomId() {
  return Math.random().toString(36).substr(2, 9);
}
