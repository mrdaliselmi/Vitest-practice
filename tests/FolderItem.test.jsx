import React from 'react';
import { render } from '@testing-library/react';
import FolderItem from '../src/FolderItem';

test('renders folder item name', () => {
  const { getByText } = render(<FolderItem name="Item 1" />);
  expect(getByText('Item 1')).toBeInTheDocument();
});
