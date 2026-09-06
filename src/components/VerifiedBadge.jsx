import React from 'react';

export default function VerifiedBadge({ size = 'default', label = 'Verified Farmer' }) {
  const cls = size === 'lg' ? 'verified-badge verified-badge-lg' : 'verified-badge';
  return (
    <span className={cls}>
      <span className="badge-ring" aria-hidden="true"></span>
      {label}
    </span>
  );
}

export function GovtStamp({ label = 'Verified by Govt. of India' }) {
  return (
    <span className="govt-stamp">
      {label}
    </span>
  );
}
