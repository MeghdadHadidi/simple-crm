import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

// Components
import MainLayout from '../../MainLayout'

describe('<MainLayout /> rendering', () => {
    let wrapper;

    it('renders without exploding', () => {
        wrapper = shallow(<MainLayout />)
        expect(wrapper.length).to.be.eq(1)
    })
    it('contains desktop container')
    it('contains links to /new and /customers')
})

describe('<MainLayout /> functional', () => {
    it('handles click on links')
    it('loads customers list')
    it('shows relevant message if no customer exists')
})