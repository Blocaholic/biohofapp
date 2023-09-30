const $ = id => document.getElementById(id);
const $$ = query => document.querySelectorAll(query);

const isValidEmail = email => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const storeLocalPersistent = async items => {
  items.forEach(item => localStorage.setItem(...Object.entries(item)[0]));

  if (navigator.storage && navigator.storage.persist) {
    const alreadyPersisted = await navigator.storage.persisted();
    const persistent = alreadyPersisted || (await navigator.storage.persist());
    return persistent;
  }
  return false;
};

const fetchJson = async (url, method, jsonBody) => {
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

const Sections = {};

Sections.hideAll = () =>
  $$('.mainSection').forEach(section => (section.style.display = 'none'));

Sections.show = section => {
  Sections.hideAll();
  $(section)
    ? ($(section).style.display = '')
    : ($('notFound').style.display = '');
};

const Device = {};

Device.isRegistered = () =>
  !!(
    localStorage.deviceid &&
    localStorage.devicepassword &&
    localStorage.email &&
    localStorage.userid
  );

Device.isConfirmed = () => !!localStorage.confirmed;

Device.register = async data => {
  const result = await fetchJson('./api/devices', 'POST', data);

  if (result.httpResponseCode === 201) {
    storeLocalPersistent([
      {email: data.email},
      {devicename: data.devicename},
      {devicepassword: data.password},
      {deviceid: result.deviceid},
      {userid: result.userid},
    ]) ||
      (result.message = 'Zugangsdaten konnten nicht lokal gespeichert werden.');
  }

  return result;
};

Device.handleRegistrationAttempt = async event => {
  event.preventDefault();
  localStorage.clear();

  const data = {
    email: $('signup__email').value,
    devicename: $('signup__devicename').value,
    password: $('signup__password').value,
  };

  const result = await Device.register(data);

  result.message ? Error.show(result.message) : location.reload();
};

const Error = {};

Error.show = message => {
  $('error').innerText = `Fehler: ${message}`;
  $('error').style.display = '';
  console.log(`Error: ${message}`);
};

Error.reset = () => {
  $('error').style.display = 'none';
  $('error').innerText = '';
};

const Token = {};

Token.get = () => {};
Token.isExpired = () => {};

const Signup = {};

Signup.handleEmailInput = _ => {
  const email = $('signup__email');
  isValidEmail(email.value)
    ? email.classList.remove('input--invalid')
    : email.classList.add('input--invalid');
};

const makeLinksFocusable = () => {
  [...$$('.link')].forEach(link => link.setAttribute('tabindex', '0'));
};

const handleInternalLinks = () => {
  $('mainNav__home').addEventListener('click', _ => location.reload());
  $('mainNav__home').addEventListener('keyup', event => {
    if (event.key === 'Enter') location.reload();
  });
  [...$$('.link')].forEach(link =>
    link.addEventListener('click', _ => Sections.show(link.dataset.target))
  );
  [...$$('.link')].forEach(link =>
    link.addEventListener('keyup', event => {
      if (event.key === 'Enter') Sections.show(link.dataset.target);
    })
  );
};

const init = () => {
  makeLinksFocusable();
  handleInternalLinks();
  $('signup__password').value = randomString(32);
  $('signup__button').addEventListener(
    'click',
    Device.handleRegistrationAttempt
  );
  $('signup__email').addEventListener('input', Signup.handleEmailInput);
};

const main = () => {
  if (!Device.isRegistered()) return Sections.show('signup');
  if (!Device.isConfirmed()) return Sections.show('pleaseConfirm');
  if (!localStorage.token || Token.isExpired()) Token.get();

  // if (PATH is 'CONFIRM/ID/CONFIRMATIONPASSWORD') { check if correct && localStorage.confirmed = true}

  return Sections.show('welcome');
};

init();
main();
