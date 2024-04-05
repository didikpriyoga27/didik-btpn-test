import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import ContactDetailScreen from '../ContactDetailScreen';
import {mockContact} from '../__mocks__/mockContact';

jest.useRealTimers();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      goBack: jest.fn(),
    }),
    useRoute: () => ({
      params: {
        contactId: 'id-1',
      },
    }),
  };
});

jest.mock('@tanstack/react-query', () => ({
  useQueryClient: jest.fn(() => ({
    refetchQueries: jest.fn(),
  })),
  useQuery: jest.fn(() => ({
    data: mockContact,
  })),
  useMutation: jest.fn(() => ({
    mutateAsync: jest.fn(() => Promise.resolve({})),
  })),
}));

describe('@screens/ContactDetailScreen', () => {
  const component = () => render(<ContactDetailScreen />);

  test('snapshot: component', async () => {
    const {toJSON, getByTestId} = component();
    const ButtonSave = getByTestId('ButtonSave');
    fireEvent(ButtonSave, 'press');
    expect(toJSON()).toMatchSnapshot();
  });
});
