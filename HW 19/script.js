const BASE_URL = 'https://63693f7228cd16bba71904e4.mockapi.io/';
const universeLabel = document.querySelector('#newHero .comics');
const wrap = document.querySelector('.form-wrap');
const newForm = document.getElementById('newHero');
let universeList;
let heroesList;
let heroesNameList = [];

const universeAndHeroesList = [
    `${BASE_URL}universes`,
    `${BASE_URL}heroes`
]

Promise.all(universeAndHeroesList.map(url => {
    return fetch(url, {
        method: 'GET'
    }).then(resp => resp.json())
})).then(res => {
    universeList = res[0];
    heroesList = res[1];
    fillHeroesNamesList();
    addUniverseListToNewForm();
    renderHeroesFromList(heroesList);
})

function createUniverseList(list, form) {
    const parentLabel = form.querySelector('.comics')
    const select = document.createElement('select');
    select.name = 'comics';
    parentLabel.appendChild(select);
    list.forEach(item => {
        const option = document.createElement('option');
        option.value = item.name;
        option.textContent = item.name;
        select.appendChild(option);
    });
}

function addUniverseListToNewForm() {
    createUniverseList(universeList, newForm)
}

function checkUniverse(form, hero) {
    const universeField = form.querySelector(`.comics`);
    let optionList = Array.from(universeField.getElementsByTagName(`option`));

    for (let index = 0; index < optionList.length; index++) {
        let item = optionList[index];
        if (item.value === hero.comics) {
            item.selected = true;
        }
    }
}

function isFavourite(el) {
    if (el.favourite === true) {
        const favouriteCheckbox = document.querySelector(`form[data-id="${el.id}"] input[name="favourite"]`);
        favouriteCheckbox.checked = true;
    }
}

function renderHeroesFromList(res) {
    res.forEach(hero => renderHero(hero));
}

function renderHero(hero) {
    const form = document.createElement('form');
    form.classList.add('form');
    form.dataset.id = hero.id;
    form.innerHTML =
        `<label class="hero-name">Name
            <input type="text" value="${hero.name}" name="name">
            </label><br>
            <label class="comics">Comics
            </label><br>
            <label class="favourite">
            <input type="checkbox" name="favourite">Favourite
            </label><br>
            <button class="delete-btn btn" type="button">Delete</button>
            <button class="update-btn btn" type="button">Update</button>
            </form>`
    wrap.appendChild(form);
    createUniverseList(universeList, form);
    checkUniverse(form, hero);
    isFavourite(hero);
    youCanDeleteHero(form, hero);
    youCanUpdateHero(form, hero);
}

function youCanDeleteHero(form, hero) {
    const deleteBtn = form.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        form.remove();
        fetch(`${BASE_URL}heroes/${hero.id}`, {
            method: 'DELETE'
        })
    })
}

function youCanUpdateHero(form, hero) {
    const updateBtn = form.querySelector('.update-btn');
    updateBtn.addEventListener('click', () => {
        updateHero(form, hero)
            .then(res => res.json())
            .then(res => updateNameList(hero, res))
            .catch(console.error())
    })
}

function fillHeroesNamesList() {
    heroesList.forEach(hero => {
        heroesNameList.push(hero.name.toLowerCase())
    });
}

function updateNameList(hero, res) {
    const oldName = hero.name.toLowerCase();
    const newName = res.name;
    const index = heroesNameList.indexOf(oldName);
    heroesNameList[index] = newName;
}

function createHeroInstance(form) {
    const heroName = form.querySelector(`input[name="name"]`);
    const heroUniverse = form.querySelector(`select`);
    const heroIsFavourite = form.querySelector(`input[name="favourite"]`);

    return {
        name: heroName.value,
        comics: heroUniverse.value,
        favourite: heroIsFavourite.checked
    }
}

function updateHero(form, hero) {
    let updatedHero = createHeroInstance(form);
    return new Promise((resolve, reject) => {
        resolve(fetch((`${BASE_URL}heroes/${hero.id}`), {
            method: 'PUT',
            headers: {
                "content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(updatedHero)
        }))
    })
}

function addHeroToAPI(form) {
    const heroName = form.querySelector(`input[name="name"]`);

    if (heroesNameList.includes(`${heroName.value.toLowerCase()}`)) {
        console.log('Hero is already exist');
    } else {
        let newHero = createHeroInstance(form);
        return new Promise((resolve, reject) => {
            resolve(fetch((`${BASE_URL}heroes`), {
                method: 'POST',
                headers: {
                    "content-type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(newHero)
            }))
        })
    }
}

newForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addHeroToAPI(newForm)
        .then((res) => res.json())
        .then((res) => {
            heroesNameList.push(res.name.toLowerCase());
            renderHero(res)
        })
        .catch(console.error())
})