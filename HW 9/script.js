const obj = {
    x: 10,
    y: 20,
    inner: {
        x: 20,
        z: 30
    },
    foo2: {
        k: 23,
        p: 13
    }
}

let newObj = {};

function convert (object) {
    for (const key in object) {
        if (typeof object[key] === 'object') {
            convert(object[key]);
        } else {
            newObj[key] = object[key];
        }
    }
    return newObj;
}

convert(obj);
console.log('newObj = ', newObj);

const p = document.getElementById('answer');
p.innerHTML = JSON.stringify(convert(obj));