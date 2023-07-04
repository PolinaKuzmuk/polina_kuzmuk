import { render, screen } from '@testing-library/react';
import Home from './Home';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { products } from '../../store/products/productsReducer';

const mockStore = configureMockStore([thunk]);

describe('<Home />', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            products: products
        })
    });

    test('renders Home component', () => {
        const wrapper = render(
            <Provider store={store}>
                <Home />
            </Provider>
        );
        const container = screen.getByText('hello');
        expect(container).toBeInTheDocument;
    });
});