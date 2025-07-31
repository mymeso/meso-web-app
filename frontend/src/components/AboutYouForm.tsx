"use client";
import React, { useEffect, useState } from 'react';

interface AboutYouFormProps {
  onSave?: (formData: Record<string, any>) => void;
  showSaveButton?: boolean;
  saveButtonText?: string;
}

export default function AboutYouForm({ 
  onSave, 
  showSaveButton = true, 
  saveButtonText = "Save & Continue" 
}: AboutYouFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({
    profilePhoto: null,
    whatIDo: '',
    myExperience: '',
    certifications: '',
    yearsOfExperience: 1,
    myStyle: '',
    funFact: '',
    languages: [],
    gallery: []
  });

  const [languageSearch, setLanguageSearch] = useState('');
  const [availableLanguages] = useState([
    'English', 'Mandarin Chinese', 'Spanish', 'French', 'German', 'Japanese', 'Korean', 'Italian', 'Portuguese', 'Arabic'
  ]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('kottageAboutYou');
      if (stored) {
        const storedData = JSON.parse(stored);
        setFormData(prev => ({ ...prev, ...storedData }));
      }
    }
  }, []);

  const handleFieldChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleLanguageToggle = (language: string) => {
    const currentLanguages = formData.languages || [];
    const isSelected = currentLanguages.includes(language);
    
    if (isSelected) {
      handleFieldChange('languages', currentLanguages.filter((lang: string) => lang !== language));
    } else {
      handleFieldChange('languages', [...currentLanguages, language]);
    }
  };

  const handleSave = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kottageAboutYou', JSON.stringify(formData));
    }
    if (onSave) {
      onSave(formData);
    }
  };

  const filteredLanguages = availableLanguages.filter((lang: string) =>
    lang.toLowerCase().includes(languageSearch.toLowerCase())
  );

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '2rem' }}>My Profile</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '2rem' }}>
        
        {/* Profile Photo Section */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '12px',
              backgroundColor: '#e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative'
            }}>
              {formData.profilePhoto ? (
                <img src={formData.profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Photo</span>
              )}
            </div>
            <button style={{
              position: 'absolute',
              bottom: '-8px',
              right: '-8px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'white',
              border: '2px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
              ✏️
            </button>
          </div>
          
          <div style={{ flex: 1 }}>
            <div>
              <label className="form-label">What I Do</label>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '0.5rem' }}>
                A short, clear description of your service in your own words.
              </p>
              <textarea
                value={formData.whatIDo}
                onChange={(e) => handleFieldChange('whatIDo', e.target.value)}
                placeholder="Enter what you do"
                style={{
                  width: '100%',
                  minHeight: '80px',
                  resize: 'vertical'
                }}
              />
            </div>
          </div>
        </div>

        {/* My Experience */}
        <div>
          <label className="form-label">My Experience</label>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '0.5rem' }}>
            Relevant work, clients, or roles you've had—can be formal or informal.
          </p>
          <textarea
            value={formData.myExperience}
            onChange={(e) => handleFieldChange('myExperience', e.target.value)}
            placeholder="Enter your experience"
            style={{
              width: '100%',
              minHeight: '80px',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Certifications */}
        <div>
          <label className="form-label">Certifications or Training</label>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '0.5rem' }}>
            Any official qualifications, courses, or workshops completed.
          </p>
          <textarea
            value={formData.certifications}
            onChange={(e) => handleFieldChange('certifications', e.target.value)}
            placeholder="Enter your certifications"
            style={{
              width: '100%',
              minHeight: '80px',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Years of Experience */}
        <div>
          <label className="form-label">Years of Experience</label>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '0.5rem' }}>
            Total time doing this professionally or informally
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '0.5rem' }}>
            <button
              onClick={() => handleFieldChange('yearsOfExperience', Math.max(0, formData.yearsOfExperience - 1))}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '4px',
                border: '1px solid #e5e7eb',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              -
            </button>
            <span style={{ 
              padding: '8px 16px',
              border: '1px solid #e5e7eb',
              borderRadius: '4px',
              backgroundColor: '#F4F2F0',
              minWidth: '100px',
              textAlign: 'center'
            }}>
              {formData.yearsOfExperience} year{formData.yearsOfExperience !== 1 ? 's' : ''}
            </span>
            <button
              onClick={() => handleFieldChange('yearsOfExperience', formData.yearsOfExperience + 1)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '4px',
                border: '1px solid #e5e7eb',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              +
            </button>
          </div>
        </div>

        {/* My Style */}
        <div>
          <label className="form-label">My Style or Approach</label>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '0.5rem' }}>
            How you work with people—your energy, attitude, or philosophy.
          </p>
          <textarea
            value={formData.myStyle}
            onChange={(e) => handleFieldChange('myStyle', e.target.value)}
            placeholder="Enter your style"
            style={{
              width: '100%',
              minHeight: '80px',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Fun Fact */}
        <div>
          <label className="form-label">Fun Fact</label>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '0.5rem' }}>
            One line that shows personality—pets, side passions, quirks.
          </p>
          <textarea
            value={formData.funFact}
            onChange={(e) => handleFieldChange('funFact', e.target.value)}
            placeholder="Enter your fun fact"
            style={{
              width: '100%',
              minHeight: '80px',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Languages */}
        <div>
          <label className="form-label">Languages I Speak</label>
          <div style={{ position: 'relative', marginBottom: '1rem' }}>
            <input
              type="text"
              value={languageSearch}
              onChange={(e) => setLanguageSearch(e.target.value)}
              placeholder="Search for a language"
              style={{ width: '100%', paddingRight: '40px' }}
            />
            <span style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#6b7280'
            }}>
              🔍
            </span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredLanguages.map(language => (
              <label key={language} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                padding: '8px 0'
              }}>
                <input
                  type="checkbox"
                  checked={formData.languages?.includes(language) || false}
                  onChange={() => handleLanguageToggle(language)}
                  style={{ width: '16px', height: '16px' }}
                />
                <span style={{ color: '#374151' }}>{language}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div>
          <label className="form-label">Gallery</label>
          <div style={{
            border: '2px dashed #e5e7eb',
            borderRadius: '8px',
            padding: '4rem 2rem',
            textAlign: 'center',
            backgroundColor: '#f9fafb',
            cursor: 'pointer',
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              fontSize: '24px'
            }}>
              +
            </div>
            <p style={{ color: '#6b7280', fontSize: '16px' }}>Add video or image</p>
          </div>
        </div>
      </div>

      {showSaveButton && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
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