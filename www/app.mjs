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
