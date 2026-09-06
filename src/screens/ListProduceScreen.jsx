import React, { useState } from 'react';
import { crops, mspRates, seasons } from '../data/dummyData';
import { useToast } from '../components/Toast';

export default function ListProduceScreen({ lang }) {
  const isHindi = lang === 'hi';
  const addToast = useToast();

  const [form, setForm] = useState({
    crop: '',
    season: 'Rabi',
    harvestDate: '',
    qty: '',
    unit: 'Quintal',
    price: '',
    organic: false,
    location: null,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showCropDropdown, setShowCropDropdown] = useState(false);
  const [cropSearch, setCropSearch] = useState('');

  const filteredCrops = crops.filter(c =>
    c.toLowerCase().includes(cropSearch.toLowerCase())
  );

  const currentMsp = form.crop ? (mspRates[form.crop] || 0) : 0;
  const priceNum = parseFloat(form.price) || 0;
  const mspDiff = currentMsp > 0 ? ((priceNum - currentMsp) / currentMsp * 100) : 0;
  const mspStatus = priceNum > currentMsp ? 'above' : priceNum < currentMsp ? 'below' : 'equal';

  const handleUseLocation = () => {
    setForm(prev => ({ ...prev, location: { lat: 19.9975, lng: 73.7898 } }));
    addToast(isHindi ? 'स्थान प्राप्त हुआ' : 'Location detected', 'success');
  };

  const validate = () => {
    const errs = {};
    if (!form.crop) errs.crop = isHindi ? 'फसल चुनें' : 'Select a crop';
    if (!form.harvestDate) errs.harvestDate = isHindi ? 'तिथि चुनें' : 'Select harvest date';
    if (!form.qty) errs.qty = isHindi ? 'मात्रा दर्ज करें' : 'Enter quantity';
    if (!form.price) errs.price = isHindi ? 'मूल्य दर्ज करें' : 'Enter price';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSubmitted(true);
    addToast(isHindi ? 'उपज सूचीबद्ध!' : 'Produce listed successfully!', 'success');
  };

  if (submitted) {
    return (
      <div className="screen">
        <div className="success-screen">
          <div className="success-icon">🌾</div>
          <h2>{isHindi ? 'उपज सूचीबद्ध!' : 'Produce listed!'}</h2>
          <p className="text-sub">
            {isHindi
              ? 'आपकी उपज अब खरीदारों को दिखाई दे रही है।'
              : 'Your produce is now visible to buyers.'}
          </p>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => { setSubmitted(false); setForm({ crop: '', season: 'Rabi', harvestDate: '', qty: '', unit: 'Quintal', price: '', organic: false, location: null }); }}
          >
            {isHindi ? 'एक और सूचीबद्ध करें' : 'List another produce'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <h2 style={{ marginBottom: '4px' }}>
        {isHindi ? 'अपनी उपज सूचीबद्ध करें' : 'List your produce'}
      </h2>
      {!isHindi && <p className="text-hindi" style={{ marginBottom: '24px' }}>अपनी उपज सूचीबद्ध करें</p>}

      {/* Crop Name (Searchable Dropdown) */}
      <div className="form-group">
        <label className="form-label">{isHindi ? 'फसल का नाम' : 'Crop name'}</label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder={isHindi ? 'फसल खोजें...' : 'Search crops...'}
            value={cropSearch || form.crop}
            onChange={e => { setCropSearch(e.target.value); setShowCropDropdown(true); setForm(prev => ({ ...prev, crop: '' })); }}
            onFocus={() => setShowCropDropdown(true)}
            className={errors.crop ? 'error' : ''}
            id="crop-search"
          />
          {showCropDropdown && filteredCrops.length > 0 && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10,
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)', marginTop: '4px',
              maxHeight: '200px', overflowY: 'auto'
            }}>
              {filteredCrops.map(crop => (
                <button
                  key={crop}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    padding: '10px 16px', border: 'none', background: 'none',
                    cursor: 'pointer', fontSize: '0.9375rem',
                    borderBottom: '1px solid var(--border-light)'
                  }}
                  onClick={() => {
                    setForm(prev => ({ ...prev, crop }));
                    setCropSearch('');
                    setShowCropDropdown(false);
                    setErrors(prev => ({ ...prev, crop: undefined }));
                  }}
                  onMouseEnter={e => e.target.style.background = 'var(--primary-bg)'}
                  onMouseLeave={e => e.target.style.background = 'none'}
                >
                  {crop}
                </button>
              ))}
            </div>
          )}
        </div>
        {errors.crop && <div className="form-error">{errors.crop}</div>}
      </div>

      {/* Season Toggle */}
      <div className="form-group">
        <label className="form-label">{isHindi ? 'मौसम' : 'Season'}</label>
        <div className="season-toggle">
          {seasons.map(s => (
            <button
              key={s}
              className={`season-btn ${form.season === s ? `active ${s.toLowerCase()}` : ''}`}
              onClick={() => setForm(prev => ({ ...prev, season: s }))}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Harvest Date */}
      <div className="form-group">
        <label className="form-label">{isHindi ? 'अपेक्षित फसल कटाई तिथि' : 'Expected harvest date'}</label>
        <input
          type="date"
          value={form.harvestDate}
          onChange={e => { setForm(prev => ({ ...prev, harvestDate: e.target.value })); setErrors(prev => ({ ...prev, harvestDate: undefined })); }}
          className={errors.harvestDate ? 'error' : ''}
          id="harvest-date"
        />
        {errors.harvestDate && <div className="form-error">{errors.harvestDate}</div>}
      </div>

      {/* Quantity */}
      <div className="form-group">
        <label className="form-label">{isHindi ? 'उपलब्ध मात्रा' : 'Quantity available'}</label>
        <div className="input-with-unit">
          <input
            type="number"
            placeholder="0"
            value={form.qty}
            onChange={e => { setForm(prev => ({ ...prev, qty: e.target.value })); setErrors(prev => ({ ...prev, qty: undefined })); }}
            className={errors.qty ? 'error' : ''}
            id="quantity-input"
          />
          <select
            value={form.unit}
            onChange={e => setForm(prev => ({ ...prev, unit: e.target.value }))}
          >
            <option>Quintal</option>
            <option>Tonne</option>
            <option>Kg</option>
          </select>
        </div>
        {errors.qty && <div className="form-error">{errors.qty}</div>}
      </div>

      {/* Price */}
      <div className="form-group">
        <label className="form-label">{isHindi ? 'प्रति इकाई मूल्य (₹)' : 'Price per unit (₹)'}</label>
        <input
          type="number"
          placeholder="0"
          value={form.price}
          onChange={e => { setForm(prev => ({ ...prev, price: e.target.value })); setErrors(prev => ({ ...prev, price: undefined })); }}
          className={errors.price ? 'error' : ''}
          id="price-input"
        />
        {errors.price && <div className="form-error">{errors.price}</div>}
      </div>

      {/* MSP Indicator */}
      {form.crop && currentMsp > 0 && (
        <div className="msp-indicator animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="text-sub" style={{ fontWeight: 500 }}>
              {isHindi ? 'वर्तमान MSP' : 'Current MSP'}
            </span>
            <span className="text-mono" style={{ fontWeight: 600 }}>
              ₹{currentMsp.toLocaleString()}/{form.unit === 'Quintal' ? 'qtl' : form.unit.toLowerCase()}
            </span>
          </div>
          <div className="msp-bar">
            <div
              className={`msp-fill ${priceNum > 0 ? mspStatus : ''}`}
              style={{ width: priceNum > 0 ? `${Math.min(Math.max((priceNum / (currentMsp * 1.5)) * 100, 10), 100)}%` : '0%' }}
            ></div>
          </div>
          {priceNum > 0 && (
            <div className="msp-labels">
              <span className="text-muted">₹0</span>
              <span className={`price-comparison ${mspStatus}`}>
                {mspStatus === 'above' ? `↑ ${Math.abs(mspDiff).toFixed(0)}% above MSP` :
                 mspStatus === 'below' ? `↓ ${Math.abs(mspDiff).toFixed(0)}% below MSP` :
                 '= At MSP'}
              </span>
              <span className="text-muted">₹{(currentMsp * 1.5).toLocaleString()}</span>
            </div>
          )}
        </div>
      )}

      {form.crop && currentMsp === 0 && (
        <div className="msp-indicator animate-fade-in">
          <span className="text-sub" style={{ fontWeight: 500 }}>
            {isHindi ? 'MSP लागू नहीं' : 'No MSP applicable for this crop'}
          </span>
        </div>
      )}

      {/* GPS Location */}
      <div className="form-group" style={{ marginTop: '16px' }}>
        <label className="form-label">{isHindi ? 'स्थान' : 'GPS Location'}</label>
        {!form.location ? (
          <button
            className="btn btn-outline btn-block"
            onClick={handleUseLocation}
            id="location-btn"
          >
            📍 {isHindi ? 'मेरा स्थान उपयोग करें' : 'Use my location'}
          </button>
        ) : (
          <div className="card-flat animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.5rem' }}>📍</span>
            <div>
              <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>
                {isHindi ? 'स्थान प्राप्त हुआ' : 'Location detected'}
              </div>
              <div className="text-mono text-muted" style={{ fontSize: '0.75rem' }}>
                19.9975°N, 73.7898°E
              </div>
            </div>
            <span style={{ color: 'var(--verified)', marginLeft: 'auto' }}>✓</span>
          </div>
        )}
      </div>

      {/* Organic Toggle */}
      <div className="form-group">
        <div
          className={`toggle ${form.organic ? 'active' : ''}`}
          onClick={() => setForm(prev => ({ ...prev, organic: !prev.organic }))}
          id="organic-toggle"
        >
          <div className="toggle-track">
            <div className="toggle-thumb"></div>
          </div>
          <span className="toggle-label">
            {isHindi ? 'जैविक प्रमाणित' : 'Organic certified'}
          </span>
        </div>
        {form.organic && (
          <div style={{ marginTop: '12px' }} className="animate-slide-up">
            <div className="upload-slot" style={{ padding: '16px' }}>
              <span className="upload-icon" style={{ fontSize: '1.5rem' }}>🏅</span>
              <span className="upload-label">
                {isHindi ? 'जैविक प्रमाणपत्र अपलोड करें' : 'Upload organic certificate'}
              </span>
              <span className="upload-hint">{isHindi ? 'अपलोड करने के लिए टैप करें' : 'Tap to upload'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        className="btn btn-primary btn-block btn-lg"
        onClick={handleSubmit}
        id="list-produce-btn"
        style={{ marginTop: '24px' }}
      >
        {isHindi ? 'मेरी उपज सूचीबद्ध करें →' : 'List My Produce →'}
      </button>
      {!isHindi && (
        <p className="text-hindi" style={{ textAlign: 'center', marginTop: '8px' }}>
          मेरी उपज सूचीबद्ध करें
        </p>
      )}
    </div>
  );
}
