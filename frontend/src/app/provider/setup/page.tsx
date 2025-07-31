"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export default function SetupPage() {
  const router = useRouter();

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
        Welcome to Your Shop Setup
      </h1>
      <p style={{ marginBottom: '2rem', color: '#6b7280', fontSize: '1.1rem' }}>
        Let's get your shop ready for customers! Follow these steps to complete your setup.
      </p>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem' }}>
          Setup Steps:
        </h2>
        <ol style={{ paddingLeft: '1.5rem', color: '#374151' }}>
          <li style={{ marginBottom: '0.5rem' }}>Basic Information</li>
          <li style={{ marginBottom: '0.5rem' }}>Business Details</li>
          <li style={{ marginBottom: '0.5rem' }}>Services & Pricing</li>
          <li style={{ marginBottom: '0.5rem' }}>Availability Settings</li>
        </ol>
      </div>

      <button
        onClick={() => router.push('/provider/setup/basic-info')}
        style={{
          padding: '16px 32px',
          backgroundColor: '#2563eb',
          color: 'white',
          borderRadius: '8px',
          border: 'none',
          fontSize: '16px',
          fontWeight: 500,
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
      >
        Start Setup
      </button>
    </div>
  );
} 