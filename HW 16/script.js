class Hamburger {
    static SIZE_SMALL = {
        price: 50,
        calories: 20
    };
    static SIZE_BIG = {
        price: 100,
        calories: 40
    };
    static STUFFING_CHEESE = {
        price: 10,
        calories: 20
    };
    static STUFFING_SALAD = {
        price: 20,
        calories: 5
    };
    static STUFFING_POTATO = {
        price: 15,
        calories: 10
    };
    static TOPPING_SAUCE = {
        price: 15,
        calories: 0
    };
    static TOPPING_MAYO = {
        price: 20,
        calories: 5
    };
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.topping = {
            price: 0,
            calories: 0
        }
    }
    addTopping(topping) {
        this.topping.price = this.topping.price + topping.price;
        this.topping.calories = this.topping.calories + topping.calories;
        return this.topping;
    };
    get price() {
        return this.size.price + this.stuffing.price + this.topping.price;
    }
    get calories() {
        return this.size.calories + this.stuffing.calories + this.topping.calories;
    }
}

const form = document.querySelector('.form');
const orderList = document.querySelector('.order-wrap');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const topping = [...document.querySelectorAll('input.topping:checked')];
    if (topping.length === 0) {
        alert('Выберите специи');
    } else {
        const userName = document.getElementById('client-name').value;
        const burgerSize = document.getElementById('burger-size').value;
        const burgerSizeText = document.querySelector('#burger-size option:checked').textContent;
        const stuffing = document.querySelector('input.stuffing:checked').value;
        const stuffingText = document.querySelector('input.stuffing:checked').parentElement.textContent;
        const randomValue = Math.round(Math.random() * 30);
        let toppingText = [];
        const hamburger = new Hamburger(Hamburger[burgerSize], Hamburger[stuffing]);

        addToppingAndMessage(topping, toppingText, hamburger)
        createOrder(userName, burgerSizeText, stuffingText, toppingText, randomValue, hamburger);
        form.reset();
    }
})

const createOrder = (userName, burgerSize, stuffing, topping, time, hamburger) => {
    const userOrder = document.createElement('div');
    userOrder.classList.add('order-item');
    userOrder.innerHTML =
        `<p>Привет, ${userName}.</p>
            <p>Ваш заказ ${burgerSize} бургер ${stuffing} и ${topping} будет готов в течении ${time} минут</p>
            <p>Стоимость заказа: $${hamburger.price} (${hamburger.calories} кКал)</p>`;
    orderList.appendChild(userOrder);
};

function addToppingAndMessage(topping, toppingText, hamburger) {
    topping.forEach(item => {
        toppingText.push(item.parentElement.textContent);
        hamburger.addTopping(Hamburger[item.id])
    });
};