import { GET_PRODUCTS_LIST } from "./productsActions";
import { productsReducer, products } from "./productsReducer";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';


// const products = [
//     {
//         "id": "1",
//         "title": "Aircraft Carrier",
//         "img": "aircraft-carrier",
//         "price": 30000,
//         "sale": true,
//         "salePercent": 2,
//         "category": "Boat"
//     },
//     {
//         "id": "3",
//         "title": "Bus",
//         "img": "bus",
//         "price": 300,
//         "sale": true,
//         "salePercent": 10,
//         "category": "Bus"
//     },
// ]
const mockStore = configureMockStore([thunk]);
let store;

beforeEach(() => {
    store = mockStore({
        products: products
    })
});

test('should return the initial state', () => {
    expect(productsReducer({}, { type: undefined })).toEqual(
        {}
    )
})

test('should handle a product list being added to an initial state', () => {
    const previousState = []

    expect(productsReducer(previousState, { type: GET_PRODUCTS_LIST, payload: products })).toEqual(
        { ...previousState, products }
    )
})