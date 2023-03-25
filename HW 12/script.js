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
    addTopping (topping) {
        this.topping.price = this.topping.price + topping.price;
        this.topping.calories = this.topping.calories + topping.calories;
        return this.topping;
    }
    get calculatePrice() {
        return this.size.price + this.stuffing.price + this.topping.price;
    }
    get calculateCalories() {
        return this.size.calories + this.stuffing.calories + this.topping.calories;
    }
}

const hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);

hamburger.addTopping(Hamburger.TOPPING_MAYO);
hamburger.addTopping(Hamburger.TOPPING_SAUCE);
console.log(`Calories: ${hamburger.calculateCalories}`);
console.log(`Prise: ${hamburger.calculatePrice}`);