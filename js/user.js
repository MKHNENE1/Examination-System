export class User {
  #password;
  constructor(firstName, lastName, email, password, grades = [], degree = 0) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.#password = password;
    this.grades = grades;
    this.degree = degree;
  }
  getPassword() {
    return this.#password;
  }
}
