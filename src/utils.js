export function domainRoot() {
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.host}`;
  } else {
    return process.env.URL;
  }
}

export function randomId() {
  return Math.random().toString(36).substr(2, 9);
}
