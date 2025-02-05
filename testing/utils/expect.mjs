import {strict as assert} from 'assert';
import {test} from './test.mjs';

export const expect = {
  responseCode: function (responseCode) {
    return response => {
      test(
        `http response code should be "${responseCode}"`,
        this.toEqual(response.status, responseCode)
      );
      return response;
    };
  },
  toEqual: function (value1, value2) {
    return () => assert.strictEqual(value1, value2);
  },
  toMatch: function (text, regEx) {
    return () => assert.match(text, regEx);
  },
  toBeTruthy: function (value) {
    return () => assert.ok(value);
  },
};
