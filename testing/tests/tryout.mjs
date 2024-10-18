#!/usr/bin/env node
'use strict';

import {test} from '../test.mjs';
import {expect} from '../expect.mjs';
import {httpRequest, getJson} from '../utils.mjs';

const user = {
  email: 'testbot1@reinwiese.de',
  password: '12345678901234567890123456789012',
  devicename: 'Bottis Laptop',
  userid: 77,
  deviceid: 137,
  confirmationpassword: 'mH4w57ZVe9rgb4hSRsNd0Wm49O5p9zDE',
};

console.log('### Auth::create_token (Success)');

const {token} = await httpRequest({
  url: `auth/${user.deviceid}`,
  method: 'POST',
  body: {
    password: user.password,
  },
})
  .then(expect.responseCode(201))
  .then(getJson)
  .then(json => {
    test(
      'deviceid should be sent back',
      expect.toEqual(json.deviceid, user.deviceid)
    );
    test(
      'token should include correct header',
      expect.toMatch(json.token, /eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/)
    );
    return json;
  });

console.log(token);

const blueprint = await httpRequest({
  url: ``,
  method: ``,
  body: {},
})
  .then(expect.responseCode())
  .then(getJson)
  .then(json => {});
