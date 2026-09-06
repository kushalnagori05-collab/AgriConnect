import React, { useState, useEffect } from 'react';
import { useToast } from '../components/Toast';

export default function DealLockScreen({ farmer, role, lang, onComplete }) {
  const isHindi = lang === 'hi';
  const addToast = useToast();

  const [buyerLocked, setBuyerLocked] = useState(false);
  const [sellerLocked, setSellerLocked] = useState(false);
  const [dealComplete, setDealComplete] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [markedCompleted, setMarkedCompleted] = useState(false);
  const [markedPayment, setMarkedPayment] = useState(false);

  const bothLocked = buyerLocked && sellerLocked;

  const handleBuyerLock = () => {
    setBuyerLocked(true);
    addToast(isHindi ? 'आपने सौदा लॉक किया!' : 'You locked the deal!', 'success');
    // Simulate seller locking after 3s
    setTimeout(() => {
      setSellerLocked(true);
      addToast(
        isHindi ? `${farmer?.name || 'किसान'} ने भी सौदा लॉक किया!` : `${farmer?.name || 'Farmer'} also locked the deal!`,
        'success'
      );
    }, 3000);
  };

  const handleSellerLock = () => {
    setSellerLocked(true);
    addToast(isHindi ? 'आपने सौदा लॉक किया!' : 'You locked the deal!', 'success');
    setTimeout(() => {
      setBuyerLocked(true);
      addToast(isHindi ? 'खरीदार ने भी सौदा लॉक किया!' : 'Buyer also locked the deal!', 'success');
    }, 3000);
  };

  // Show reminder after 8 seconds (simulating 5 days)
  useEffect(() => {
    if (bothLocked && !markedCompleted && !markedPayment) {
      const timer = setTimeout(() => setShowReminder(true), 8000);
      return () => clearTimeout(timer);
    }
  }, [bothLocked, markedCompleted, markedPayment]);

  if (dealComplete) {
    return (
      <div className="screen">
        <div className="success-screen">
          <div className="success-icon">⭐</div>
          <h2>{isHindi ? 'सौदा पूरा हुआ!' : 'Deal completed!'}</h2>
          <p className="text-sub">
            {isHindi
              ? 'दोनों पक्षों ने सौदा पूरा चिह्नित किया।'
              : 'Both parties have confirmed completion.'}
          </p>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => onComplete(farmer)}
            id="write-review-btn"
          >
            ✍️ {isHindi ? 'समीक्षा लिखें' : 'Write a Review'}
          </button>
        </div>
      </div>
    );
  }

  if (bothLocked) {
    return (
      <div className="screen">
        <div className="success-screen" style={{ paddingTop: '32px' }}>
          <div className="success-icon">🤝</div>
          <h2>
            {isHindi ? 'सौदा पक्का!' : 'Deal Locked!'}
          </h2>
          {!isHindi && <p className="text-hindi">सौदा पक्का! 🤝</p>}
          <p className="text-sub">
            {isHindi
              ? `${farmer?.name || 'किसान'} के साथ सौदा लॉक हो गया है।`
              : `Deal is locked with ${farmer?.name || 'the farmer'}.`}
          </p>
        </div>

        {showReminder && (
          <div className="reminder-banner animate-slide-up" style={{ margin: '0 16px 16px' }}>
            ⏰ {isHindi
              ? '5 दिन हो गए! कृपया सौदा पूरा करें।'
              : '5 days have passed! Please complete the deal.'}
          </div>
        )}

        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            className={`btn btn-block btn-lg ${markedCompleted ? 'btn-outline' : 'btn-primary'}`}
            onClick={() => {
              setMarkedCompleted(true);
              addToast(isHindi ? 'पूर्ण चिह्नित!' : 'Marked as completed!', 'success');
              if (markedPayment) setDealComplete(true);
            }}
            disabled={markedCompleted}
            id="mark-completed-btn"
          >
            {markedCompleted ? '✓ ' : ''}{isHindi ? 'पूर्ण के रूप में चिह्नित करें' : 'Mark as Completed'}
            {!isHindi && <span className="text-hindi" style={{ color: 'rgba(255,255,255,0.7)', marginLeft: '6px' }}>पूर्ण चिह्नित</span>}
          </button>

          <button
            className={`btn btn-block btn-lg ${markedPayment ? 'btn-outline' : 'btn-accent'}`}
            onClick={() => {
              setMarkedPayment(true);
              addToast(isHindi ? 'भुगतान प्राप्त चिह्नित!' : 'Payment marked as received!', 'success');
              if (markedCompleted) setDealComplete(true);
            }}
            disabled={markedPayment}
            id="mark-payment-btn"
          >
            {markedPayment ? '✓ ' : ''}{isHindi ? 'भुगतान प्राप्त चिह्नित करें' : 'Mark Payment Received'}
            {!isHindi && <span className="text-hindi" style={{ color: 'rgba(0,0,0,0.5)', marginLeft: '6px' }}>भुगतान प्राप्त</span>}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="page-header">
        <h3>{isHindi ? 'सौदा लॉक' : 'Deal lock'}</h3>
      </div>

      {farmer && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="profile-avatar" style={{ width: '48px', height: '48px', fontSize: '1rem' }}>
              {farmer.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div style={{ fontWeight: 600 }}>{farmer.name}</div>
              <div className="text-sub">{farmer.crop} · {farmer.qty} {farmer.unit}</div>
              <div className="price-tag text-mono" style={{ fontSize: '0.9375rem' }}>
                ₹{farmer.price.toLocaleString()}/{farmer.unit === 'Quintal' ? 'qtl' : farmer.unit.toLowerCase()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lock Status */}
      <div className="card-flat" style={{ marginBottom: '24px' }}>
        <div className="deal-lock-card">
          <div className="lock-side">
            <div className={`lock-circle ${buyerLocked ? 'locked' : 'pending'}`}>
              {buyerLocked ? '✓' : '🔒'}
            </div>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>
              {isHindi ? 'खरीदार' : 'Buyer'}
            </span>
            <span className="text-muted" style={{ fontSize: '0.6875rem' }}>
              {buyerLocked
                ? (isHindi ? 'लॉक ✓' : 'Locked ✓')
                : (isHindi ? 'लंबित...' : 'Pending...')}
            </span>
          </div>

          <div className={`lock-connector ${buyerLocked && sellerLocked ? 'complete' : ''}`}></div>

          <div className="lock-side">
            <div className={`lock-circle ${sellerLocked ? 'locked' : 'pending'}`}>
              {sellerLocked ? '✓' : '🔒'}
            </div>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>
              {isHindi ? 'विक्रेता' : 'Seller'}
            </span>
            <span className="text-muted" style={{ fontSize: '0.6875rem' }}>
              {sellerLocked
                ? (isHindi ? 'लॉक ✓' : 'Locked ✓')
                : (isHindi ? 'लंबित...' : 'Pending...')}
            </span>
          </div>
        </div>

        {!buyerLocked && !sellerLocked && (
          <p className="text-sub" style={{ textAlign: 'center', marginTop: '8px' }}>
            {isHindi
              ? `${farmer?.name || 'किसान'} के इंतज़ार में...`
              : `Waiting for both parties to confirm the deal lock`}
          </p>
        )}
        {buyerLocked && !sellerLocked && (
          <p className="text-sub" style={{ textAlign: 'center', marginTop: '8px' }}>
            {isHindi
              ? `${farmer?.name || 'किसान'} से पुष्टि की प्रतीक्षा...`
              : `Waiting for ${farmer?.name || 'farmer'} to confirm deal lock`}
          </p>
        )}
        {!buyerLocked && sellerLocked && (
          <p className="text-sub" style={{ textAlign: 'center', marginTop: '8px' }}>
            {isHindi
              ? 'खरीदार से पुष्टि की प्रतीक्षा...'
              : 'Waiting for buyer to confirm deal lock'}
          </p>
        )}
      </div>

      {/* Lock Button */}
      {role === 'buyer' && !buyerLocked && (
        <button
          className="btn btn-primary btn-block btn-lg"
          onClick={handleBuyerLock}
          id="buyer-lock-btn"
        >
          🔒 {isHindi ? 'सौदा लॉक करें' : 'Lock this Deal'}
        </button>
      )}
      {role === 'farmer' && !sellerLocked && (
        <button
          className="btn btn-primary btn-block btn-lg"
          onClick={handleSellerLock}
          id="seller-lock-btn"
        >
          🔒 {isHindi ? 'सौदा लॉक करें' : 'Lock this Deal'}
        </button>
      )}
      {((role === 'buyer' && buyerLocked && !sellerLocked) ||
        (role === 'farmer' && sellerLocked && !buyerLocked)) && (
        <p className="text-sub" style={{ textAlign: 'center', marginTop: '16px' }}>
          ⏳ {isHindi ? 'दूसरे पक्ष की प्रतीक्षा में...' : 'Waiting for the other party...'}
        </p>
      )}
    </div>
  );
}
