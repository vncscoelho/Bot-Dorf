class User {
  name = "";
  address = "";
  likes = "";
  birthday = "";
  pix = "";

  constructor(name, birthday, address, likes, pix) {
    this.name = name;
    this.address = address;
    this.likes = likes;
    this.birthday = birthday;
    this.pix = pix;
  }
}

module.exports = User;