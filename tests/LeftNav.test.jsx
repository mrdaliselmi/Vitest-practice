import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LeftNav from '../src/LeftNav';

it('renders without crashing', () => {
  render(<LeftNav />);
});

it('handles search correctly', () => {
  const { getByPlaceholderText, getByText } = render(<LeftNav />);
  const searchInput = getByPlaceholderText('Search (Exact Match)...');

  fireEvent.change(searchInput, { target: { value: 'Book' } });

  expect(getByText('E-Book')).toBeInTheDocument();
});

