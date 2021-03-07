//dependencies


//objects
class Employee
{
    constructor(name, employeeId, email) {
        this.name = name;
        this.employeeId = employeeId;
        this.email = email;
    }

    getBaseMarkup() {
        let markUp = "<div class='employeeCard'>" +
        "<div class='cardHeader'>" + this.name + "</div>" +
        "<div class='titleCaption'></div>" +
        "<div class='cardRow'>" + this.employeeId + "</div>" +
        "<div class='cardRow'>" + this.email + "</div>" +
        "<div class='cardRow lastRow'></div>" +
        "</div>";
        return markUp;
    }
}

class Manager extends Employee
{
    constructor(name, employeeId, email, officeNumber) {
        super(name, employeeId, email);
        this.officeNumber = officeNumber;
    }
    
    getMarkup() {
        let markUp = this.getBaseMarkup();
        //append officeNumber
        let lastRow = markUp.querySelector(".lastRow");
        lastRow.textContent = this.officeNumber;
        return markup;
    }
}

class Engineer extends Employee
{
    constructor(name, employeeId, email, gitHubUsername) {
        super(name, employeeId, email);
        this.gitHubUsername = gitHubUsername;
    }

    getMarkup() {
        let markUp = this.getBaseMarkup();
        //append gitHubUsername
        let lastRow = markUp.querySelector(".lastRow");
        lastRow.textContent = this.gitHubUsername;
        return markup;
    }
}

class Intern extends Employee
{
    constructor(name, employeeId, email, school) {
        super(name, employeeId, email);
        this.school = school;
    }

    getMarkup() {
        let markUp = this.getBaseMarkup();
        //append school
        let lastRow = markUp.querySelector(".lastRow");
        lastRow.textContent = this.school;
        return markup;
    }

}