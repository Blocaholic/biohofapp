import {strict as assert} from 'assert';
import {it} from '../it.mjs';

export const testApiBasics = async function () {
  console.log('\n### API Basics (Failure)');

  console.log('#### API: unknown endpoint');
  await fetch('https://biohofapp.de/api/invalid', {
    method: 'GET',
  })
    .then(response => {
      it('http response code should be "404"', () =>
        assert(response.status === 404));
      return response.json();
    })
    .then(json => {
      it('Error message should include "Unknown endpoint" (case insensitive)', () =>
        assert.match(json.message.toLowerCase(), /unknown endpoint/));
      it('Error message should include requested endpoint"', () =>
        assert.match(json.message.toLowerCase(), /invalid/));
      it('List of valid endpoints should exist', () =>
        assert(json.validEndpoints));
    });

  console.log('#### API: request method not allowed');
  await fetch('https://biohofapp.de/api/devices', {
    method: 'GET',
  })
    .then(response => {
      it('http response code should be "405"', () =>
        assert(response.status === 405));
      return response.json();
    })
    .then(json => {
      it('Error message includes "http request method"', () =>
        assert.match(json.message.toLowerCase(), /http request method/));
      it('Error message includes "not allowed for endpoint"', () =>
        assert.match(json.message.toLowerCase(), /not allowed for endpoint/));
      it('Error message includes requested endpoint', () =>
        assert.match(json.message.toLowerCase(), /devices/));
      it('Error message includes request method', () =>
        assert.match(json.message.toLowerCase(), /get/));
      it('List of valid methods should exist', () => assert(json.validMethods));
    });

  console.log('#### API: unknown http request method');
  await fetch('https://biohofapp.de/api/auth', {
    method: 'FAIL',
  })
    .then(response => {
      it('http response code should be "501"', () =>
        assert(response.status === 501));
      return response.json();
    })
    .then(json => {
      it('Error message includes "unknown http request method"', () =>
        assert.match(json.message.toLowerCase(), /http request method/));
      it('Error message includes requested endpoint', () =>
        assert.match(json.message.toLowerCase(), /fail/));
      it('List of valid http request methods should exist', () =>
        assert(json.validHttpRequestMethods));
      it('Valid http request methods should include "POST", "PATCH" and "GET"', () => {
        assert(json.validHttpRequestMethods.includes('POST'));
        assert(json.validHttpRequestMethods.includes('PATCH'));
        assert(json.validHttpRequestMethods.includes('GET'));
      });
    });
};
