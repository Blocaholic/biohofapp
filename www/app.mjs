import {$, $$, $show, $hide} from './js/$.mjs';
import * as Sections from './js/Sections.mjs';
import * as Device from './js/Device.mjs';
import * as Utils from './js/Utils.mjs';
import * as Token from './js/Token.mjs';
import * as Farm from './js/Farm.mjs';

const makeLinksFocusable = () => {
  $$('.link').forEach(link => link.setAttribute('tabindex', '0'));
};

const handleInternalLinks = () => {
  $('mainNav__home').addEventListener('click', event => {
    if (
      event.target.id === 'mainNav__home' ||
      event.target.id === 'mainNav__homeText'
    ) {
      localStorage.removeItem('lastPage');
    }
    location.reload();
  });
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
  const appName = $('mainNav__homeText');
  titlebarIsVisible() ? $hide(appName) : $show(appName);
  navigator?.windowControlsOverlay?.addEventListener(
    'geometrychange',
    debounce(_ => {
      titlebarIsVisible() ? $hide(appName) : $show(appName);
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
    $show('addFarm__modal');
  });
  $('addFarm__close').addEventListener('click', _ => {
    $hide('addFarm__modal');
  });
  $('addFarm__button').addEventListener('click', Farm.add);
  $('resetApp__firstButton').addEventListener('click', _ => {
    $show('resetApp__modal');
  });
  $('resetApp__close').addEventListener('click', _ => {
    $hide('resetApp__modal');
  });
  $('resetApp__finalButton').addEventListener('click', resetApp);
};

const main = async () => {
  if (!Device.isRegistered()) return Sections.show('signup');
  if (!Device.isConfirmed() || !localStorage.token || Token.expiresSoon())
    await Token.get();
  if (!Device.isConfirmed()) return Sections.show('pleaseConfirm');

  $$('.link--private').forEach($show);

  $('settings__general').style.display = '';
  $('userid').innerHTML += `#${localStorage.userid}`;
  $('email').innerHTML += localStorage.email;
  $('deviceid').innerHTML += localStorage.deviceid;
  $('devicename').innerHTML += localStorage.devicename;

  const farms = await Utils.fetchJson('./api/farms', 'GET');

  if (!localStorage.selectedFarm && farms.length)
    localStorage.selectedFarm = farms[0].farmid;

  $('settings__selectedFarm').innerText = farms.filter(
    farm => farm.farmid === parseInt(localStorage.selectedFarm)
  )[0].farmname;
  $('settings__selectFarm').innerHTML = farms
    .map(
      farm => `<li>
  <input type="radio" name="farm" id="${farm.farmid}" ${
        parseInt(localStorage.selectedFarm) === farm.farmid ? 'checked' : ''
      }>
  <label for="${farm.farmid}">#${farm.farmid} "${farm.farmname}" (${
        farm.role
      })</label>
  </li>`
    )
    .join('');

  document
    .querySelectorAll('#settings__selectFarm input[name="farm"]')
    .forEach(radioButton =>
      radioButton.addEventListener(
        'change',
        event => (localStorage.selectedFarm = event.target.id)
      )
    );

  if (localStorage.lastPage) return Sections.show(localStorage.lastPage);
  return Sections.show('welcome');
};

init();
main();
