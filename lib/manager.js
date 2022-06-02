const Employee = require("./employee");

class Manager extends Employee {
  constructor(name, id, email, officenumber) {
    super(name, id, email);
    this.officenumber = officenumber;
  }
  getOfficeNumber() {
    this.officenumber;
  }
  getRole() {
    return "Manager";
  }
}

module.exports = Manager;
