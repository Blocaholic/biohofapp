import {test} from '../test.mjs';
import {expect} from '../expect.mjs';
import {httpRequest, getJson} from '../utils.mjs';

export const testFarmsAdd = async function (users) {
  console.log('\n### Farms::Add (Failure)');

  console.log('#### token userid does not match owners id');
  await httpRequest({
    url: `farms`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      farmname: `Testfarm`,
      owner: users.user2.userid,
      module_chicken: 0,
      module_marketgarden: 0,
      module_goats: 0,
      module_bees: 0,
    },
  })
    .then(expect.responseCode(401))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "token does not belong to owner"',
        expect.toMatch(
          json.message.toLowerCase(),
          /token does not belong to owner/
        )
      );
    });

  console.log('\n### Farms::Add (Success)');
  return await httpRequest({
    url: `farms`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      farmname: `Testfarm`,
      owner: users.user1.userid,
      module_chicken: 0,
      module_marketgarden: 0,
      module_goats: 0,
      module_bees: 0,
    },
  })
    .then(expect.responseCode(201))
    .then(getJson)
    .then(json => {
      test('Farmid should be sent back', expect.toBeTruthy(json.farmid));
      test(
        'Farmid should be an integer',
        expect.toBeTruthy(Number.isInteger(+json.farmid))
      );
      test(
        'Farmid should be greater than 0',
        expect.toBeTruthy(json.farmid > 0)
      );
      return json;
    });
};
