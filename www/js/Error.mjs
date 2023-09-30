import {$} from './$.mjs';

export const show = message => {
  $('error').innerText = `Fehler: ${message}`;
  $('error').style.display = '';
  console.log(`Error: ${message}`);
};
