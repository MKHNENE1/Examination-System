export class User {
  #password;
  constructor(firstName, lastName, email, password, res = [], degree = 0) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.#password = password;
    this.result = result;
    this.degree = degree;
  }
  getPassword() {
    return this.#password;
  }
}
