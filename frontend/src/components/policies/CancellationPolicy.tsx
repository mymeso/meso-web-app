import React, { useState } from 'react';
import { ToggleSwitch } from '../ui/ToggleSwitch';

interface Rule {
  id: number;
  paymentType: 'full' | 'deposit' | 'card_on_file';
  cancelTime: number;
  timeUnit: 'hours' | 'days' | 'day';
  refundType: 'percentage' | 'full_deposit' | 'half_deposit' | 'no_penalty' | 'with_penalty';
  refundValue: number;
}

export const CancellationPolicy: React.FC = () => {
  const [rules, setRules] = useState<Rule[]>([
    { id: 1, paymentType: 'full', cancelTime: 12, timeUnit: 'hours', refundType: 'percentage', refundValue: 50 },
    { id: 2, paymentType: 'full', cancelTime: 3, timeUnit: 'days', refundType: 'percentage', refundValue: 100 },
    { id: 3, paymentType: 'deposit', cancelTime: 1, timeUnit: 'day', refundType: 'full_deposit', refundValue: 0 },
    { id: 4, paymentType: 'deposit', cancelTime: 1, timeUnit: 'day', refundType: 'half_deposit', refundValue: 0 },
    { id: 5, paymentType: 'card_on_file', cancelTime: 1, timeUnit: 'day', refundType: 'no_penalty', refundValue: 0 },
    { id: 6, paymentType: 'card_on_file', cancelTime: 4, timeUnit: 'hours', refundType: 'with_penalty', refundValue: 50 },
  ]);

  const [allowFreeCancellation, setAllowFreeCancellation] = useState(true);

  const addRule = () => {
    const newId = rules.length > 0 ? Math.max(...rules.map(r => r.id)) + 1 : 1;
    setRules([...rules, {
      id: newId,
      paymentType: 'full',
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
          if (value === 'full') {
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

  const renderRuleRow = (rule: Rule, index: number, isLast: boolean) => (
    <div key={rule.id} className="flex items-center gap-3 mb-3">
      <div className="flex-1 flex">
        {/* Left section - Payment Type */}
        <div className="bg-[#F4F2F0] rounded-md h-17 w-48 mr-2 flex items-center justify-between p-4 relative">
           <select
             value={rule.paymentType}
             onChange={e => updateRule(rule.id, 'paymentType', e.target.value)}
             className="bg-transparent text-sm text-black font-medium cursor-pointer outline-none appearance-none flex-1 pr-6"
           >
             <option value="full">For full payment</option>
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
            className="w-15 text-center !border-none rounded-md !bg-white text-sm"
          />
          
          <select
            value={rule.timeUnit}
            onChange={e => updateRule(rule.id, 'timeUnit', e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded bg-white text-sm appearance-none cursor-pointer"
          >
            <option value="hours">hours</option>
            <option value="days">days</option>
            <option value="day">day</option>
          </select>
          
          <span>before the scheduled appointment</span>
          
          {rule.paymentType !== 'card_on_file' && <span>to receive</span>}
          
          {/* Refund section */}
          {rule.paymentType === 'full' && (
            <>
              <input
                type="number"
                value={rule.refundValue}
                onChange={e => updateRule(rule.id, 'refundValue', parseInt(e.target.value))}
                className="w-12 px-2 py-1 text-center border border-gray-300 rounded bg-white text-sm"
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
                className="px-2 py-1 border border-gray-300 rounded bg-white text-sm appearance-none cursor-pointer"
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
                className="px-2 py-1 border border-gray-300 rounded bg-white text-sm appearance-none cursor-pointer"
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
                    className="w-12 px-2 py-1 text-center border border-gray-300 rounded bg-white text-sm"
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
        className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
      >
        -
      </button>
      {isLast ? (
        <button 
          onClick={addRule} 
          className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
        >
          +
        </button>
      ) : (
        <div className="w-8" />
      )}
    </div>
  );

  return (
    <div className="max-w-6xl font-sans text-gray-800">
      <h1 className="text-2xl font-bold mb-2">Cancellation Policy</h1>
      <p className="text-gray-600 mb-6">Set rules for cancellations. You make the final decision on whether to enforce the policy.</p>

      {/* Rules */}
      <div className="mb-6">
        {rules.map((rule, index) =>
          renderRuleRow(rule, index, index === rules.length - 1)
        )}
      </div>

      {/* Free Cancellation Toggle */}
      <div className="flex justify-between items-center bg-[#F4F2F0] rounded-lg p-5 mb-8">
        <span className="text-sm font-medium">Allow free cancellation requests</span>
        <ToggleSwitch enabled={allowFreeCancellation} onChange={setAllowFreeCancellation} />
      </div>
    </div>
  );
}; 