"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import AboutYouForm from '@/components/AboutYouForm';

export default function MyStorefrontAboutYouPage() {
  const router = useRouter();

  const handleSave = (formData: Record<string, any>) => {
    router.push('/provider/my-storefront');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '2rem' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <AboutYouForm onSave={handleSave} />
        </div>
      </main>
    </div>
  );
} 