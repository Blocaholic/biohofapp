import {test} from '../test.mjs';
import {expect} from '../expect.mjs';
import {httpRequest, getJson} from '../utils.mjs';

export const testFarmsGet = async function (users) {
  console.log('\n### Farms::Get (not yet implemented)');

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
