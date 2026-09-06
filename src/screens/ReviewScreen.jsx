import React, { useState } from 'react';
import LeafRating from '../components/LeafRating';
import { tagOptions } from '../data/dummyData';
import { useToast } from '../components/Toast';

export default function ReviewScreen({ farmer, lang, onBack }) {
  const isHindi = lang === 'hi';
  const addToast = useToast();

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    if (rating === 0) {
      addToast(isHindi ? 'कृपया रेटिंग दें' : 'Please select a rating', 'warning');
      return;
    }
    setSubmitted(true);
    addToast(isHindi ? 'समीक्षा जमा!' : 'Review submitted!', 'success');
  };

  if (submitted) {
    return (
      <div className="screen">
        <div className="success-screen">
          <div className="success-icon">✍️</div>
          <h2>{isHindi ? 'धन्यवाद!' : 'Thank you!'}</h2>
          <p className="text-sub">
            {isHindi
              ? 'आपकी समीक्षा उनकी प्रोफ़ाइल पर दिखाई देगी।'
              : 'Your review will appear on their profile.'}
          </p>
          <button className="btn btn-primary btn-lg" onClick={onBack} id="review-done-btn">
            {isHindi ? 'वापस जाएँ' : 'Back to Home'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="page-header">
        <button className="back-btn" onClick={onBack} id="review-back-btn">←</button>
        <h3>{isHindi ? 'समीक्षा लिखें' : 'Write a review'}</h3>
      </div>

      {farmer && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="profile-avatar" style={{ width: '48px', height: '48px', fontSize: '1rem' }}>
              {farmer.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div style={{ fontWeight: 600 }}>{farmer.name}</div>
              <div className="text-sub">{farmer.location}</div>
            </div>
          </div>
        </div>
      )}

      {/* Rating */}
      <div className="form-group">
        <label className="form-label">
          {isHindi ? 'रेटिंग दें' : `Rate ${farmer?.name || 'the farmer'}`}
        </label>
        <div style={{ padding: '16px 0' }}>
          <LeafRating
            rating={rating}
            interactive
            onRate={setRating}
            size="lg"
          />
          {rating > 0 && (
            <span className="text-sub animate-fade-in" style={{ marginLeft: '12px' }}>
              {rating === 1 ? (isHindi ? 'खराब' : 'Poor') :
               rating === 2 ? (isHindi ? 'ठीक' : 'Fair') :
               rating === 3 ? (isHindi ? 'अच्छा' : 'Good') :
               rating === 4 ? (isHindi ? 'बहुत अच्छा' : 'Very good') :
               (isHindi ? 'उत्कृष्ट' : 'Excellent')}
            </span>
          )}
        </div>
      </div>

      {/* Review Text */}
      <div className="form-group">
        <label className="form-label">
          {isHindi ? 'अपना अनुभव लिखें' : 'Write your experience'}
        </label>
        <textarea
          placeholder={isHindi ? 'अपना अनुभव यहाँ लिखें...' : 'Write your experience...'}
          value={reviewText}
          onChange={e => setReviewText(e.target.value)}
          id="review-text"
        />
      </div>

      {/* Tags */}
      <div className="form-group">
        <label className="form-label">
          {isHindi ? 'टैग चुनें' : 'Select tags'}
        </label>
        <div className="tag-pills">
          {tagOptions.map(tag => (
            <button
              key={tag}
              className={`tag-pill ${selectedTags.includes(tag) ? 'selected' : ''}`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        className="btn btn-primary btn-block btn-lg"
        onClick={handleSubmit}
        id="submit-review-btn"
        style={{ marginTop: '24px' }}
      >
        {isHindi ? 'समीक्षा जमा करें' : 'Submit Review'}
        {!isHindi && <span className="text-hindi" style={{ color: 'rgba(255,255,255,0.7)', marginLeft: '8px' }}>समीक्षा जमा करें</span>}
      </button>
    </div>
  );
}
