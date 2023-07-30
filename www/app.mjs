const $ = id => document.getElementById(id);
const $$ = query => document.querySelectorAll(query);

const usesDarkMode = () => window.matchMedia('(prefers-color-scheme: dark)')?.matches || false;

const switchMode = () => {
  $('manifest').href = usesDarkMode() ? './dark.webmanifest' : './light.webmanifest';
  $('icon').href = usesDarkMode() ? './icon-dark.svg' : 'icon.svg';
};

window.matchMedia('(prefers-color-scheme: dark)').addEventListener(
  "change",
  switchMode
);

switchMode();