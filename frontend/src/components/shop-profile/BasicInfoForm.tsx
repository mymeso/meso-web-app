"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SaveContinueButton } from '@/components/ui/SaveContinueButton';
import { shopsApi } from '@/lib/api/shops';
import { supabase } from '@/lib/supabase/client';

interface BasicInfoFormProps {
  onSave?: (formData: Record<string, any>) => void;
  showSaveButton?: boolean;
  saveButtonText?: string;
}

export default function BasicInfoForm({ 
  onSave, 
}: BasicInfoFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Record<string, any>>({
    firstName: '',
    businessName: '',
    subdomain: '',
    phoneNumber: '',
    email: '', // Read-only field
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load user email and existing shop data on component mount
  useEffect(() => {
    const loadUserDataAndShop = async () => {
      setIsLoading(true);
      try {
        // First, get the user's email from Supabase auth
        const { data: { user } } = await supabase.auth.getUser();
        const userEmail = user?.email || '';

        // Then try to load existing shop data
        try {
          const response = await shopsApi.getCurrentUserShop();
          const formDataFromApi = shopsApi.convertApiToForm(response);
          // Ensure we always use the current auth email (in case it was updated)
          setFormData({ ...formDataFromApi, email: userEmail });
        } catch (error) {
          // If no shop exists (404), that's fine - just set the email
          if (error instanceof Error && error.message.includes('404')) {
            setFormData(prev => ({ ...prev, email: userEmail }));
          } else {
            console.error('Error loading shop data:', error);
            // Still set the email even if there's an error
            setFormData(prev => ({ ...prev, email: userEmail }));
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserDataAndShop();
  }, []);

  const handleFieldChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const apiData = shopsApi.convertFormToApi(formData);
      const response = await shopsApi.createOrUpdateShop(apiData);
      
      // Update form data with the response (including email from auth)
      const updatedFormData = shopsApi.convertApiToForm(response);
      // Get the current auth email to ensure it's up to date
      const { data: { user } } = await supabase.auth.getUser();
      setFormData({ ...updatedFormData, email: user?.email || formData.email });
      
      // Call the onSave callback if provided
      if (onSave) {
        onSave(formData);
      }
      
      console.log('Shop data saved successfully:', response);
      
      // Redirect to my-storefront page
      router.push('/provider/my-storefront');
    } catch (error) {
      console.error('Error saving shop data:', error);
      // You might want to show a toast notification here
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mt-4 mb-2">Basic Info</h1>
        <p className="mb-5 text-gray-500">You can change this anytime.</p>
        
        <div className="flex flex-col gap-5 mb-6">
          {/* Loading skeleton for form fields */}
          {[...Array(5)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

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
            value={formData.email}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500"
            placeholder="Email will be populated from your account"
          />
          <p className="text-xs text-gray-500 mt-1">This is populated from your account profile</p>
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
        <SaveContinueButton onClick={handleSave} loading={isSaving} disabled={isLoading} />
      </div>
    </div>
  );
} 