module.exports = {
  mapToString(map) {
    return JSON.stringify(Array.from(map));
  },
  stringToMap(string) {
    return new Map(Array.from(JSON.parse(string)));
  }
}