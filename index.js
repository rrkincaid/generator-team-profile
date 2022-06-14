const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

const employees = [];

const inquirer = require("inquirer");
const fs = require("fs");

const generateHTML = (employees) => {
  console.log(employees);
  console.log(employees[0].getOfficeNumber());
  let employeeEachHTML = "";
  let special = "";
  for (i = 0; i < employees.length; i++) {
    if (employees[i].getRole() === "Manager") {
      special = employees[i].getOfficeNumber();
    } else if (employees[i].getRole() === "Intern") {
      special = employees[i].getSchool();
    } else if (employees[i].getRole() === "Engineer") {
      special = employees[i].getGithub();
    }
    employeeEachHTML += `
    
  <div class="card border-primary mb-3 border-rounded" style="max-width: 18rem;">
    <div class="card-header bg-transparent border-primary">
    ${employees[i].getRole()}</div>
      <div class="card-body text-primary">
        <h5 class="card-title text-primary">${employees[i].getName()}</h5>
          <p class="card-text text-primary">
          Employee ID: ${employees[i].getId()}</p>
          <p class="card-text text-primary">${employees[i].getEmail()}</p>
          <p class="card-text text-primary">${special}</p>
      </div>
</div>`;
  }
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      <title>Team Profile</title>
  </head>
  <body>
      <nav class="navbar navbar-dark bg-dark mb-5">
          <span class="navbar-brand mb-0 h2 w-100 text-center">Team Profile</span>
      </nav>
      <div class="container">
          <div class="row">
          ${employeeEachHTML}
      </div>
      </div>
  </body>
</html> `;
};

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your name?",
      name: "managername",
    },
    {
      type: "input",
      message: "What is your employee ID?",
      name: "managerid",
    },
    {
      type: "input",
      message: "What is your email address?",
      name: "manageremail",
    },
    {
      type: "input",
      message: "What is your office number?",
      name: "officenumber",
    },
  ])
  .then((answers) => {
    //build manager here with class
    const newManager = new Manager(
      answers.managername,
      answers.managerid,
      answers.manageremail,
      answers.officenumber
    );
    employees.push(newManager);
    menu();
  });

function menu() {
  return inquirer
    .prompt([
      {
        type: "list",
        message: "Would you like to add another team member?",
        choices: ["Intern", "Engineer", "Complete Team"],
        name: "addperson",
      },
    ])
    .then((answers) => {
      if (answers.addperson === "Intern") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is your name?",
              name: "internname",
            },
            {
              type: "input",
              message: "What is your employee ID number?",
              name: "internid",
            },
            {
              type: "input",
              message: "What is your email address?",
              name: "internemail",
            },
            {
              type: "input",
              message: "What school did you attend?",
              name: "internschool",
            },
          ])
          .then((answers) => {
            //create intern class
            const newIntern = new Intern(
              answers.internname,
              answers.internid,
              answers.internemail,
              answers.internschool
            );
            employees.push(newIntern);
            menu();
          });
      }
      if (answers.addperson === "Engineer") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is your name?",
              name: "engineername",
            },
            {
              type: "input",
              message: "What is your employee ID number?",
              name: "engineerid",
            },
            {
              type: "input",
              message: "What is your email address?",
              name: "engineeremail",
            },
            {
              type: "input",
              message: "What is your Github username?",
              name: "engineergithub",
            },
          ])
          .then((answers) => {
            //create engineer class
            const newEngineer = new Engineer(
              answers.engineername,
              answers.engineerid,
              answers.engineeremail,
              answers.engineergithub
            );
            employees.push(newEngineer);
            menu();
          });
      }
      if (answers.addperson === "Complete Team") {
        const htmlPageContent = generateHTML(employees);

        fs.writeFile("index.html", htmlPageContent, (err) =>
          err
            ? console.log(err)
            : console.log("Successfully created index.html!")
        );
      }
    });
}
