import {$, $$} from './js/$.mjs';
import * as Sections from './js/Sections.mjs';
import * as Device from './js/Device.mjs';
import * as Utils from './js/Utils.mjs';
import * as Token from './js/Token.mjs';

const makeLinksFocusable = () => {
  $$('.link').forEach(link => link.setAttribute('tabindex', '0'));
};

const handleInternalLinks = () => {
  $('mainNav__home').addEventListener('click', _ => location.reload());
  $('mainNav__home').addEventListener('keyup', event => {
    if (event.key === 'Enter') location.reload();
  });
  $$('.link').forEach(link =>
    link.addEventListener('click', _ => Sections.show(link.dataset.target))
  );
  $$('.link').forEach(link =>
    link.addEventListener('keyup', event => {
      if (event.key === 'Enter') Sections.show(link.dataset.target);
    })
  );
};

const init = () => {
  makeLinksFocusable();
  handleInternalLinks();
  $('signup__password').value = Utils.randomString(32);
  $('signup__button').addEventListener(
    'click',
    Device.handleRegistrationAttempt
  );
  $('signup__email').addEventListener('input', Device.handleEmailInput);
};

const main = async () => {
  if (!Device.isRegistered()) return Sections.show('signup');
  if (!Device.isConfirmed() || !localStorage.token || Token.isExpired())
    await Token.get();
  if (!Device.isConfirmed()) return Sections.show('pleaseConfirm');

  return Sections.show('welcome');
};

init();
main();
