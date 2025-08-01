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
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 min-w-0 p-8 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto">
          <h2 className="text-left mb-10 text-3xl font-bold">
            Complete these steps to set up your storefront.
          </h2>
          <div className="mb-10">
            <div className="font-bold mb-4 text-lg">1. Create Your Shop Profile</div>
            <div className="flex gap-4 flex-wrap">
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
          <div className="mb-10">
            <div className="font-bold mb-4 text-lg">2. Set Your Business Preferences</div>
            <div className="flex gap-4 flex-wrap">
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
          <div className="mb-10">
            <div className="font-bold mb-4 text-lg">3. List Your Services</div>
            <div className="flex gap-4 flex-wrap">
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
          <div className="mb-10">
            <div className="font-bold mb-4 text-lg">4. Personalize Your Shop</div>
            <div className="flex gap-4 flex-wrap">
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
          <div className="text-center mt-15 text-base">
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