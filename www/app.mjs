const $ = id => document.getElementById(id);
const $$ = query => document.querySelectorAll(query);

const saveCredentialsPersistent = async (username, password) => {
  localStorage.setItem('username', username);
  localStorage.setItem('password', password);
  if (navigator.storage && navigator.storage.persist) {
    const alreadyPersisted = await navigator.storage.persisted();
    const persistent = alreadyPersisted || (await navigator.storage.persist());
    console.log(`persistent storage: ${persistent}`);
    return persistent;
  }
  return false;
};
