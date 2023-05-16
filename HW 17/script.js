const userData = {
    USD: 1000,
    EUR: 900,
    UAH: 15000,
    BIF: 20000,
    AOA: 100
};

const bankData = {
    USD: {
        max: 3000,
        min: 100,
        img: '💵'
    },
    EUR: {
        max: 1000,
        min: 50,
        img: '💶'
    },
    UAH: {
        max: 0,
        min: 0,
        img: '💴'
    },
    GBP: {
        max: 10000,
        min: 100,
        img: '💷'
    }
}

const userAnswer = prompt('Посмотреть баланс карты? Да/Нет');

function getMoney() {
    return new Promise((resolve, reject) => {
        if (userAnswer.toLowerCase() === 'да') {
            resolve();
        } else if (userAnswer.toLowerCase() === 'нет') {
            reject();
        }
    })
}

getMoney()
    .then(() => {
        checkBalance(userData);
    })
    .catch(() => {
        withdrawMoney();
    })
    .finally(() => {
        console.log('Спасибо, хорошего дня 😊');
    })

function checkBalance(data) {
    const currency = prompt('Введите валюту').toUpperCase();
    if (Object.hasOwn(data, currency)) {
        console.log(`Баланс составляет ${userData[currency]} ${currency}`);
    } else {
        checkBalance(data);
    }
}

function withdrawMoney() {
    const currency = prompt('Введите валюту для снятия').toUpperCase();
    if (Object.hasOwn(bankData, currency) && Object.hasOwn(userData, currency) && bankData[currency].max !== 0) {
        const sum = +prompt('Введите сумму');
        checkSum(sum, currency);
    } else {
        withdrawMoney();
    }
}

function checkSum (sum, currency) {
    if (sum < bankData[currency].min) {
        console.log(`Введенная сумма меньше доступной. Минимальная сумма снятия: ${bankData[currency].min}`);
    } else if (sum <= bankData[currency].max && sum <= userData[currency]) {
        console.log(`Заберите деньги ${sum} ${currency} ${bankData[currency].img}`);
    } else {
        let maxSum;
        if (bankData[currency] > userData[currency]) {
            maxSum = bankData[currency];
        } else {
            maxSum = userData[currency];
        }
        console.log(`Введенная сумма больше доступной. Максимальная сумма снятия: ${maxSum}`);
    }
}