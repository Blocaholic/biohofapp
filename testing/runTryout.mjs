#!/usr/bin/env node

import {Temporal} from '../www/js/Temporal.mjs';

/* const date = Temporal.PlainDate.from('2024-11-05');
const newDate = date.add({days: 5});
console.log(newDate.toString()); */

import {test} from './test.mjs';
import {expect} from './expect.mjs';
import {httpRequest, getJson} from './utils.mjs';

import {testBedblockAdd} from './tests/bedblockAdd.mjs';

const starttime = Temporal.Now.instant().epochMilliseconds;

const user1 = {
  email: 'testbot1@reinwiese.de',
  password: '12345678901234567890123456789012',
  devicename: 'Bottis Laptop',
  userid: 77,
  deviceid: 137,
  confirmationpassword: 'mH4w57ZVe9rgb4hSRsNd0Wm49O5p9zDE',
};

const user2 = {
  email: 'testbot2@reinwiese.de',
  password: '12345678901234567890123456789012',
  devicename: 'Mein Tablet',
  userid: 78,
  deviceid: 138,
  confirmationpassword: '9ueRfk0mNTEpOqThp8nrPMDtqybcIMPS',
};

const user3 = {
  email: 'testbot3@reinwiese.de',
  password: '12345678901234567890123456789012',
  devicename: 'Festrechner Gewächshaus',
  userid: 79,
  deviceid: 139,
  confirmationpassword: 'bR9E8KJGdePJgXSDPccYSjTZNXeHOKuS',
};

const user4 = {
  email: 'testbot4@reinwiese.de',
  password: '12345678901234567890123456789012',
  devicename: 'Handy vom Hofknecht',
  userid: 80,
  deviceid: 140,
  confirmationpassword: 'SjYVv8A8BEd3fW0xd7fAgK2luvC3sftU',
};

const unconfirmedUser = {
  email: 'testbot5@reinwiese.de',
  password: '12345678901234567890123456789012',
  devicename: 'Computer',
};

const users = {user1, user2, user3, user4, unconfirmedUser};

printHeaderToConsole();

// register unconfirmed device

const unconfirmedDevice = await httpRequest({
  url: `devices`,
  method: `POST`,
  body: {
    email: users.unconfirmedUser.email,
    password: users.unconfirmedUser.password,
    devicename: users.unconfirmedUser.devicename,
  },
})
  // .then(expect.responseCode(201))
  .then(getJson);

users.unconfirmedUser.userid = unconfirmedDevice.userid;
users.unconfirmedUser.deviceid = unconfirmedDevice.deviceid;

// create token

Object.assign(
  users.user1,
  await httpRequest({
    url: `auth/${users.user1.deviceid}`,
    method: `POST`,
    body: {password: users.user1.password},
  })
    //  .then(expect.responseCode(201))
    .then(getJson)
);
Object.assign(
  users.user2,
  await httpRequest({
    url: `auth/${users.user2.deviceid}`,
    method: `POST`,
    body: {password: users.user2.password},
  })
    // .then(expect.responseCode(201))
    .then(getJson)
);
Object.assign(
  users.user3,
  await httpRequest({
    url: `auth/${users.user3.deviceid}`,
    method: `POST`,
    body: {password: users.user3.password},
  })
    // .then(expect.responseCode(201))
    .then(getJson)
);
Object.assign(
  users.user4,
  await httpRequest({
    url: `auth/${users.user4.deviceid}`,
    method: `POST`,
    body: {password: users.user4.password},
  })
    // .then(expect.responseCode(201))
    .then(getJson)
);

// create testfarm

const {farmid: testfarmid} = await httpRequest({
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
  // .then(expect.responseCode(201))
  .then(getJson);

// ------------------------------------------------------------------
// run selected tests

await testBedblockAdd(users, testfarmid);

// cleanup and print summary

await httpRequest({
  url: `farms/${testfarmid}`,
  method: `DELETE`,
  headers: [['token', users.user1.token]],
});
//.then(expect.responseCode(200))

printFooterToConsole();

function printHeaderToConsole() {
  console.log('\n# Testing biohofapp.de API');
  console.log('## START');
}

function printFooterToConsole() {
  console.log('\n## SUMMARY');
  console.log(
    test.count().success > 0 ? '\x1b[32m%s\x1b[0m' : '\x1b[37m%s\x1b[0m',
    `${test.count().success} Tests erfolgreich`
  );
  console.log(
    test.count().failure > 0 ? '\x1b[31m%s\x1b[0m' : '\x1b[37m%s\x1b[0m',
    `${test.count().failure} Tests fehlgeschlagen`
  );
  console.log(`${test.count().total} Tests gesamt`);
  const endtime = Temporal.Now.instant().epochMilliseconds;
  const duration = (endtime - starttime) / 1000;
  console.log(
    `\n## DONE Testing biohofapp.de API (in ${
      Math.round(duration * 10) / 10
    } s)\n`
  );
}
