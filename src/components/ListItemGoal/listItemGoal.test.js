import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import ListItemGoal from './index';

configure({ adapter: new Adapter() });

describe('Testing Input Date component', () => {
  it('Render as expected', () => {
    const goal = {
      userId: 'zxdmNOhbd120Mbsjk',
      name: 'CORRER',
      dtGoal: new Date(),
      status: 'open',
      dtCreate: new Date(),
    };
    const wrapper = shallow(<ListItemGoal item={goal} />);
    expect(wrapper).toMatchSnapshot();
  });
});
