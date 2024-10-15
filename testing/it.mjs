const internalCounter = {
  success: 0,
  failure: 0,
  get total() {
    return this.success + this.failure;
  },
};

function it(testDescription, testFunction) {
  try {
    testFunction();
    console.log('\x1b[32m%s\x1b[0m', `\u2714 ${testDescription}`);
    internalCounter.success++;
  } catch (error) {
    console.log('\x1b[31m%s\x1b[0m', `\u2718 ${testDescription}`);
    console.error(error);
    internalCounter.failure++;
  }
}

it.counter = function () {
  return internalCounter;
};

export {it};
