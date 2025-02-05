import {test} from '../utils/test.mjs';
import {expect} from '../utils/expect.mjs';
import {httpRequest} from '../utils/httpRequest.mjs';
import {getJson} from '../utils/getJson.mjs';

export const testFarmsRename = async function (users, testfarmid) {
  console.log('\n### Farms::rename (Failure)');

  console.log('### missing farmname');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'rename',
      farnmame: 'Ei Ö Tßätt',
      farmid: testfarmid,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'error message should include ""farmname" is required"',
        expect.toMatch(json.message?.toLowerCase(), /"farmname" is required/)
      );
    });

  console.log('### invalid farmname');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'rename',
      farmname: 'Ei',
      farmid: testfarmid,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'error message should include "farmname must be at least 3 characters"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /farmname must be at least 3 characters/
        )
      );
    });

  console.log('### missing farmid');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'rename',
      farmname: 'Ei Ö Tßätt',
      framid: testfarmid,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'error message should include ""farmid" is required"',
        expect.toMatch(json.message?.toLowerCase(), /"farmid" is required/)
      );
    });

  console.log('### invalid farmid (not numeric)');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'rename',
      farmname: 'Ei Ö Tßätt',
      farmid: 'a',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'error message should include ""farmid" must be numeric"',
        expect.toMatch(json.message?.toLowerCase(), /"farmid" must be numeric/)
      );
    });

  console.log('### invalid farmid (not > 0)');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'rename',
      farmname: 'Ei Ö Tßätt',
      farmid: 0,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'error message should include ""farmid" must be greater than 0"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /"farmid" must be greater than 0/
        )
      );
    });

  console.log('### invalid farmid (not an integer)');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'rename',
      farmname: 'Ei Ö Tßätt',
      farmid: 66.5,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'error message should include ""farmid" must be an integer"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /"farmid" must be an integer/
        )
      );
    });

  console.log('### no permission');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user2.token]],
    body: {
      operation: 'rename',
      farmname: 'Ei Ö Tßätt',
      farmid: testfarmid,
    },
  })
    .then(expect.responseCode(401))
    .then(getJson)
    .then(json => {
      test(
        'error message should include "no permission"',
        expect.toMatch(json.message?.toLowerCase(), /no permission/)
      );
    });

  console.log('\n### Farms::Rename (Success)');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'rename',
      farmname: 'Ei Ö Tßätt',
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
      return json;
    })
    .then(
      async _ =>
        await httpRequest({
          url: `farms`,
          method: `GET`,
          headers: [['token', users.user1.token]],
        })
          .then(getJson)
          .then(json => {
            test(
              'length of existing farms should be 1',
              expect.toEqual(json.length, 1)
            );
            test(
              'farmname should equal "Ei Ö Tßätt"',
              expect.toEqual(json[0].farmname, 'Ei Ö Tßätt')
            );
          })
    );
};
