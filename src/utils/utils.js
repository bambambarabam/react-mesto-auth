export const BASE_URL = 'https://api.mestotech.xyz';

export const response = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`error${res.status}`);
}