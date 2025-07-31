"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProgressButton from "@/components/ui/ProgressButton";
import Sidebar from '@/components/Sidebar';
import {
  SHOP_PROFILE,
  BUSINESS_LOGISTICS,
  PERSONALIZATION,
  LIST_SERVICES,
} from '@/lib/section-defs';

function MyStorefrontPageContent() {
  const router = useRouter();
  const [completedSections, setCompletedSections] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState<Record<string, any>>({
  });

  const handleSectionClick = (section: string) => {
    router.push(`/provider/my-storefront/${section}`);
  };

  const isSectionComplete = (sectionKey: string): boolean => {
    // to be handled later
    return false
  };

  // TODO:Load stored data on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('kottageSetupForm');
      if (stored) setFormData(JSON.parse(stored));
    }
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', transform: 'translateX(-100px)' }}>
          <h2 style={{ textAlign: 'left', marginBottom: 40, fontSize: '1.75rem', fontWeight: 700 }}>
            Complete these steps to set up your storefront.
          </h2>
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontWeight: 700, marginBottom: 16, fontSize: '1.125rem' }}>1. Create Your Shop Profile</div>
            <div style={{ display: 'flex', gap: 16 }}>
              {SHOP_PROFILE.map(section => (
                <ProgressButton
                  key={section.key}
                  onClick={() => handleSectionClick(section.key)}
                  label={section.label}
                  isCompleted={completedSections[section.key] === true}
                  icon={section.icon}
                />
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontWeight: 700, marginBottom: 16, fontSize: '1.125rem' }}>2. Set Your Business Preferences</div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {BUSINESS_LOGISTICS.map(section => {
                const isCompleted = completedSections[section.key] === true;
                return (
                  <ProgressButton
                    key={section.key}
                    onClick={() => handleSectionClick(section.key)}
                    label={section.label}
                    isCompleted={isCompleted}
                    icon={section.icon}
                  />
                );
              })}
            </div>
          </div>
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontWeight: 700, marginBottom: 16, fontSize: '1.125rem' }}>3. List Your Services</div>
            <div style={{ display: 'flex', gap: 16 }}>
              {LIST_SERVICES.map(section => {
                const isCompleted = completedSections[section.key] === true;
                return (
                  <ProgressButton
                    key={section.key}
                    onClick={() => handleSectionClick(section.key)}
                    label={section.label}
                    isCompleted={isCompleted}
                    icon={section.icon}
                  />
                );
              })}
            </div>
          </div>
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontWeight: 700, marginBottom: 16, fontSize: '1.125rem' }}>4. Personalize Your Shop</div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {PERSONALIZATION.map(section => {
                const isCompleted = completedSections[section.key] === true;
                return (
                  <ProgressButton
                    key={section.key}
                    onClick={() => handleSectionClick(section.key)}
                    label={section.label}
                    isCompleted={isCompleted}
                    icon={section.icon}
                  />
                );
              })}
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 60, fontSize: '1rem' }}>
            <span role="img" aria-label="mobile">📱</span> Preview meso.ai/yourshop
          </div>
        </div>
      </main>
    </div>
  );
}

// Wrap with a Suspense boundary for useSearchParams
export default function MyStorefrontPage() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <MyStorefrontPageContent />
    </React.Suspense>
  );
} 