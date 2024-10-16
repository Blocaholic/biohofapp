import {strict as assert} from 'assert';
import {it} from '../it.mjs';

export const testDevicesConfirm = async function (user) {
  console.log('\n### Devices::Confirm (Failure)');

  console.log('#### undefined operation');
  await fetch(`https://biohofapp.de/api/devices/${user.deviceid}`, {
    method: 'PATCH',
    body: JSON.stringify({
      operations: 'confirm',
      confirmationpassword: user.confirmationpassword,
    }),
  })
    .then(response => {
      it('http response code should be "400"', () =>
        assert(response.status === 400));
      return response.json();
    })
    .then(json => {
      it('Error message should include "operation must be defined"', () =>
        assert.match(json.message.toLowerCase(), /operation must be defined/));
    });

  console.log('#### unknown operation');

  console.log('#### invalid id');

  console.log('#### missing password');

  console.log('#### password "= 32 chars');

  console.log('#### id not found');

  console.log('#### wrong password');

  console.log('\n### Devices::Confirm (Success)');
};
