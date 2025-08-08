"use client";
import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { ApprovalPolicy } from '@/components/policies/ApprovalPolicy';
import { PaymentPolicy } from '@/components/policies/PaymentPolicy';
import { CancellationPolicy } from '@/components/policies/CancellationPolicy';
import { LatePolicy } from '@/components/policies/LatePolicy';
import { PolicyButton } from '@/components/policies/PolicyButton';
import { ReschedulingPolicy } from '@/components/policies/ReschedulingPolicy';
import { WaitlistPolicy } from '@/components/policies/WaitlistPolicy';

export type PolicyType =
  | 'payment-policy'
  | 'cancellation-policy'
  | 'rescheduling-policy'
  | 'lateness-policy'
  | 'approval-policy'
  | 'waitlist-policy';

const POLICIES: { key: PolicyType; label: string; Component: React.FC<any> }[] = [
  { key: 'payment-policy', label: 'Payment', Component: PaymentPolicy },
  { key: 'cancellation-policy', label: 'Cancellation', Component: CancellationPolicy },
  { key: 'rescheduling-policy', label: 'Rescheduling', Component: ReschedulingPolicy },
  { key: 'lateness-policy', label: 'Lateness', Component: LatePolicy },
  { key: 'approval-policy', label: 'Approval', Component: ApprovalPolicy },
  { key: 'waitlist-policy', label: 'Waitlist', Component: WaitlistPolicy },
];

export default function CustomerBookingPoliciesPage() {
  const router = useRouter();
  const [activePolicy, setActivePolicy] = useState<PolicyType>('cancellation-policy');
  const [allPolicyData, setAllPolicyData] = useState<Record<string, any>>({});

  const handleDataChange = useCallback((data: any) => {
    setAllPolicyData(prev => ({
      ...prev,
      [activePolicy]: data,
    }));
  }, [activePolicy]);

  const handleSave = () => {
    alert('Policies saved!');
  };

  const ActivePolicyComponent = POLICIES.find(p => p.key === activePolicy)?.Component;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '2rem' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Booking Policies</h1>
          <p style={{ marginTop: 8, marginBottom: '1.5rem', color: '#64748b', fontSize: '0.9rem' }}>
            Set your default policies. Policies for individual service listings can be adjusted in the listing editor.
          </p>

          <div className="flex gap-8 mb-6">
            {POLICIES.map(policy => (
              <PolicyButton
                key={policy.key}
                label={policy.label}
                isActive={activePolicy === policy.key}
                onClick={() => setActivePolicy(policy.key)}
              />
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {ActivePolicyComponent && <ActivePolicyComponent onDataChange={handleDataChange} />}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 40, gap: '1rem' }}>
            <button onClick={() => router.push('/provider/my-kottage')} style={{ padding: '10px 20px', border: '1px solid #ccc', borderRadius: 8 }}>Back</button>
            <button onClick={handleSave} style={{ padding: '10px 20px', backgroundColor: '#2563eb', color: 'white', borderRadius: 8, border: 'none' }}>Save</button>
          </div>
        </div>
      </main>
    </div>
  );
}