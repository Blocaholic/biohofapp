import {strict as assert} from 'assert';
import {it} from '../it.mjs';

export const testAuthCreateToken = async function (user) {
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

  console.log('#### unconfirmed device');

  console.log('#### invalid deviceid');

  console.log('#### missing password');

  console.log('#### password != 32 chars');

  console.log('\n### Auth::create_token (Success)');
};
