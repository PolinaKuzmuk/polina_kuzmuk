const BLOCK = document.querySelector('.block');
const BODY = document.querySelector('.body');
const BODY_WIDTH = BODY.clientWidth;
const BODY_HEIGHT = BODY.clientHeight;

const jumpingAnimation = [
    { translate: "0 -10px" }
];

const animationTiming = {
    duration: 500,
    iterations: 1,
};

const stratchingAnimation = [
    { transform: "scale(1.25, 0.6)" }
];

const KEY_CODES = {
    ArrowRight: (right, top) => {
        right += 10;
        if (right >= (BODY_WIDTH - 100)) {
            right -= 20;
            addingTitle();
        }
        BLOCK.style.left = `${right}px`;
    },
    ArrowLeft: (right, top) => {
        right -= 10;
        if (right <= 0) {
            right += 20;
            addingTitle();
        }
        BLOCK.style.left = `${right}px`;
    },
    ArrowUp: (right, top) => {
        top -= 10;
        if (top <= 0) {
            top += 20;
            addingTitle();
        }
        BLOCK.style.top = `${top}px`;
    },
    ArrowDown: (right, top) => {
        top += 10;
        if (top >= (BODY_HEIGHT - 100)) {
            top -= 20;
            addingTitle();
        }
        BLOCK.style.top = `${top}px`;
    },
    Space: () => BLOCK.animate(jumpingAnimation, animationTiming),
    ControlLeft: () => BLOCK.animate(stratchingAnimation, animationTiming),
    ControlRight: () => BLOCK.animate(stratchingAnimation, animationTiming)
}

window.addEventListener('keydown', (event) => {
    const BLOCK_COORDINATES = BLOCK.getBoundingClientRect();
    const EVENT_CODE = event.code;
    let right = Math.floor(BLOCK_COORDINATES.x);
    let top = Math.floor(BLOCK_COORDINATES.y);

    if (KEY_CODES.hasOwnProperty(EVENT_CODE)) {
        KEY_CODES[EVENT_CODE](right, top);
    }
})

function addingTitle() {
    BLOCK.textContent = 'БЕМС';
    setTimeout(() => {
        BLOCK.textContent = '';
    }, 2000);
}