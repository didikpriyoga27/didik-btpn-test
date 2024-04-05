import {useQuery} from '@tanstack/react-query';
import {render} from '@testing-library/react-native';
import React from 'react';

import ContactDetailScreen from '../ContactDetailScreen';

jest.useRealTimers();

describe('@screens/ContactDetailScreen isLoading', () => {
  // @ts-ignore
  useQuery.mockReturnValue({
    isLoading: true,
  });

  const component = () => render(<ContactDetailScreen />);

  test('snapshot: component', async () => {
    const {toJSON} = component();
    expect(toJSON()).toMatchSnapshot();
  });
});
