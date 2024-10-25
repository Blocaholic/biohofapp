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

  console.log('#### invalid token');
  await httpRequest({
    url: `farms`,
    method: `POST`,
    headers: [['token', users.user1.token.slice(1) + 'x']],
    body: {
      farmname: `Testfarm`,
      owner: users.user1.userid,
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
        'Error message should include "invalid token"',
        expect.toMatch(json.message.toLowerCase(), /invalid token/)
      );
    });

  console.log('#### missing farmname');
  await httpRequest({
    url: `farms`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      farnmame: `Testfarm`,
      owner: users.user1.userid,
      module_chicken: 0,
      module_marketgarden: 0,
      module_goats: 0,
      module_bees: 0,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""farmname" is required"',
        expect.toMatch(json.message.toLowerCase(), /"farmname" is required/)
      );
    });

  console.log('#### invalid farmname');
  await httpRequest({
    url: `farms`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      farmname: 13,
      owner: users.user1.userid,
      module_chicken: 0,
      module_marketgarden: 0,
      module_goats: 0,
      module_bees: 0,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "farmname must be at least 3 characters"',
        expect.toMatch(
          json.message.toLowerCase(),
          /farmname must be at least 3 characters/
        )
      );
    });

  console.log('#### missing owners userid');
  await httpRequest({
    url: `farms`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      farmname: `Testfarm`,
      woner: users.user1.userid,
      module_chicken: 0,
      module_marketgarden: 0,
      module_goats: 0,
      module_bees: 0,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""owner" is required"',
        expect.toMatch(json.message.toLowerCase(), /"owner" is required/)
      );
    });

  console.log('#### invalid userid');
  await httpRequest({
    url: `farms`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      farmname: `Testfarm`,
      owner: -13,
      module_chicken: 0,
      module_marketgarden: 0,
      module_goats: 0,
      module_bees: 0,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""owner" must be greater than 0"',
        expect.toMatch(
          json.message.toLowerCase(),
          /"owner" must be greater than 0/
        )
      );
    });

  console.log('#### missing module_marketgarden');
  await httpRequest({
    url: `farms`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      farmname: `Testfarm`,
      owner: users.user1.userid,
      module_chicken: 0,
      module_garketmarden: 0,
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
          json.message.toLowerCase(),
          /"module_marketgarden" is required/
        )
      );
    });

  console.log('#### missing module_chicken');
  await httpRequest({
    url: `farms`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      farmname: `Testfarm`,
      owner: users.user1.userid,
      module_hicken: 0,
      module_marketgarden: 0,
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
          json.message.toLowerCase(),
          /"module_chicken" is required/
        )
      );
    });

  console.log('#### missing module_goats');
  await httpRequest({
    url: `farms`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      farmname: `Testfarm`,
      owner: users.user1.userid,
      module_chicken: 0,
      module_marketgarden: 0,
      module_gods: 0,
      module_bees: 0,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""module_goats" is required"',
        expect.toMatch(json.message.toLowerCase(), /"module_goats" is required/)
      );
    });

  console.log('#### missing module_bees');
  await httpRequest({
    url: `farms`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      farmname: `Testfarm`,
      owner: users.user1.userid,
      module_chicken: 0,
      module_marketgarden: 0,
      module_goats: 0,
      module_pees: 0,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""module_bees" is required"',
        expect.toMatch(json.message.toLowerCase(), /"module_bees" is required/)
      );
    });

  console.log('#### invalid module_marketgarden');
  await httpRequest({
    url: `farms`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      farmname: `Testfarm`,
      owner: users.user1.userid,
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
          json.message.toLowerCase(),
          /module_marketgarden must be either, 0 or 1/
        )
      );
    });

  console.log('#### invalid module_chicken');
  await httpRequest({
    url: `farms`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      farmname: `Testfarm`,
      owner: users.user1.userid,
      module_chicken: -1,
      module_marketgarden: 0,
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
          json.message.toLowerCase(),
          /module_chicken must be either, 0 or 1/
        )
      );
    });

  console.log('#### invalid module_goats');
  await httpRequest({
    url: `farms`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      farmname: `Testfarm`,
      owner: users.user1.userid,
      module_chicken: 0,
      module_marketgarden: 0,
      module_goats: 'b',
      module_bees: 0,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "module_goats must be either, 0 or 1"',
        expect.toMatch(
          json.message.toLowerCase(),
          /module_goats must be either, 0 or 1/
        )
      );
    });

  console.log('#### invalid module_bees');
  await httpRequest({
    url: `farms`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      farmname: `Testfarm`,
      owner: users.user1.userid,
      module_chicken: 0,
      module_marketgarden: 0,
      module_goats: 0,
      module_bees: 5e3,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "module_bees must be either, 0 or 1"',
        expect.toMatch(
          json.message.toLowerCase(),
          /module_bees must be either, 0 or 1/
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
