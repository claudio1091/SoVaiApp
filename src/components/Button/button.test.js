import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import Button from './index';

configure({ adapter: new Adapter() });

describe('Testing Button component', () => {
  it('Render as expected', () => {
    const onPress = jest.fn();
    const wrapper = shallow(<Button onPress={onPress} text="Test" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Render Primary as expected', () => {
    const onPress = jest.fn();
    const wrapper = shallow(<Button primary onPress={onPress} text="Test" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Press Button test', () => {
    const onPress = jest.fn();
    const wrapper = shallow(<Button onPress={onPress} text="Test" />);
    wrapper.props().onPress();

    expect(onPress.mock.calls).toHaveLength(1);
  });
});
