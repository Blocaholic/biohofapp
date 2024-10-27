import {test} from '../test.mjs';
import {expect} from '../expect.mjs';
import {httpRequest, getJson} from '../utils.mjs';

export const testFarmsAddMember = async function (users, testfarmid) {
  console.log('\n### Farms::add_member (Failure)');

  console.log('#### missing email');
  console.log('#### invalid email');
  console.log('#### missing farmid');
  console.log('#### invalid farmid');
  console.log('#### missing role');
  console.log('#### invalid role');
  console.log('#### unknown email');
  console.log('#### no permission');
  console.log('#### cannot add owner');
  console.log('#### user already member');

  console.log('\n### Farms::add_member (Success)');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'add_member',
      farmid: testfarmid,
      email: 'testbot2@reinwiese.de',
      role: 'admin',
    },
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
    });
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'add_member',
      farmid: testfarmid,
      email: 'testbot3@reinwiese.de',
      role: 'employee',
    },
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
    });
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'add_member',
      farmid: testfarmid,
      email: 'testbot4@reinwiese.de',
      role: 'visitor',
    },
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
    });
};
