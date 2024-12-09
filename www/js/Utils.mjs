export const storeLocalPersistent = async items => {
  items.forEach(item => localStorage.setItem(...Object.entries(item)[0]));

  if (navigator.storage && navigator.storage.persist) {
    const alreadyPersisted = await navigator.storage.persisted();
    const persistent = alreadyPersisted || (await navigator.storage.persist());
    return persistent;
  }
  return false;
};

export const fetchJson = async (url, method, jsonBody = {}, headers = {}) => {
  const options = {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Token: localStorage.token || '',
      ...headers,
    },
  };
  if (method !== 'GET') {
    options.body = JSON.stringify(jsonBody);
  }
  const response = await fetch(url, options);
  const json = await response.json();
  json.httpResponseCode = response.status;
  return json;
};

export const isValidEmail = email => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const randomString = length => {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const string = new Array(length)
    .fill(0)
    .map(_ => {
      const uint32max = 2 ** 32;
      const limit = uint32max - (uint32max % chars.length);
      let r;
      do {
        r = crypto.getRandomValues(new Uint32Array(1))[0];
      } while (r > limit);
      return chars[r % chars.length];
    })
    .join('');
  return string;
};

export const deepFreeze = object => {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === 'object') deepFreeze(value);
  }
  return Object.freeze(object);
};
