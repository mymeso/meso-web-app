import React from 'react';
import { ComponentData } from '@/app/provider/my-storefront/create-listing/page';

interface DurationComponentProps {
  component: ComponentData;
  onUpdate: (data: any) => void;
  onRemove: () => void;
}

export function DurationComponent({ component, onUpdate }: DurationComponentProps) {
  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onUpdate({ ...component.data, value });
  };

  return (
    <div className="bg-white rounded-md p-4">
      <label className="block text-sm font-medium text-gray-600 mb-2">Duration</label>
      <div className="flex items-baseline">
        <input
          type="number"
          value={component.data.value || ''}
          onChange={handleDurationChange}
          className="text-4xl font-light border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded w-24"
          placeholder="60"
          min="1"
        />
        <span className="text-lg text-gray-600 ml-1">mins</span>
      </div>
    </div>
  );
} 