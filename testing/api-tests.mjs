#!/usr/bin/env node
'use strict';
import {strict as assert} from 'assert';
import {it} from './it.mjs';

console.log('\n# Testing biohofapp.de');
console.log('## START');
console.log('\n### GET Base URL (Success)');

const api = await fetch('https://biohofapp.de', {
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

Promise.all([api]).then(_ => {
  console.log('\n## SUMMARY');
  console.log(
    it.counter().success > 0 ? '\x1b[32m%s\x1b[0m' : '\x1b[37m%s\x1b[0m',
    `${it.counter().success} Tests erfolgreich`
  );
  console.log(
    it.counter().failure > 0 ? '\x1b[31m%s\x1b[0m' : '\x1b[37m%s\x1b[0m',
    `${it.counter().failure} Tests fehlgeschlagen`
  );
  console.log(`${it.counter().total} Tests gesamt`);
  console.log('\n## DONE Testing biohofapp.de\n');
});
