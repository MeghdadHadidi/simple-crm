import React from 'react';
import { shallow } from 'enzyme';
import Greetings from '../../Greetings';

describe('rendering', () => {
    it('renders without exploding', () => {
        const greetings = shallow(<Greetings />);
        expect(greetings.length).toEqual(1);
        expect(greetings.find('.ui.button').length).toEqual(1);
    })
});