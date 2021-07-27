const newFund = async (database, message, { value = 40 }) => {
  return database.set('fund', {
    admin: 'Ninguém',
    value,
    participants: [],
  });
}

module.exports = newFund;