import React, { useState } from 'react';
import { GovtStamp } from '../components/VerifiedBadge';
import { useToast } from '../components/Toast';
import { businessTypes } from '../data/dummyData';

function UploadSlot({ label, optional = false, uploaded = false, onUpload }) {
  return (
    <div
      className={`upload-slot ${uploaded ? 'uploaded' : ''}`}
      onClick={onUpload}
      role="button"
      tabIndex={0}
    >
      <span className="upload-icon">{uploaded ? '✅' : '📄'}</span>
      <span className="upload-label">{label}</span>
      {optional && !uploaded && <span className="optional-tag">Optional</span>}
      {!uploaded && <span className="upload-hint">Tap to upload</span>}
      {uploaded && (
        <span className="govt-stamp" style={{ marginTop: '8px' }}>
          ✓ Verified via DigiLocker
        </span>
      )}
    </div>
  );
}

export default function DocumentUploadScreen({ role, lang, onComplete }) {
  const isHindi = lang === 'hi';
  const addToast = useToast();

  const [farmerDocs, setFarmerDocs] = useState({
    aadhaar: false,
    kcc: false,
    landProof: false,
    apmc: false,
  });

  const [buyerDocs, setBuyerDocs] = useState({
    gst: false,
    businessLicense: false,
    businessType: '',
  });

  const handleFarmerUpload = (doc) => {
    setFarmerDocs(prev => ({ ...prev, [doc]: true }));
    addToast(
      isHindi ? 'दस्तावेज़ सत्यापित!' : 'Document verified via DigiLocker!',
      'success'
    );
  };

  const handleBuyerUpload = (doc) => {
    setBuyerDocs(prev => ({ ...prev, [doc]: true }));
    addToast(
      isHindi ? 'दस्तावेज़ सत्यापित!' : 'Document verified successfully!',
      'success'
    );
  };

  const canProceed = role === 'farmer'
    ? farmerDocs.aadhaar && farmerDocs.kcc && farmerDocs.landProof
    : buyerDocs.gst && buyerDocs.businessLicense && buyerDocs.businessType;

  return (
    <div className="screen">
      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-steps">
          <div className="progress-step completed"></div>
          <div className="progress-step active"></div>
          <div className="progress-step"></div>
        </div>
        <span className="progress-label">
          {isHindi ? 'चरण 2 / 3 — दस्तावेज़' : 'Step 2 of 3 — Documents'}
        </span>
      </div>

      <h2 style={{ marginBottom: '4px' }}>
        {isHindi ? 'दस्तावेज़ अपलोड करें' : 'Upload your documents'}
      </h2>
      {!isHindi && (
        <p className="text-hindi" style={{ marginBottom: '24px' }}>दस्तावेज़ अपलोड करें</p>
      )}

      {role === 'farmer' ? (
        /* ── Farmer Documents ── */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <UploadSlot
            label={isHindi ? 'आधार कार्ड' : 'Aadhaar Card'}
            uploaded={farmerDocs.aadhaar}
            onUpload={() => handleFarmerUpload('aadhaar')}
          />
          <UploadSlot
            label={isHindi ? 'किसान क्रेडिट कार्ड (KCC)' : 'Kisan Credit Card (KCC)'}
            uploaded={farmerDocs.kcc}
            onUpload={() => handleFarmerUpload('kcc')}
          />
          <UploadSlot
            label={isHindi ? 'भूमि स्वामित्व प्रमाण' : 'Land Ownership Proof'}
            uploaded={farmerDocs.landProof}
            onUpload={() => handleFarmerUpload('landProof')}
          />
          <UploadSlot
            label={isHindi ? 'मंडी/APMC लाइसेंस' : 'Mandi/APMC License'}
            optional
            uploaded={farmerDocs.apmc}
            onUpload={() => handleFarmerUpload('apmc')}
          />
        </div>
      ) : (
        /* ── Buyer Documents ── */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <UploadSlot
            label={isHindi ? 'GST पंजीकरण प्रमाणपत्र' : 'GST Registration Certificate'}
            uploaded={buyerDocs.gst}
            onUpload={() => handleBuyerUpload('gst')}
          />
          <UploadSlot
            label={isHindi ? 'व्यापार लाइसेंस' : 'Business License'}
            uploaded={buyerDocs.businessLicense}
            onUpload={() => handleBuyerUpload('businessLicense')}
          />

          <div className="form-group">
            <label className="form-label">
              {isHindi ? 'व्यवसाय का प्रकार' : 'Business Type'}
            </label>
            <select
              value={buyerDocs.businessType}
              onChange={e => setBuyerDocs(prev => ({ ...prev, businessType: e.target.value }))}
              id="business-type-select"
            >
              <option value="">{isHindi ? 'चुनें...' : 'Select...'}</option>
              {businessTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Continue Button */}
      <button
        className="btn btn-primary btn-block btn-lg"
        onClick={onComplete}
        disabled={!canProceed}
        id="doc-continue-btn"
        style={{ marginTop: '32px' }}
      >
        {isHindi ? 'आगे बढ़ें →' : 'Continue →'}
        {!isHindi && <span className="text-hindi" style={{ color: 'rgba(255,255,255,0.7)', marginLeft: '8px' }}>आगे बढ़ें</span>}
      </button>

      {/* Government footer */}
      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <GovtStamp label={isHindi ? 'भारत सरकार द्वारा सत्यापित' : 'Verified by Govt. of India'} />
      </div>
    </div>
  );
}
