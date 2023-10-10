import {$} from './$.mjs';
import {fetchJson, storeLocalPersistent, isValidEmail} from './Utils.mjs';
import * as Error from './Error.mjs';

const isRegistered = () =>
  !!(
    localStorage.deviceid &&
    localStorage.password &&
    localStorage.email &&
    localStorage.userid
  );

const isConfirmed = () => !!localStorage.confirmed;

const register = async data => {
  const result = await fetchJson('./api/devices', 'POST', data);

  if (result.httpResponseCode === 201) {
    storeLocalPersistent([
      {email: data.email},
      {devicename: data.devicename},
      {password: data.password},
      {deviceid: result.deviceid},
      {userid: result.userid},
    ]) ||
      (result.message = 'Zugangsdaten konnten nicht lokal gespeichert werden.');
  }

  return result;
};

const handleEmailInput = _ => {
  const email = $('signup__email');
  isValidEmail(email.value)
    ? email.classList.remove('input--invalid')
    : email.classList.add('input--invalid');
};

const handleRegistrationAttempt = async event => {
  event.preventDefault();
  localStorage.clear();

  const data = {
    email: $('signup__email').value,
    devicename: $('signup__devicename').value,
    password: $('signup__password').value,
  };

  const result = await register(data);

  result.message ? Error.show(result.message) : location.reload();
};

export {
  isRegistered,
  isConfirmed,
  register,
  handleEmailInput,
  handleRegistrationAttempt,
};
