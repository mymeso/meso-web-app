"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import AboutYouForm from '@/components/shop-profile/AboutYouForm';

export default function SetupAboutYouPage() {
  const router = useRouter();

  const handleSave = (formData: Record<string, any>) => {
    // Navigate to the next step in the setup flow
    router.push('/provider/setup/next-step'); // Change this to your next setup step
  };

  return (
    <AboutYouForm 
      onSave={handleSave}
      saveButtonText="Continue Setup"
    />
  );
} 