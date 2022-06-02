const inquirer = require('inquirer');
const fs = require('fs');

// const generateMarkdown = require("./utils/generateMarkdown");

const generateHTML = ({ name, id, email, employeetype, github, school}) =>
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
    <h1 class="display-4">I am a ${employeetype} at the company</h1>
    <p class="lead">My ID number is: ${id}.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
        <li class="list-group-item">My GitHub username is ${github}</li>
        <li class="list-group-item">email: ${email}</li>
    </ul>
    <p class="lead">I went to the following school: ${school}.</p>
    </div>
</div>
</body>
</html>`;

inquirer.prompt([
    {
    type: "input",
    message: 'What is your name?',
    name: "name",
    },
    {
    type: "input",
    message: 'What is your ID number?',
    name: "id",
    },
    {
    type: "input",
    message: "What is your email?",
    name: "email",
    },
    {
    type: "list",
    message: "What is your title",
    choices: ["Intern", "Employee", "Engineer", "Manager"],
    name: "employeetype",
    },
    {
    type: "input",
    message: "What is your Github repository info",
    name: "github",
    },
    {
    type: "input",
    message: "Where do you go to school?",
    name: "school",
    },
])
    .then((answers) => {
    const htmlPageContent = generateHTML(answers);

    fs.writeFile('index.html', htmlPageContent, (err) =>
        err ? console.log(err) : console.log('Successfully created index.html!')
    );
});
    
