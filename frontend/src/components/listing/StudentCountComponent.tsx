import React from 'react';
import { ComponentData } from '@/app/provider/my-storefront/create-listing/page';

interface StudentCountComponentProps {
  component: ComponentData;
  onUpdate: (data: any) => void;
  onRemove: () => void;
}

export function StudentCountComponent({ component, onUpdate }: StudentCountComponentProps) {
  const min = component.data.min || 1;
  const max = component.data.max || 5;

  const updateMin = (value: number) => {
    const newMin = Math.max(1, Math.min(value, max));
    onUpdate({ ...component.data, min: newMin });
  };

  const updateMax = (value: number) => {
    const newMax = Math.max(min, value);
    onUpdate({ ...component.data, max: newMax });
  };

  const decrementMax = () => updateMax(max - 1);
  const incrementMax = () => updateMax(max + 1);

  return (
    <div className="bg-white rounded-md p-4">
      <label className="block text-sm font-medium text-gray-600 mb-2">Number of Students</label>
      <div className="space-y-3">
        {/* Min/Max Range Inputs */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Min</label>
            <input
              type="number"
              value={min}
              onChange={(e) => updateMin(parseInt(e.target.value) || 1)}
              className="w-full px-2 py-1 border-0 bg-gray-100 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              min="1"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Max</label>
            <input
              type="number"
              value={max}
              onChange={(e) => updateMax(parseInt(e.target.value) || 1)}
              className="w-full px-2 py-1 border-0 bg-gray-100 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              min={min}
            />
          </div>
        </div>
        
        {/* Current Max with +/- buttons */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={decrementMax}
            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-2xl hover:bg-gray-300"
            disabled={max <= min}
          >
            -
          </button>
          <span className="text-4xl font-light">{max}</span>
          <button
            onClick={incrementMax}
            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-2xl hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
} 