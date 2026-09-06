import React from 'react';

export default function LeafRating({ rating, interactive = false, onRate = null, size = 'default' }) {
  const maxLeaves = 5;
  const filledLeaves = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.3;

  const handleClick = (index) => {
    if (interactive && onRate) {
      onRate(index + 1);
    }
  };

  return (
    <span className={`leaf-rating ${interactive ? 'interactive' : ''}`}>
      {Array.from({ length: maxLeaves }, (_, i) => {
        let cls = 'leaf';
        if (i < filledLeaves) cls += ' filled';
        else if (i === filledLeaves && hasHalf) cls += ' half';
        return (
          <span
            key={i}
            className={cls}
            onClick={() => handleClick(i)}
            role={interactive ? 'button' : undefined}
            aria-label={`${i + 1} leaf`}
            style={size === 'lg' ? { fontSize: '1.5rem' } : undefined}
          >
            🌿
          </span>
        );
      })}
      {!interactive && (
        <span className="rating-value">{rating.toFixed(1)}</span>
      )}
    </span>
  );
}
