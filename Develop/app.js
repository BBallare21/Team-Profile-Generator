const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const outputPath = path.resolve(__dirname, "output", "team.html");

// const render = require("./lib/htmlRender");

const teamMembers = [];

function promptUser() {

    function createManager() {
        inquirer.prompt([
            {
            type: "input",
            name: "name",
            message: "What is your manager's name?"
            },

            {
            type: "input",
            name: "id",
            message: "What is your manager's ID number?"
            },

            {
            type: "input",
            name: "email",
            message: "What is your manager's email?"
            },

            {
            type: "input",
            name: "officeNumber",
            message: "What is your manager's office number?"
            }
        ]).then(answers => {
            let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            teamMembers.push(manager);
            createTeam();
        });
    }
    
    function createTeam() {
        inquirer.prompt([
            {
            type: "list",
            name: "roleChoice",
            message: "Which team member role would you like to add next?",
            choices: ["Engineer", "Intern", "I have no more memebers to add."]
            }
        ]).then(userChoice => {
            switch(userChoice.roleChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    console.log(teamMembers)
                    generateTeam(); 
            }
        })
    }

    function addEngineer() {
        inquirer.prompt([
            {
            type: "input",
            name: "name",
            message: "What is your engineer's name?"
            },

            {
            type: "input",
            name: "id",
            message: "What is your engineer's ID number?"
            },

            {
            type: "input",
            name: "email",
            message: "What is your engineer's email?"
            },

            {
            type: "input",
            name: "gitHub",
            message: "What is your engineer's Github username?"
            }
        ]).then(answers => {
            let engineer = new Engineer(answers.name, answers.id, answers.email, answers.gitHub);
            teamMembers.push(engineer);
            createTeam();
        })
    }

    function addIntern() {
        inquirer.prompt([
            {
            type: "input",
            name: "name",
            message: "What is your interns's name?"
            },

            {
            type: "input",
            name: "id",
            message: "What is your intern's ID number?"
            },

            {
            type: "input",
            name: "email",
            message: "What is your intern's email?"
            },

            {
            type: "input",
            name: "school",
            message: "What is the name of your interns's school?"
            }
        ]).then(answers => {
            let intern = new Intern(answers.name, answers.id, answers.email, answers.school);
            teamMembers.push(intern);
            createTeam();
        })
    }
    createManager();

    function generateTeam() {
        
    }
}

promptUser();
