import React from 'react';
import { render } from '@testing-library/react';
import StarRating from '../src/StarRating';

test('renders the StarRating component', () => {
  const { getByText } = render(<StarRating value={0} onChange={() => {}} />);
  expect(getByText(/Star Rating:/)).toBeInTheDocument();
});
