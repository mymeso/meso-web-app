import React, { useState, useEffect, useCallback } from 'react';
import { FieldDef } from '@/lib/section-defs';

interface LatePolicyProps {
  onDataChange: (data: any) => void;
}

function renderField(field: FieldDef, value: any, onChange: (v: any) => void) {
  return (
    <textarea
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%',
        minHeight: 120,
        padding: '10px 12px',
        borderRadius: 8,
        border: '1px solid #EAE8E6',
        fontSize: 14,
        backgroundColor: 'white',
      }}
      placeholder={`Enter ${field.label}...`}
    />
  );
}

export const LatePolicy: React.FC<LatePolicyProps> = ({ onDataChange }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    // Load data from localStorage on component mount
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('kottageSetupForm');
      if (stored) {
        const parsed = JSON.parse(stored);
        setFormData(parsed);
      }
    }
  }, []);

  const memoizedOnDataChange = useCallback(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  useEffect(() => {
    // Notify parent component of data changes
    memoizedOnDataChange();
  }, [memoizedOnDataChange]);

  const handleFieldChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };


  return (
    <div>TBI</div>
  );
}; 