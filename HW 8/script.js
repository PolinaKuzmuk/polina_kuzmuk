function createAnswer(id, answerText) {
    const p = document.createElement('p');
    p.classList.add('answer');
    p.textContent = answerText;
    const parentEl = document.getElementById(id);
    parentEl.appendChild(p);
}

// Task 1
const array = [2, 3, '4', 'five', 6, null, undefined, { position: 2 }, 0];

function filterArr(arr) {
    return arr.filter(el => typeof el === 'number');
}

function reduceArr(arr) {
    return arr.reduce((prevValue, currValue) => prevValue += currValue);
}

function averageNumber(arr) {
    const numberArr = filterArr(arr);
    const totalSum = reduceArr(numberArr);
    const averageNumber = totalSum / numberArr.length;
    createAnswer('task-1', `Average number is ${averageNumber}`)
}

averageNumber(array);


// Task 2
const btnDoMath = document.getElementById('btn-task-2');

function doMath(x, znak, y) {
    if (typeof x === 'number' && typeof y === 'number') {
        switch (znak) {
            case '+':
                createAnswer('task-2', `Result is ${x + y}`);
                break;
            case '-':
                createAnswer('task-2', `Result is ${x - y}`);
                break;
            case '*':
                createAnswer('task-2', `Result is ${x * y}`);
                break;
            case '/':
                createAnswer('task-2', `Result is ${x / y}`);
                break;
            case '%':
                createAnswer('task-2', `Result is ${x % y}`);
                break;
            case '^':
                createAnswer('task-2', `Result is ${Math.pow(x, y)}`);
                break;
            default:
                createAnswer('task-2', `Please check the arifmetical sign.`);
                break;
        }
    } else {
        createAnswer('task-2', `X or Y is not a number.`);
    }
};

btnDoMath.addEventListener('click', function () {
    const x = +document.getElementById('x').value;
    const y = +document.getElementById('y').value;
    const znak = document.getElementById('znak').value;
    doMath(x, znak, y);
});


// Task 3
const btnCreateArr = document.getElementById('create-arr');
let counter = 0;
let mainArray = [];

function createArr(array, length) {
    array.length = length;
}

btnCreateArr.addEventListener('click', function () {
    const mainArrLength = +document.getElementById('main-length').value;
    const subArrLength = +document.getElementById('subarr-length').value;
    let subArray = [];
    const subarrData = document.getElementById('subarr-data').value;

    createArr(mainArray, mainArrLength);
    createArr(subArray, subArrLength);
    subArray = subarrData.split(',');
    mainArray[counter] = subArray;
    counter++;
    createAnswer('task-3', `Subarray [${subArray}]`);
    createAnswer('task-3', `Main array [${mainArray}]`);

    console.log('subArray', subArray);
    console.log('mainArray', mainArray);
})


// 4. Створити функцію, яка прибирає з рядка всі символи, які ми передали після другого аргумента. 'func("hello world", 'l', 'd')' поверне
// нам "heo wor". Вихідний рядок та символи для видалення задає користувач.
// Також забезпечити логіку, при котрій після першого елементу ми можемо передати будь яким аргументом функцію, яка щось достать до нашого рядка,
// ГОЛОВНЕ щоб функція виконувалася після того як ми проведемо попередні маніпуляції (тобто видалимо символи).
// Можливо додавати будь яку логіку в цю кастомну функцію.
// Приклад:
// const formatter = (string) => string.toUpperCase()
// func("hello world", 'l', 'd', 'o', 'h', formatter)
// або
// func("hello world", 'l', 'd', formatter, 'o', 'h') // тут output функції не має змінитися
const btnFunc = document.getElementById('btn-task-4');
const funcList = {
    formatter: (string) => string.toUpperCase(),
    stringLength: (string) => string.length
}

const func = (string, argList) => {
    let someFunc;
    for (arg of argList) {
        if (arg.startsWith("'") && arg.endsWith("'")) {
            arg = arg.replaceAll("'", '');
            string = string.replaceAll(arg, '');
        } else if (arg in funcList) {
            someFunc = funcList[arg];
        }
    }
    if (someFunc) {
        return someFunc(string);
    }
    return string;
};

btnFunc.addEventListener('click', function () {
    let userString = document.getElementById('user-string').value;
    let userSymbols = document.getElementById('user-symbols').value.split(',');
    createAnswer('task-4', func(userString, userSymbols));
});