const inquirer = require("inquirer");

const { writeFile } = require("fs").promises;

const promptUser = () => {
    return inquirer.prompt([
    {
        type: "input",
        name: "title",
        message: "Enter the title of your project",
    },
    {
        type: "input",
        name: "description",
        message: "Enter a description",
    },
    {
        type: "input",
        name: "installation",
        message: "Enter intallation instructions",
    },
    {
        type: "input",
        name: "usage",
        message: "Enter usage information",
    },
    {
        type: "input",
        name: "contributing",
        message: "Enter contribution guidelines",
    },
    {
        type: "input",
        name: "tests",
        message: "Enter test instructions",
    },
    {
        type: "input",
        name: "github",
        message: "Enter your github link",
    },
    {
        type: "input",
        name: "email",
        message: "Enter your email",
    },
    {
        type: "list",
        name: "license",
        message: "Select licenses used",
        choices: ["Apache 2.0", "MIT", "Open Software License 3.0", "Creative Commons Attribution 4.0", "European Union Public License 1.1"],
        },
    ]);
};

function renderLicenseBadge(license) {
  if (license) {
    return `[![${license} license](https://img.shields.io/badge/License-${license}-blue.svg)](${renderLicenseLink(license)})`
  } else {
    return ``;
  }
}

function renderLicenseLink(license) {
  if (license === "Apache 2.0"){
    return `https://www.apache.org/licenses/LICENSE-2.0`;
  }
  if (license === "MIT"){
    return `https://lbesson.mit-license.org/`;
  }
  if (license === "Open Software License 3.0"){
    return `hhttps://opensource.org/licenses/OSL-3.0`;
  }
  if (license === "Creative Commons Attribution 4.0"){
    return `https://creativecommons.org/licenses/by/4.0/`;
  }
  if (license === "European Union Public License 1.1"){
    return `https://spdx.org/licenses/EUPL-1.1.html`;
  }
}

function renderLicenseSection(license) {
  if (license) {
    return `## License
    
    This project is covered under the ${license} license. To learn more about this license, click the badge at the top.`
  } else {
    return ``;
  }
}

const generateMD = ({title, description, installation, usage, contributing, tests, github, email, license}) =>
`${renderLicenseBadge(license)}

# ${title}


## Description

${description}


## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Licenses](#licenses)
4. [Contributing](#contributing)
5. [Tests](#tests)
6. [Questions](#questions)


## Installation

${installation}


## Usage

${usage}

${renderLicenseSection(license)}


## Contributing

${contributing}


## Tests

${tests}


## Questions

${github}

${email}

Contact me for any additional questions`;

const init = () => {
    promptUser()
        .then((responses) => writeFile("README.md", generateMD(responses)))
        .then(() => console.log("beep boop I work"))
        .catch((err) => console.error(err));
    }

// Function call to initialize app
init();
