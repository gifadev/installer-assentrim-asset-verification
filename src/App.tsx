import { useState } from 'react';
import VerifyLicenseModal from './components/VerifyLicenseModal';
import './App.css';
import asentrimLogo from './assets/asentrim-logo.svg';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(true);
    }, 1000);
  };

  const handleLicenseSuccess = () => {
    setNotification("NODE AUTHORIZED. Access Granted to Asset Verification System.");
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="verify-app-container">
      {/* Toast Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#00a4db',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: '4px',
          fontFamily: 'var(--font-cyber)',
          fontSize: '0.8rem',
          letterSpacing: '0.08em',
          boxShadow: '0 0 20px rgba(0, 164, 219, 0.5)',
          zIndex: 2000,
          whiteSpace: 'nowrap'
        }}>
          {notification}
        </div>
      )}

      {/* Header Section */}
      <div className="top-header-section">
        <div className="logo-reticle-box">
          <div className="reticle-corner top-left"></div>
          <div className="reticle-corner top-right"></div>
          <div className="reticle-corner bottom-left"></div>
          <div className="reticle-corner bottom-right"></div>
          <img src={asentrimLogo} alt="Asentrim Logo" className="brand-svg-logo" />
        </div>

        <h1 className="brand-asentrim-title">ASENTRIM</h1>

        <div className="subtitle-wrapper">
          <div className="sub-line"></div>
          <span className="sub-text">ASSET VERIFICATION & MONITORING</span>
          <div className="sub-line"></div>
        </div>
      </div>

      {/* Form Section */}
      <div className="verify-form-container">
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="form-group">
            <label className="form-label">USERNAME</label>
            <div className="input-wrapper">
              <span className="input-icon-left">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <circle cx="9" cy="10" r="2" />
                  <path d="M15 8h2" />
                  <path d="M15 12h2" />
                  <path d="M7 16c0-1.5 1.5-2.5 3-2.5s3 1 3 2.5" />
                </svg>
              </span>
              <input
                type="text"
                className="verify-input"
                placeholder="OPR-0800-NULL"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label className="form-label">ENCRYPTION ACCESS KEY</label>
            <div className="input-wrapper">
              <span className="input-icon-left">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="7.5" cy="15.5" r="4.5" />
                  <path d="M21 2l-9.6 9.6" />
                  <path d="M15.5 7.5l3 3" />
                </svg>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                className="verify-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
              />
              <button
                type="button"
                className="input-icon-right"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Initialize Login Button */}
          <button type="submit" className="btn-initialize" disabled={isSubmitting}>
            {isSubmitting ? (
              'INITIALIZING...'
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                INITIALIZE LOGIN
              </>
            )}
          </button>
        </form>

        {/* Restricted Access Alert */}
        <div className="restricted-card">
          <div className="restricted-header">
            <svg className="warning-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span className="restricted-title">RESTRICTED ACCESS PROTOCOL</span>
          </div>
          <p className="restricted-desc">
            Authorized Gakkum operational personnel only. All access attempts are logged with geospatial coordinates. Unauthorized entry triggers immediate security escalation to Central Command.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="verify-footer">
        © 2026 COMMAND-SYSTEMS-V1 // SEC OPS PLATFORM
      </div>

      {/* License Modal */}
      <VerifyLicenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleLicenseSuccess}
      />
    </div>
  );
}

export default App;
