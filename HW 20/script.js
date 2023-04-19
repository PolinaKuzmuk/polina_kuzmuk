const colorWrap = $('<div></div>').addClass('color-wrap');
$('.body').prepend(colorWrap);

const colorTitle = $('<p></p>').addClass('title').text('Solid Black');
$('.body').prepend(colorTitle);

const CAR = $('<img></img>').addClass('car').attr('src', 'https://mc-astro.github.io/tesla-roadster-colors/img/black.jpg');
$('.body').prepend(CAR);

let data;
let colorList;


$.getJSON('https://raw.githubusercontent.com/brightestsirius/Front-end-Pro-19/master/lesson_27/tesla.json',
    function (result) {
        data = result;
        $(data).each(function (item) {
            const color = $('<div></div>').addClass('color').css('background-color', `${data[item].color}`);
            $(colorWrap).append(color);
        })
        colorList = Array.from($(colorWrap).children());
    });


$(colorWrap).click(function (e) {
    if ($(e.target).hasClass('color')) {
        const index = colorList.indexOf(e.target);
        const img = data[index].img;
        const text = data[index].title;
        $(CAR).attr('src', `https://mc-astro.github.io/tesla-roadster-colors/img/${img}.jpg`)
        colorTitle.text(`${text}`)
    }
})