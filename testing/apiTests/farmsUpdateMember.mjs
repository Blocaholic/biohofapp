import {test} from '../utils/test.mjs';
import {expect} from '../utils/expect.mjs';
import {httpRequest} from '../utils/httpRequest.mjs';
import {getJson} from '../utils/getJson.mjs';

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
            farmMembersBeforeTest.find(member => member.role === by)?.email
        )?.token,
      ],
    ],
    body: {
      operation: 'update_member',
      farmid: testfarmid,
      email: farmMembersBeforeTest.find(member => member.role === from)?.email,
      role: to,
      userid: farmMembersBeforeTest.find(member => member.role === from)
        ?.userid,
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
              farmMembersAfterTest.find(m => m.role === 'owner')?.email
          )?.token,
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
            farmMembersBeforeTest.find(member => member.role === by)?.email
        )?.token,
      ],
    ],
    body: {
      operation: 'update_member',
      farmid: testfarmid,
      email: farmMembersBeforeTest.find(member => member.role === from)?.email,
      role: to,
      userid: farmMembersBeforeTest.find(member => member.role === from)
        ?.userid,
    },
  })
    .then(expect.responseCode(401))
    .then(getJson)
    .then(json => {
      test(
        `Error message should include "${message}"`,
        expect.toMatch(json.message?.toLowerCase(), new RegExp(message))
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
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'update_member',
      farmid: testfarmid,
      email: 'testbot99@reinwiese.de',
      role: 'employee',
      userid: users.user4.userid,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        `Error message should include "no user found with this email adress"`,
        expect.toMatch(
          json.message?.toLowerCase(),
          /no user found with this email adress/
        )
      );
    });

  console.log('#### userid does not fit email');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'update_member',
      farmid: testfarmid,
      email: users.user4.email,
      role: 'employee',
      userid: users.user4.userid + 1,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        `Error message should include "userid does not fit email adress"`,
        expect.toMatch(
          json.message?.toLowerCase(),
          /userid does not fit email adress/
        )
      );
    });

  console.log('#### missing role');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'update_member',
      farmid: testfarmid,
      email: users.user4.email,
      rol: 'employee',
      userid: users.user4.userid,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        `Error message should include ""role" is required"`,
        expect.toMatch(json.message?.toLowerCase(), /"role" is required/)
      );
    });

  console.log('#### missing farmid');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'update_member',
      famid: testfarmid,
      email: users.user4.email,
      role: 'employee',
      userid: users.user4.userid,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        `Error message should include ""farmid" is required"`,
        expect.toMatch(json.message?.toLowerCase(), /"farmid" is required/)
      );
    });

  console.log('#### invalid role');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'update_member',
      farmid: testfarmid,
      email: users.user4.email,
      role: 'employe',
      userid: users.user4.userid,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        `Error message should include "role "employe" not excepted"`,
        expect.toMatch(
          json.message?.toLowerCase(),
          /role "employe" not excepted/
        )
      );
    });

  console.log('#### invalid farmid');
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'update_member',
      farmid: '1a3',
      email: users.user4.email,
      role: 'employee',
      userid: users.user4.userid,
    },
  })
    .then(expect.responseCode(400))
    .then(getJson)
    .then(json => {
      test(
        `Error message should include ""farmid" must be numeric"`,
        expect.toMatch(json.message?.toLowerCase(), /"farmid" must be numeric/)
      );
    });

  console.log('#### no permission (only owner/admin)');
  await failToUpdateMember({
    from: 'visitor',
    to: 'employee',
    by: 'visitor',
    users,
    testfarmid,
    message: 'no permission',
  });
  await failToUpdateMember({
    from: 'visitor',
    to: 'admin',
    by: 'visitor',
    users,
    testfarmid,
    message: 'no permission',
  });
  await failToUpdateMember({
    from: 'visitor',
    to: 'owner',
    by: 'visitor',
    users,
    testfarmid,
    message: 'no permission',
  });
  await failToUpdateMember({
    from: 'employee',
    to: 'visitor',
    by: 'visitor',
    users,
    testfarmid,
    message: 'no permission',
  });
  await failToUpdateMember({
    from: 'employee',
    to: 'admin',
    by: 'visitor',
    users,
    testfarmid,
    message: 'no permission',
  });
  await failToUpdateMember({
    from: 'employee',
    to: 'owner',
    by: 'visitor',
    users,
    testfarmid,
    message: 'no permission',
  });
  await failToUpdateMember({
    from: 'admin',
    to: 'visitor',
    by: 'visitor',
    users,
    testfarmid,
    message: 'no permission',
  });
  await failToUpdateMember({
    from: 'admin',
    to: 'employee',
    by: 'visitor',
    users,
    testfarmid,
    message: 'no permission',
  });
  await failToUpdateMember({
    from: 'admin',
    to: 'owner',
    by: 'visitor',
    users,
    testfarmid,
    message: 'no permission',
  });
  await failToUpdateMember({
    from: 'owner',
    to: 'visitor',
    by: 'visitor',
    users,
    testfarmid,
    message: 'no permission',
  });
  await failToUpdateMember({
    from: 'owner',
    to: 'employee',
    by: 'visitor',
    users,
    testfarmid,
    message: 'no permission',
  });
  await failToUpdateMember({
    from: 'owner',
    to: 'admin',
    by: 'visitor',
    users,
    testfarmid,
    message: 'no permission',
  });
  await failToUpdateMember({
    from: 'visitor',
    to: 'employee',
    by: 'employee',
    users,
    testfarmid,
    message: 'no permission',
  });
  await failToUpdateMember({
    from: 'visitor',
    to: 'admin',
    by: 'employee',
    users,
    testfarmid,
    message: 'no permission',
  });
  await failToUpdateMember({
    from: 'visitor',
    to: 'owner',
    by: 'employee',
    users,
    testfarmid,
    message: 'no permission',
  });
  await failToUpdateMember({
    from: 'employee',
    to: 'visitor',
    by: 'employee',
    users,
    testfarmid,
    message: 'no permission',
  });
  await failToUpdateMember({
    from: 'employee',
    to: 'admin',
    by: 'employee',
    users,
    testfarmid,
    message: 'no permission',
  });
  await failToUpdateMember({
    from: 'employee',
    to: 'owner',
    by: 'employee',
    users,
    testfarmid,
    message: 'no permission',
  });
  await failToUpdateMember({
    from: 'admin',
    to: 'visitor',
    by: 'employee',
    users,
    testfarmid,
    message: 'no permission',
  });
  await failToUpdateMember({
    from: 'admin',
    to: 'employee',
    by: 'employee',
    users,
    testfarmid,
    message: 'no permission',
  });
  await failToUpdateMember({
    from: 'admin',
    to: 'owner',
    by: 'employee',
    users,
    testfarmid,
    message: 'no permission',
  });
  await failToUpdateMember({
    from: 'owner',
    to: 'visitor',
    by: 'employee',
    users,
    testfarmid,
    message: 'no permission',
  });
  await failToUpdateMember({
    from: 'owner',
    to: 'employee',
    by: 'employee',
    users,
    testfarmid,
    message: 'no permission',
  });
  await failToUpdateMember({
    from: 'owner',
    to: 'admin',
    by: 'employee',
    users,
    testfarmid,
    message: 'no permission',
  });

  console.log('#### no permission (only owner can set new owner)');
  await failToUpdateMember({
    from: 'admin',
    to: 'owner',
    by: 'admin',
    users,
    testfarmid,
    message: 'only owner can set another owner',
  });
  await failToUpdateMember({
    from: 'employee',
    to: 'owner',
    by: 'admin',
    users,
    testfarmid,
    message: 'only owner can set another owner',
  });
  await failToUpdateMember({
    from: 'visitor',
    to: 'owner',
    by: 'admin',
    users,
    testfarmid,
    message: 'only owner can set another owner',
  });

  console.log('#### no permission (set new owner)');
  await failToUpdateMember({
    from: 'owner',
    to: 'visitor',
    by: 'owner',
    users,
    testfarmid,
    message: 'set new owner',
  });
  await failToUpdateMember({
    from: 'owner',
    to: 'employee',
    by: 'owner',
    users,
    testfarmid,
    message: 'set new owner',
  });
  await failToUpdateMember({
    from: 'owner',
    to: 'admin',
    by: 'owner',
    users,
    testfarmid,
    message: 'set new owner',
  });

  console.log('#### no permission (admin not owner)');
  await failToUpdateMember({
    from: 'owner',
    to: 'visitor',
    by: 'admin',
    users,
    testfarmid,
    message: 'admin cannot change owner',
  });
  await failToUpdateMember({
    from: 'owner',
    to: 'employee',
    by: 'admin',
    users,
    testfarmid,
    message: 'admin cannot change owner',
  });
  await failToUpdateMember({
    from: 'owner',
    to: 'admin',
    by: 'admin',
    users,
    testfarmid,
    message: 'admin cannot change owner',
  });

  console.log('#### no permission (admin not other admin)');
  // weiteren admin erstellen
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'update_member',
      farmid: testfarmid,
      email: users.user4.email,
      role: 'admin',
      userid: users.user4.userid,
    },
  }).then(expect.responseCode(200));

  // define helper function
  const areFarmRolesUnchangedWithTwoAdmins = async users => {
    const roles = {
      'testbot1@reinwiese.de': 'owner',
      'testbot2@reinwiese.de': 'admin',
      'testbot3@reinwiese.de': 'employee',
      'testbot4@reinwiese.de': 'admin',
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

  // sonderfall admin anderen admin (failure)
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user2.token]],
    body: {
      operation: 'update_member',
      farmid: testfarmid,
      email: users.user4.email,
      role: 'visitor',
      userid: users.user4.userid,
    },
  })
    .then(expect.responseCode(401))
    .then(getJson)
    .then(json => {
      test(
        `Error message should include "admin cannot change other admins"`,
        expect.toMatch(
          json.message?.toLowerCase(),
          /admin cannot change other admins/
        )
      );
      test(
        'Farm roles should be unchanged',
        expect.toBeTruthy(areFarmRolesUnchangedWithTwoAdmins(users))
      );
    });
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user2.token]],
    body: {
      operation: 'update_member',
      farmid: testfarmid,
      email: users.user4.email,
      role: 'employee',
      userid: users.user4.userid,
    },
  })
    .then(expect.responseCode(401))
    .then(getJson)
    .then(json => {
      test(
        `Error message should include "admin cannot change other admins"`,
        expect.toMatch(
          json.message?.toLowerCase(),
          /admin cannot change other admins/
        )
      );
      test(
        'Farm roles should be unchanged',
        expect.toBeTruthy(areFarmRolesUnchangedWithTwoAdmins(users))
      );
    });
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user2.token]],
    body: {
      operation: 'update_member',
      farmid: testfarmid,
      email: users.user4.email,
      role: 'owner',
      userid: users.user4.userid,
    },
  })
    .then(expect.responseCode(401))
    .then(getJson)
    .then(json => {
      test(
        `Error message should include "admin cannot change other admins"`,
        expect.toMatch(
          json.message?.toLowerCase(),
          /admin cannot change other admins/
        )
      );
      test(
        'Farm roles should be unchanged',
        expect.toBeTruthy(areFarmRolesUnchangedWithTwoAdmins(users))
      );
    });

  // weiteren admin wieder auf visitor zurücksetzen
  await httpRequest({
    url: `farms`,
    method: `PATCH`,
    headers: [['token', users.user1.token]],
    body: {
      operation: 'update_member',
      farmid: testfarmid,
      email: users.user4.email,
      role: 'visitor',
      userid: users.user4.userid,
    },
  }).then(expect.responseCode(200));

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
