"use client";
import React, { useEffect, useState } from 'react';
import { SaveContinueButton } from './ui/SaveContinueButton';

interface BasicInfoFormProps {
  onSave?: (formData: Record<string, any>) => void;
  showSaveButton?: boolean;
  saveButtonText?: string;
}

export default function BasicInfoForm({ 
  onSave, 
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
      <h1 className="text-3xl font-bold mt-4 mb-2">Basic Info</h1>
      <p className="mb-5 text-gray-500">You can change this anytime.</p>
      
      <div className="flex flex-col gap-5 mb-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            First name
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleFieldChange('firstName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your first name"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Business name
          </label>
          <input
            type="text"
            value={formData.businessName}
            onChange={(e) => handleFieldChange('businessName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your business name"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Subdomain
          </label>
          <input  
            type="text"
            value={formData.subdomain}
            onChange={(e) => handleFieldChange('subdomain', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your subdomain"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Email address
          </label>
          <input
            type="email"
            value={formData.emailAddress}
            onChange={(e) => handleFieldChange('emailAddress', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Phone number
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value="+65"
              readOnly
              className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-center text-gray-500 bg-gray-50"
            />
            <input
              type="tel"
              value={formData.phoneNumber.replace('+65 ', '')}
              onChange={(e) => handleFieldChange('phoneNumber', `+65 ${e.target.value}`)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your phone number"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <SaveContinueButton onClick={handleSave} />
      </div>
    </div>
  );
} 