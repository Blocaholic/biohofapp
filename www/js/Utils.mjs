export const storeLocalPersistent = async items => {
  items.forEach(item => localStorage.setItem(...Object.entries(item)[0]));

  if (navigator.storage && navigator.storage.persist) {
    const alreadyPersisted = await navigator.storage.persisted();
    const persistent = alreadyPersisted || (await navigator.storage.persist());
    return persistent;
  }
  return false;
};

export const fetchJson = async (url, method, jsonBody) => {
  const options = {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonBody),
  };
  const response = await fetch(url, options);
  const json = await response.json();
  json.httpResponseCode = response.status;
  return json;
};

export const isValidEmail = email => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
