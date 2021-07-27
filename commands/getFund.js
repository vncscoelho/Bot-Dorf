const { MessageEmbed, GuildMemberManager } = require('discord.js');
const dayjs = require('dayjs');

const getFund = async (database, message) => {
  const fund = await database.get('fund');

  message.author.send(
    new MessageEmbed()
      .setTitle(`Vaquinha para aniversariantes do dia ${dayjs().format('DD/MM/YYYY')}`)
      .setDescription(`
      **Responsável:** ${fund.admin}
      **Valor:** R$${fund.value}
      **Número de participantes:** ${fund.participants.length}
      **Valor pra cada:** R$${fund.value / (fund.participants.length || 1)}

      *Para participar, digite:* **participar**
      `)
  );
}

module.exports = getFund;