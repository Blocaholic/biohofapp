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

const titlebarIsVisible = _ =>
  !navigator?.windowControlsOverlay?.visible &&
  navigator?.userAgentData?.mobile === false;

const debounce = (func, wait) => {
  let timeout;
  return function calledWhenEventFires(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const resetApp = () => {
  localStorage.clear();
  location.reload();
};

const init = () => {
  $('mainNav__homeText').style.display = titlebarIsVisible() ? 'none' : '';
  navigator?.windowControlsOverlay?.addEventListener(
    'geometrychange',
    debounce(_ => {
      $('mainNav__homeText').style.display = titlebarIsVisible() ? 'none' : '';
    }, 100)
  );

  makeLinksFocusable();
  handleInternalLinks();

  $('signup__password').value = Utils.randomString(32);
  $('signup__button').addEventListener(
    'click',
    Device.handleRegistrationAttempt
  );
  $('signup__email').addEventListener('input', Device.handleEmailInput);
  $('addFarm__link').addEventListener('click', _ => {
    $('addFarm__link').style.display = 'none';
    $('addFarm__modal').style.display = '';
  });
  $('addFarm__close').addEventListener('click', _ => {
    $('addFarm__modal').style.display = 'none';
    $('addFarm__link').style.display = '';
  });
  $('resetApp__firstButton').addEventListener('click', _ => {
    $('resetApp__modal').style.display = '';
  });
  $('resetApp__close').addEventListener('click', _ => {
    $('resetApp__modal').style.display = 'none';
  });
  $('resetApp__finalButton').addEventListener('click', resetApp);
};

const main = async () => {
  if (!Device.isRegistered()) return Sections.show('signup');
  if (!Device.isConfirmed() || !localStorage.token || Token.expiresSoon())
    await Token.get();
  if (!Device.isConfirmed()) return Sections.show('pleaseConfirm');

  return Sections.show('welcome');
};

init();
main();
