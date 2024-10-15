#!/usr/bin/env node
'use strict';

import {it} from './it.mjs';
import {testBaseURL} from './tests/baseURL.mjs';
import {testApiBasics} from './tests/apiBasics.mjs';

printHeaderToConsole();

const baseURLTestResult = await testBaseURL();
const apiFailureTestResult = await testApiBasics();

Promise.all([baseURLTestResult]).then(printFooterToConsole);

function printHeaderToConsole() {
  console.log('\n# Testing biohofapp.de');
  console.log('## START');
}

function printFooterToConsole() {
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
}
