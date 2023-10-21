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

  await fetchJson('./api/farms', 'POST', farm);

  location.reload();
};

export {add};