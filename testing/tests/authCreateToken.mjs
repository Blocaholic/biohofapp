import {strict as assert} from 'assert';
import {it} from '../it.mjs';

export const testAuthCreateToken = async function (user, unconfirmedUser) {
  console.log('\n### Auth::create_token (Failure)');

  console.log('#### wrong password');
  await fetch(`https://biohofapp.de/api/auth/${user.deviceid}`, {
    method: 'POST',
    body: JSON.stringify({
      password: user.password.slice(0, -1) + '3',
    }),
  })
    .then(response => {
      it('http response code should be "401"', () =>
        assert(response.status === 401));
      return response.json();
    })
    .then(json => {
      it('Error message should include "password not accepted"', () =>
        assert.match(json.message.toLowerCase(), /password not accepted/));
    });

  console.log('#### deviceid not found');
  await fetch(`https://biohofapp.de/api/auth/7`, {
    method: 'POST',
    body: JSON.stringify({
      password: user.password,
    }),
  })
    .then(response => {
      it('http response code should be "404"', () =>
        assert(response.status === 404));
      return response.json();
    })
    .then(json => {
      it('deviceid should be sent back', () =>
        assert.match(json.deviceid.toString(), /7/));
      it('Error message should include "could not find deviceid"', () =>
        assert.match(json.message.toLowerCase(), /could not find deviceid/));
    });

  console.log('#### unconfirmed device');
  await fetch(`https://biohofapp.de/api/auth/${unconfirmedUser.deviceid}`, {
    method: 'POST',
    body: JSON.stringify({
      password: unconfirmedUser.password,
    }),
  })
    .then(response => {
      it('http response code should be "401"', () =>
        assert(response.status === 401));
      return response.json();
    })
    .then(json => {
      it('Error message should include "device is not confirmed"', () =>
        assert.match(json.message.toLowerCase(), /device is not confirmed/));
    });

  console.log('#### invalid deviceid');
  await fetch(`https://biohofapp.de/api/auth/1b3`, {
    method: 'POST',
    body: JSON.stringify({
      password: user.password,
    }),
  })
    .then(response => {
      it('http response code should be "400"', () =>
        assert(response.status === 400));
      return response.json();
    })
    .then(json => {
      it('deviceid should be sent back', () =>
        assert.match(json.deviceid.toString(), /1b3/));
      it('Error message should include "deviceid must be an integer greater than 0"', () =>
        assert.match(
          json.message.toLowerCase(),
          /deviceid must be an integer greater than 0/
        ));
      it('json property "syntax" should exist', () => assert(json.syntax));
      it('json property "example" should exist', () => assert(json.example));
    });

  console.log('#### missing password');
  await fetch(`https://biohofapp.de/api/auth/${user.deviceid}`, {
    method: 'POST',
    body: JSON.stringify({
      passwort: user.password,
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

  console.log('\n### Auth::create_token (Success)');
};
