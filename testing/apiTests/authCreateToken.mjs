import {test} from '../utils/test.mjs';
import {expect} from '../utils/expect.mjs';
import {httpRequest} from '../utils/httpRequest.mjs';
import {getJson} from '../utils/getJson.mjs';

export const testAuthCreateToken = async function (users) {
  console.log('\n### Auth::create_token (Failure)');

  console.log('#### wrong password');
  await httpRequest({
    url: `auth/${users.user1.deviceid}`,
    method: `POST`,
    body: {password: users.user1.password.slice(0, -1) + '3'},
  })
    .then(expect.responseCode(401))
    .then(getJson)
    .then(json =>
      test(
        'Error message should include "password not accepted"',
        expect.toMatch(json.message?.toLowerCase(), /password not accepted/)
      )
    );

  console.log('#### deviceid not found');
  await httpRequest({
    url: `auth/7`,
    method: `POST`,
    body: {password: users.user1.password},
  })
    .then(expect.responseCode(404))
    .then(getJson)
    .then(json => {
      test(
        'deviceid should be sent back',
        expect.toMatch(json.deviceid.toString(), /7/)
      );
      test(
        'Error message should include "could not find deviceid"',
        expect.toMatch(json.message?.toLowerCase(), /could not find deviceid/)
      );
    });

  console.log('#### unconfirmed device');
  await httpRequest({
    url: `auth/${users.unconfirmedUser.deviceid}`,
    method: `POST`,
    body: {password: users.unconfirmedUser.password},
  })
    .then(expect.responseCode(401))
    .then(getJson)
    .then(json =>
      test(
        'Error message should include "device is not confirmed"',
        expect.toMatch(json.message?.toLowerCase(), /device is not confirmed/)
      )
    );

  console.log('#### invalid deviceid');
  await httpRequest({
    url: `auth/1b3`,
    method: `POST`,
    body: {password: users.user1.password},
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'deviceid should be sent back',
        expect.toMatch(json.deviceid.toString(), /1b3/)
      );
      test(
        'Error message should include "deviceid must be an integer greater than 0"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /deviceid must be an integer greater than 0/
        )
      );
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
    url: `auth/${users.user1.deviceid}`,
    method: `POST`,
    body: {passwort: users.user1.password},
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
    url: `auth/${users.user1.deviceid}`,
    method: `POST`,
    body: {password: users.user1.password + '3'},
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'password length should be sent back',
        expect.toMatch(json.passwordLength.toString(), /33/)
      );
      test(
        'error message should include "password must be 32 characters"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /password must be 32 characters/
        )
      );
    });

  console.log('\n### Auth::create_token (Success)');
  return {
    user1: await httpRequest({
      url: `auth/${users.user1.deviceid}`,
      method: `POST`,
      body: {password: users.user1.password},
    })
      .then(expect.responseCode(201))
      .then(getJson)
      .then(json => {
        test(
          'deviceid should be sent back',
          expect.toEqual(json.deviceid, users.user1.deviceid)
        );
        test(
          'token should include correct header',
          expect.toMatch(json.token, /eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/)
        );
        return json;
      }),
    user2: await httpRequest({
      url: `auth/${users.user2.deviceid}`,
      method: `POST`,
      body: {password: users.user2.password},
    })
      .then(expect.responseCode(201))
      .then(getJson)
      .then(json => {
        test(
          'deviceid should be sent back',
          expect.toEqual(json.deviceid, users.user2.deviceid)
        );
        test(
          'token should include correct header',
          expect.toMatch(json.token, /eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/)
        );
        return json;
      }),
    user3: await httpRequest({
      url: `auth/${users.user3.deviceid}`,
      method: `POST`,
      body: {password: users.user3.password},
    })
      .then(expect.responseCode(201))
      .then(getJson)
      .then(json => {
        test(
          'deviceid should be sent back',
          expect.toEqual(json.deviceid, users.user3.deviceid)
        );
        test(
          'token should include correct header',
          expect.toMatch(json.token, /eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/)
        );
        return json;
      }),
    user4: await httpRequest({
      url: `auth/${users.user4.deviceid}`,
      method: `POST`,
      body: {password: users.user4.password},
    })
      .then(expect.responseCode(201))
      .then(getJson)
      .then(json => {
        test(
          'deviceid should be sent back',
          expect.toEqual(json.deviceid, users.user4.deviceid)
        );
        test(
          'token should include correct header',
          expect.toMatch(json.token, /eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/)
        );
        return json;
      }),
  };
};
