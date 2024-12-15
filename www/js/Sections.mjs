import {$, $$, $hide, $show} from './$.mjs';
import * as Bedblocks from './Bedblocks.mjs';
import * as Error from './Error.mjs';

const hideAll = () => $$('.mainSection').forEach(section => $hide(section));

const show = section => {
  Error.hide();
  hideAll();
  $('addBedblock__preview')?.remove();
  Bedblocks.resetSVGviewBox();
  $('settings__bedblocks').appendChild($('settings__bedblocksSVG'));
  $(section) ? $show(section) : $show('notFound');
  if (section !== 'pleaseConfirm') localStorage.lastPage = section;
};

export {hideAll, show};
