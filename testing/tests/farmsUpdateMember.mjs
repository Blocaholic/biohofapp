import {test} from '../test.mjs';
import {expect} from '../expect.mjs';
import {httpRequest, getJson} from '../utils.mjs';

const succeedToUpdateMember = async ({from, to, by, users, testfarmid}) => {
  console.log(`#### from "${from}" to "${to}" by "${by}"`);
  const farmMembersBeforeTest = await httpRequest({
    url: 'farms',
    method: 'GET',
    headers: [['token', users.user1.token]],
  })
    .then(getJson)
    .then(json => json[0].members);

  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [
      [
        'token',
        Object.values(users).find(
          user =>
            user.email ===
            farmMembersBeforeTest.find(member => member.role === by).email
        ).token,
      ],
    ],
    body: {
      operation: 'update_member',
      farmid: testfarmid,
      email: farmMembersBeforeTest.find(member => member.role === from).email,
      role: to,
      userid: farmMembersBeforeTest.find(member => member.role === from).userid,
    },
  })
    .then(expect.responseCode(200))
    .then(getJson)
    .then(json => {
      test(
        'response should include "success"',
        expect.toBeTruthy(json.success)
      );
      test(
        'value of "success" should be "success"',
        expect.toEqual(json.success, 'success')
      );
    });

  const roles = {
    'testbot1@reinwiese.de': 'owner',
    'testbot2@reinwiese.de': 'admin',
    'testbot3@reinwiese.de': 'employee',
    'testbot4@reinwiese.de': 'visitor',
  };

  const farmMembersAfterTest = await httpRequest({
    url: 'farms',
    method: 'GET',
    headers: [['token', users.user1.token]],
  })
    .then(getJson)
    .then(json => json[0].members);

  test(
    'There has to be always exactly one owner',
    expect.toEqual(
      farmMembersAfterTest.filter(member => member.role === 'owner').length,
      1
    )
  );

  console.log('##### Reset farm roles after test');
  for (const member of farmMembersAfterTest) {
    if (roles[member.email] === member.role) continue;
    await httpRequest({
      url: `farms`,
      method: `PATCH`,
      headers: [
        [
          'token',
          Object.values(users).find(
            user =>
              user.email ===
              farmMembersAfterTest.find(m => m.role === 'owner').email
          ).token,
        ],
      ],
      body: {
        operation: 'update_member',
        farmid: testfarmid,
        email: member.email,
        role: roles[member.email],
        userid: member.userid,
      },
    }).then(expect.responseCode(200));
  }
};

const failToUpdateMember = async ({
  from,
  to,
  by,
  users,
  testfarmid,
  message,
}) => {
  console.log(`#### from "${from}" to "${to}" by "${by}"`);
  const farmMembersBeforeTest = await httpRequest({
    url: 'farms',
    method: 'GET',
    headers: [['token', users.user1.token]],
  })
    .then(getJson)
    .then(json => json[0].members);

  const areFarmRolesUnchanged = async users => {
    const roles = {
      'testbot1@reinwiese.de': 'owner',
      'testbot2@reinwiese.de': 'admin',
      'testbot3@reinwiese.de': 'employee',
      'testbot4@reinwiese.de': 'visitor',
    };

    const farmMembersAfterTest = await httpRequest({
      url: 'farms',
      method: 'GET',
      headers: [['token', users.user1.token]],
    })
      .then(getJson)
      .then(json => json[0].members);

    for (const member of farmMembersAfterTest) {
      if (roles[member.email] !== member.role) return false;
    }

    if (farmMembersAfterTest.length !== 4) return false;

    return true;
  };

  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [
      [
        'token',
        Object.values(users).find(
          user =>
            user.email ===
            farmMembersBeforeTest.find(member => member.role === by).email
        ).token,
      ],
    ],
    body: {
      operation: 'update_member',
      farmid: testfarmid,
      email: farmMembersBeforeTest.find(member => member.role === from).email,
      role: to,
      userid: farmMembersBeforeTest.find(member => member.role === from).userid,
    },
  })
    .then(expect.responseCode(401))
    .then(getJson)
    .then(json => {
      test(
        `Error message should include "${message}"`,
        expect.toMatch(json.message.toLowerCase(), new RegExp(message))
      );
      test(
        'Farm roles should be unchanged',
        expect.toBeTruthy(areFarmRolesUnchanged(users))
      );
    });
};

export const testFarmsUpdateMember = async function (users, testfarmid) {
  console.log('\n### Farms::update_member (Failure)');
  console.log('#### unknown email');
  console.log('#### userid does not fit email');
  console.log('#### missing role');
  console.log('#### missing farmid');
  console.log('#### invalid role');
  console.log('#### invalid farmid');
  console.log('#### no permission (only owner/admin)');
  await failToUpdateMember({
    from: 'visitor',
    to: 'employee',
    by: 'visitor',
    users,
    testfarmid,
    message: 'no permission',
  });
  // visitor -> owner
  // visitor -> admin
  // visitor -> employee
  // visitor -> visitor
  // employee -> owner
  // employee -> admin
  // employee -> employee
  // employee -> visitor
  console.log('#### no permission (admin not admin)');
  // admin -> admin
  console.log('#### no permission (only owner can set new owner)');
  // admin -> owner
  console.log('\n### Farms::update_member (Success)');
  await succeedToUpdateMember({
    from: 'visitor',
    to: 'employee',
    by: 'admin',
    users,
    testfarmid,
  });
  await succeedToUpdateMember({
    from: 'visitor',
    to: 'admin',
    by: 'admin',
    users,
    testfarmid,
  });
  await succeedToUpdateMember({
    from: 'employee',
    to: 'visitor',
    by: 'admin',
    users,
    testfarmid,
  });
  await succeedToUpdateMember({
    from: 'employee',
    to: 'admin',
    by: 'admin',
    users,
    testfarmid,
  });
  await succeedToUpdateMember({
    from: 'admin',
    to: 'employee',
    by: 'admin',
    users,
    testfarmid,
  });
  await succeedToUpdateMember({
    from: 'admin',
    to: 'visitor',
    by: 'admin',
    users,
    testfarmid,
  });
  await succeedToUpdateMember({
    from: 'admin',
    to: 'visitor',
    by: 'owner',
    users,
    testfarmid,
  });
  await succeedToUpdateMember({
    from: 'admin',
    to: 'employee',
    by: 'owner',
    users,
    testfarmid,
  });
  await succeedToUpdateMember({
    from: 'employee',
    to: 'visitor',
    by: 'owner',
    users,
    testfarmid,
  });
  await succeedToUpdateMember({
    from: 'employee',
    to: 'admin',
    by: 'owner',
    users,
    testfarmid,
  });
  await succeedToUpdateMember({
    from: 'visitor',
    to: 'employee',
    by: 'owner',
    users,
    testfarmid,
  });
  await succeedToUpdateMember({
    from: 'visitor',
    to: 'admin',
    by: 'owner',
    users,
    testfarmid,
  });
  await succeedToUpdateMember({
    from: 'admin',
    to: 'owner',
    by: 'owner',
    users,
    testfarmid,
  });
  await succeedToUpdateMember({
    from: 'employee',
    to: 'owner',
    by: 'owner',
    users,
    testfarmid,
  });
  await succeedToUpdateMember({
    from: 'visitor',
    to: 'owner',
    by: 'owner',
    users,
    testfarmid,
  });
};
