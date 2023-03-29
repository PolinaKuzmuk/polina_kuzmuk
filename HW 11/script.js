const vegetables = [
    {
        name: `tomato`,
        icon: `🍅`,
        price: 2.3
    },
    {
        name: `carrot`,
        icon: `🥕`,
        price: 1.5
    },
    {
        name: `corn`,
        icon: `🌽`,
        price: 2.78,
        season: true
    }
];

class Vegetable {
    constructor() {
        this.type = `Vegetable`;
        this.seasonKoef = 1.3;
    }

    getPrice() {
        this.season ? this.price *= this.seasonKoef : this.price;
        return this.price;
    }

    getInfo() {
        const li = document.createElement('li');
        this.season
            ?
            li.textContent = `Type: ${this.type}. SeasonKoef: ${this.seasonKoef}. Name: ${this.name}. Icon: ${this.icon}. Price: ${this.getPrice()}. Season: ${this.season}`
            :
            li.textContent = `Type: ${this.type}. SeasonKoef: ${this.seasonKoef}. Name: ${this.name}. Icon: ${this.icon}. Price: ${this.getPrice()}`;
        ul.appendChild(li);
    }
}

class UpdatedVegetable extends Vegetable {
    constructor(name, icon, prise, season) {
        super();
        this.name = name;
        this.icon = icon;
        this.price = prise;
        this.season = season;
    }
}
const newVegetablesArr = vegetables.map((el) => new UpdatedVegetable(el.name, el.icon, el.price, el.season));

const ul = document.createElement('ul');
const body = document.getElementsByTagName('body')[0];
body.appendChild(ul);

newVegetablesArr.forEach(el => el.getInfo());