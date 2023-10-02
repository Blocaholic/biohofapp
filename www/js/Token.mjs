import {fetchJson, storeLocalPersistent} from './Utils.mjs';

export const get = async () => {
  if (!localStorage.deviceid) return false;
  if (!localStorage.password) return false;
  const data = {password: localStorage.password};
  const result = await fetchJson(
    `./api/auth/${localStorage.deviceid}`,
    'POST',
    data
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

export const isExpired = () => {
  if (!localStorage.token) return true;
  const ageInSeconds =
    Math.floor(Date.now() / 1000) -
    JSON.parse(atob(localStorage.token.split('.')[1])).iat;
  if (ageInSeconds > 600) return true;
  return false;
};
