import React from 'react';
import { shallow } from 'enzyme';
import SelectedMovie from './SelectedMovie';

describe('SelectedMovie', () => {
  it('component should match the snapshot', () => {
    const wrapper = shallow(
      <SelectedMovie
        characters={{ object: 'characterInfo' }}
        movie={{ object: 'movieInfo' }}
      />
    )
    expect(wrapper).toMatchSnapshot();
  });
})