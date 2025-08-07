"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import BasicInfoForm from '@/components/shop-profile/BasicInfoForm';

export default function SetupBasicInfoPage() {
  const router = useRouter();

  const handleSave = (formData: Record<string, any>) => {
    // Navigate to the next step in the setup flow
    // You can customize this to go to the next setup step
    router.push('/provider/setup/next-step'); // Change this to your next setup step
  };

  return (
    <BasicInfoForm 
      onSave={handleSave}
      saveButtonText="Continue Setup"
    />
  );
} 