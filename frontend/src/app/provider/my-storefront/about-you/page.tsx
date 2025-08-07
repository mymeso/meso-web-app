"use client";
import React from 'react';
import Sidebar from '@/components/Sidebar';
import AboutYouForm from '@/components/shop-profile/AboutYouForm';

export default function MyStorefrontAboutYouPage() {
  

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '2rem' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <AboutYouForm />
        </div>
      </main>
    </div>
  );
} 