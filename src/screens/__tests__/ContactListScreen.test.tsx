import {useQuery} from '@tanstack/react-query';
import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import ContactListScreen from '../ContactListScreen';
import {
  mockContact,
  mockContact2,
  mockContact3,
  mockContact4,
} from '../__mocks__/mockContact';

jest.useRealTimers();

describe('@screens/ContactListScreen', () => {
  // @ts-ignore
  useQuery.mockReturnValue({
    data: {
      data: {
        data: [mockContact, mockContact2, mockContact3, mockContact4],
      },
    },
  });

  const component = () => render(<ContactListScreen />);

  test('snapshot: component', async () => {
    const {toJSON, getByTestId} = component();

    const ButtonAddNewContact = getByTestId('ButtonAddNewContact');
    fireEvent(ButtonAddNewContact, 'press');

    expect(toJSON()).toMatchSnapshot();
  });
});
