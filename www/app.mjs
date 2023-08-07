const $ = id => document.getElementById(id);
const $$ = query => document.querySelectorAll(query);

const storeLocalPersistent = async items => {
  items.forEach(item => localStorage.setItem(...Object.entries(item)[0]));

  if (navigator.storage && navigator.storage.persist) {
    const alreadyPersisted = await navigator.storage.persisted();
    const persistent = alreadyPersisted || (await navigator.storage.persist());
    console.log(`persistent storage: ${persistent}`);
    return persistent;
  }
  return false;
};

const fetchJson = async (url, options) => {
  const response = await fetch(url, options);
  const json = await response.json();
  return json;
};

const randomString = length => {
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
