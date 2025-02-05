import {test} from '../utils/test.mjs';
import {expect} from '../utils/expect.mjs';
import {httpRequest} from '../utils/httpRequest.mjs';
import {getJson} from '../utils/getJson.mjs';

export const testFarmsRemoveMember = async function (users, testfarmid) {
  console.log('\n### Farms::remove_member (Failure)');

  console.log('#### missing email');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'remove_member',
      emil: users.user4.email,
      userid: users.user4.userid,
      farmid: testfarmid,
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
      operation: 'remove_member',
      email: 'invalid.de',
      userid: users.user4.userid,
      farmid: testfarmid,
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

  console.log('#### missing userid');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'remove_member',
      email: users.user4.email,
      useid: users.user4.userid,
      farmid: testfarmid,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""userid" is required"',
        expect.toMatch(json.message?.toLowerCase(), /"userid" is required/)
      );
    });

  console.log('#### invalid userid');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'remove_member',
      email: users.user4.email,
      userid: Number(users.user4.userid) + 0.5,
      farmid: testfarmid,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""userid" must be an integer"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /"userid" must be an integer/
        )
      );
    });

  console.log('#### userid does not fit email');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'remove_member',
      email: users.user4.email,
      userid: users.user3.userid,
      farmid: testfarmid,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "userid does not fit email adress"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /userid does not fit email adress/
        )
      );
    });

  console.log('#### missing farmid');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'remove_member',
      email: users.user4.email,
      userid: users.user4.userid,
      farid: testfarmid,
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
      operation: 'remove_member',
      email: users.user4.email,
      userid: users.user4.userid,
      farmid: Number(testfarmid) + 0.3,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""farmid" must be an integer"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /"farmid" must be an integer/
        )
      );
    });

  console.log('#### unknown email');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'remove_member',
      email: 'kennichnich@reinwiese.de',
      userid: users.user4.userid,
      farmid: testfarmid,
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

  console.log('#### no permission');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user3.token]],
    body: {
      operation: 'remove_member',
      email: users.user4.email,
      userid: users.user4.userid,
      farmid: testfarmid,
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

  console.log('#### Owner cannot be removed');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'remove_member',
      email: users.user1.email,
      userid: users.user1.userid,
      farmid: testfarmid,
    },
  })
    .then(expect.responseCode(401))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "owner cannot be removed"',
        expect.toMatch(json.message?.toLowerCase(), /owner cannot be removed/)
      );
    });

  console.log('#### Admin cannot remove other admins');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'update_member',
      farmid: testfarmid,
      email: users.user4.email,
      role: 'admin',
      userid: users.user4.userid,
    },
  }).then(expect.responseCode(200));
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user2.token]],
    body: {
      operation: 'remove_member',
      email: users.user4.email,
      userid: users.user4.userid,
      farmid: testfarmid,
    },
  })
    .then(expect.responseCode(401))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "admin cannot remove other admins"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /admin cannot remove other admins/
        )
      );
    });
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'update_member',
      farmid: testfarmid,
      email: users.user4.email,
      role: 'visitor',
      userid: users.user4.userid,
    },
  }).then(expect.responseCode(200));

  console.log('\n### Farms::remove_member (Success)');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'remove_member',
      email: users.user4.email,
      userid: users.user4.userid,
      farmid: testfarmid,
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
