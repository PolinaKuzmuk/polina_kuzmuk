const firstName = prompt('What is your first name?');
const secondName = prompt('What is your second name?');
const dayOfBirth = +prompt('Wright down your day of birth (in DD format)');
const monthOfBirth = +prompt('Wright down your month of birth (in MM format)');
const yearOfBirth = +prompt('Wright down your year of birth (in YYYY format)');
const yearsOld = 2022 - yearOfBirth;
let zodiak;

switch (monthOfBirth) {
    case 1:
        if (dayOfBirth >= 20) {
            zodiak = 'Aquarius &#9810;';
        } else {
            zodiak = 'Capricorn &#9809;';
        }
        break;
    case 2:
        if (dayOfBirth >= 19) {
            zodiak = 'Pisces &#9811;';
        } else {
            zodiak = 'Aquarius &#9810;';
        }
        break;
    case 3:
        if (dayOfBirth >= 21) {
            zodiak = 'Aries &#9800;';
        } else {
            zodiak = 'Pisces &#9811;';
        }
        break;
    case 4:
        if (dayOfBirth >= 20) {
            zodiak = 'Taurus &#9801;';
        } else {
            zodiak = 'Aries &#9800;';
        }
        break;
    case 5:
        if (dayOfBirth >= 21) {
            zodiak = 'Gemini &#9802;';
        } else {
            zodiak = 'Taurus &#9801;';
        }
        break;
    case 6:
        if (dayOfBirth >= 21) {
            zodiak = 'Cancer &#9803;';
        } else {
            zodiak = 'Gemini &#9802;';
        }
        break;
    case 7:
        if (dayOfBirth >= 23) {
            zodiak = 'Leo &#9804;';
        } else {
            zodiak = 'Cancer &#9803;';
        }
        break;
    case 8:
        if (dayOfBirth >= 23) {
            zodiak = 'Virgo &#9805;';
        } else {
            zodiak = 'Leo &#9804;';
        }
        break;
    case 9:
        if (dayOfBirth >= 23) {
            zodiak = 'Libra &#9806;';
        } else {
            zodiak = 'Virgo &#9805;';
        }
        break;
    case 10:
        if (dayOfBirth >= 23) {
            zodiak = 'Scorpio &#9807;';
        } else {
            zodiak = 'Libra &#9806;';
        }
        break;
    case 11:
        if (dayOfBirth >= 22) {
            zodiak = 'Sagittarius &#9808;';
        } else {
            zodiak = 'Scorpio &#9807;';
        }
        break;
    case 12:
        if (dayOfBirth >= 22) {
            zodiak = 'Capricorn &#9809;';
        } else {
            zodiak = 'Sagittarius &#9808;';
        }
        break;
    default:
        zodiak = 'please check your day and month again';
};

if (yearOfBirth % 400 === 0 || (yearOfBirth % 100 !== 0 && yearOfBirth % 4 === 0)) {
    document.write(`<p>User Bio: ${firstName} ${secondName}, ${yearsOld} years old (leap year), ${zodiak}</p>`);
} else {
    document.write(`<p>User Bio: ${firstName} ${secondName}, ${yearsOld} years old, ${zodiak}</p>`);
};