const $ = id => document.getElementById(id);
const $$ = query => document.querySelectorAll(query);

const storeLocalPersistent = async items => {
  items.forEach(item => localStorage.setItem(...Object.entries(item)[0]));

  if (navigator.storage && navigator.storage.persist) {
    const alreadyPersisted = await navigator.storage.persisted();
    const persistent = alreadyPersisted || (await navigator.storage.persist());
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

const signup = async event => {
  event.preventDefault();
  localStorage.clear();

  const response = await fetchJson('./api/signup.php', {
    method: 'POST',
    body: new FormData($('signup__form')),
  });

  if (response.status === 'success') {
    storeLocalPersistent([
      {email: $('signup__email').value},
      {devicename: $('signup__devicename').value},
      {devicepassword: $('signup__password').value},
      {deviceid: response.deviceid},
      {userid: response.userid},
    ]);
  } else if (response.status === 'error') {
    console.log(response.message);
  } else {
    console.log('FEHLER BEI DER REGISTRIERUNG!');
  }

  console.log(localStorage);
};

$('signup__password').value = randomString(32);
$('signup__button').addEventListener('click', signup);

const Sections = {};
Sections.hideAll = () =>
  $$('.mainSection').forEach(section => (section.style.display = 'none'));
Sections.show = section => {
  Sections.hideAll();
  $(section).style.display = '';
};

/* const Settings = {};
Settings.hideAll = () =>
  $$('.settings__article').forEach(article => (article.style.display = 'none'));
Settings.show = article => {
  Settings.hideAll();
  $(article).style.display = '';
}; */

const Device = {};

Device.isValid = async deviceData => {
  const response = await fetchJson('./api/validDevice.php', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(deviceData),
  });
  // console.log(php error)
  // return ???
};

Device.isUnconfirmed = async deviceData => {
  const response = await fetchJson('./api/unconfirmedDevice.php', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(deviceData),
  });
  // console.log(php error)
  // return ???
};

const deviceIsRegistered = () =>
  !!(
    localStorage.deviceid ||
    localStorage.devicepassword ||
    localStorage.email ||
    localStorage.devicename ||
    localStorage.userid
  );
const deviceIsConfirmed = () => {
  // localStorage.confirmed || checkIfConfirmed
};

const noGreatName = () => {
  if (!deviceIsRegistered()) {
    return Sections.show('signup');
  }

  if (!localStorage.deviceIsConfirmed) {
    Sections.show('pleaseConfirm');
  }

  const deviceData = {
    userid: localStorage.userid,
    deviceid: localStorage.deviceid,
    devicepassword: localStorage.devicepassword,
  };

  if (Device.isValid(deviceData)) return Sections.show('welcome');
  if (Device.isUnconfirmed(deviceData)) return Sections.show('pleaseConfirm');

  return Sections.show('invalidUser');
};

noGreatName();
