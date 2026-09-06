import React, { useState, useMemo } from 'react';
import { farmers, seasons, states, districts, crops } from '../data/dummyData';
import LeafRating from '../components/LeafRating';
import SeasonChip from '../components/SeasonChip';
import VerifiedBadge from '../components/VerifiedBadge';

export default function SearchScreen({ lang, onViewFarmer }) {
  const isHindi = lang === 'hi';

  const [searchQuery, setSearchQuery] = useState('');
  const [filterSeason, setFilterSeason] = useState('');
  const [filterState, setFilterState] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterOrganic, setFilterOrganic] = useState(false);

  const filtered = useMemo(() => {
    return farmers.filter(f => {
      if (searchQuery && !f.crop.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !f.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filterSeason && f.season !== filterSeason) return false;
      if (filterState && f.state !== filterState) return false;
      if (filterDistrict && f.district !== filterDistrict) return false;
      if (filterOrganic && !f.organic) return false;
      return true;
    });
  }, [searchQuery, filterSeason, filterState, filterDistrict, filterOrganic]);

  const getPriceComparison = (price, msp) => {
    if (msp === 0) return null;
    const diff = ((price - msp) / msp * 100);
    if (diff > 0) return { text: `↑ ${diff.toFixed(0)}% above MSP`, cls: 'above' };
    if (diff < 0) return { text: `↓ ${Math.abs(diff).toFixed(0)}% below MSP`, cls: 'below' };
    return { text: '= At MSP', cls: 'equal' };
  };

  return (
    <div className="screen">
      {/* Search */}
      <div className="search-bar" style={{ marginBottom: '12px' }}>
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder={isHindi ? 'कौन सी फसल चाहिए?' : 'What crop are you looking for?'}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          id="search-input"
        />
      </div>

      {/* Filter Row */}
      <div className="filter-row">
        <select
          className="filter-btn"
          value={filterSeason}
          onChange={e => setFilterSeason(e.target.value)}
          style={{ appearance: 'none', paddingRight: '14px', cursor: 'pointer', backgroundImage: 'none' }}
        >
          <option value="">{isHindi ? 'मौसम' : 'Season'}</option>
          {seasons.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <select
          className="filter-btn"
          value={filterState}
          onChange={e => { setFilterState(e.target.value); setFilterDistrict(''); }}
          style={{ appearance: 'none', paddingRight: '14px', cursor: 'pointer', backgroundImage: 'none' }}
        >
          <option value="">{isHindi ? 'राज्य' : 'State'}</option>
          {states.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        {filterState && (
          <select
            className="filter-btn"
            value={filterDistrict}
            onChange={e => setFilterDistrict(e.target.value)}
            style={{ appearance: 'none', paddingRight: '14px', cursor: 'pointer', backgroundImage: 'none' }}
          >
            <option value="">{isHindi ? 'जिला' : 'District'}</option>
            {(districts[filterState] || []).map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        )}

        <button
          className={`filter-btn ${filterOrganic ? 'active' : ''}`}
          onClick={() => setFilterOrganic(prev => !prev)}
          id="filter-organic"
        >
          🌱 {isHindi ? 'जैविक' : 'Organic'}
        </button>
      </div>

      {/* Results count */}
      <p className="text-sub" style={{ margin: '16px 0 12px' }}>
        {filtered.length} {isHindi ? 'परिणाम' : filtered.length === 1 ? 'result' : 'results'}
      </p>

      {/* Farmer Cards */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 16px' }}>
          <span style={{ fontSize: '3rem' }}>🌾</span>
          <p className="text-sub" style={{ marginTop: '16px' }}>
            {isHindi ? 'कोई परिणाम नहीं मिला' : 'No results found'}
          </p>
        </div>
      ) : (
        filtered.map(farmer => {
          const comparison = getPriceComparison(farmer.price, farmer.msp);
          return (
            <div
              key={farmer.id}
              className="farmer-card"
              onClick={() => onViewFarmer(farmer)}
              id={`farmer-card-${farmer.id}`}
            >
              <div className="farmer-card-header">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <LeafRating rating={farmer.rating} />
                    <span className="farmer-card-name">{farmer.name}</span>
                  </div>
                  <div className="farmer-card-location">
                    {farmer.verified && <VerifiedBadge label={isHindi ? 'सत्यापित' : 'Verified Farmer'} />}
                    <span>· {farmer.location}</span>
                  </div>
                </div>
              </div>

              <div className="farmer-card-body">
                <div className="farmer-card-crop">
                  <span>{farmer.crop}</span>
                  <SeasonChip season={farmer.season} />
                  <span className="text-sub">· {farmer.qty} {farmer.unit}s avail</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="price-tag text-mono">₹{farmer.price.toLocaleString()}/{farmer.unit === 'Quintal' ? 'qtl' : farmer.unit.toLowerCase()}</span>
                  {comparison && (
                    <span className={`price-comparison ${comparison.cls}`}>
                      {comparison.text}
                    </span>
                  )}
                </div>

                <div className="text-sub">
                  {isHindi ? 'फसल कटाई' : 'Harvest'}: {farmer.harvest}
                </div>
              </div>

              <div className="farmer-card-footer">
                <span className="distance-badge">
                  📍 {farmer.distance} km {isHindi ? 'दूर' : 'from your location'}
                </span>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={e => { e.stopPropagation(); onViewFarmer(farmer); }}
                  id={`contact-btn-${farmer.id}`}
                >
                  {isHindi ? 'संपर्क' : 'Contact'}
                </button>
              </div>

              {farmer.organic && (
                <div style={{ marginTop: '8px' }}>
                  <span className="season-chip zaid" style={{ fontSize: '0.6875rem' }}>
                    🌱 {isHindi ? 'जैविक प्रमाणित' : 'Organic certified'}
                  </span>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
