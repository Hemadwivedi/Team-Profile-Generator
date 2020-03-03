const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const employee = [];
function EmployeeInfo() {

    const theEmployee = [{
        type: "list",
        name: "employeeType",
        message: "Select one of the following position titles",
        choices: ["Engineer", "Intern", "I don't want to add anymore employees!"]
    }];
   inquirer.prompt(theEmployee).then(function (response) {
        console.log(response);
        if (response.employeeType == "Engineer") {
            EngineerInfo();
        } else if (response.employeeType == "Intern") {
            InternInfo();
        } else if (response.employeeType == "I don't want to add anymore employees!") {
            const data = render(employee);
            console.log(data);
            fs.writeFileSync(outputPath, data);
            return ;
        }
    })
}
function ManagerInfo() {
    const questions = [{
        type: "input",
        message: "Enter your managers name.",
        name: "name"
    },
        {
            type: "input",
            message: "Enter  managers ID",
            name: "id"
        },
        {
            type: "input",
            message: "Enter managers Email.",
            name: "email"
        },
        {
            type: "input",
            message: "Enter managers office number",
            name: "officeNumber"
        }
    ];
    inquirer.prompt(questions).then(function (response) {
        console.log(response);
        const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
        employee.push(manager);
        EmployeeInfo();
    });
}
function EngineerInfo() {
    const questions = [{
        type: "input",
        message: "Enter your engineer name.",
        name: "name"
    },
        {
            type: "input",
            message: "Enter engineers id.",
            name: "id",
        },
        {
            type: "input",
            message: "Enter engineers email?",
            name: "email"
        },
        {
            type: "input",
            message: "Enter engineers github username",
            name: "github"
        }
    ]
    inquirer.prompt(questions).then(function (response) {
        console.log(response);
        const engineer = new Engineer(response.name, response.id, response.email, response.github);
        employee.push(engineer);
        EmployeeInfo();
    });
}
function InternInfo() {
    const questions = [
        {
            type: "input",
            message: "Enter interns name.",
            name: "name"
        },
        {
            type: "input",
            message: "Enter interns id",
            name: "id"
        },
        {
            type: "input",
            message: "What is the interns email?",
            name: "email"
        },
        {
            type: "input",
            message: "Which school did the intern go to?",
            name: "school"
        }
    ];
    inquirer.prompt(questions)
        .then(function (response) {
            console.log(response);
            const intern = new Intern(response.name, response.id, response.email, response.school);
            employee.push(intern);
            EmployeeInfo();
        });
};
ManagerInfo();
