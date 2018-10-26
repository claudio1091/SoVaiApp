import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import InputText from './index';

configure({ adapter: new Adapter() });

describe('Testing Input Date component', () => {
  it('Render as expected', () => {
    const wrapper = shallow(<InputText />);
    expect(wrapper).toMatchSnapshot();
  });
});
