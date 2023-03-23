const ITCompany = {
  id: 12332129,
  companyName: "Playtika",
  type: "product",
  vacancies: [
    {
      frontEnd: {
        salary: 1200,
      },
    },
    {
      backEnd: {
        salary: 1500,
      },
    },
    {
      scramMaster: {
        salary: 500,
      },
    },
    {
      tester: {
        salary: 600,
      },
    },
  ],
};

const vacancyList = ITCompany.vacancies;
const userName = prompt("What is your name?");
const userPosition = prompt("Type in your job position");
const userSalary = +prompt("Type in your salary");
let newWorker;

function greeting () {
          document.write(
            `hello my name is ${this.name}, im ${this.position} in ${this.companyName}`
          );
        };

function reject(name, position) {
  document.write(
    `${name}, you has significant skills at ${position} but we hired another developer, let's keep contact!`
  );
}

function checkWorker(name, position, salary) {
  for (const item of vacancyList) {
    const companyPosition = Object.keys(item)[0];
    if (position.toLowerCase() === companyPosition.toLowerCase()) {
      const positionSalary = Object.values(item)[0];
      if (salary === positionSalary.salary) {
        newWorker = Object.create(ITCompany);
        newWorker.name = name;
        newWorker.position = position;
        newWorker.salary = salary;
        newWorker.greeting = greeting;
        return newWorker.greeting();
      }
    }
    return reject(name, position);
  }
}

checkWorker(userName, userPosition, userSalary);