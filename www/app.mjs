import {$, $$, $show, $hide} from './js/$.mjs';
import * as Sections from './js/Sections.mjs';
import * as Device from './js/Device.mjs';
import * as Utils from './js/Utils.mjs';
import * as Token from './js/Token.mjs';
import * as Farm from './js/Farm.mjs';

import './js/pages/planCrops.mjs';

const makeLinksFocusable = () => {
  $$('.link').forEach(link => link.setAttribute('tabindex', '0'));
};

const handleInternalLinks = () => {
  $('mainNav__home').addEventListener('click', event => {
    if (
      event.target.id === 'mainNav__home' ||
      event.target.id === 'mainNav__homeText' ||
      event.target.id === 'mainNav__homeHome'
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

const setScrollBehaviorForModals = () => {
  const targetNodes = $$('.modal__background');
  const anyModalIsVisible = () =>
    targetNodes.some(targetNode => targetNode.style.display === '');
  const callback = mutations => {
    if (anyModalIsVisible()) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  };
  const observer = new MutationObserver(callback);
  targetNodes.forEach(targetNode =>
    observer.observe(targetNode, {
      attributes: true,
      attributeFilter: ['style'],
    })
  );
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
  setScrollBehaviorForModals();

  $('signup__password').value = Utils.randomString(32);
  $('signup__button').addEventListener(
    'click',
    Device.handleRegistrationAttempt
  );
  $('signup__email').addEventListener('input', Device.handleEmailInput);

  $('editFarm__link').addEventListener('click', _ => $show('editFarm__modal'));
  $('deleteFarm__link').addEventListener('click', _ =>
    $show('deleteFarm__modal')
  );
  $('selectFarm__link').addEventListener('click', _ =>
    $show('selectFarm__modal')
  );
  $('addFarm__link').addEventListener('click', _ => $show('addFarm__modal'));
  $('addUser__link').addEventListener('click', _ => $show('addUser__modal'));

  $('editFarm__close').addEventListener('click', _ => $hide('editFarm__modal'));
  $('deleteFarm__close').addEventListener('click', _ =>
    $hide('deleteFarm__modal')
  );
  $('selectFarm__close').addEventListener('click', _ =>
    $hide('selectFarm__modal')
  );
  $('addFarm__close').addEventListener('click', _ => $hide('addFarm__modal'));
  $('addUser__close').addEventListener('click', _ => $hide('addUser__modal'));
  $('resetApp__close').addEventListener('click', _ => $hide('resetApp__modal'));
  $('updateUserPermissions__close').addEventListener('click', _ =>
    $hide('updateUserPermissions__modal')
  );
  $('removeUserPermissions__close').addEventListener('click', _ =>
    $hide('removeUserPermissions__modal')
  );
  $('removeUserPermissions__cancelButton').addEventListener('click', event => {
    event.preventDefault();
    $hide('removeUserPermissions__modal');
  });
  $('changeOwner__close').addEventListener('click', _ =>
    $hide('changeOwner__modal')
  );
  $('changeOwner__cancelButton').addEventListener('click', event => {
    event.preventDefault();
    $hide('changeOwner__modal');
  });

  $('editFarm__button').addEventListener('click', Farm.rename);
  $('addFarm__button').addEventListener('click', Farm.add);
  $('addUser__button').addEventListener('click', Farm.addUser);
  $('resetApp__firstButton').addEventListener('click', _ =>
    $show('resetApp__modal')
  );

  $('updateUserPermissions__button').addEventListener('click', event => {
    event.preventDefault();
    document.querySelector('input[name="updateUserPermissions__role"]:checked')
      .value === 'owner'
      ? $show('changeOwner__modal')
      : Farm.updateUserPermissions(event);
  });
  $('removeUserPermissions__continueButton').addEventListener(
    'click',
    Farm.removeUserPermissions
  );
  $('changeOwner__continueButton').addEventListener(
    'click',
    Farm.updateUserPermissions
  );

  $('deleteFarm__finalButton').addEventListener('click', Farm.erase);
  $('resetApp__finalButton').addEventListener('click', resetApp);

  $('settings__addFarmLinkButton').addEventListener('click', _ =>
    $show('addFarm__modal')
  );

  $$('[id^="selectedFarm__module"]').forEach(checkbox =>
    checkbox.addEventListener('change', event => Farm.updateModules(event))
  );
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
  if (farms?.error?.message) return Error.show(farms.error.message);

  if (!localStorage.selectedFarm && farms.length)
    localStorage.selectedFarm = farms[0].farmid;

  farms.length
    ? ($('settings__farm').style.display = '')
    : ($('settings__addFarmLinkButton').style.display = '');

  const selectedFarm = farms?.filter(
    farm => farm.farmid === parseInt(localStorage.selectedFarm)
  )[0];

  if (selectedFarm.role !== 'owner') {
    $('updateUserPermissions__owner').disabled = true;
  }

  const roles = {
    owner: 'Eigentümer',
    admin: 'Bevollmächtigter',
    employee: 'Mitarbeiter',
    visitor: 'Besucher',
  };

  const membersByRolePriority = (a, b) => {
    const rolePriority = {
      owner: 1,
      admin: 2,
      employee: 3,
      visitor: 4,
    };
    return rolePriority[a.role] - rolePriority[b.role];
  };

  if (!['owner', 'admin'].includes(selectedFarm.role)) {
    $hide('addUser__link');
  }

  const createFarmmemberHtmlRow = member => {
    const id = document.createElement('div');
    id.innerText = `ID: ${member.userid}`;
    const email = document.createElement('div');
    email.innerText = member.email;
    const role = document.createElement('div');
    role.innerText = roles[member.role];
    role.innerText += ' ';
    if (
      member.role !== 'owner' &&
      (selectedFarm.role === 'owner' ||
        (selectedFarm.role === 'admin' &&
          !['owner', 'admin'].includes(member.role)) ||
        (selectedFarm.role === 'admin' &&
          Number(localStorage.userid) === Number(member.userid)))
    ) {
      const pencil = document.createElement('img');
      pencil.src = './icon/pencil.svg';
      pencil.alt = '';
      pencil.classList.add('icon--inline');
      pencil.classList.add('settings__updateUserPermissionLink');
      pencil.dataset.userid = member.userid;
      pencil.dataset.email = member.email;
      pencil.dataset.role = member.role;
      pencil.addEventListener('click', event => {
        $(
          'updateUserPermissions__userid'
        ).innerText = `User-ID: ${event.target.dataset.userid}`;
        $('updateUserPermissions__email').innerText =
          event.target.dataset.email;
        $(`updateUserPermissions__${event.target.dataset.role}`).checked = true;
        $show('updateUserPermissions__modal');
      });
      role.appendChild(pencil);
    }
    if (
      member.role !== 'owner' &&
      (selectedFarm.role === 'owner' ||
        (selectedFarm.role === 'admin' &&
          !['owner', 'admin'].includes(member.role)) ||
        (selectedFarm.role === 'admin' &&
          Number(localStorage.userid) === Number(member.userid)) ||
        Number(localStorage.userid) === Number(member.userid))
    ) {
      const trash = document.createElement('img');
      trash.src = './icon/trash.svg';
      trash.alt = '';
      trash.classList.add('icon--inline');
      trash.classList.add('settings__removeUserPermissionLink');
      trash.dataset.userid = member.userid;
      trash.dataset.email = member.email;
      trash.dataset.role = member.role;
      trash.addEventListener('click', event => {
        $('removeUserPermissions__userid').innerText =
          event.target.dataset.userid;
        $('removeUserPermissions__email').innerText =
          event.target.dataset.email;
        $('removeUserPermissions__farmname').innerText = selectedFarm.farmname;
        $('removeUserPermissions__farmid').innerText = selectedFarm.farmid;
        $show('removeUserPermissions__modal');
      });
      role.appendChild(trash);
    }
    if (localStorage.userid == member.userid) {
      id.classList.add('highlightedRow');
      email.classList.add('highlightedRow');
      role.classList.add('highlightedRow');
    }
    return [id, email, role];
  };

  selectedFarm?.members
    .sort(membersByRolePriority)
    .flatMap(member => createFarmmemberHtmlRow(member))
    .forEach(element => $('settings__farmRoles').appendChild(element));

  $('selectedFarm__moduleBees').checked = !!selectedFarm?.module_bees;
  $('selectedFarm__moduleChicken').checked = !!selectedFarm?.module_chicken;
  $('selectedFarm__moduleGoats').checked = !!selectedFarm?.module_goats;
  $('selectedFarm__moduleMarketgarden').checked =
    !!selectedFarm?.module_marketgarden;

  $(
    'settings__selectedFarm'
  ).innerText = `${selectedFarm?.farmname} (#${selectedFarm?.farmid})`;
  $('settings__selectFarm').innerHTML = farms
    .map(
      farm => `<li>
  <input type="radio" name="farm" id="${farm.farmid}" ${
        parseInt(localStorage.selectedFarm) === farm.farmid ? 'checked' : ''
      }>
  <label for="${farm.farmid}">#${farm.farmid} "${farm.farmname}" (${
        roles[farm.role]
      })</label>
  </li>`
    )
    .join('');

  document
    .querySelectorAll('#settings__selectFarm input[name="farm"]')
    .forEach(radioButton =>
      radioButton.addEventListener('change', event => {
        localStorage.selectedFarm = event.target.id;
        location.reload();
      })
    );

  const marketgardenVisibility = JSON.parse(localStorage.modules)
    .module_marketgarden
    ? ''
    : 'none';
  $$('[data-module="marketgarden"]').forEach(element => {
    element.style.display = marketgardenVisibility;
  });

  const chickenVisibility = JSON.parse(localStorage.modules).module_chicken
    ? ''
    : 'none';
  $$('[data-module="chicken"]').forEach(element => {
    element.style.display = chickenVisibility;
  });

  const goatsVisibility = JSON.parse(localStorage.modules).module_goats
    ? ''
    : 'none';
  $$('[data-module="goats"]').forEach(element => {
    element.style.display = goatsVisibility;
  });

  const beesVisibility = JSON.parse(localStorage.modules).module_bees
    ? ''
    : 'none';
  $$('[data-module="bees"]').forEach(element => {
    element.style.display = beesVisibility;
  });

  if (localStorage.lastPage) return Sections.show(localStorage.lastPage);
  return Sections.show('welcome');
};

main();
init();
