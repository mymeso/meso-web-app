"use client";
import React, { useEffect, useState } from 'react';

interface BasicInfoFormProps {
  onSave?: (formData: Record<string, any>) => void;
  showSaveButton?: boolean;
  saveButtonText?: string;
}

export default function BasicInfoForm({ 
  onSave, 
  showSaveButton = true, 
  saveButtonText = "Save & Continue" 
}: BasicInfoFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({
    firstName: '',
    businessName: '',
    subdomain: '',
    emailAddress: '',
    phoneNumber: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('kottageSetupForm');
      if (stored) {
        const storedData = JSON.parse(stored);
        setFormData(prev => ({ ...prev, ...storedData }));
      }
    }
  }, []);

  const handleFieldChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('kottageSetupForm');
      const existingData = stored ? JSON.parse(stored) : {};
      localStorage.setItem('kottageSetupForm', JSON.stringify({ ...existingData, ...formData }));
    }
    if (onSave) {
      onSave(formData);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Basic Info</h1>
      <p style={{ marginBottom: '2rem', color: '#6b7280' }}>You can change this anytime.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
        <div>
          <label className="form-label">
            First name
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleFieldChange('firstName', e.target.value)}
            style={{ width: '100%' }}
            placeholder="Enter your first name"
          />
        </div>

        <div>
          <label className="form-label">
            Business name
          </label>
          <input
            type="text"
            value={formData.businessName}
            onChange={(e) => handleFieldChange('businessName', e.target.value)}
            style={{ width: '100%' }}
            placeholder="Enter your business name"
          />
        </div>

        <div>
          <label className="form-label">
            Subdomain
          </label>
          <input  
            type="text"
            value={formData.subdomain}
            onChange={(e) => handleFieldChange('subdomain', e.target.value)}
            style={{ width: '100%' }}
            placeholder="Enter your subdomain"
          />
        </div>

        <div>
          <label className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={formData.emailAddress}
            onChange={(e) => handleFieldChange('emailAddress', e.target.value)}
            style={{ width: '100%' }}
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label className="form-label">
            Phone number
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value="+65"
              readOnly
              style={{
                width: '80px',
                textAlign: 'center',
                color: '#6b7280'
              }}
            />
            <input
              type="tel"
              value={formData.phoneNumber.replace('+65 ', '')}
              onChange={(e) => handleFieldChange('phoneNumber', `+65 ${e.target.value}`)}
              style={{ flex: 1 }}
              placeholder="Enter your phone number"
            />
          </div>
        </div>
      </div>

      {showSaveButton && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 40 }}>
          <button 
            onClick={handleSave} 
            style={{ 
              padding: '12px 24px', 
              backgroundColor: '#2563eb', 
              color: 'white', 
              borderRadius: 8, 
              border: 'none', 
              fontSize: 16 
            }}
          >
            {saveButtonText}
          </button>
        </div>
      )}
    </div>
  );
} 