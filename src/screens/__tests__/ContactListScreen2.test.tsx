import {useQuery} from '@tanstack/react-query';
import {render} from '@testing-library/react-native';
import React from 'react';

import ContactListScreen from '../ContactListScreen';

jest.useRealTimers();

describe('@screens/ContactListScreen isEmpty', () => {
  // @ts-ignore
  useQuery.mockReturnValue({
    data: {
      data: {
        data: [],
      },
    },
  });

  const component = () => render(<ContactListScreen />);

  test('snapshot: component', async () => {
    const {toJSON} = component();
    expect(toJSON()).toMatchSnapshot();
  });
});
