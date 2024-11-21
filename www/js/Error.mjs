import {$, $$, $show, $hide} from './$.mjs';

const isVisible = element => element.style.display !== 'none';

const showErrorInBody = message => {
  $('error').innerText = `Fehler: ${message}`;
  $show('error');
};

const showErrorInModal = (message, modal) => {
  [...$$('.modal__error')].forEach(element => element.remove());
  const errorDiv = document.createElement('div');
  errorDiv.className = 'modal__error';
  errorDiv.innerText = `Fehler: ${message}`;
  [...modal.getElementsByClassName('modal__box')][0].prepend(errorDiv);
};

const show = message => {
  const activeModals = $$('.modal__background').filter(isVisible);

  if (activeModals.length > 0) {
    const topModal = activeModals[activeModals.length - 1];
    showErrorInModal(message, topModal);
  } else {
    showErrorInBody(message);
  }

  console.log(`Error: ${message}`);
};

const hide = () => {
  $('error').innerText = '';
  [...$$('.modal__error')].forEach(element => element.remove());
  $hide('error');
};

export {show, hide};
