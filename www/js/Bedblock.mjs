import {$} from './$.mjs';
import {fetchJson} from './Utils.mjs';
import * as Error from './Error.mjs';

const add = async event => {
  event.preventDefault();

  const bedblock = {
    name: $('addBedblock__name').value,
    farmid: localStorage.selectedFarm,
    bedwidth: $('addBedblock__bedwidth').value,
    bedlength: $('addBedblock__bedlength').value,
    number: $('addBedblock__number').value,
    gap: $('addBedblock__gap').value,
    y: $('addBedblock__y').value,
    x: $('addBedblock__x').value,
    orientation: $('addBedblock__orientation').value,
    start: $('addBedblock__start').value,
    end: $('addBedblock__end').value,
  };

  const result = await fetchJson('./api/bedblock', 'POST', bedblock);
  if (result.message) return Error.show(result.message);

  location.reload();
};

export {add};
