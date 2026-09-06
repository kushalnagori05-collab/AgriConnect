import React, { useState } from 'react';
import { ToastProvider } from './components/Toast';
import BottomNav from './components/BottomNav';
import LandingScreen from './screens/LandingScreen';
import DocumentUploadScreen from './screens/DocumentUploadScreen';
import ListProduceScreen from './screens/ListProduceScreen';
import SearchScreen from './screens/SearchScreen';
import FarmerProfileScreen from './screens/FarmerProfileScreen';
import DealLockScreen from './screens/DealLockScreen';
import ReviewScreen from './screens/ReviewScreen';
import { farmers } from './data/dummyData';

function AppContent() {
  // Auth state
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null); // 'farmer' | 'buyer'
  const [docsComplete, setDocsComplete] = useState(false);

  // Navigation
  const [activeTab, setActiveTab] = useState('home');
  const [screen, setScreen] = useState('landing'); // landing | docs | main | farmerProfile | dealLock | review

  // Language
  const [lang, setLang] = useState('en');

  // Data context
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [dealFarmer, setDealFarmer] = useState(null);

  // Handle login
  const handleLogin = (selectedRole) => {
    setRole(selectedRole);
    setLoggedIn(true);
    setScreen('docs');
  };

  // Handle docs complete
  const handleDocsComplete = () => {
    setDocsComplete(true);
    setScreen('main');
    setActiveTab(role === 'farmer' ? 'home' : 'search');
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'deals' && dealFarmer) {
      setScreen('dealLock');
    } else {
      setScreen('main');
      setSelectedFarmer(null);
    }
  };

  // View farmer profile
  const handleViewFarmer = (farmer) => {
    setSelectedFarmer(farmer);
    setScreen('farmerProfile');
  };

  // Initiate deal
  const handleInitiateDeal = (farmer) => {
    setDealFarmer(farmer);
    setScreen('dealLock');
    setActiveTab('deals');
  };

  // Review
  const handleReview = (farmer) => {
    setSelectedFarmer(farmer);
    setScreen('review');
  };

  const handleReviewBack = () => {
    setScreen('main');
    setActiveTab('home');
    setDealFarmer(null);
  };

  // Profile back
  const handleProfileBack = () => {
    setScreen('main');
    setActiveTab('search');
    setSelectedFarmer(null);
  };

  // Render active screen
  const renderScreen = () => {
    // Not logged in → landing
    if (!loggedIn) {
      return <LandingScreen onLogin={handleLogin} lang={lang} onLangChange={setLang} />;
    }

    // Docs not complete
    if (!docsComplete) {
      return <DocumentUploadScreen role={role} lang={lang} onComplete={handleDocsComplete} />;
    }

    // Specific screens
    if (screen === 'farmerProfile' && selectedFarmer) {
      return (
        <FarmerProfileScreen
          farmer={selectedFarmer}
          lang={lang}
          onBack={handleProfileBack}
          onDeal={handleInitiateDeal}
        />
      );
    }

    if (screen === 'dealLock') {
      return (
        <DealLockScreen
          farmer={dealFarmer || farmers[0]}
          role={role}
          lang={lang}
          onComplete={handleReview}
        />
      );
    }

    if (screen === 'review') {
      return (
        <ReviewScreen
          farmer={selectedFarmer || dealFarmer || farmers[0]}
          lang={lang}
          onBack={handleReviewBack}
        />
      );
    }

    // Tab-based screens
    switch (activeTab) {
      case 'home':
        return <HomeScreen role={role} lang={lang} onTabChange={handleTabChange} />;
      case 'search':
        return <SearchScreen lang={lang} onViewFarmer={handleViewFarmer} />;
      case 'list':
        return <ListProduceScreen lang={lang} />;
      case 'mylistings':
        return <MyListingsScreen lang={lang} role={role} />;
      case 'deals':
        if (dealFarmer) {
          return (
            <DealLockScreen
              farmer={dealFarmer}
              role={role}
              lang={lang}
              onComplete={handleReview}
            />
          );
        }
        return <DealsScreen lang={lang} onStartDeal={() => handleTabChange('search')} />;
      case 'profile':
        return <ProfileScreen role={role} lang={lang} />;
      default:
        return <HomeScreen role={role} lang={lang} onTabChange={handleTabChange} />;
    }
  };

  const showNav = loggedIn && docsComplete && screen !== 'review';

  return (
    <div className="app-shell">
      {renderScreen()}
      {showNav && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} role={role} />
      )}
    </div>
  );
}

