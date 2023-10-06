import {fetchJson, storeLocalPersistent} from './Utils.mjs';

export const get = async () => {
  if (!localStorage.deviceid) return false;
  if (!localStorage.password) return false;
  const body = {password: localStorage.password};
  const result = await fetchJson(
    `./api/auth/${localStorage.deviceid}`,
    'POST',
    body
  );

  if (+localStorage.deviceid !== result.deviceid) return false;
  if (result.httpResponseCode !== 201) return false;
  if (!result.token) return false;

  const success = await storeLocalPersistent([
    {confirmed: true},
    {token: result.token},
  ]);
  return success;
};

export const expiresSoon = () => {
  if (!localStorage.token) return true;

  const now = Math.floor(Date.now() / 1000);
  const expiration = JSON.parse(atob(localStorage.token.split('.')[1])).exp;
  const secondsUntilExpiration = expiration - now;

  if (secondsUntilExpiration < 15) return true;
  return false;
};
