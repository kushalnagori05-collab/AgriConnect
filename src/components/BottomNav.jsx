import React from 'react';

export default function BottomNav({ activeTab, onTabChange, role }) {
  const tabs = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'search', icon: '🔍', label: 'Search' },
    { id: role === 'farmer' ? 'list' : 'mylistings', icon: '📋', label: role === 'farmer' ? 'My Listings' : 'My Listings' },
    { id: 'deals', icon: '🤝', label: 'Deals' },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
          id={`nav-${tab.id}`}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
