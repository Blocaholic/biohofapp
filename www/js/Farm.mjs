import {$} from './$.mjs';
import {fetchJson} from './Utils.mjs';

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

  const {farmid} = await fetchJson('./api/farms', 'POST', farm);
  localStorage.selectedFarm = farmid;
  localStorage.modules = JSON.stringify(modules);

  location.reload();
};

const addUser = async event => {
  event.preventDefault();
  const email = $('addUser__email').value;
  const role = [...document.getElementsByName('addUser__role')].filter(
    node => node.checked
  )[0].value;

  const patchData = {
    email,
    role,
    operation: 'add_member',
    farmid: localStorage.selectedFarm,
  };

  console.log(patchData);

  await fetchJson('./api/farms', 'PATCH', patchData);

  // add user
  // if user dont exist: return 'user must first register'

  // location.reload();
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

export {add, addUser, updateModules};
