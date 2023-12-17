import {$} from './$.mjs';
import {fetchJson} from './Utils.mjs';

const add = async event => {
  event.preventDefault();

  const farm = {
    farmname: $('addFarm__name').value,
    module_marketgarden: $('addFarm__moduleMarketgarden').checked ? 1 : 0,
    module_chicken: $('addFarm__moduleChicken').checked ? 1 : 0,
    module_goats: $('addFarm__moduleGoats').checked ? 1 : 0,
    module_bees: $('addFarm__moduleBees').checked ? 1 : 0,
    owner: localStorage.userid,
  };

  const {farmid} = await fetchJson('./api/farms', 'POST', farm);
  localStorage.selectedFarm = farmid;

  location.reload();
};

const updateModules = async event => {
  event.preventDefault();

  const farm = {
    operation: 'update_modules',
    farmid: document.querySelector('input[name="farm"]:checked').id,
    module_marketgarden: $('selectedFarm__moduleMarketgarden').checked ? 1 : 0,
    module_chicken: $('selectedFarm__moduleChicken').checked ? 1 : 0,
    module_goats: $('selectedFarm__moduleGoats').checked ? 1 : 0,
    module_bees: $('selectedFarm__moduleBees').checked ? 1 : 0,
  };

  await fetchJson('./api/farms', 'PATCH', farm);

  location.reload();
};

export {add, updateModules};
