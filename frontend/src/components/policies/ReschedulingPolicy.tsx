import React, { useState, useEffect, useCallback } from 'react';
import { RadioSelect } from './RadioSelect';

interface ReschedulingPolicyProps {
  onDataChange: (data: any) => void;
}

export const ReschedulingPolicy: React.FC<ReschedulingPolicyProps> = ({ onDataChange }) => {
  const [mode, setMode] = useState<'none' | 'free' | 'penalty'>('penalty');
  const [windowAmount, setWindowAmount] = useState<number>(2);
  const [windowUnit, setWindowUnit] = useState<'hours' | 'days'>('hours');
  const [penaltyAmount, setPenaltyAmount] = useState<number>(5);

  const memoizedOnDataChange = useCallback(() => {
    onDataChange({ mode, windowAmount, windowUnit, penaltyAmount });
  }, [mode, windowAmount, windowUnit, penaltyAmount, onDataChange]);

  useEffect(() => {
    memoizedOnDataChange();
  }, [memoizedOnDataChange]);

  const options = [
    { value: 'none', label: 'No rescheduling allowed' },
    { value: 'free', label: 'Free rescheduling' },
    { value: 'penalty', label: 'Rescheduling with a penalty fee' },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Card container that matches other policies */}
      <div className="bg-[#F4F2F0] p-6 rounded-xl border border-[#EAE8E6]">
        <h3 className="text-xl font-semibold mb-4">Rescheduling policy</h3>
        <RadioSelect
          options={options as any}
          selected={mode}
          onChange={(val) => setMode(val as typeof mode)}
          allowExpansion={false}
        />
      </div>

      {/* Configuration sentence area below, per design */}
      {(mode === 'free' || mode === 'penalty') && (
        <div className="text-lg text-gray-700">
          <span>Reschedule up to</span>

          {/* Amount */}
          <input
            type="number"
            value={windowAmount}
            onChange={(e) => setWindowAmount(parseInt(e.target.value || '0', 10))}
            className="mx-2 w-14 h-11 text-center rounded-lg bg-blue-100 text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />

          {/* Unit */}
          <select
            value={windowUnit}
            onChange={(e) => setWindowUnit(e.target.value as 'hours' | 'days')}
            className="mr-2 h-11 px-3 rounded-lg bg-blue-100 text-gray-900 appearance-none cursor-pointer"
          >
            <option value="hours">hours</option>
            <option value="days">days</option>
          </select>

          <span>before the scheduled appointment for free.</span>

          {mode === 'penalty' && (
            <>
              <span>{' '}Otherwise, pay a</span>

              {/* Penalty amount */}
              <span className="inline-flex items-center mx-2 h-11 rounded-lg bg-blue-100 px-3">
                <span className="mr-2">$</span>
                <input
                  type="number"
                  value={penaltyAmount}
                  onChange={(e) => setPenaltyAmount(parseInt(e.target.value || '0', 10))}
                  className="w-12 bg-transparent text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </span>

              <span>penalty fee to reschedule.</span>
            </>
          )}
        </div>
      )}

      {mode === 'none' && (
        <div className="text-lg text-gray-700">Rescheduling is not allowed.</div>
      )}
    </div>
  );
}; 