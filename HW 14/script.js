const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;
const BLOCK = document.getElementsByClassName('block')[0];

setInterval(() => {
    let left = Math.floor(Math.random() * (WIDTH - 100));
    let top = Math.floor(Math.random() * (HEIGHT - 100));
    BLOCK.style.left = `${left}px`;
    BLOCK.style.top = `${top}px`;
}, 1000);

setInterval(() => {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    BLOCK.style.background = `rgb(${r}, ${g}, ${b})`;
}, 500);