const DEFAULT_PARAMETRS = [1, 'two', () => console.log('hello'), true];

const SINGLE_LIST_HEAD = {
    value: 0,
    next: null
}

class SingleItem {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

function bindingToList(list, item) {
    if (list.next === null) {
        list.next = item;
    } else {
        while (list.next !== null) {
            list = list.next;
        }
        bindingToList(list, item);
    }
};

function creatingSingleList (value) {
    const SINGLE_ITEM_NEXT = new SingleItem(value);
    bindingToList(SINGLE_LIST_HEAD, SINGLE_ITEM_NEXT);
}

DEFAULT_PARAMETRS.map(el => creatingSingleList(el));

console.log(SINGLE_LIST_HEAD);
console.log(SINGLE_LIST_HEAD.next.next.next.value);