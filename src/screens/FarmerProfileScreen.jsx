import React, { useState } from 'react';
import { reviews } from '../data/dummyData';
import LeafRating from '../components/LeafRating';
import VerifiedBadge from '../components/VerifiedBadge';
import SeasonChip from '../components/SeasonChip';

export default function FarmerProfileScreen({ farmer, lang, onBack, onDeal }) {
  const isHindi = lang === 'hi';
  const [contactRevealed, setContactRevealed] = useState(false);

  if (!farmer) return null;

  const farmerReviews = reviews.filter(r => r.farmerId === farmer.id);
  const initial = farmer.name.split(' ').map(n => n[0]).join('');

  return (
    <div className="screen">
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={onBack} id="profile-back-btn">
          ←
        </button>
        <h3>{isHindi ? 'किसान प्रोफ़ाइल' : 'Farmer profile'}</h3>
      </div>

      {/* Profile Header */}
      <div className="card-flat" style={{ marginBottom: '16px' }}>
        <div className="profile-header" style={{ marginBottom: '16px' }}>
          <div className="profile-avatar">{initial}</div>
          <div style={{ flex: 1 }}>
            <h2 style={{ marginBottom: '4px' }}>{farmer.name}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
              {farmer.verified && <VerifiedBadge label={isHindi ? 'सत्यापित किसान' : 'Verified Farmer'} />}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LeafRating rating={farmer.rating} />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="profile-stats">
          <div className="stat-item">
            <div className="stat-value">{farmer.deals}</div>
            <div className="stat-label">{isHindi ? 'कुल सौदे' : 'Total deals'}</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{farmer.avgResponseTime}</div>
            <div className="stat-label">{isHindi ? 'औसत उत्तर' : 'Avg response'}</div>
          </div>
          <div className="stat-item">
            <div className="stat-value" style={{ fontSize: '0.875rem' }}>{farmer.memberSince}</div>
            <div className="stat-label">{isHindi ? 'सदस्य' : 'Member since'}</div>
          </div>
        </div>
      </div>

      {/* Active Listings */}
      <h4 className="section-title">
        {isHindi ? 'सक्रिय उपज सूची' : 'Active listings'}
      </h4>
      {farmer.listings.map((listing, i) => (
        <div key={i} className="card" style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontWeight: 600 }}>{listing.crop}</span>
            <SeasonChip season={listing.season} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="text-sub">{listing.qty} {listing.unit}</span>
            <span className="price-tag text-mono">₹{listing.price.toLocaleString()}/{listing.unit === 'Quintal' ? 'qtl' : listing.unit.toLowerCase()}</span>
          </div>
          <div className="text-muted" style={{ marginTop: '4px' }}>
            {isHindi ? 'फसल कटाई' : 'Harvest'}: {listing.harvest}
          </div>
        </div>
      ))}

      <div className="divider"></div>

      {/* Reviews */}
      <h4 className="section-title">
        {isHindi ? 'समीक्षाएँ' : 'Reviews'} ({farmerReviews.length})
      </h4>
      {farmerReviews.length > 0 ? (
        <div className="card-flat" style={{ padding: 0 }}>
          {farmerReviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="review-avatar">
                  {review.reviewer[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{review.reviewer}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <LeafRating rating={review.rating} />
                    <span className="text-muted">{review.date}</span>
                  </div>
                </div>
              </div>
              <p className="review-text">{review.text}</p>
              {review.tags.length > 0 && (
                <div className="tag-pills" style={{ marginTop: '8px' }}>
                  {review.tags.map(tag => (
                    <span key={tag} className="tag-pill selected" style={{ cursor: 'default', fontSize: '0.6875rem', padding: '3px 10px' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sub">{isHindi ? 'कोई समीक्षा नहीं' : 'No reviews yet'}</p>
      )}

      <div className="divider"></div>

      {/* Contact CTA */}
      {!contactRevealed ? (
        <button
          className="btn btn-accent btn-block btn-lg"
          onClick={() => setContactRevealed(true)}
          id="reveal-contact-btn"
        >
          {isHindi ? 'संपर्क विवरण देखें' : 'Reveal Contact Details'}
          {!isHindi && <span className="text-hindi" style={{ color: 'rgba(0,0,0,0.5)', marginLeft: '8px' }}>संपर्क विवरण देखें</span>}
        </button>
      ) : (
        <div className="contact-reveal">
          <div className="contact-row">
            <span>📞</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{farmer.phone}</span>
          </div>
          <button className="whatsapp-btn" id="whatsapp-btn">
            💬 {isHindi ? 'WhatsApp पर संदेश भेजें' : 'Message on WhatsApp'}
          </button>
          <button
            className="btn btn-primary btn-block"
            onClick={() => onDeal(farmer)}
            id="initiate-deal-btn"
            style={{ marginTop: '8px' }}
          >
            🤝 {isHindi ? 'सौदा शुरू करें' : 'Initiate Deal'}
          </button>
        </div>
      )}
    </div>
  );
}
