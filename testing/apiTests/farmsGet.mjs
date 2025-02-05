import {test} from '../utils/test.mjs';
import {expect} from '../utils/expect.mjs';
import {httpRequest} from '../utils/httpRequest.mjs';
import {getJson} from '../utils/getJson.mjs';

export const testFarmsGet = async function (users) {
  console.log('\n### Farms::Get (Failure)');

  console.log('#### invalid token');
  await httpRequest({
    url: `farms`,
    method: `GET`,
    headers: [['token', users.user1.token.slice(1) + 'x']],
  })
    .then(expect.responseCode(401))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "invalid token"',
        expect.toMatch(json.message?.toLowerCase(), /invalid token/)
      );
    });

  console.log('\n### Farms::Get (Success)');
  return await httpRequest({
    url: `farms`,
    method: `GET`,
    headers: [['token', users.user1.token]],
  })
    .then(expect.responseCode(200))
    .then(getJson)
    .then(json => {
      test(
        'Farmname should be "Testfarm"',
        expect.toEqual(json[0].farmname, 'Testfarm')
      );
      test('Number of farms should be 1', expect.toBeTruthy(json.length === 1));
      return json;
    });
};
