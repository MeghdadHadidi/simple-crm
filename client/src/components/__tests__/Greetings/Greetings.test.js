import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

// Components
import Greetings from '../../Greetings';
import { Header, Button } from 'semantic-ui-react';

describe('<Greetings /> rendering', () => {
    let greetings = shallow(<Greetings />);

    it('renders without exploding', () => {
        expect(greetings.length).to.be.eq(1);
        expect(greetings.find(Header)).to.have.length(2);
    })

    it('contains link to /customers route', () => {
        expect(greetings.find(Button)).to.have.length(1);
        expect(greetings.find(Button).props().to).to.be.eq('/customers');
        
        greetings.find(Button).simulate('click', { button: 0 });
    })
});