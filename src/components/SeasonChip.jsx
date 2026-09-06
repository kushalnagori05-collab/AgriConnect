import React from 'react';

export default function SeasonChip({ season }) {
  const seasonClass = season.toLowerCase();
  return (
    <span className={`season-chip ${seasonClass}`}>
      {season}
    </span>
  );
}
