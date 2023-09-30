import {$, $$} from './$.mjs';

const hideAll = () =>
  $$('.mainSection').forEach(section => (section.style.display = 'none'));

const show = section => {
  hideAll();
  $(section)
    ? ($(section).style.display = '')
    : ($('notFound').style.display = '');
};

export {hideAll, show};
