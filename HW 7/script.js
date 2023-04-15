const ANIMALS = [
    ['🐭', 'mouse', 'Jerry'],
    ['🐹', 'hamster', 'Biscuit'],
    ['🐰', 'rabbit', 'Bugs'],
    ['🦊', 'fox', 'Mrs. Fox'],
    ['🐻', 'bear', 'Paddington']
];

const FOOD = [
    ['🍎', 'apple', 10],
    ['🍐', 'pear', 12],
    ['🍊', 'tangerine', 15],
    ['🍋', 'lemon', 5],
    ['🍌', 'banana', 7]
];

const UNIVERSES = [
    ['🖤', 'DC', ['Superman', 'Batman', 'Wonder Woman']],
    ['❤️', 'Marvel', ['Iron Man', 'the Hulk', 'Black Widow']]
];

function getInfo(array, tableName) {
    if (Array.isArray(array) === true) {
        const TABLE_NAME = document.createElement('h1');
        document.body.appendChild(TABLE_NAME);
        TABLE_NAME.textContent = `${tableName} info`;
        const TABLE = document.createElement('table');
        document.body.appendChild(TABLE);
        for (const i of array) {
            const TR = document.createElement('tr');
            TABLE.appendChild(TR);
            for (const element of i) {
                const TD = document.createElement('td');
                TR.appendChild(TD);
                TD.textContent = element;
            }
        }
    } else {
        const P = document.createElement('p');
        P.textContent = `First argument is not an array. Try again.`;
        document.body.appendChild(P);
    }
}

getInfo(ANIMALS, 'Animals');
getInfo(FOOD, 'Food');
getInfo(UNIVERSES, 'Universes');