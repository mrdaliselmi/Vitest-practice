import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Folder from '../src/Folder';

test('renders folder name', () => {
  const { getByText } = render(<Folder name="My Folder" items={[]} />);
  expect(getByText(/My Folder/)).toBeInTheDocument();
});

test('toggles folder open/close on click', () => {
  const { getByText, queryByText } = render(
    <Folder name="My Folder" items={['Item 1', 'Item 2']} />
  );

  fireEvent.click(getByText(/My Folder/));
  expect(getByText('Item 1')).toBeInTheDocument();
  expect(getByText('Item 2')).toBeInTheDocument();

  fireEvent.click(getByText(/My Folder/));
  expect(queryByText('Item 1')).not.toBeInTheDocument();
  expect(queryByText('Item 2')).not.toBeInTheDocument();
});
