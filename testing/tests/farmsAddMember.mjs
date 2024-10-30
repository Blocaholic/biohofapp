import {test} from '../test.mjs';
import {expect} from '../expect.mjs';
import {httpRequest, getJson} from '../utils.mjs';

export const testFarmsAddMember = async function (users, testfarmid) {
  console.log('\n### Farms::add_member (Failure)');

  console.log('#### missing email');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'add_member',
      farmid: testfarmid,
      emil: 'testbot2@reinwiese.de',
      role: 'admin',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "email is required"',
        expect.toMatch(json.message?.toLowerCase(), /email is required/)
      );
    });

  console.log('#### invalid email');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'add_member',
      farmid: testfarmid,
      email: 'testbot2reinwiese.de',
      role: 'admin',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "invalid email"',
        expect.toMatch(json.message?.toLowerCase(), /invalid email/)
      );
    });

  console.log('#### missing farmid');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'add_member',
      farid: testfarmid,
      email: 'testbot2@reinwiese.de',
      role: 'admin',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""farmid" is required"',
        expect.toMatch(json.message?.toLowerCase(), /"farmid" is required/)
      );
    });

  console.log('#### invalid farmid');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'add_member',
      farmid: 0,
      email: 'testbot2@reinwiese.de',
      role: 'admin',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""farmid" must be greater than 0"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /"farmid" must be greater than 0/
        )
      );
    });

  console.log('#### missing role');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'add_member',
      farmid: testfarmid,
      email: 'testbot2@reinwiese.de',
      ole: 'admin',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""role" is required"',
        expect.toMatch(json.message?.toLowerCase(), /"role" is required/)
      );
    });

  console.log('#### invalid role');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'add_member',
      farmid: testfarmid,
      email: 'testbot2@reinwiese.de',
      role: 'adrian',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "role "adrian" not excepted"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /role "adrian" not excepted/
        )
      );
    });

  console.log('#### unknown email');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'add_member',
      farmid: testfarmid,
      email: 'testbot99@reinwiese.de',
      role: 'admin',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "no user found with this email adress"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /no user found with this email adress/
        )
      );
    });

  console.log('#### unconfirmed user');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'add_member',
      farmid: testfarmid,
      email: users.unconfirmedUser.email,
      role: 'employee',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "cannot add unconfirmed user"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /cannot add unconfirmed user/
        )
      );
    });

  console.log('#### no permission');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user3.token]],
    body: {
      operation: 'add_member',
      farmid: testfarmid,
      email: 'testbot2@reinwiese.de',
      role: 'admin',
    },
  })
    .then(expect.responseCode(401))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "no permission"',
        expect.toMatch(json.message?.toLowerCase(), /no permission/)
      );
    });

  console.log('#### cannot add owner');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'add_member',
      farmid: testfarmid,
      email: 'testbot2@reinwiese.de',
      role: 'owner',
    },
  })
    .then(expect.responseCode(401))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "role "owner" must not be added"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /role "owner" must not be added/
        )
      );
    });

  console.log('#### user already member');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'add_member',
      farmid: testfarmid,
      email: 'testbot1@reinwiese.de',
      role: 'admin',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "user is already member"',
        expect.toMatch(json.message?.toLowerCase(), /user is already member/)
      );
    });

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
