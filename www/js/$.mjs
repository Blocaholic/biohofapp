const $ = id => document.getElementById(id);
const $$ = query => [...document.querySelectorAll(query)];

const $show = element =>
  typeof element === 'object'
    ? (element.style.display = '')
    : ($(element).style.display = '');

const $hide = element =>
  typeof element === 'object'
    ? (element.style.display = 'none')
    : ($(element).style.display = 'none');

export {$, $$, $show, $hide};
