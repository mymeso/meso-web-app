import React, { useState, useEffect } from 'react';
import { ToggleSwitch } from '../ui/ToggleSwitch';
import { ExitButton } from '@/components/ui/ExitButton';
import { SaveButton } from '@/components/ui/SaveButton';
import { SaveContinueButton } from '@/components/ui/SaveContinueButton';
import { cancellationPoliciesApi } from '@/lib/api/cancellationPolicies';
import { useRouter } from 'next/navigation';

interface Rule {
  id: number;
  paymentType: 'full_payment' | 'deposit' | 'card_on_file';
  cancelTime: number;
  timeUnit: 'hours' | 'days' | 'day';
  refundType: 'percentage' | 'full_deposit' | 'half_deposit' | 'no_penalty' | 'with_penalty';
  refundValue: number;
}

export const CancellationPolicy: React.FC = () => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rules, setRules] = useState<Rule[]>([
  ]);

  const [allowFreeCancellation, setAllowFreeCancellation] = useState(true);

  // Fetch effective policy from database
  useEffect(() => {
    const fetchPolicy = async () => {
      setIsLoading(true);
      try {
        const res = await cancellationPoliciesApi.getEffective();
        if (res && res.policy) {
          setAllowFreeCancellation(!!res.policy.allow_free_cancellation);
          if (Array.isArray(res.rules) && res.rules.length > 0) {
            const mapped: Rule[] = res.rules.map((r, idx) => ({
              id: idx + 1,
              paymentType: r.payment_type,
              cancelTime: r.cancel_time,
              timeUnit: r.time_unit,
              refundType: r.refund_type,
              refundValue: (r.refund_type === 'percentage' || r.refund_type === 'with_penalty') && typeof r.refund_value === 'number' ? r.refund_value : 0,
            }));
            setRules(mapped);
          }
        }
      } catch (e) {
        console.error('Failed to load cancellation policy', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPolicy();
  }, []);

  const savePolicy = async () => {
    const payload = {
      allow_free_cancellation: allowFreeCancellation,
      rules: rules.map((r, i) => ({
        payment_type: r.paymentType,
        cancel_time: r.cancelTime,
        time_unit: r.timeUnit,
        refund_type: r.refundType,
        refund_value: (r.refundType === 'percentage' || r.refundType === 'with_penalty') ? r.refundValue : null,
        sort_order: i,
      })),
    };
    await cancellationPoliciesApi.upsertShopDefault(payload);
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

  const addRule = () => {
    const newId = rules.length > 0 ? Math.max(...rules.map(r => r.id)) + 1 : 1;
    setRules([...rules, {
      id: newId,
      paymentType: 'full_payment',
      cancelTime: 24,
      timeUnit: 'hours',
      refundType: 'percentage',
      refundValue: 50
    }]);
  };

  const removeRule = (id: number) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const updateRule = (id: number, field: keyof Rule, value: any) => {
    setRules(rules.map(rule => {
      if (rule.id === id) {
        const updatedRule = { ...rule, [field]: value };
        if (field === 'paymentType') {
          if (value === 'full_payment') {
            updatedRule.refundType = 'percentage';
            updatedRule.refundValue = 50;
          } else if (value === 'deposit') {
            updatedRule.refundType = 'full_deposit';
            updatedRule.refundValue = 0;
          } else if (value === 'card_on_file') {
            updatedRule.refundType = 'no_penalty';
            updatedRule.refundValue = 0;
          }
        }
        return updatedRule;
      }
      return rule;
    }));
  };

  const renderRuleRow = (rule: Rule) => (
    <div key={rule.id} className="flex items-center gap-3 mb-3">
      <div className="flex-1 flex">
        {/* Left section - Payment Type */}
        <div className="bg-[#F4F2F0] rounded-md h-17 w-48 mr-2 flex items-center justify-between p-4 relative">
           <select
             value={rule.paymentType}
             onChange={e => updateRule(rule.id, 'paymentType', e.target.value)}
             className="bg-transparent text-sm text-black font-medium cursor-pointer outline-none appearance-none flex-1 pr-6"
           >
             <option value="full_payment">For full payment</option>
             <option value="deposit">For deposit payment</option>
             <option value="card_on_file">For card on file</option>
           </select>
           {/* Custom dropdown arrow */}
           <div className="absolute right-2 pointer-events-none">
             <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
             </svg>
           </div>
         </div>

        {/* Right section - Cancellation Details */}
        <div className="flex-1 p-3 flex items-center gap-2 text-sm text-black font-medium flex-wrap bg-[#F4F2F0] rounded-md">
          <span className='p-2'>Cancel</span>
          
            <input
             type="number"
             value={rule.cancelTime}
             onChange={e => updateRule(rule.id, 'cancelTime', parseInt(e.target.value))}
             className="py-1 w-12 h-11 text-center rounded-lg !bg-white text-sm cursor-pointer [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
           />
           
           <select
             value={rule.timeUnit}
             onChange={e => updateRule(rule.id, 'timeUnit', e.target.value)}
             className="px-2 py-2 h-11 text-center rounded-lg !bg-white text-sm appearance-none cursor-pointer"
           >
            <option value="hours">hours</option>
            <option value="days">days</option>
            <option value="day">day</option>
          </select>
          
          <span>before the scheduled appointment</span>
          
          {rule.paymentType !== 'card_on_file' && <span>to receive</span>}
          
          {/* Refund section */}
          {rule.paymentType === 'full_payment' && (
            <>
              <input
                type="number"
                value={rule.refundValue}
                onChange={e => updateRule(rule.id, 'refundValue', parseInt(e.target.value))}
                className="w-14 px-2 py-1 h-11 text-center !border-none rounded-md !bg-white text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span>%</span>
              <span>refund</span>
            </>
          )}
          
          {rule.paymentType === 'deposit' && (
            <>
              <select
                value={rule.refundType}
                onChange={e => updateRule(rule.id, 'refundType', e.target.value)}
                className="px-2 py-1 h-11 rounded-md !bg-white text-sm appearance-none cursor-pointer"
              >
                <option value="full_deposit">full deposit</option>
                <option value="half_deposit">half deposit</option>
              </select>
              <span>refund</span>
            </>
          )}
          
          {rule.paymentType === 'card_on_file' && (
            <>
              <select
                value={rule.refundType}
                onChange={e => updateRule(rule.id, 'refundType', e.target.value)}
                className="px-2 py-1 h-11 rounded-md !bg-white text-sm appearance-none cursor-pointer"
              >
                <option value="no_penalty">with no penalty</option>
                <option value="with_penalty">with a penalty</option>
              </select>
              
              {rule.refundType === 'with_penalty' && (
                <>
                  <span>:</span>
                  <input
                    type="number"
                    value={rule.refundValue}
                    onChange={e => updateRule(rule.id, 'refundValue', parseInt(e.target.value))}
                    className="w-14 px-2 py-1 h-11 text-center !border-none rounded-md !bg-white text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span>%</span>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <button 
        onClick={() => removeRule(rule.id)} 
        className="w-8 h-8 flex items-center justify-center bg-[#F4F2F0] border-none rounded-md text-gray-600 hover:bg-gray-50"
      >
        -
      </button>
      <div className="w-8" />
    </div>
  );

  return (
    <div className="max-w-6xl font-sans text-gray-800">
      <h1 className="text-2xl font-bold mb-2">Cancellation Policy</h1>
      <p className="text-gray-600 mb-6">Set rules for cancellations. You make the final decision on whether to enforce the policy.</p>

      {/* Rules */}
      <div className="mb-6">
        {rules.map((rule, index) =>
          renderRuleRow(rule)
        )}
        {/* Add Rule button row */}
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center justify-center">
            <button
              onClick={addRule}
              className="px-4 py-2 bg-[#F4F2F0] rounded-md text-gray-700 hover:bg-gray-100"
            >
              + Add cancellation rule
            </button>
          </div>
          <div className="w-8" />
        </div>
      </div>

      {/* Free Cancellation Toggle */}
      <div className="flex justify-between items-center bg-[#F4F2F0] rounded-lg p-5 mb-8">
        <span className="text-sm font-medium">Allow free cancellation requests</span>
        <ToggleSwitch enabled={allowFreeCancellation} onChange={setAllowFreeCancellation} />
      </div>

      <div className="flex justify-end mt-10 gap-3 flex-wrap">
        <ExitButton />
        <SaveButton onClick={handleSave} loading={isSaving} disabled={isSaving} />
        <SaveContinueButton onClick={handleSaveAndExit} loading={isSaving} disabled={isSaving} />
      </div>
    </div>
  );
}; 