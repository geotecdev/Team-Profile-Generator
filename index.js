//dependencies
const { prompt } = require("inquirer");
const inquirer = require("inquirer");
const fs = require("fs");

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
        "<div class='cardRow'>Email address: <span class='emailLink'>" + this.email + "</span></div>" +
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
        let markUp = "<div class='teamCard'>" +
        "<div class='cardHeader'>" + this.name + "</div>" +
        "<div class='titleCaption'>Engineer</div>" +
        "<div class='cardRow'>Employee Id: " + this.employeeId + "</div>" +
        "<div class='cardRow'>Email address: <span class='emailLink'>" + this.email + "</span></div>" +
        "<div class='cardRow'>GitHub: <span class='gitHubLink'>" + this.gitHubUsername + "</span></div>" +
        "</div>";
        return markUp;
    }
}

class Intern extends Employee
{
    constructor(name, employeeId, email, school) {
        super(name, employeeId, email);
        this.school = school;
    }

    getMarkup() {
        let markUp = "<div class='teamCard'>" +
        "<div class='cardHeader'>" + this.name + "</div>" +
        "<div class='titleCaption'>Intern</div>" +
        "<div class='cardRow'>Employee Id: " + this.employeeId + "</div>" +
        "<div class='cardRow'>Email address: <span class='emailLink'>" + this.email + "</span></div>" +
        "<div class='cardRow'>School: <span>" + this.school + "</span></div>" +
        "</div>";
        return markUp;
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
            inquirer.prompt([{
                type: "list",
                name: "employeeType",
                message: "choose and employee type",
                choices: ["Manager", "Engineer", "Intern"]
            }])
            .then(function(answer) {
                if (answer.employeeType === "Manager") {
                    inquirer.prompt([{
                        type: "input",
                        name: "managerName",
                        message: "enter the manager's name"
                    }])
                    .then(function(answer) {
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
                                    teamMarkup += manager.getMarkup();
                                    employeePrompt();
                                })
                            })
                        })                            
                    })                                          
                }
                else if (answer.employeeType === "Engineer") {
                    inquirer.prompt([{
                        type: "input",
                        name: "engineerName",
                        message: "enter the engineer's name"
                    }])
                    .then(function(answer) {
                        let engineerName = answer.engineerName;
                        inquirer.prompt([{
                            type: "input",
                            name: "engineerId",
                            message: "enter the engineer's Employee Id"
                        }])
                        .then(function(answer) {
                            let engineerId = answer.engineerId;
                            inquirer.prompt([{
                                type: "input",
                                name: "engineerEmail",
                                message: "enter the engineer's email address"
                            }])
                            .then(function(answer) {
                                let engineerEmail = answer.engineerEmail;
                                inquirer.prompt([{
                                    type: "input",
                                    name: "gitHubUserName",
                                    message: "enter the engineer's git hub profile name"
                                }])
                                .then(function(answer) {
                                    let gitHubUserName = answer.gitHubUserName;
                                    engineer = new Engineer(engineerName, engineerId, engineerEmail, gitHubUserName);
                                    teamMarkup += engineer.getMarkup();
                                    employeePrompt();
                                })
                            })
                        })                            
                    })
                }
                else {
                    inquirer.prompt([{
                        type: "input",
                        name: "internName",
                        message: "enter the intern's name"
                    }])
                    .then(function(answer) {
                        let internName = answer.internName;
                        inquirer.prompt([{
                            type: "input",
                            name: "internId",
                            message: "enter the intern's Employee Id"
                        }])
                        .then(function(answer) {
                            let internId = answer.internId;
                            inquirer.prompt([{
                                type: "input",
                                name: "internEmail",
                                message: "enter the intern's email address"
                            }])
                            .then(function(answer) {
                                let internEmail = answer.internEmail;
                                inquirer.prompt([{
                                    type: "input",
                                    name: "school",
                                    message: "enter the intern's school"
                                }])
                                .then(function(answer) {
                                    let school = answer.school;
                                    intern = new Intern(internName, internId, internEmail, school);
                                    teamMarkup += intern.getMarkup();
                                    employeePrompt();
                                })
                            })
                        })                            
                    })
                }
            })
        }
        else
        {
            let baseMarkup = fs.readFileSync("./baseIndex.html", "utf8");
            console.log(baseMarkup);
            let finalMarkup = baseMarkup.replace("[TEAMMARKUP]", teamMarkup);
            fs.writeFileSync("./index.html", finalMarkup);
            console.log("html file generated in root directory");
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