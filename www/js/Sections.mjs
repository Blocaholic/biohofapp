import {$, $$, $hide, $show} from './$.mjs';

const hideAll = () => $$('.mainSection').forEach(section => $hide(section));

const show = section => {
  hideAll();
  $(section) ? $show(section) : $show('notFound');
};

export {hideAll, show};
