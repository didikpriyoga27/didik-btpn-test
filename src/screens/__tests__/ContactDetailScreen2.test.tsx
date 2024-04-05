import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import ContactDetailScreen from '../ContactDetailScreen';

jest.useRealTimers();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      goBack: jest.fn(),
    }),
    useRoute: () => ({
      params: {},
    }),
  };
});

jest.mock('@tanstack/react-query', () => ({
  useQueryClient: jest.fn(() => ({
    refetchQueries: jest.fn(),
  })),
  useQuery: jest.fn(() => ({
    data: {},
  })),
  useMutation: jest.fn(() => ({
    mutateAsync: jest.fn(() => Promise.resolve({})),
  })),
}));

describe('@screens/ContactDetailScreen isEmpty', () => {
  const component = () => render(<ContactDetailScreen />);

  test('snapshot: component', async () => {
    const {toJSON, getByTestId} = component();
    const ButtonSave = getByTestId('ButtonSave');
    fireEvent(ButtonSave, 'press');
    expect(toJSON()).toMatchSnapshot();
  });
});
