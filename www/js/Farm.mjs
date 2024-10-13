import {$} from './$.mjs';
import {fetchJson} from './Utils.mjs';
import * as Error from './Error.mjs';

const add = async event => {
  event.preventDefault();

  const modules = {
    module_marketgarden: $('addFarm__moduleMarketgarden').checked ? 1 : 0,
    module_chicken: $('addFarm__moduleChicken').checked ? 1 : 0,
    module_goats: $('addFarm__moduleGoats').checked ? 1 : 0,
    module_bees: $('addFarm__moduleBees').checked ? 1 : 0,
  };

  const farm = {
    ...modules,
    farmname: $('addFarm__name').value,
    owner: localStorage.userid,
  };

  const result = await fetchJson('./api/farms', 'POST', farm);

  if (result.message) return Error.show(result.message);

  localStorage.selectedFarm = result.farmid;
  localStorage.modules = JSON.stringify(modules);

  location.reload();
};

const addUser = async event => {
  event.preventDefault();

  const role = [...document.getElementsByName('addUser__role')].filter(
    node => node.checked
  )[0].value;

  const patchData = {
    operation: 'add_member',
    email: $('addUser__email').value,
    role,
    farmid: localStorage.selectedFarm,
  };

  const result = await fetchJson('./api/farms', 'PATCH', patchData);

  result.error?.message ? Error.show(result.error.message) : location.reload();
};

const updateUserPermissions = async event => {
  event.preventDefault();

  const role = [
    ...document.getElementsByName('updateUserPermissions__role'),
  ].filter(node => node.checked)[0].value;

  const patchData = {
    operation: 'update_member',
    email: $('updateUserPermissions__email').innerText,
    userid: $('updateUserPermissions__userid').innerText.slice(9),
    role,
    farmid: localStorage.selectedFarm,
  };

  const result = await fetchJson('./api/farms', 'PATCH', patchData);

  result.message ? Error.show(result.message) : location.reload();
};

const updateModules = async event => {
  event.preventDefault();

  const modules = {
    module_marketgarden: $('selectedFarm__moduleMarketgarden').checked ? 1 : 0,
    module_chicken: $('selectedFarm__moduleChicken').checked ? 1 : 0,
    module_goats: $('selectedFarm__moduleGoats').checked ? 1 : 0,
    module_bees: $('selectedFarm__moduleBees').checked ? 1 : 0,
  };

  const farm = {
    ...modules,
    operation: 'update_modules',
    farmid: document.querySelector('input[name="farm"]:checked').id,
  };

  await fetchJson('./api/farms', 'PATCH', farm);
  localStorage.modules = JSON.stringify(modules);

  location.reload();
};

const rename = async event => {
  event.preventDefault();

  const farm = {
    operation: 'rename',
    farmid: localStorage.selectedFarm,
    farmname: $('editFarm__name').value,
  };
  const result = await fetchJson('./api/farms', 'PATCH', farm);

  result.message ? Error.show(result.message) : location.reload();
};

const erase = async event => {
  event.preventDefault();

  const farmid = localStorage.selectedFarm;
  const result = await fetchJson(`./api/farms/${farmid}`, 'DELETE');
  localStorage.selectedFarm = '';

  result.message || result.error?.message
    ? Error.show(result.message || result.error?.message)
    : location.reload();
};

export {add, addUser, updateUserPermissions, updateModules, rename, erase};
