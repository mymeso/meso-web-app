"use client";
import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { ApprovalPolicy } from '@/components/policies/ApprovalPolicy';
import { PaymentPolicy } from '@/components/policies/PaymentPolicy';
import { CancellationPolicy } from '@/components/policies/CancellationPolicy';
import { LatePolicy } from '@/components/policies/LatePolicy';
import { PolicyButton } from '@/components/policies/PolicyButton';
import { ReschedulingPolicy } from '@/components/policies/ReschedulingPolicy';
import { WaitlistPolicy } from '@/components/policies/WaitlistPolicy';
import { paymentPoliciesApi, PaymentPolicyResponse } from '@/lib/api/paymentPolicies';
import { cancellationPoliciesApi, CancellationPolicyResponse } from '@/lib/api/cancellationPolicies';

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
  const [activePolicy, setActivePolicy] = useState<PolicyType>('cancellation-policy');
  const [allPolicyData, setAllPolicyData] = useState<Record<string, any>>({});

  // In-page cache so switching tabs doesn't re-fetch
  const [paymentCache, setPaymentCache] = useState<PaymentPolicyResponse | undefined>(undefined);
  const [cancellationCache, setCancellationCache] = useState<CancellationPolicyResponse | undefined>(undefined);

  const handleDataChange = useCallback((data: any) => {
    setAllPolicyData(prev => ({
      ...prev,
      [activePolicy]: data,
    }));
  }, [activePolicy]);

  // Lazy-load the active policy once
  useEffect(() => {
    const load = async () => {
      if (activePolicy === 'payment-policy' && !paymentCache) {
        try {
          const data = await paymentPoliciesApi.getEffective();
          setPaymentCache(data);
        } catch (e) { /* no-op */ }
      }
      if (activePolicy === 'cancellation-policy' && !cancellationCache) {
        try {
          const data = await cancellationPoliciesApi.getEffective();
          setCancellationCache(data);
        } catch (e) { /* no-op */ }
      }
    };
    load();
  }, [activePolicy, paymentCache, cancellationCache]);

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
            {ActivePolicyComponent && (
              <ActivePolicyComponent
                onDataChange={handleDataChange}
                initialData={
                  activePolicy === 'payment-policy'
                    ? paymentCache
                    : activePolicy === 'cancellation-policy'
                    ? cancellationCache
                    : undefined
                }
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}