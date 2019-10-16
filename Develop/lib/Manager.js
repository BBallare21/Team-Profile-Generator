const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {

        super(name, id, email);
        this.role = 'Manager';
        this.officeNumber = officeNumber
    }

    getOfficeNumber(officeNumber) {
        return this.officeNumber
    };

};

new Manager('sdf', 4, "dffd@gmail.com",55)
