import {$, $show} from './$.mjs';

export const show = message => {
  $('error').innerText = `Fehler: ${message}`;
  $show('error');
  console.log(`Error: ${message}`);
};
