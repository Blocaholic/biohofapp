import {strict as assert} from 'assert';
import {it} from '../it.mjs';

export const testDevicesRegister = async function () {
  console.log('\n### Devices::Register (Failure)');

  console.log('#### missing email');
  await fetch('https://biohofapp.de/api/devices', {
    method: 'POST',
    body: JSON.stringify({
      emil: 'testbotfailure@reinwiese.de',
      password: '12345678901234567890123456789012',
      devicename: 'My Computer',
    }),
  })
    .then(response => {
      it('http response code should be "400"', () =>
        assert(response.status === 400));
      return response.json();
    })
    .then(json => {
      it('Error message should include "email is required"', () =>
        assert.match(json.message.toLowerCase(), /email is required/));
    });

  console.log('#### invalid email');
  await fetch('https://biohofapp.de/api/devices', {
    method: 'POST',
    body: JSON.stringify({
      email: 'testbotfailurereinwiese.de',
      password: '12345678901234567890123456789012',
      devicename: 'My Computer',
    }),
  })
    .then(response => {
      it('http response code should be "400"', () =>
        assert(response.status === 400));
      return response.json();
    })
    .then(json => {
      it('Error message should include "invalid email"', () =>
        assert.match(json.message.toLowerCase(), /invalid email/));
    });

  console.log('#### missing password');
  await fetch('https://biohofapp.de/api/devices', {
    method: 'POST',
    body: JSON.stringify({
      email: 'testbotfailure@reinwiese.de',
      passwort: '12345678901234567890123456789012',
      devicename: 'My Computer',
    }),
  })
    .then(response => {
      it('http response code should be "400"', () =>
        assert(response.status === 400));
      return response.json();
    })
    .then(json => {
      it('Error message should include "password is required"', () =>
        assert.match(json.message.toLowerCase(), /password is required/));
    });

  console.log('#### password != 32 chars');
  await fetch('https://biohofapp.de/api/devices', {
    method: 'POST',
    body: JSON.stringify({
      email: 'testbotfailure@reinwiese.de',
      password: '123456789012345678901234567890123',
      devicename: 'My Computer',
    }),
  })
    .then(response => {
      it('http response code should be "400"', () =>
        assert(response.status === 400));
      return response.json();
    })
    .then(json => {
      it('Error message should include "password must be 32 characters"', () =>
        assert.match(
          json.message.toLowerCase(),
          /password must be 32 characters/
        ));
      it('Password length is sent back', () =>
        assert.strictEqual(json.passwordLength, 33));
    });

  console.log('#### invalid devicename');
  await fetch('https://biohofapp.de/api/devices', {
    method: 'POST',
    body: JSON.stringify({
      email: 'testbotfailure@reinwiese.de',
      password: '12345678901234567890123456789012',
      devicename: "'My' & <Computer>",
    }),
  })
    .then(response => {
      it('http response code should be "400"', () =>
        assert(response.status === 400));
      return response.json();
    })
    .then(json => {
      it('Error message should include "invalid characters in devicename"', () =>
        assert.match(
          json.message.toLowerCase(),
          /invalid characters in devicename/
        ));
      it('Invalid characters should include "\'<>&', () =>
        assert.match(json.invalidCharacters, /"'<>&/));
      it("Devicename should equal \"'My' & <Computer>", () =>
        assert.match(json.devicename, /'My' & <Computer>/));
    });

  console.log('\n### Devices::Register (Success)');
  const newUser = {
    email: 'testbot5@reinwiese.de',
    password: '12345678901234567890123456789012',
    devicename: 'Computer',
  };
  const registrationData = await fetch('https://biohofapp.de/api/devices', {
    method: 'POST',
    body: JSON.stringify(newUser),
  })
    .then(response => {
      it('http response code should be "201"', () =>
        assert(response.status === 201));
      return response.json();
    })
    .then(json => {
      it('Deviceid should be sent back', () => assert(json.deviceid));
      it('Deviceid should be an integer', () =>
        assert(Number.isInteger(json.deviceid)));
      it('Userid should be sent back', () => assert(json.userid));
      it('Userid should be an integer', () =>
        assert(Number.isInteger(json.userid)));
      return json;
    });

  return {...newUser, ...registrationData};
};
