const ARRAY = [16, -37, 54, -4, 72, -56, 47, 4, -16, 25, -37, 46, 4, -51, 27, -63, 4, -54, 76, -4, 12, -35, 4, 47];
let positiveNumbers = [];
let negativeNumbers = [];
let oddPositiveNumbers = [];
let evenPositiveNumbers = [];
let minElement = 0;
let maxElement = 0;

function numbersSum(somearray) {
    let sum = somearray.reduce((sumValue, currValue) => {
        return sumValue += currValue;
    });
    return sum;
}

function pushAnswer(li, element, text) {
    let list = document.getElementsByTagName('li');
    let listItem = list[li - 1];
    let answer = document.createElement("p");
    answer.classList.add('answer');
    answer.textContent = `${text}: ${element}`;
    listItem.appendChild(answer);
}

ARRAY.filter(element => {
    if (element > 0) {
        positiveNumbers.push(element);
    } else if (element < 0) {
        negativeNumbers.push(element);
    }
});

ARRAY.forEach(element => {
    if (minElement >= element) {
        minElement = element;
    } else if (maxElement <= element) {
        maxElement = element;
    }
});

positiveNumbers.filter(element => {
    if (element % 2 !== 0) {
        oddPositiveNumbers.push(element);
    } else {
        evenPositiveNumbers.push(element);
    }
});

let newarray = ARRAY.map(element => {
    if (element === maxElement) {
        return element = maxElement;
    } else {
        return element = 0;
    }
});

let positiveNumbersSum = numbersSum(positiveNumbers);
let evenPositiveNumbersSum = numbersSum(evenPositiveNumbers);
let oddPositiveNumbersSum = numbersSum(oddPositiveNumbers);

let positiveNumbersMultiplied = positiveNumbers.reduce((accum, prevValue) => {
    return accum *= prevValue;
});

pushAnswer(1, positiveNumbersSum, 'Сума');
pushAnswer(1, positiveNumbers.length, 'Кількість');
pushAnswer(4, negativeNumbers.length, 'Кількість');
pushAnswer(2, minElement, 'Мінімальний елемент');
pushAnswer(2, ARRAY.indexOf(minElement), 'Порядковий номер');
pushAnswer(3, maxElement, 'Максимальний елемент');
pushAnswer(3, ARRAY.indexOf(maxElement), 'Порядковий номер');
pushAnswer(5, oddPositiveNumbers.length, 'Кількість');
pushAnswer(6, evenPositiveNumbers.length, 'Кількість');
pushAnswer(7, evenPositiveNumbersSum, 'Сума');
pushAnswer(8, oddPositiveNumbersSum, 'Сума');
pushAnswer(9, positiveNumbersMultiplied, 'Добуток');
pushAnswer(10, newarray, 'Масив');