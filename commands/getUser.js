const { MessageEmbed, GuildMemberManager } = require('discord.js');
const { mapToString, stringToMap } = require('../helpers.js');

const getUserData = async (database, { author, channel }) => {
  const users = stringToMap(await database.get('users'));
  const currentUser = users.get(author.id);

  author.send(new MessageEmbed().setDescription(`
  **Nome**: ${currentUser.name}
  **Aniversário**: ${currentUser.birthday}
  **Endereço**: ${currentUser.address}
  **Gosta de**: ${currentUser.likes}
  **PIX**: ${currentUser.pix}
  `));
};

module.exports = getUserData;