import {strict as assert} from 'assert';
import {it} from '../it.mjs';

export const testBaseURL = async function () {
  console.log('\n### GET Base URL (Success)');
  await fetch('https://biohofapp.de', {
    method: 'GET',
  })
    .then(response => {
      it('http response code should be "200"', () =>
        assert(response.status === 200));
      return response.text();
    })
    .then(text =>
      it('Response body should start with "<!DOCTYPE html>"', () =>
        assert.strictEqual(text.slice(0, 15), '<!DOCTYPE html>'))
    );
};
