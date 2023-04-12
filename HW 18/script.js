const BASE_URL = 'https://api.chucknorris.io/jokes/';
const MENU_BTN = document.querySelector('.favourite-menu-btn');
const FAV_BLOCK = document.querySelector('.favourite');
const JOKES_BLOCK = document.querySelector('.joke-list');
const MSI_TEXT = document.querySelector('.msi');
const MENU = document.querySelector('.menu');
const OVERLAY = document.querySelector('.overlay');
const FORM = document.querySelector('.form');
const categoryInput = document.getElementById('category');
const searchInput = document.querySelector('.search-input');
const categoryWrap = document.querySelector('.category-wrap');
let chosenCategory = '';

function getCategoryList() {
    fetch(`${BASE_URL}categories`)
        .then((res) => res.json())
        .then((res) => createCategoryButton(res));
};

getCategoryList();

MENU_BTN.addEventListener('click', () => {
    FAV_BLOCK.classList.toggle('favourite-hamburger');
    MENU.classList.toggle('menu-open');
    if (window.screen.width < 768) {
        displayToggle(MSI_TEXT);
    }
    if (window.screen.width >= 768) {
        displayToggle(OVERLAY);
    }
    if (FAV_BLOCK.classList.contains('favourite-hamburger')) {
        MENU_BTN.style.backgroundImage = `url('img/fav-icon-close.svg')`;
    } else {
        MENU_BTN.style.backgroundImage = `url('img/fav-icon-menu.svg')`;
    }
});

function displayToggle(el) {
    if (el.style.display === "block") {
        el.style.display = "none";
    } else {
        el.style.display = "block";
    }
};

function createCategoryButton(list) {
    list.forEach(item => {
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'category';
        input.id = `${item}`;
        input.value = item;
        input.classList.add('category-input');

        const label = document.createElement('label');
        label.htmlFor = `${item}`;
        label.textContent = item;
        label.classList.add('category-label');

        categoryWrap.appendChild(input);
        categoryWrap.appendChild(label);
    });
};

function clearList(list) {
    let children = list.children;
    Array.from(children).forEach(el => el.remove());
};

FORM.addEventListener('click', (e) => {
    switch (e.target.value) {
        case 'search':
            searchInput.style.display = 'block';
            categoryWrap.style.display = 'none';
            break;
        case 'category':
            searchInput.style.display = 'none';
            categoryWrap.style.display = 'block';
            break;
        case 'random':
            searchInput.style.display = 'none';
            categoryWrap.style.display = 'none';
            break;
        default:
            break;
    }
});

let getJoke = (word) => {
    fetch(`${BASE_URL}${word}`)
        .then((res) => res.json())
        .then((res) => {
            if (res.total) {
                res.result.forEach(el => renderJokes(el, JOKES_BLOCK));
            } else {
                renderJokes(res, JOKES_BLOCK);
            }
        });
}

FORM.addEventListener('submit', (event) => {
    clearList(JOKES_BLOCK);
    const userChoise = document.querySelector('input:checked');
    event.preventDefault();
    switch (userChoise.value) {
        case 'random':
            getJoke('random');
            break;
        case 'category':
            const chosenCategory = categoryWrap.querySelector('input:checked');
            getJoke(`search?query=${chosenCategory.value}`);
            break;
        case 'search':
            if (searchInput.value.length > 2) {
                getJoke(`search?query=${searchInput.value}`);
            }
            break;
        default:
            break;
    }
});

function renderJokes(obj, parentDiv) {
    const div = document.createElement('div');
    div.classList.add('joke-item');
    div.dataset.id = obj.id;
    parentDiv.appendChild(div);
    createHeart(obj, div, parentDiv);
    createMessageImg(div, parentDiv);
    createLink(div, obj);
    createJokeText(obj, div);
    createLastString(obj, div);
    isFavorite(obj, parentDiv);
}

function createHeart(obj, div, parentDiv) {
    let heart = document.createElement('img');
    if (parentDiv.className === 'favourite') {
        heart.src = 'img/heart-full.svg';
    } else {
        heart.src = 'img/heart-empty.svg';
    }
    heart.classList.add('heart');
    div.appendChild(heart);
    clickHeart(obj, heart);
}

function clickHeart(obj, heart) {
    heart.addEventListener('click', _ => {
        if (heart.src.endsWith('heart-empty.svg')) {
            heart.src = 'img/heart-full.svg';
            localStorage.setItem(obj.id, JSON.stringify(obj));
            renderJokes({ ...obj, like: true }, FAV_BLOCK);

        } else {
            removeJoke(obj.id);
            const heartInMain = JOKES_BLOCK.querySelector(`[data-id="${obj.id}"] .heart`);
            if (heartInMain) {
                heartInMain.src = 'img/heart-empty.svg';
            }
        }
    });
}

function removeJoke(id) {
    const jokeInFav = FAV_BLOCK.querySelector(`[data-id="${id}"]`);
    jokeInFav.remove();
    localStorage.removeItem(id);
}

function createMessageImg(div, parentDiv) {
    const messageImg = document.createElement('img');
    if (parentDiv.className === 'favourite') {
        messageImg.src = 'img/message-dark.svg';
    } else {
        messageImg.src = 'img/message-light.svg';
    }
    messageImg.classList.add('message');
    div.appendChild(messageImg);
}

function createLink(div, obj) {
    const wrap = document.createElement('div');
    div.appendChild(wrap);

    const p = document.createElement('p');
    p.classList.add('link-text');
    p.textContent = 'ID: ';
    wrap.appendChild(p);

    const link = document.createElement('a');
    link.classList.add('link');
    link.href = obj.url;
    link.textContent = obj.id;
    p.appendChild(link);

    const linkImg = document.createElement('img');
    linkImg.classList.add('link-img');
    linkImg.src = 'img/link-icon.svg';
    link.appendChild(linkImg);
}

function createJokeText(obj, div) {
    const p = document.createElement('p');
    p.classList.add('joke-text');
    p.innerHTML = obj.value;
    div.appendChild(p);
}

function createLastString(obj, div) {
    const lastString = document.createElement('div');
    lastString.classList.add('last-string');
    div.appendChild(lastString);

    createTimeUpdate(obj, lastString);
    if (obj.categories.length > 0) {
        createCategory(obj, lastString);
    };
}

function createTimeUpdate(obj, div) {
    const today = new Date();
    const updateDay = new Date(obj.updated_at);
    const diff = today.getTime() - updateDay.getTime();
    const hours = diff / 3600000;

    const timeStamp = document.createElement('p');
    timeStamp.classList.add('time');
    timeStamp.innerHTML = `Last update: <span style='font-weight: 500;'>${Math.round(hours)} hours ago</span>`;
    div.appendChild(timeStamp);
}

function createCategory(obj, div) {
    const p = document.createElement('span');
    p.classList.add('category-joke');
    p.textContent = obj.categories;
    div.appendChild(p);
}

function isFavorite(obj, parentDiv) {
    if (parentDiv.className === 'joke-list') {
        for (let index = 0; index < localStorage.length; index++) {
            const joke = localStorage.key(index);
            if (obj.id === joke) {
                const heartInMain = JOKES_BLOCK.querySelector(`[data-id="${obj.id}"] .heart`);
                heartInMain.src = 'img/heart-full.svg';
            }
        }
    }
}

function renderFavourite() {
    for (let index = 0; index < localStorage.length; index++) {
        const joke = localStorage.key(index);
        const element = localStorage.getItem(joke);
        renderJokes(JSON.parse(element), FAV_BLOCK);
    }
}

renderFavourite();