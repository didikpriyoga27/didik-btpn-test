import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {mockContact} from '../../screens/__mocks__/mockContact';
import ContactItem from '../ContactItem';

jest.useRealTimers();

describe('@components/ContactItem', () => {
  const component = () => render(<ContactItem item={mockContact} />);

  test('snapshot: component', async () => {
    const {toJSON, getByTestId} = component();

    const ButtonContactDetail = getByTestId('ButtonContactDetail');
    const ButtonDeleteContact = getByTestId('ButtonDeleteContact');

    fireEvent(ButtonContactDetail, 'press');
    fireEvent(ButtonDeleteContact, 'press');

    expect(toJSON()).toMatchSnapshot();
  });
});
