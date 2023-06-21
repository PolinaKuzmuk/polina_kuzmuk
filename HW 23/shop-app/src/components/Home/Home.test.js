import { shallow } from 'enzyme';
import Home from './Home';

describe('<Home />', () => {
    it('renders Home component', () => {
        const wrapper = shallow(<Home />);
        expect(wrapper.contains(<div className="container" />)).to.equal(true);
    });
})