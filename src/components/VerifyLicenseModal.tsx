import React, { useState, useEffect, useRef } from 'react';
import './VerifyLicenseModal.css';

interface VerifyLicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const VerifyLicenseModal: React.FC<VerifyLicenseModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [licenseKey, setLicenseKey] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setLicenseKey('');
      setError(null);
      setIsVerifying(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!licenseKey.trim()) return;

    setIsVerifying(true);
    setError(null);

    await new Promise(resolve => setTimeout(resolve, 650));

    if (licenseKey.trim() === '123') {
      console.log("Assentrim Asset Verification: License Activated");
      onSuccess();
      onClose();
    } else {
      setError("INVALID LICENSE KEY. ACCESS DENIED.");
      setIsVerifying(false);
    }
  };

  return (
    <div className="verify-modal-overlay">
      <div className="verify-modal-content" role="dialog" aria-modal="true">
        
        <div className="reticle-corner top-left"></div>
        <div className="reticle-corner top-right"></div>
        <div className="reticle-corner bottom-left"></div>
        <div className="reticle-corner bottom-right"></div>

        <div className="verify-modal-icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="verify-modal-warning-icon">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        <h2 className="verify-modal-title">ACTIVE LICENSE NOT FOUND</h2>
        
        <p className="verify-modal-desc">
          This asset verification node is not authorized under an active license. Please enter a valid activation key.
        </p>

        <form onSubmit={handleSubmit} className="verify-modal-form">
          <div className="form-group">
            <label className="form-label" htmlFor="licenseKey">LICENSE KEY</label>
            <div className="input-wrapper">
              <input
                ref={inputRef}
                id="licenseKey"
                type="text"
                className={`verify-input ${error ? 'verify-input-error' : ''}`}
                placeholder="VERIFY-XXXX-XXXX-XXXX"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                disabled={isVerifying}
              />
            </div>
            {error && <div className="verify-form-error">{error}</div>}
          </div>

          <div className="verify-modal-actions">
            <button 
              type="button" 
              className="verify-btn-cancel" 
              onClick={onClose}
              disabled={isVerifying}
            >
              CANCEL
            </button>
            <button 
              type="submit" 
              className="verify-btn-activate"
              disabled={isVerifying || !licenseKey.trim()}
            >
              {isVerifying ? 'VERIFYING...' : 'ACTIVATE NODE'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default VerifyLicenseModal;
