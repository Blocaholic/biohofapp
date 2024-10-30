import {test} from '../test.mjs';
import {expect} from '../expect.mjs';
import {httpRequest, getJson} from '../utils.mjs';

export const testFarmsDelete = async function (users, testfarmid) {
  console.log('\n### Farms::Delete (Failure)');

  console.log('#### invalid token');
  await httpRequest({
    url: `farms/${testfarmid}`,
    method: `DELETE`,
    headers: [['token', users.user1.token.slice(0, -1) + 'x']],
  })
    .then(expect.responseCode(401))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "invalid token"',
        expect.toMatch(json.message?.toLowerCase(), /invalid token/)
      );
    });

  console.log('#### no permission');
  await httpRequest({
    url: `farms/${testfarmid}`,
    method: `DELETE`,
    headers: [['token', users.user2.token]],
  })
    .then(expect.responseCode(401))
    .then(getJson)
    .then(json => {
      test(
        'error message should include "no permission to delete farm"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /no permission to delete farm/
        )
      );
    });

  console.log('\n### Farms::Delete (Success)');
  return await httpRequest({
    url: `farms/${testfarmid}`,
    method: `DELETE`,
    headers: [['token', users.user1.token]],
  })
    .then(expect.responseCode(200))
    .then(getJson)
    .then(json => {
      test(
        'response should include "success"',
        expect.toBeTruthy(json.success)
      );
      test(
        'value of "success" should be "success"',
        expect.toEqual(json.success, 'success')
      );
      return json;
    });
};
