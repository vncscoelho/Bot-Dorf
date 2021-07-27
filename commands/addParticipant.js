const { mapToString, stringToMap } = require('../helpers.js');

const addParticipant = async (database, message) => {
  const fund = await database.get('fund');
  const participantSet = new Set(fund.participants);

  participantSet.add(message.author.username);

  return database.set('fund', {
    ...fund,
    participants: Array.from(participantSet)
  });
}

module.exports = addParticipant;