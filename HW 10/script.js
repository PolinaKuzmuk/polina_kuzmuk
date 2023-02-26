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
let newWorker = Object.create(ITCompany);
newWorker.name = prompt("What is your name?");
newWorker.position = prompt("Type in your job position").toLowerCase();
newWorker.salary = +prompt("Type in your salary");

newWorker.greeting = function () {
  document.write(
    `hello my name is ${this.name}, im ${this.position} in ${this.companyName}`
  );
};

function reject() {
  document.write(
    `${this.name}, you has significant skills at ${this.position} but we hired another developer, let's keep contact!`
  );
}

function checkWorker(position, salary) {
  for (const item of vacancyList) {
    let companyPosition = Object.keys(item)[0].toLowerCase();
    if (position === companyPosition) {
      const positionSalary = Object.values(item)[0];
      if (salary === positionSalary.salary) {
        return this.greeting();
      }
    }
  }
  return reject.call(this);
}

checkWorker.call(newWorker, newWorker.position, newWorker.salary);