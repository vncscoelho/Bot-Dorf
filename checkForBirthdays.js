const { stringToMap } = require('./helpers.js');
const dayjs = require('dayjs');
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat);
dayjs.locale = 'pt-BR';

const checkForBirthdays = async (database) => {
  const users = stringToMap(await database.get('users'));
  const today = dayjs().format('DD/MM');

  const bDayPeople = Array.from(users).reduce((acc, [_, user]) => {
    const dayMonthBday = dayjs(user.birthday, 'DD/MM', 'pt-BR').format('DD/MM');
    if (dayMonthBday === today) {
      acc.push(user);
    }

    return acc;
  }, []);

  if (!bDayPeople.length) {
    throw new Error("No birthdays today");
  }

  return bDayPeople;
}

module.exports = checkForBirthdays;