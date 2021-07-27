const User = require('../user.js');
const { mapToString, stringToMap } = require('../helpers.js');

const registerUser = async (database, { author, content }, args) => {
  const data = args.join(' ').split('#').map(arg => arg.trimStart());

  if (data.length !== 4) {
    return author.send('Não consegui salvar! Verifique o formato!')
  }
  const newUser = new User(author.username, ...data);
  const userList = await database.get('users');
  const userMap = stringToMap(userList);
  
  userMap.set(author.id, newUser);
  author.send('Salvei com sucesso! Digite `dados` para verificar as infos salvas.')

  return database.set('users', mapToString(userMap));
}

module.exports = registerUser;