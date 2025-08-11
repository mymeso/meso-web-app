import React, { useState, useEffect, useCallback } from 'react';
import { ToggleSwitch } from '@/components/ui/ToggleSwitch';
import { RadioSelect } from './RadioSelect';
import { paymentPoliciesApi, PaymentPolicyResponse } from '@/lib/api/paymentPolicies';
import { useRouter } from 'next/navigation';
import { ExitButton } from '@/components/ui/ExitButton';
import { SaveButton } from '@/components/ui/SaveButton';
import { SaveContinueButton } from '@/components/ui/SaveContinueButton';

interface PaymentMethod {
  name: string;
  enabled: boolean;
}

interface PaymentPolicyProps {
  onDataChange: (data: any) => void;
  initialData?: PaymentPolicyResponse;
}

const DEFAULT_ONLINE: PaymentMethod[] = [
  { name: 'Debit or Credit Card', enabled: true },
  { name: 'PayPal', enabled: true },
  { name: 'Klarna', enabled: true },
];

const DEFAULT_ONSITE: PaymentMethod[] = [
  { name: 'Cash', enabled: true },
  { name: 'Debit or Credit Card', enabled: true },
  { name: 'Cash App', enabled: true },
];

export const PaymentPolicy: React.FC<PaymentPolicyProps> = ({ onDataChange, initialData }) => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [onlinePaymentMethods, setOnlinePaymentMethods] = useState<PaymentMethod[]>(DEFAULT_ONLINE);
  const [onsitePaymentMethods, setOnsitePaymentMethods] = useState<PaymentMethod[]>(DEFAULT_ONSITE);

  const [selectedPaymentRequirement, setSelectedPaymentRequirement] = useState('full-payment');

  // Load effective policy on mount (or use initialData if provided)
  useEffect(() => {
    const hydrate = (effective: PaymentPolicyResponse | null | undefined) => {
      if (!effective) return;
      const req = effective.requirement;
      if (req === 'full_payment') setSelectedPaymentRequirement('full-payment');
      if (req === 'deposit') setSelectedPaymentRequirement('deposit');
      if (req === 'card_on_file') setSelectedPaymentRequirement('card-on-file');
      if (req === 'no_upfront') setSelectedPaymentRequirement('no-upfront');
      if (Array.isArray(effective.online_methods)) {
        setOnlinePaymentMethods(prev => prev.map(m => ({ ...m, enabled: effective.online_methods!.includes(m.name) })));
      }
      if (Array.isArray(effective.onsite_methods)) {
        setOnsitePaymentMethods(prev => prev.map(m => ({ ...m, enabled: effective.onsite_methods!.includes(m.name) })));
      }
    };

    if (initialData) {
      hydrate(initialData);
      return;
    }

    const load = async () => {
      setIsLoading(true);
      try {
        const effective = await paymentPoliciesApi.getEffective();
        hydrate(effective);
      } catch (e) {
        console.error('Failed to load payment policy', e);
      } finally {
        setIsLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  const memoizedOnDataChange = useCallback(() => {
    onDataChange({ onlinePaymentMethods, onsitePaymentMethods, selectedPaymentRequirement });
  }, [onlinePaymentMethods, onsitePaymentMethods, selectedPaymentRequirement, onDataChange]);

  useEffect(() => {
    memoizedOnDataChange();
  }, [memoizedOnDataChange]);

  const handleOnlinePaymentMethodToggle = (methodName: string) => {
    setOnlinePaymentMethods(prev =>
      prev.map(method =>
        method.name === methodName ? { ...method, enabled: !method.enabled } : method
      )
    );
  };

  const handleOnsitePaymentMethodToggle = (methodName: string) => {
    setOnsitePaymentMethods(prev =>
      prev.map(method =>
        method.name === methodName ? { ...method, enabled: !method.enabled } : method
      )
    );
  };

  const handlePaymentRequirementChange = (value: string) => {
    setSelectedPaymentRequirement(value);
  };

  const savePolicy = async () => {
    const requirementMap: Record<string, any> = {
      'full-payment': 'full_payment',
      'deposit': 'deposit',
      'card-on-file': 'card_on_file',
      'no-upfront': 'no_upfront',
    };

    const payload = {
      requirement: requirementMap[selectedPaymentRequirement],
      online_methods: onlinePaymentMethods.filter(m => m.enabled).map(m => m.name),
      onsite_methods: onsitePaymentMethods.filter(m => m.enabled).map(m => m.name),
    } as any;

    await paymentPoliciesApi.upsertShopDefault(payload);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await savePolicy();
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAndExit = async () => {
    setIsSaving(true);
    try {
      await savePolicy();
      router.push('/provider/my-storefront');
    } finally {
      setIsSaving(false);
    }
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="bg-[#F4F2F0] p-6 rounded-xl border border-[#EAE8E6]">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-40 bg-gray-200 rounded" />
            <div className="h-12 bg-white rounded-lg" />
            <div className="h-12 bg-white rounded-lg" />
            <div className="h-12 bg-white rounded-lg" />
            <div className="h-12 bg-white rounded-lg" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[0,1].map(i => (
            <div key={i} className="bg-[#F4F2F0] p-6 rounded-xl border border-[#EAE8E6] animate-pulse space-y-3">
              <div className="h-6 w-64 bg-gray-200 rounded" />
              <div className="h-12 bg-white rounded-lg" />
              <div className="h-12 bg-white rounded-lg" />
              <div className="h-12 bg-white rounded-lg" />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <div className="h-11 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-11 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-11 w-36 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ background: '#F4F2F0', padding: '24px', borderRadius: 12, border: '1px solid #EAE8E6' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 16 }}>Payment policy</h3>
        <RadioSelect
          options={[
            { value: 'full-payment', label: 'Full payment required to book' },
            {
              value: 'deposit',
              label: 'Deposit payment required to book',
              expandedContent: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: 8, fontSize: '0.875rem', fontWeight: 500, color: '#374151' }}>
                      Deposit amount
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <input type="radio" id="percentage" name="depositType" defaultChecked style={{ width: 16, height: 16 }} />
                        <label htmlFor="percentage" style={{ fontSize: '0.875rem', color: '#374151', marginRight: 8 }}>Percentage:</label>
                        <input
                          type="number"
                          placeholder="50"
                          style={{
                            width: '60px',
                            padding: '6px 8px',
                            borderRadius: 4,
                            border: '1px solid #EAE8E6',
                            fontSize: '0.875rem',
                            backgroundColor: 'white'
                          }}
                        />
                        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>% of total service cost</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <input type="radio" id="flatAmount" name="depositType" style={{ width: 16, height: 16 }} />
                        <label htmlFor="flatAmount" style={{ fontSize: '0.875rem', color: '#374151', marginRight: 8 }}>Flat amount:</label>
                        <span style={{ fontSize: '0.875rem', color: '#6b7280', marginRight: 4 }}>$</span>
                        <input
                          type="number"
                          placeholder="100"
                          style={{
                            width: '80px',
                            padding: '6px 8px',
                            borderRadius: 4,
                            border: '1px solid #EAE8E6',
                            fontSize: '0.875rem',
                            backgroundColor: 'white'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: 8, fontSize: '0.875rem', fontWeight: 500, color: '#374151' }}>
                      When is remaining payment due?
                    </label>
                    <select style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 6,
                      border: '1px solid #EAE8E6',
                      fontSize: '0.875rem',
                      backgroundColor: 'white'
                    }}>
                      <option value="before-service">Before service begins</option>
                      <option value="after-service">After service completion</option>
                      <option value="on-arrival">Upon arrival</option>
                    </select>
                  </div>
                </div>
              )
            },
            { value: 'card-on-file', label: 'Card on file required to book' },
            { value: 'no-upfront', label: 'No upfront payment required to book' },
          ]}
          selected={selectedPaymentRequirement}
          onChange={handlePaymentRequirementChange}
          allowExpansion={true}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', gap: 24 }}>
        <div style={{ flex: '1 1 0', minWidth: 0, background: '#F4F2F0', padding: '24px', borderRadius: 12, border: '1px solid #EAE8E6' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 16 }}>Online booking payment methods</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {onlinePaymentMethods.map((method) => (
              <div 
                key={method.name} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'white',
                  padding: '16px',
                  borderRadius: 8,
                  border: `1px solid ${method.enabled ? '#EAE8E6' : '#DCDAD7'}`,
                  opacity: method.enabled ? 1 : 0.6,
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <span style={{ 
                  fontWeight: 500, 
                  color: method.enabled ? '#1f2937' : '#6c757d' 
                }}>
                  {method.name}
                </span>
                <ToggleSwitch
                  size="small"
                  enabled={method.enabled}
                  onChange={() => handleOnlinePaymentMethodToggle(method.name)}
                />
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: '1 1 0', minWidth: 0, background: '#F4F2F0', padding: '24px', borderRadius: 12, border: '1px solid #EAE8E6' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 16 }}>On-site payment methods</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {onsitePaymentMethods.map((method) => (
              <div 
                key={method.name} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'white',
                  padding: '16px',
                  borderRadius: 8,
                  border: `1px solid ${method.enabled ? '#EAE8E6' : '#DCDAD7'}`,
                  opacity: method.enabled ? 1 : 0.6,
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <span style={{ 
                  fontWeight: 500, 
                  color: method.enabled ? '#1f2937' : '#6c757d' 
                }}>
                  {method.name}
                </span>
                <ToggleSwitch
                  size="small"
                  enabled={method.enabled}
                  onChange={() => handleOnsitePaymentMethodToggle(method.name)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-10 gap-3 flex-wrap">
        <ExitButton />
        <SaveButton onClick={handleSave} loading={isSaving} disabled={isSaving} />
        <SaveContinueButton onClick={handleSaveAndExit} loading={isSaving} disabled={isSaving} />
      </div>
    </div>
  );
}; 