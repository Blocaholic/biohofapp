import {test} from '../utils/test.mjs';
import {expect} from '../utils/expect.mjs';
import {httpRequest} from '../utils/httpRequest.mjs';
import {getJson} from '../utils/getJson.mjs';

export const testBedblockAdd = async function (users, testfarmid) {
  console.log('\n### Bedblock::add (Failure)');

  console.log('#### invalid token');
  const tokenArray = users.user1.token.split('');
  tokenArray[22] = 'x';
  const invalidToken = tokenArray.join('');
  await httpRequest({
    url: `bedblock`,
    method: `POST`,
    headers: [['token', invalidToken]],
    body: {
      name: 'A1',
      farmid: testfarmid,
      bedwidth: 80,
      bedlength: 15,
      number: 20,
      gap: 40,
      y: 0,
      x: 0,
      orientation: 0,
      start: '2024-01-01',
      end: '',
    },
  })
    .then(expect.responseCode(401))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "invalid token"',
        expect.toMatch(json.message?.toLowerCase(), /invalid token/)
      );
    });

  console.log('#### missing farmid');
  await httpRequest({
    url: `bedblock`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      name: 'A1',
      farid: testfarmid,
      bedwidth: 80,
      bedlength: 15,
      number: 20,
      gap: 40,
      y: 0,
      x: 0,
      orientation: 0,
      start: '2024-01-01',
      end: '',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""farmid" is required"',
        expect.toMatch(json.message?.toLowerCase(), /"farmid" is required/)
      );
    });

  console.log('#### invalid farmid');
  await httpRequest({
    url: `bedblock`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      name: 'A1',
      farmid: 0,
      bedwidth: 80,
      bedlength: 15,
      number: 20,
      gap: 40,
      y: 0,
      x: 0,
      orientation: 0,
      start: '2024-01-01',
      end: '',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""farmid" must be greater than 0"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /"farmid" must be greater than 0/
        )
      );
    });

  console.log('#### no permission');
  await httpRequest({
    url: `bedblock`,
    method: `POST`,
    headers: [['token', users.user3.token]],
    body: {
      name: 'A1',
      farmid: testfarmid,
      bedwidth: 80,
      bedlength: 15,
      number: 20,
      gap: 40,
      y: 0,
      x: 0,
      orientation: 0,
      start: '2024-01-01',
      end: '',
    },
  })
    .then(expect.responseCode(401))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "no permission"',
        expect.toMatch(json.message?.toLowerCase(), /no permission/)
      );
    });

  console.log('#### missing name');
  await httpRequest({
    url: `bedblock`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      nam: 'A1',
      farmid: testfarmid,
      bedwidth: 80,
      bedlength: 15,
      number: 20,
      gap: 40,
      y: 0,
      x: 0,
      orientation: 0,
      start: '2024-01-01',
      end: '',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""name" is required"',
        expect.toMatch(json.message?.toLowerCase(), /"name" is required/)
      );
    });

  console.log('#### empty name');
  await httpRequest({
    url: `bedblock`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      name: '',
      farmid: testfarmid,
      bedwidth: 80,
      bedlength: 15,
      number: 20,
      gap: 40,
      y: 0,
      x: 0,
      orientation: 0,
      start: '2024-01-01',
      end: '',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""name" must be at least 1 character"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /"name" must be at least 1 character/
        )
      );
    });

  console.log('#### missing bedwidth');
  await httpRequest({
    url: `bedblock`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      name: 'A1',
      farmid: testfarmid,
      bedwidht: 80,
      bedlength: 15,
      number: 20,
      gap: 40,
      y: 0,
      x: 0,
      orientation: 0,
      start: '2024-01-01',
      end: '',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""bedwidth" is required"',
        expect.toMatch(json.message?.toLowerCase(), /"bedwidth" is required/)
      );
    });

  console.log('#### invalid bedwidth');
  await httpRequest({
    url: `bedblock`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      name: 'A1',
      farmid: testfarmid,
      bedwidth: -80,
      bedlength: 15,
      number: 20,
      gap: 40,
      y: 0,
      x: 0,
      orientation: 0,
      start: '2024-01-01',
      end: '',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""bedwidth" must be greater than 0"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /"bedwidth" must be greater than 0/
        )
      );
    });

  console.log('#### missing bedlength');
  await httpRequest({
    url: `bedblock`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      name: 'A1',
      farmid: testfarmid,
      bedwidth: 80,
      bedlen: 15,
      number: 20,
      gap: 40,
      y: 0,
      x: 0,
      orientation: 0,
      start: '2024-01-01',
      end: '',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""bedlength" is required"',
        expect.toMatch(json.message?.toLowerCase(), /"bedlength" is required/)
      );
    });

  console.log('#### invalid bedlength');
  await httpRequest({
    url: `bedblock`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      name: 'A1',
      farmid: testfarmid,
      bedwidth: 80,
      bedlength: 0,
      number: 20,
      gap: 40,
      y: 0,
      x: 0,
      orientation: 0,
      start: '2024-01-01',
      end: '',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""bedlength" must be greater than 0"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /"bedlength" must be greater than 0/
        )
      );
    });

  console.log('#### missing number');
  await httpRequest({
    url: `bedblock`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      name: 'A1',
      farmid: testfarmid,
      bedwidth: 80,
      bedlength: 15,
      num: 20,
      gap: 40,
      y: 0,
      x: 0,
      orientation: 0,
      start: '2024-01-01',
      end: '',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""number" is required"',
        expect.toMatch(json.message?.toLowerCase(), /"number" is required/)
      );
    });

  console.log('#### invalid number');
  await httpRequest({
    url: `bedblock`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      name: 'A1',
      farmid: testfarmid,
      bedwidth: 80,
      bedlength: 15,
      number: 'many',
      gap: 40,
      y: 0,
      x: 0,
      orientation: 0,
      start: '2024-01-01',
      end: '',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""number" must be numeric"',
        expect.toMatch(json.message?.toLowerCase(), /"number" must be numeric/)
      );
    });

  console.log('#### missing gap');
  await httpRequest({
    url: `bedblock`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      name: 'A1',
      farmid: testfarmid,
      bedwidth: 80,
      bedlength: 15,
      number: 20,
      gaps: 40,
      y: 0,
      x: 0,
      orientation: 0,
      start: '2024-01-01',
      end: '',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""gap" is required"',
        expect.toMatch(json.message?.toLowerCase(), /"gap" is required/)
      );
    });

  console.log('#### invalid gap');
  await httpRequest({
    url: `bedblock`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      name: 'A1',
      farmid: testfarmid,
      bedwidth: 80,
      bedlength: 15,
      number: 20,
      gap: 33.3,
      y: 0,
      x: 0,
      orientation: 0,
      start: '2024-01-01',
      end: '',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""gap" must be an integer"',
        expect.toMatch(json.message?.toLowerCase(), /"gap" must be an integer/)
      );
    });

  console.log('#### missing x');
  await httpRequest({
    url: `bedblock`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      name: 'A1',
      farmid: testfarmid,
      bedwidth: 80,
      bedlength: 15,
      number: 20,
      gap: 40,
      y: 0,
      z: 0,
      orientation: 0,
      start: '2024-01-01',
      end: '',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""x" is required"',
        expect.toMatch(json.message?.toLowerCase(), /"x" is required/)
      );
    });

  console.log('#### invalid x');
  await httpRequest({
    url: `bedblock`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      name: 'A1',
      farmid: testfarmid,
      bedwidth: 80,
      bedlength: 15,
      number: 20,
      gap: 40,
      y: 0,
      x: 'a',
      orientation: 0,
      start: '2024-01-01',
      end: '',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""x" must be numeric"',
        expect.toMatch(json.message?.toLowerCase(), /"x" must be numeric/)
      );
    });

  console.log('#### missing y');
  await httpRequest({
    url: `bedblock`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      name: 'A1',
      farmid: testfarmid,
      bedwidth: 80,
      bedlength: 15,
      number: 20,
      gap: 40,
      z: 0,
      x: 0,
      orientation: 0,
      start: '2024-01-01',
      end: '',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""y" is required"',
        expect.toMatch(json.message?.toLowerCase(), /"y" is required/)
      );
    });

  console.log('#### invalid y');
  await httpRequest({
    url: `bedblock`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      name: 'A1',
      farmid: testfarmid,
      bedwidth: 80,
      bedlength: 15,
      number: 20,
      gap: 40,
      y: 1.5,
      x: 0,
      orientation: 0,
      start: '2024-01-01',
      end: '',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""y" must be an integer"',
        expect.toMatch(json.message?.toLowerCase(), /"y" must be an integer/)
      );
    });

  console.log('#### missing orientation');
  await httpRequest({
    url: `bedblock`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      name: 'A1',
      farmid: testfarmid,
      bedwidth: 80,
      bedlength: 15,
      number: 20,
      gap: 40,
      y: 0,
      x: 0,
      orientaton: 0,
      start: '2024-01-01',
      end: '',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""orientation" is required"',
        expect.toMatch(json.message?.toLowerCase(), /"orientation" is required/)
      );
    });

  console.log('#### orientation not numeric');
  await httpRequest({
    url: `bedblock`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      name: 'A1',
      farmid: testfarmid,
      bedwidth: 80,
      bedlength: 15,
      number: 20,
      gap: 40,
      y: 0,
      x: 0,
      orientation: 'vertical',
      start: '2024-01-01',
      end: '',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""orientation" must be numeric"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /"orientation" must be numeric/
        )
      );
    });

  console.log('#### orientation < -89');
  await httpRequest({
    url: `bedblock`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      name: 'A1',
      farmid: testfarmid,
      bedwidth: 80,
      bedlength: 15,
      number: 20,
      gap: 40,
      y: 0,
      x: 0,
      orientation: -90,
      start: '2024-01-01',
      end: '',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "orientation cannot be less than -89"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /orientation cannot be less than -89/
        )
      );
    });

  console.log('#### orientation > 90');
  await httpRequest({
    url: `bedblock`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      name: 'A1',
      farmid: testfarmid,
      bedwidth: 80,
      bedlength: 15,
      number: 20,
      gap: 40,
      y: 0,
      x: 0,
      orientation: 180,
      start: '2024-01-01',
      end: '',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "orientation cannot be bigger than 90"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /orientation cannot be bigger than 90/
        )
      );
    });

  console.log('#### invalid start date format');
  await httpRequest({
    url: `bedblock`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      name: 'A1',
      farmid: testfarmid,
      bedwidth: 80,
      bedlength: 15,
      number: 20,
      gap: 40,
      y: 0,
      x: 0,
      orientation: 0,
      start: '202-01-01',
      end: '',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""start": invalid date format"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /"start": invalid date format/
        )
      );
    });

  console.log('#### invalid start date');
  await httpRequest({
    url: `bedblock`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      name: 'A1',
      farmid: testfarmid,
      bedwidth: 80,
      bedlength: 15,
      number: 20,
      gap: 40,
      y: 0,
      x: 0,
      orientation: 0,
      start: '2024-02-30',
      end: '',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""start": invalid date"',
        expect.toMatch(json.message?.toLowerCase(), /"start": invalid date/)
      );
    });

  console.log('#### missing start date');
  await httpRequest({
    url: `bedblock`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      name: 'A1',
      farmid: testfarmid,
      bedwidth: 80,
      bedlength: 15,
      number: 20,
      gap: 40,
      y: 0,
      x: 0,
      orientation: 0,
      start: '',
      end: '',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""start": invalid date format"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /"start": invalid date format/
        )
      );
    });

  console.log('#### invalid end date format');
  await httpRequest({
    url: `bedblock`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      name: 'A1',
      farmid: testfarmid,
      bedwidth: 80,
      bedlength: 15,
      number: 20,
      gap: 40,
      y: 0,
      x: 0,
      orientation: 0,
      start: '2024-01-01',
      end: '2024-12-1',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""end": invalid date format"',
        expect.toMatch(
          json.message?.toLowerCase(),
          /"end": invalid date format/
        )
      );
    });

  console.log('#### invalid end date');
  await httpRequest({
    url: `bedblock`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      name: 'A1',
      farmid: testfarmid,
      bedwidth: 80,
      bedlength: 15,
      number: 20,
      gap: 40,
      y: 0,
      x: 0,
      orientation: 0,
      start: '2024-01-01',
      end: '2024-13-01',
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include ""end": invalid date"',
        expect.toMatch(json.message?.toLowerCase(), /"end": invalid date/)
      );
    });

  console.log('\n### Bedblock::add (Success)');
  return await httpRequest({
    url: `bedblock`,
    method: `POST`,
    headers: [['token', users.user1.token]],
    body: {
      name: 'A1',
      farmid: testfarmid,
      bedwidth: 80,
      bedlength: 15,
      number: 20,
      gap: 40,
      y: 0,
      x: 0,
      orientation: 0,
      start: '2024-01-01',
      end: '',
    },
  })
    .then(expect.responseCode(201))
    .then(getJson)
    .then(json => {
      test(
        'bedblockid should be sent back',
        expect.toBeTruthy(json.bedblockid)
      );
      test(
        'bedblockid should be an integer',
        expect.toBeTruthy(Number.isInteger(Number(json.bedblockid)))
      );
      test(
        'bedblockid should be positive',
        expect.toBeTruthy(Number(json.bedblockid) > 0)
      );
      return json;
    });
};
