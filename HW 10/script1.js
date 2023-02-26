// Написать функцию которая будет принимать параметры сотрудника (Имя, Позиция, Зарплата)
// Параметры функции запрашиваем через prompt
// Внутри функции на основе вакансий компании должно проверяться подходит ли данный разработчик под критерии вакансий
// Если подходит - создаем новый объект, в прототипе которого будет объект компании. В новом объекте будут данные пользователя и функция 
// greeting которая при вызове будет выводить в document.write() -
// `hello my name is workerName, im positionName in companyName` (companyName - должно браться из унаследованного объекта компании)
// Если пользователь не подходит - вывести текст в document.write() - 
// `userName, you has significant skills at positionName but we hired another developer, let's keep contact !'

const ITCompany = {
    id: 12332129,
    companyName: 'Playtika',
    type: 'product',
    vacancies: [
        {
            frontEnd: {
                salary: 1200
            },
        },
        {
            backEnd: {
                salary: 1500
            },
        },
        {
            scramMaster: {
                salary: 500
            },
        },
        {
            tester: {
                salary: 600
            },
        }
    ]
}

const vacancyList = ITCompany.vacancies;
let newWorker = Object.create(ITCompany);
newWorker.name = prompt('What is your name?');
newWorker.position = prompt('Type in your job position');
newWorker.salary = +prompt('Type in your salary');

newWorker.greeting = () => {
    document.write(`hello my name is ${this.name}, im ${this.position} in ${this.companyName}`);
}

function reject() {
    document.write(`${this.name}, you has significant skills at ${this.position} but we hired another developer, let's keep contact!`);
}

function checkWorker(position, salary) {
    for (const item of vacancyList) {
        if (position == Object.keys(item)) {
            const positionSalary = Object.values(item)[0];
            if (salary === positionSalary.salary) {
                this.greeting();
            }
        } else {
            reject.call(this);
        }
    }
}

checkWorker.call(newWorker, newWorker.position, newWorker.salary);