let userNumber = 0;
let correctedNumber = 0;

let createArray = function(num) {
    let arr = [];
    let sum = 0;
    for (let i = 0; i < num; i++) {
        let randomValue = Math.round(Math.random() * 10);
        arr.push(randomValue);
    }
    console.log('Массив', arr);
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    console.log('Сумма всех элементов массива', sum);
};

while (!(correctedNumber >= 2 && correctedNumber <= 10)) {
    userNumber = prompt('Write an array length. The length should be a number from 2 to 10.');
    correctedNumber = Math.round(Math.abs(userNumber));
};

createArray(correctedNumber);