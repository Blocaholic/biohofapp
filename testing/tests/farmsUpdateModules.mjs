import {test} from '../test.mjs';
import {expect} from '../expect.mjs';
import {httpRequest, getJson} from '../utils.mjs';

export const testFarmsUpdateModules = async function (users, testfarmid) {
  console.log('\n### Farms::update_modules (Failure)');

  console.log('#### invalid operation');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'update_modul',
      farmid: testfarmid,
      module_chicken: 0,
      module_marketgarden: 1,
      module_goats: 0,
      module_bees: 0,
    },
  })
    .then(expect.responseCode(405))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "invalid operation"',
        expect.toMatch(json.message?.toLowerCase(), /invalid operation/)
      );
    });

  console.log('#### invalid token');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token.slice(1) + 'x']],
    body: {
      operation: 'update_modules',
      farmid: testfarmid,
      module_chicken: 0,
      module_marketgarden: 1,
      module_goats: 0,
      module_bees: 0,
    },
  })
    .then(expect.responseCode(401))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "invalid token"',
        expect.toMatch(json.message?.toLowerCase(), /invalid token/)
      );
    });

  console.log('#### invalid farmid');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'update_modules',
      farmid: 66.6,
      module_chicken: 0,
      module_marketgarden: 1,
      module_goats: 0,
      module_bees: 0,
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

  console.log('#### missing module_marketgarden');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token.slice(1) + 'x']],
    body: {
      operation: 'update_modules',
      farmid: testfarmid,
      module_chicken: 0,
      module_market: 1,
      module_goats: 0,
      module_bees: 0,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""module_marketgarden" is required"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /"module_marketgarden" is required/
        )
      );
    });

  console.log('#### missing module_chicken');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token.slice(1) + 'x']],
    body: {
      operation: 'update_modules',
      farmid: testfarmid,
      module_chick: 0,
      module_marketgarden: 1,
      module_goats: 0,
      module_bees: 0,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        '"module_chicken" is required',
        expect.toMatch(
          json.message?.toLowerCase(),
          /"module_chicken" is required/
        )
      );
    });

  console.log('#### missing module_goats');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token.slice(1) + 'x']],
    body: {
      operation: 'update_modules',
      farmid: testfarmid,
      module_chicken: 0,
      module_marketgarden: 1,
      module_goat: 0,
      module_bees: 0,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""module_goats" is required"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /"module_goats" is required/
        )
      );
    });

  console.log('#### missing module_bees');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token.slice(1) + 'x']],
    body: {
      operation: 'update_modules',
      farmid: testfarmid,
      module_chicken: 0,
      module_marketgarden: 1,
      module_goats: 0,
      module_bee: 0,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""module_bees" is required"',
        expect.toMatch(json.message?.toLowerCase(), /"module_bees" is required/)
      );
    });

  console.log('#### invalid module_marketgarden');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token.slice(1) + 'x']],
    body: {
      operation: 'update_modules',
      farmid: testfarmid,
      module_chicken: 0,
      module_marketgarden: 3,
      module_goats: 0,
      module_bees: 0,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "module_marketgarden must be either, 0 or 1"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /module_marketgarden must be either, 0 or 1/
        )
      );
    });

  console.log('#### invalid module_chicken');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token.slice(1) + 'x']],
    body: {
      operation: 'update_modules',
      farmid: testfarmid,
      module_chicken: 'b',
      module_marketgarden: 1,
      module_goats: 0,
      module_bees: 0,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "module_chicken must be either, 0 or 1"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /module_chicken must be either, 0 or 1/
        )
      );
    });

  console.log('#### invalid module_goats');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token.slice(1) + 'x']],
    body: {
      operation: 'update_modules',
      farmid: testfarmid,
      module_chicken: 0,
      module_marketgarden: 1,
      module_goats: -1,
      module_bees: 0,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "module_goats must be either, 0 or 1"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /module_goats must be either, 0 or 1/
        )
      );
    });

  console.log('#### invalid module_bees');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token.slice(1) + 'x']],
    body: {
      operation: 'update_modules',
      farmid: testfarmid,
      module_chicken: 0,
      module_marketgarden: 1,
      module_goats: 0,
      module_bees: 1e3,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "module_bees must be either, 0 or 1"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /module_bees must be either, 0 or 1/
        )
      );
    });

  console.log('#### no permission');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user3.token]],
    body: {
      operation: 'update_modules',
      farmid: testfarmid,
      module_chicken: 0,
      module_marketgarden: 1,
      module_goats: 0,
      module_bees: 0,
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

  console.log('\n### Farms::update_modules (Success)');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'update_modules',
      farmid: testfarmid,
      module_chicken: 0,
      module_marketgarden: 1,
      module_goats: 0,
      module_bees: 0,
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
              'module_chicken should be 0',
              expect.toEqual(json[0].module_chicken, 0)
            );
            test(
              'module_marketgarden should be 0',
              expect.toEqual(json[0].module_marketgarden, 1)
            );
            test(
              'module_goats should be 0',
              expect.toEqual(json[0].module_goats, 0)
            );
            test(
              'module_bees should be 0',
              expect.toEqual(json[0].module_bees, 0)
            );
          })
    );
};
