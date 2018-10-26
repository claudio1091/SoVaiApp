import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import Container from './index';

configure({ adapter: new Adapter() });

describe('Testing Container component', () => {
  it('Render as expected', () => {
    const wrapper = shallow(<Container />);
    expect(wrapper).toMatchSnapshot();
  });
});