// ─── Home Screen ───
function HomeScreen({ role, lang, onTabChange }) {
  const isHindi = lang === 'hi';

  return (
    <div className="screen">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2>
            {isHindi
              ? `नमस्ते! 🙏`
              : `Welcome! 🙏`}
          </h2>
          <p className="text-sub" style={{ marginTop: '4px' }}>
            {role === 'farmer'
              ? (isHindi ? 'अपनी उपज बेचें, उचित दाम पाएँ' : 'Sell your produce, get fair prices')
              : (isHindi ? 'सीधे किसानों से खरीदें' : 'Buy directly from farmers')}
          </p>
        </div>
        <div className="landing-logo-icon">🌾</div>
      </div>

      {/* Quick Stats */}
      <div className="profile-stats" style={{ marginBottom: '24px' }}>
        <div className="stat-item">
          <div className="stat-value">127</div>
          <div className="stat-label">{isHindi ? 'सक्रिय किसान' : 'Active farmers'}</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">52</div>
          <div className="stat-label">{isHindi ? 'आज के सौदे' : 'Deals today'}</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">8</div>
          <div className="stat-label">{isHindi ? 'फसलें' : 'Crops listed'}</div>
        </div>
      </div>

      {/* Quick Action */}
      <div className="card" style={{ marginBottom: '16px', cursor: 'pointer' }} onClick={() => onTabChange(role === 'farmer' ? 'list' : 'search')}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '2rem' }}>{role === 'farmer' ? '🌾' : '🔍'}</span>
          <div>
            <h4>
              {role === 'farmer'
                ? (isHindi ? 'अपनी उपज सूचीबद्ध करें' : 'List your produce')
                : (isHindi ? 'फसल खोजें' : 'Search for crops')}
            </h4>
            <p className="text-sub" style={{ fontSize: '0.8125rem' }}>
              {role === 'farmer'
                ? (isHindi ? 'MSP दर से ऊपर बेचें' : 'Sell above MSP rates')
                : (isHindi ? 'सत्यापित किसानों से सीधे खरीदें' : 'Buy directly from verified farmers')}
            </p>
          </div>
          <span style={{ marginLeft: 'auto', color: 'var(--text-muted)' }}>→</span>
        </div>
      </div>

      {/* Recent Activity */}
      <h4 className="section-title" style={{ marginTop: '24px' }}>
        {isHindi ? 'हाल की गतिविधि' : 'Recent activity'}
      </h4>
      <div className="card" style={{ marginBottom: '12px' }}>
        <div className="text-sub" style={{ fontSize: '0.8125rem', marginBottom: '4px' }}>Today, 2:30 PM</div>
        <div style={{ fontWeight: 500 }}>
          {isHindi ? 'नई उपज सूचीबद्ध — गेहूँ, 50 क्विंटल' : 'New produce listed — Wheat, 50 Quintals'}
        </div>
      </div>
      <div className="card" style={{ marginBottom: '12px' }}>
        <div className="text-sub" style={{ fontSize: '0.8125rem', marginBottom: '4px' }}>Yesterday</div>
        <div style={{ fontWeight: 500 }}>
          {isHindi ? 'सत्यापन पूरा — सभी दस्तावेज़ सत्यापित' : 'Verification complete — All documents verified'}
        </div>
      </div>
      <div className="card">
        <div className="text-sub" style={{ fontSize: '0.8125rem', marginBottom: '4px' }}>2 days ago</div>
        <div style={{ fontWeight: 500 }}>
          {isHindi ? 'खाता बनाया गया' : 'Account created'}
        </div>
      </div>

      {/* Government Footer */}
      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        <span className="govt-stamp" style={{ fontSize: '0.6875rem' }}>
          {isHindi ? 'भारत सरकार द्वारा सत्यापित' : 'Verified by Govt. of India'}
        </span>
      </div>
    </div>
  );
}

