import {test} from '../test.mjs';
import {expect} from '../expect.mjs';
import {httpRequest, getJson} from '../utils.mjs';

export const testDevicesRegister = async function (users) {
  const user = users.unconfirmedUser;

  console.log('\n### Devices::Register (Failure)');

  console.log('#### missing email');
  await httpRequest({
    url: `devices`,
    method: `POST`,
    body: {
      emil: user.email,
      password: user.password,
      devicename: user.devicename,
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
    url: `devices`,
    method: `POST`,
    body: {
      email: 'invalidemailatreinwiese.de',
      password: user.password,
      devicename: user.devicename,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json =>
      test(
        'Error message should include "invalid email"',
        expect.toMatch(json?.message?.toLowerCase(), /invalid email/)
      )
    );

  console.log('#### missing password');
  await httpRequest({
    url: `devices`,
    method: `POST`,
    body: {
      email: user.email,
      passwort: user.password,
      devicename: user.devicename,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json =>
      test(
        'Error message should include "password is required"',
        expect.toMatch(json.message?.toLowerCase(), /password is required/)
      )
    );

  console.log('#### password != 32 chars');
  await httpRequest({
    url: `devices`,
    method: `POST`,
    body: {
      email: user.email,
      password: user.password + '3',
      devicename: user.devicename,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "password must be 32 characters"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /password must be 32 characters/
        )
      );
      test(
        'Password length is sent back',
        expect.toEqual(json.passwordLength, 33)
      );
    });

  console.log('#### invalid devicename');
  await httpRequest({
    url: `devices`,
    method: `POST`,
    body: {
      email: user.email,
      password: user.password,
      devicename: "'My' & <Computer>",
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "invalid characters in devicename"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /invalid characters in devicename/
        )
      );
      test(
        'Invalid characters should include "\'<>&',
        expect.toMatch(json.invalidCharacters, /"'<>&/)
      );
      test(
        "Devicename should equal \"'My' & <Computer>",
        expect.toMatch(json.devicename, /'My' & <Computer>/)
      );
    });

  console.log('\n### Devices::Register (Success)');
  return await httpRequest({
    url: `devices`,
    method: `POST`,
    body: {
      email: user.email,
      password: user.password,
      devicename: user.devicename,
    },
  })
    .then(expect.responseCode(201))
    .then(getJson)
    .then(json => {
      test('Deviceid should be sent back', expect.toBeTruthy(json.deviceid));
      test(
        'Deviceid should be an integer',
        expect.toBeTruthy(Number.isInteger(json.deviceid))
      );
      test('Userid should be sent back', expect.toBeTruthy(json.userid));
      test(
        'Userid should be an integer',
        expect.toBeTruthy(Number.isInteger(json.userid))
      );
      return json;
    });
};
