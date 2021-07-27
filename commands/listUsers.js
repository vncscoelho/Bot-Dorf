const { stringToMap } = require('../helpers.js');

const listUsers = async (database, { author }) => {
  const users = stringToMap(await database.get('users'));
  const names = Array.from(users)
    .map(([id, info]) => info.name).join`, `;
  author.send(names);
}

module.exports = listUsers;