import React, { useState } from 'react';
import { useToast } from '../components/Toast';

function FarmerIllustration() {
  return (
    <div className="farmer-svg">
      <div className="field">
        <div className="wheat-stalk"></div>
        <div className="wheat-stalk"></div>
        <div className="wheat-stalk"></div>
        <div className="wheat-stalk"></div>
      </div>
    </div>
  );
}

function BuyerIllustration() {
  return (
    <div className="buyer-svg">
      <div className="warehouse">
        <div className="warehouse-window"></div>
        <div className="warehouse-window"></div>
        <div className="warehouse-door"></div>
      </div>
    </div>
  );
}

export default function LandingScreen({ onLogin, lang, onLangChange }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const addToast = useToast();

  const isHindi = lang === 'hi';

  const handleSendOtp = () => {
    if (!mobile.trim()) return;
    setOtpSent(true);
    addToast(isHindi ? 'OTP भेजा गया!' : 'OTP sent successfully!', 'success');
  };

  const handleLogin = () => {
    if (selectedRole && mobile) {
      onLogin(selectedRole);
    }
  };

  return (
    <div className="screen-landing">
      {/* Top Bar */}
      <div className="landing-top-bar">
        <div className="landing-logo">
          <div className="landing-logo-icon">🌾</div>
          <span className="landing-logo-text">
            {isHindi ? 'एग्रीकनेक्ट' : 'AgriConnect'}
          </span>
        </div>
        <div className="lang-toggle">
          <button
            className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
            onClick={() => onLangChange('en')}
            id="lang-en"
          >
            English
          </button>
          <button
            className={`lang-btn ${lang === 'hi' ? 'active' : ''}`}
            onClick={() => onLangChange('hi')}
            id="lang-hi"
          >
            हिंदी
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="landing-hero">
        <h1 className="landing-tagline">
          {isHindi
            ? 'सीधे किसान से।\nसीधा व्यापार, उचित दाम।'
            : 'Seedh Kisan se.\nDirect trade, fair price.'}
        </h1>
        <p className="landing-subtitle">
          {isHindi
            ? 'भारत सरकार समर्थित किसान-से-खरीदार प्रत्यक्ष व्यापार मंच'
            : 'Government-backed farmer-to-buyer direct trade platform'}
        </p>

        {/* Role Cards */}
        <div className="role-cards">
          <button
            className={`role-card ${selectedRole === 'farmer' ? 'selected' : ''}`}
            onClick={() => setSelectedRole('farmer')}
            id="role-farmer"
          >
            <div className="role-illustration">
              <FarmerIllustration />
            </div>
            <div className="role-name">{isHindi ? 'किसान' : 'Farmer'}</div>
            {!isHindi && <div className="role-name-hi">किसान</div>}
          </button>

          <button
            className={`role-card ${selectedRole === 'buyer' ? 'selected' : ''}`}
            onClick={() => setSelectedRole('buyer')}
            id="role-buyer"
          >
            <div className="role-illustration">
              <BuyerIllustration />
            </div>
            <div className="role-name">{isHindi ? 'खरीदार' : 'Buyer'}</div>
            {!isHindi && <div className="role-name-hi">खरीदार</div>}
          </button>
        </div>

        {/* Login Form (slide-in) */}
        {selectedRole && (
          <div className="login-form-container">
            <div className="login-form">
              <h3>
                {isHindi ? 'लॉग इन करें' : `Login as ${selectedRole === 'farmer' ? 'Farmer' : 'Buyer'}`}
              </h3>
              {!isHindi && (
                <p className="text-hindi" style={{ marginBottom: '16px' }}>
                  {selectedRole === 'farmer' ? 'किसान के रूप में लॉग इन' : 'खरीदार के रूप में लॉग इन'}
                </p>
              )}

              <div className="form-group">
                <label className="form-label">
                  {isHindi ? 'मोबाइल नंबर या ईमेल' : 'Mobile number or Email'}
                </label>
                <div className="otp-row">
                  <input
                    type="text"
                    placeholder={isHindi ? '+91 98765 43210' : '+91 98765 43210'}
                    value={mobile}
                    onChange={e => setMobile(e.target.value)}
                    id="login-mobile"
                  />
                  <button
                    className="btn btn-accent btn-sm"
                    onClick={handleSendOtp}
                    disabled={!mobile.trim()}
                    id="send-otp-btn"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {isHindi ? 'OTP भेजें' : 'Send OTP'}
                  </button>
                </div>
              </div>

              {otpSent && (
                <div className="form-group animate-slide-up">
                  <label className="form-label">
                    {isHindi ? 'OTP दर्ज करें' : 'Enter OTP'}
                  </label>
                  <input
                    type="text"
                    placeholder="• • • •"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    maxLength={4}
                    id="login-otp"
                    style={{ textAlign: 'center', letterSpacing: '12px', fontFamily: 'var(--font-mono)' }}
                  />
                  <button
                    className="btn btn-primary btn-block"
                    onClick={handleLogin}
                    disabled={otp.length < 4}
                    id="login-submit-btn"
                    style={{ marginTop: '16px' }}
                  >
                    {isHindi ? 'लॉग इन' : 'Login'}
                    {!isHindi && <span className="text-hindi" style={{ color: 'rgba(255,255,255,0.7)', marginLeft: '8px' }}>लॉग इन</span>}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <p className="text-muted">
          {isHindi ? 'भारत सरकार की पहल · SIH 2026' : 'A Government of India Initiative · SIH 2026'}
        </p>
      </div>
    </div>
  );
}
