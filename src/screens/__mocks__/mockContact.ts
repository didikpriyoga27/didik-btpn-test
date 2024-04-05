import {Contact} from '../../slices/contactSlice';

export const mockContact: Contact = {
  age: 20,
  firstName: 'John',
  lastName: 'Doe',
  id: 'id-1',
  photo:
    'https://ui-avatars.com/api/?name=John+Doe&background=0f766e&color=fff',
};

export const mockContact2: Contact = {
  ...mockContact,
  firstName: 'Ahmad',
  id: 'id-2',
};

export const mockContact3: Contact = {
  ...mockContact,
  firstName: 'Zayn',
  id: 'id-3',
};

export const mockContact4: Contact = {
  ...mockContact,
  firstName: 'John',
  id: 'id-4',
};
