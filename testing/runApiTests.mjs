#!/usr/bin/env node

import {Temporal} from '../www/js/Temporal.mjs';

import {test} from './test.mjs';
import {testBaseURL} from './tests/baseURL.mjs';
import {testApiBasics} from './tests/apiBasics.mjs';
import {testDevicesRegister} from './tests/devicesRegister.mjs';
import {testDevicesConfirm} from './tests/devicesConfirm.mjs';
import {testAuthCreateToken} from './tests/authCreateToken.mjs';
import {testDevicesRename} from './tests/devicesRename.mjs';

import {testFarmsAdd} from './tests/farmsAdd.mjs';
import {testFarmsGet} from './tests/farmsGet.mjs';
import {testFarmsRename} from './tests/farmsRename.mjs';
import {testFarmsUpdateModules} from './tests/farmsUpdateModules.mjs';
import {testFarmsAddMember} from './tests/farmsAddMember.mjs';
import {testFarmsUpdateMember} from './tests/farmsUpdateMember.mjs';
import {testFarmsRemoveMember} from './tests/farmsRemoveMember.mjs';
import {testFarmsDelete} from './tests/farmsDelete.mjs';
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

await testBaseURL();
await testApiBasics();
const devicesRegisterTestResult = await testDevicesRegister(users);
await testDevicesConfirm(users);

users.unconfirmedUser.userid = devicesRegisterTestResult.userid;
users.unconfirmedUser.deviceid = devicesRegisterTestResult.deviceid;

const authCreateTokenTestResult = await testAuthCreateToken(users);

users.user1.token = authCreateTokenTestResult.user1.token;
users.user2.token = authCreateTokenTestResult.user2.token;
users.user3.token = authCreateTokenTestResult.user3.token;
users.user4.token = authCreateTokenTestResult.user4.token;

await testDevicesRename(users);

const FarmsAddTestResult = await testFarmsAdd(users);
const testfarmid = FarmsAddTestResult.farmid;
await testFarmsGet(users);

await testFarmsRename(users, testfarmid);
await testFarmsAddMember(users, testfarmid);
await testFarmsUpdateMember(users, testfarmid);
await testFarmsRemoveMember(users, testfarmid);
await testFarmsUpdateModules(users, testfarmid);
await testBedblockAdd(users, testfarmid);

// delete member
await testFarmsDelete(users, testfarmid);

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
