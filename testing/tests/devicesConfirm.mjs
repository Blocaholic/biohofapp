import {test} from '../test.mjs';
import {expect} from '../expect.mjs';
import {httpRequest, getJson} from '../utils.mjs';

export const testDevicesConfirm = async function (users) {
  const user = users.user1;

  console.log('\n### Devices::Confirm (Failure)');

  console.log('#### undefined operation');
  await httpRequest({
    url: `devices/${user.deviceid}`,
    method: `PATCH`,
    body: {
      operations: 'confirm',
      confirmationpassword: user.confirmationpassword,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json =>
      test(
        'Error message should include "operation must be defined"',
        expect.toMatch(json.message.toLowerCase(), /operation must be defined/)
      )
    );

  console.log('#### unknown operation');
  await httpRequest({
    url: `devices/${user.deviceid}`,
    method: `PATCH`,
    body: {
      operation: 'konfirm',
      confirmationpassword: user.confirmationpassword,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "unknown operation"',
        expect.toMatch(json.message.toLowerCase(), /unknown operation/)
      );
      test(
        'Operation should be sent back',
        expect.toMatch(json.operation, /konfirm/)
      );
    });

  console.log('#### invalid id');
  await httpRequest({
    url: `devices/1b3`,
    method: `PATCH`,
    body: {
      operation: 'confirm',
      confirmationpassword: user.confirmationpassword,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "id must be an integer greater than 0"',
        expect.toMatch(
          json.message.toLowerCase(),
          /id must be an integer greater than 0/
        )
      );
      test('ID should be sent back', expect.toMatch(json.id, /1b3/));
      test(
        'json property "syntax" should exist',
        expect.toBeTruthy(json.syntax)
      );
      test(
        'json property "example" should exist',
        expect.toBeTruthy(json.example)
      );
    });

  console.log('#### missing password');
  await httpRequest({
    url: `devices/${user.deviceid}`,
    method: `PATCH`,
    body: {
      operation: 'confirm',
      confirmationpasswort: user.confirmationpassword,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json =>
      test(
        'Error message should include "password is required"',
        expect.toMatch(json.message.toLowerCase(), /password is required/)
      )
    );

  console.log('#### password "= 32 chars');
  await httpRequest({
    url: `devices/${user.deviceid}`,
    method: `PATCH`,
    body: {
      operation: 'confirm',
      confirmationpassword: user.confirmationpassword + 'x',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "confirmationpassword must be 32 characters"',
        expect.toMatch(
          json.message.toLowerCase(),
          /confirmationpassword must be 32 characters/
        )
      );
      test(
        'password length should be sent back',
        expect.toMatch(json.passwordLength.toString(), /33/)
      );
    });

  console.log('#### id not found');
  await httpRequest({
    url: `devices/7`,
    method: `PATCH`,
    body: {
      operation: 'confirm',
      confirmationpassword: user.confirmationpassword,
    },
  })
    .then(expect.responseCode(404))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "could not find deviceid"',
        expect.toMatch(json.message.toLowerCase(), /could not find deviceid/)
      );
      test(
        'deviceid should be sent back',
        expect.toMatch(json.deviceid.toString(), /7/)
      );
    });

  console.log('#### wrong password');
  await httpRequest({
    url: `devices/${user.deviceid}`,
    method: `PATCH`,
    body: {
      operation: 'confirm',
      confirmationpassword: user.confirmationpassword.slice(1) + 'x',
    },
  })
    .then(expect.responseCode(401))
    .then(getJson)
    .then(json =>
      test(
        'Error message should include "confirmationpassword not accepted"',
        expect.toMatch(
          json.message.toLowerCase(),
          /confirmationpassword not accepted/
        )
      )
    );

  console.log('\n### Devices::Confirm (Success)');
  await httpRequest({
    url: `devices/${user.deviceid}`,
    method: `PATCH`,
    body: {
      operation: 'confirm',
      confirmationpassword: user.confirmationpassword,
    },
  })
    .then(expect.responseCode(200))
    .then(getJson)
    .then(json => {
      test('deviceid should be sent back', expect.toBeTruthy(json.deviceid));
      test(
        'deviceid should be an integer',
        expect.toBeTruthy(Number.isInteger(json.deviceid))
      );
      test(
        'response deviceid should equal sent deviceid',
        expect.toEqual(json.deviceid, user.deviceid)
      );
    });
};
