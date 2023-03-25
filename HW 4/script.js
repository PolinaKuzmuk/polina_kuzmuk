const BTN = document.getElementsByClassName('submit')[0];
const FORM = document.getElementsByClassName('registration-form')[0];
const ATTEMPTS_TEXT = document.getElementsByClassName('attempts-text')[0];
let attempts = document.getElementById('attempts');
let click = 3;

BTN.addEventListener('click', function () {
    const LIST = document.getElementsByTagName('li');
    let email = document.getElementById('user-mail').value;
    let password = document.getElementById('user-password').value;
    for (let i = 0; i < LIST.length; i++) {
        const LI = LIST[i];
        LI.classList.remove('active');
    };
    if (email.startsWith(' ') || email.endsWith(' ') || email.startsWith('@') || email.endsWith('@')) {
        document.getElementById('check-1').classList.add('active');
    };
    if (email.match(/@/g).length !== 1) {
        document.getElementById('check-2').classList.add('active');
    };
    if (email.length > 15) {
        document.getElementById('check-3').classList.add('active');
    };
    if (!email.endsWith('.com')) {
        document.getElementById('check-4').classList.add('active');
    };
    if (password.match(/[A-Z]/g) === null) {
        document.getElementById('check-5').classList.add('active');
    };
    if (password.length < 4 || password.length > 12) {
        document.getElementById('check-6').classList.add('active');
    };
    click--;
    attempts.textContent = click;
    if (document.getElementsByClassName('active').length === 0) {
        ATTEMPTS_TEXT.innerHTML = `<p>Your account succesfully registered!</p>
        <p>email: ${email}</p>
        <p>password: ${password}</p>`;
    }
    if (+attempts.textContent === 0) {
        FORM.classList.add('disable');
        ATTEMPTS_TEXT.textContent = 'Sorry, you don\'t have more tries';
    };
});