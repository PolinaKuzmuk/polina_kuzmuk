import { currentPage } from '../index.js';

function calculateTotal() {
    if (currentPage.includes('shoppingCart.html')) {
        const summary = document.querySelector('.totalNumber');
        let totalArr = Array.from(document.getElementsByClassName('total'));
        let totalSum = totalArr.reduce((acc, item) => {
            let itemNumber = +item.textContent.slice(1);
            acc = acc + itemNumber;
            return acc;
        }, 0);
        summary.innerHTML = `$${totalSum}`;
    }
}

export { calculateTotal }