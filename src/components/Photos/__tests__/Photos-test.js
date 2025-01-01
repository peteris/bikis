import React from 'react';
import { shallow } from 'enzyme';

jest.unmock('./../');
import Photos from './../';

describe('<Photos />', () => {
  it('should render correct number of images', () => {
    const numImages = 4;
    const items = Array(10).fill('photo');
    const wrapper = shallow(<Photos images={items} imagesToShow={numImages} />);
    expect(wrapper.find('Photo').length).toEqual(numImages);
  });
});
