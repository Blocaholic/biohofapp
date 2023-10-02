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

export const isExpired = () => {};
