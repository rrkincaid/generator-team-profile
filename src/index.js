const inquirer = require("inquirer");
const fs = require("fs");

const generateHTML = ({ name, id, email, employeetype, github, school }) =>
  `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <title> Team Profile </title>
</head>
<body>
    <div class="jumbotron jumbotron-fluid">
    <div class="container">
    <h1 class="display-4">Hi! My name is ${name}</h1>
    <h2 class="display-4">I am a ${employeetype} at the company</h2>
    <h3 class="lead">I went to the following school: ${school}.</h3>
    <h5 class="lead">My ID number is: ${id}.</h5>
    <h3><span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
        <li class="list-group-item">My GitHub username is ${github}</li>
        <li class="list-group-item">email: ${email}</li>
    </ul>
    </div>
</div>
</body>
</html>`;

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your name?",
      name: "manager-name",
    },
    {
      type: "input",
      message: "What is your employee ID?",
      name: "manager-id",
    },
    {
      type: "input",
      message: "What is your email address?",
      name: "manager-email",
    },
    {
      type: "input",
      message: "What is your office number?",
      name: "officenumber",
    },
  ])
  .then((answers) => {
    //build manager here with class
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
              name: "intern-name",
            },
            {
              type: "input",
              message: "What is your employee ID number?",
              name: "intern-id",
            },
            {
              type: "input",
              message: "What is your email address?",
              name: "intern-email",
            },
            {
              type: "input",
              message: "What school did you attend?",
              name: "intern-school",
            },
          ])
          .then((answers) => {
            //create intern class
            menu();
          });
      }
      if (answers.addperson === "Engineer") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is your name?",
              name: "engineer-name",
            },
            {
              type: "input",
              message: "What is your employee ID number?",
              name: "engineer-id",
            },
            {
              type: "input",
              message: "What is your email address?",
              name: "engineer-email",
            },
            {
              type: "input",
              message: "What is your Github username?",
              name: "engineer-github",
            },
          ])
          .then((answers) => {
            //create engineer class
            menu();
          });
      }
      if (answers.addperson === "Complete Team") {
        const htmlPageContent = generateHTML(answers);

        fs.writeFile("index.html", htmlPageContent, (err) =>
          err
            ? console.log(err)
            : console.log("Successfully created index.html!")
        );
      }
    });
}

// inquirer
//   .prompt([
//     {
//       type: "input",
//       message: "What is your name?",
//       name: "name",
//     },
//     {
//       type: "input",
//       message: "What is your ID number?",
//       name: "id",
//     },
//     {
//       type: "input",
//       message: "What is your email?",
//       name: "email",
//     },
//     {
//       type: "list",
//       message: "What is your title",
//       choices: ["Intern", "Employee", "Engineer", "Manager"],
//       name: "employeetype",
//     },
//     {
//       type: "input",
//       message: "What is your Github repository info",
//       name: "github",
//     },
//     {
//       type: "input",
//       message: "Where do you go to school?",
//       name: "school",
//     },
//   ])
// .then((answers) => {
//   // const htmlPageContent = generateHTML(answers);
//   // fs.writeFile('index.html', htmlPageContent, (err) =>
//   //     err ? console.log(err) : console.log('Successfully created index.html!')
//   // );
// });
