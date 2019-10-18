const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
// const generateHTML = require('./templates/generateHTML');
// const outputPath = path.resolve(__dirname, "output", "team.html");

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
            choices: ["Engineer", "Intern", "I have no more members to add."]
            }
        ]).then(choice => {
            switch(choice.roleChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    console.log(teamMembers)
                    generateHTML(); 
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
};

function generateHTML(teamMembers) {
    let HTML = `<!DOCTYPE html>
    <head>
        <title></title>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <meta http-equiv='X-UA-Compatible' content='ie=edge'>
    
    
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
            integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
            crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
            integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
            crossorigin="anonymous"></script>
    
    
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
            integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
            crossorigin="anonymous"></script>
    
        <style>
            header {
                position: relative;
                background-color: red;
                color: white;
                width: 100%;
                height: 100px;
            }
    
            header h1 {
                position: relative;
                left: 40%
            }
    
            .card-header {
                background-color: blue;
                color: white;
            }
        </style>
    </head>
    
    <body>
        <header>
            <h1>My Team</h1>
        </header>
        <div class=row>`

    for (let i = 0; i < teamMembers.length; i++) {
        HTML += `<div class="card col-md-2" style="width: 18rem;">
            <div class="card-header">
                <h5 class="card-title"><span id="name">${teamMembers[i].getName()}</span> 
                <br> 
                ${teamMembers[i].getRole()}
                </h5>
            </div>
            <div class="card-body">
                <p class="card-text">
                    <div>ID: <span id="ID">${teamMembers[i].getId()}</span></div>
                        <div>Email: <span id="email">${teamMembers[i].getEmail()}</span></div>
                    <div>${teamMembers[i].role}: <span id="role">${teamMembers[i].getDetail()}</span></div>
                </p>
            </div>
        </div>`
    }

    HTML += `</div></body></html>`
    return HTML;
    
}
promptUser();