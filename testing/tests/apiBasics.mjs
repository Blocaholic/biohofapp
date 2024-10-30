import {test} from '../test.mjs';
import {expect} from '../expect.mjs';
import {httpRequest, getJson} from '../utils.mjs';

export const testApiBasics = async function () {
  console.log('\n### API Basics (Failure)');

  console.log('#### API: unknown endpoint');
  await httpRequest({
    url: `invalid`,
    method: 'GET',
  })
    .then(expect.responseCode(404))
    .then(getJson)
    .then(json => {
      test(
        'Error message should include "unknown endpoint" (case insensitive)',
        expect.toMatch(json.message?.toLowerCase(), /unknown endpoint/)
      );
      test(
        'Error message should include requested endpoint',
        expect.toMatch(json.message?.toLowerCase(), /invalid/)
      );
      test('List of valid endpoints should exist', () =>
        expect.toBeTruthy(json.validEndpoints));
    });

  console.log('#### API: request method not allowed');
  await httpRequest({
    url: 'devices',
    method: 'GET',
  })
    .then(expect.responseCode(405))
    .then(getJson)
    .then(json => {
      test(
        'Error message includes "http request method"',
        expect.toMatch(json.message?.toLowerCase(), /http request method/)
      );
      test(
        'Error message includes "not allowed for endpoint"',
        expect.toMatch(json.message?.toLowerCase(), /not allowed for endpoint/)
      );
      test(
        'Error message includes requested endpoint',
        expect.toMatch(json.message?.toLowerCase(), /devices/)
      );
      test(
        'Error message includes request method',
        expect.toMatch(json.message?.toLowerCase(), /get/)
      );
      test(
        'List of valid methods should exist',
        expect.toBeTruthy(json.validMethods)
      );
    });

  console.log('#### API: unknown http request method');
  await httpRequest({
    url: `auth`,
    method: `FAIL`,
    body: {},
  })
    .then(expect.responseCode(501))
    .then(getJson)
    .then(json => {
      test(
        'Error message includes "unknown http request method"',
        expect.toMatch(json.message?.toLowerCase(), /http request method/)
      );
      test(
        'Error message includes requested endpoint',
        expect.toMatch(json.message?.toLowerCase(), /fail/)
      );
      test(
        'List of valid http request methods should exist',
        expect.toBeTruthy(json.validHttpRequestMethods)
      );
      test(
        'Valid http request methods should include "POST"',
        expect.toBeTruthy(json.validHttpRequestMethods.includes('GET'))
      );
      test(
        'Valid http request methods should include "PATCH"',
        expect.toBeTruthy(json.validHttpRequestMethods.includes('GET'))
      );
      test(
        'Valid http request methods should include "GET"',
        expect.toBeTruthy(json.validHttpRequestMethods.includes('GET'))
      );
    });
};
