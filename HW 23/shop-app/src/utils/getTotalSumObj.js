const getItemTotalSum = (el, count) => {
    const discountedPrice = el.sale ? (el.price - (el.price * el.salePercent / 100)) : el.price;
    return (discountedPrice * count);
}

export const getTotalSumObj = (listToRender, productList) => {
    const totalSumObj = {};
    let totalSum = 0;
    listToRender.forEach(item => {
        return Object.keys(productList).map(key => {
            return productList[key].map(el => {
                if (el.id === item.id) {
                    const totalItemSum = getItemTotalSum(el, item.count);
                    totalSumObj[el.id] = { totalItemSum, el };
                    totalSum += totalItemSum;
                }
            });
        })
    })
    return ({ totalSumObj, totalSum });
}