// ─── My Listings Screen (Buyer view) ───
function MyListingsScreen({ lang, role }) {
  const isHindi = lang === 'hi';

  return (
    <div className="screen">
      <h2 style={{ marginBottom: '24px' }}>
        {isHindi ? 'मेरी सूची' : 'My listings'}
      </h2>

      {role === 'farmer' ? (
        <>
          {farmers.slice(0, 2).map((f, i) => (
            <div key={i} className="card" style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontWeight: 600 }}>{f.crop}</span>
                  <span className={`season-chip ${f.season.toLowerCase()}`} style={{ marginLeft: '8px' }}>{f.season}</span>
                </div>
                <span className="verified-badge" style={{ fontSize: '0.6875rem', padding: '2px 8px' }}>Active</span>
              </div>
              <div className="text-sub" style={{ marginTop: '4px' }}>{f.qty} {f.unit} · ₹{f.price.toLocaleString()}/{f.unit === 'Quintal' ? 'qtl' : f.unit.toLowerCase()}</div>
              <div className="text-muted" style={{ marginTop: '2px' }}>Harvest: {f.harvest}</div>
            </div>
          ))}
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '48px 16px' }}>
          <span style={{ fontSize: '3rem' }}>📋</span>
          <p className="text-sub" style={{ marginTop: '16px' }}>
            {isHindi ? 'अभी कोई सूची नहीं' : 'No saved listings yet'}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Deals Screen (Empty state) ───
function DealsScreen({ lang, onStartDeal }) {
  const isHindi = lang === 'hi';

  return (
    <div className="screen">
      <h2 style={{ marginBottom: '24px' }}>
        {isHindi ? 'मेरे सौदे' : 'My deals'}
      </h2>
      <div style={{ textAlign: 'center', padding: '48px 16px' }}>
        <span style={{ fontSize: '3rem' }}>🤝</span>
        <p className="text-sub" style={{ marginTop: '16px' }}>
          {isHindi ? 'अभी कोई सौदा नहीं' : 'No active deals yet'}
        </p>
        <button className="btn btn-primary" onClick={onStartDeal} style={{ marginTop: '16px' }}>
          {isHindi ? 'फसल खोजें' : 'Find crops to buy'}
        </button>
      </div>
    </div>
  );
}

// ─── Profile Screen ───
function ProfileScreen({ role, lang }) {
  const isHindi = lang === 'hi';
  const name = role === 'farmer' ? 'Ramesh Patil' : 'Amit Sharma';
  const initial = name.split(' ').map(n => n[0]).join('');

  return (
    <div className="screen">
      <div className="card-flat" style={{ marginBottom: '24px' }}>
        <div className="profile-header" style={{ marginBottom: '16px' }}>
          <div className="profile-avatar">{initial}</div>
          <div>
            <h2 style={{ marginBottom: '4px' }}>{name}</h2>
            <span className="verified-badge">
              <span className="badge-ring"></span>
              {role === 'farmer' ? (isHindi ? 'सत्यापित किसान' : 'Verified Farmer') : (isHindi ? 'सत्यापित खरीदार' : 'Verified Buyer')}
            </span>
          </div>
        </div>
        <div className="profile-stats">
          <div className="stat-item">
            <div className="stat-value">{role === 'farmer' ? '18' : '5'}</div>
            <div className="stat-label">{isHindi ? 'सौदे' : 'Deals'}</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">4.2</div>
            <div className="stat-label">{isHindi ? 'रेटिंग' : 'Rating'}</div>
          </div>
          <div className="stat-item">
            <div className="stat-value" style={{ fontSize: '0.875rem' }}>Jan 2024</div>
            <div className="stat-label">{isHindi ? 'सदस्य' : 'Joined'}</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      {[
        { icon: '📄', label: isHindi ? 'मेरे दस्तावेज़' : 'My documents' },
        { icon: '🔔', label: isHindi ? 'सूचनाएँ' : 'Notifications' },
        { icon: '⚙️', label: isHindi ? 'सेटिंग्स' : 'Settings' },
        { icon: '🌐', label: isHindi ? 'भाषा बदलें' : 'Change language' },
        { icon: '❓', label: isHindi ? 'सहायता' : 'Help & Support' },
      ].map((item, i) => (
        <div key={i} className="card" style={{ marginBottom: '8px', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
            <span style={{ fontWeight: 500, flex: 1 }}>{item.label}</span>
            <span style={{ color: 'var(--text-muted)' }}>→</span>
          </div>
        </div>
      ))}

      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        <span className="govt-stamp" style={{ fontSize: '0.6875rem' }}>
          {isHindi ? 'भारत सरकार द्वारा सत्यापित' : 'Verified by Govt. of India'}
        </span>
        <p className="text-muted" style={{ marginTop: '12px' }}>AgriConnect v1.0 · SIH 2026</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
