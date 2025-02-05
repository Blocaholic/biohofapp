import {test} from '../utils/test.mjs';
import {expect} from '../utils/expect.mjs';

export const testBaseURL = async function () {
  console.log('\n### GET Base URL (Success)');
  await fetch('https://biohofapp.de', {
    method: 'GET',
  })
    .then(expect.responseCode(200))
    .then(response => response.text())
    .then(text =>
      test(
        'Response body should start with "<!DOCTYPE html>"',
        expect.toEqual(text.slice(0, 15), '<!DOCTYPE html>')
      )
    );
};
