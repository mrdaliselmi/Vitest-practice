import React from 'react';
import { FaStar } from 'react-icons/fa';
import Rating from 'react-rating-stars-component';

const StarRating = ({ value, onChange }) => {
  return (
    <div>
      <label>Star Rating:</label>
      <Rating
        count={5}
        size={24}
        value={value}
        onChange={onChange}
        emptyIcon={<FaStar />}
        filledIcon={<FaStar fill="#ffd700" />}
      />
    </div>
  );
};

export default StarRating;
