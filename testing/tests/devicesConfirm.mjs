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
  await fetch(`https://biohofapp.de/api/devices/${user.deviceid}`, {
    method: 'PATCH',
    body: JSON.stringify({
      operation: 'konfirm',
      confirmationpassword: user.confirmationpassword,
    }),
  })
    .then(response => {
      it('http response code should be "400"', () =>
        assert(response.status === 400));
      return response.json();
    })
    .then(json => {
      it('Error message should include "unknown operation"', () =>
        assert.match(json.message.toLowerCase(), /unknown operation/));
      it('Operation should be sent back', () =>
        assert.match(json.operation, /konfirm/));
    });

  console.log('#### invalid id');
  await fetch(`https://biohofapp.de/api/devices/1b3`, {
    method: 'PATCH',
    body: JSON.stringify({
      operation: 'confirm',
      confirmationpassword: user.confirmationpassword,
    }),
  })
    .then(response => {
      it('http response code should be "400"', () =>
        assert(response.status === 400));
      return response.json();
    })
    .then(json => {
      it('Error message should include "id must be an integer greater than 0"', () =>
        assert.match(
          json.message.toLowerCase(),
          /id must be an integer greater than 0/
        ));
      it('ID should be sent back', () => assert.match(json.id, /1b3/));
      it('json property "syntax" should exist', () => assert(json.syntax));
      it('json property "example" should exist', () => assert(json.example));
    });

  console.log('#### missing password');
  await fetch(`https://biohofapp.de/api/devices/${user.deviceid}`, {
    method: 'PATCH',
    body: JSON.stringify({
      operation: 'confirm',
      confirmationpasswort: user.confirmationpassword,
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

  console.log('#### password "= 32 chars');
  await fetch(`https://biohofapp.de/api/devices/${user.deviceid}`, {
    method: 'PATCH',
    body: JSON.stringify({
      operation: 'confirm',
      confirmationpassword: user.confirmationpassword + 'x',
    }),
  })
    .then(response => {
      it('http response code should be "400"', () =>
        assert(response.status === 400));
      return response.json();
    })
    .then(json => {
      it('Error message should include "confirmationpassword must be 32 characters"', () =>
        assert.match(
          json.message.toLowerCase(),
          /confirmationpassword must be 32 characters/
        ));
      it('password length should be sent back', () =>
        assert.match(json.passwordLength.toString(), /33/));
    });

  console.log('#### id not found');

  console.log('#### wrong password');

  console.log('\n### Devices::Confirm (Success)');
};
