//dependencies
const { prompt } = require("inquirer");
const inquirer = require("inquirer");
const { findSourceMap } = require("module");

//variables
let teamMarkup = "";

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
        "<div class='cardRow lastRow'>LASTROWVAL</div>" +
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
        let markUp = "<div class='teamCard'>" +
        "<div class='cardHeader'>" + this.name + "</div>" +
        "<div class='titleCaption'>Manager</div>" +
        "<div class='cardRow'>Employee Id: " + this.employeeId + "</div>" +
        "<div class='cardRow' Email address: >" + this.email + "</div>" +
        "<div class='cardRow'>Office Number: <span>" + this.officeNumber + "</span></div>" +
        "</div>";
        return markUp;
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

const employeePrompt = () => {
    let manager = new Manager();
    let engineer = new Engineer();
    let intern = new Intern();

    inquirer.prompt([{
        type: "confirm",
        name: "addEmployee",
        message: "add a new team member?"
    }])
    .then(function(answer) {
        if (answer.addEmployee === true) {
            console.log("add new employee");
            inquirer.prompt([{
                type: "list",
                name: "employeeType",
                message: "choose and employee type",
                choices: ["Manager", "Engineer", "Intern"]
            }])
            .then(function(answer) {
                if (answer.employeeType === "Manager") {
                    //.then(function(answer){
                        inquirer.prompt([{
                            type: "input",
                            name: "managerName",
                            message: "enter the manager's name"
                        }])
                        .then(function(answer) {
                            //manager.name = answer.managerName;
                            let managerName = answer.managerName;
                            inquirer.prompt([{
                                type: "input",
                                name: "managerId",
                                message: "enter the manager's Employee Id"
                            }])
                            .then(function(answer) {
                                //manager.employeeId = answer.managerId;
                                let managerId = answer.managerId;
                                inquirer.prompt([{
                                    type: "input",
                                    name: "managerEmail",
                                    message: "enter the manager's email address"
                                }])
                                .then(function(answer) {
                                    let managerEmail = answer.managerEmail;
                                    inquirer.prompt([{
                                        type: "input",
                                        name: "officeNumber",
                                        message: "enter the manager's office number"
                                    }])
                                    .then(function(answer) {
                                        let officeNumber = answer.officeNumber;
                                        manager = new Manager(managerName, managerId, managerEmail, officeNumber);
                                        console.log(manager.getMarkup());
                                        employeePrompt();
                                    })
                                })
                            })                            
                        })                        
                    //})                    
                }
                else if (answer.employeeType === "Engineer") {
                    console.log("you chose engineer");
                    employeePrompt();
                }
                else {
                    console.log("you chose default (intern)");
                    employeePrompt();
                }
            })
        }
        else
        {
            console.log("finished");
        }
    });

    const managerPrompt = () => {
        inquirer.prompt([{
            type: "input",
            name: "managerName",
            message: "enter the manager's name"
        }])
        .then(function(answer) {
            console.log(answer.name);
        })
     }
    
}



employeePrompt();