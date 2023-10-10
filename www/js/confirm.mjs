import {$show} from './$.mjs';
import * as Error from './Error.mjs';
import {fetchJson} from './Utils.mjs';

const main = async () => {
  const isNum = val => /^\d+$/.test(val);

  const [id, confirmationpassword] = location.search.slice(1).split('&');

  if (!id) return Error.show('Keine ID angegeben!');

  if (!isNum(id)) return Error.show('ID muss eine Zahl sein!');

  if (!confirmationpassword)
    return Error.show('Kein Bestätigungspasswort angegeben!');

  if (confirmationpassword.length !== 32)
    return Error.show('Das Bestätigungspasswort muss 32 Zeichen lang sein!');

  const result = await fetchJson(`./api/devices/${id}`, 'PATCH', {
    operation: 'confirm',
    confirmationpassword: confirmationpassword,
  });

  if (result.message) return Error.show(result.message);

  if (result.httpResponseCode !== 200)
    return Error.show(`Fehler: http_response_code: ${result.httpResponseCode}`);

  $show('success');
};

main();
