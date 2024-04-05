import {render} from '@testing-library/react-native';
import React from 'react';

import Header from '../Header';

jest.useRealTimers();

describe('@shared/components/Header', () => {
  describe('when header is null', () => {
    const component = () => render(<Header />);

    test('snapshot: component', async () => {
      const {toJSON} = component();
      expect(toJSON()).toMatchSnapshot();
    });
  });
  describe('when header is rendered but no title', () => {
    const component = () => render(<Header isWithBackButton />);

    test('snapshot: component', async () => {
      const {toJSON} = component();
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
