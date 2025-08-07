import React from 'react';
import { ComponentData } from '@/app/provider/my-storefront/create-listing/page';

interface PackageFlexibilityComponentProps {
  component: ComponentData;
  onUpdate: (data: any) => void;
  onRemove: () => void;
}

export function PackageFlexibilityComponent({ component, onUpdate }: PackageFlexibilityComponentProps) {
  const flexibilityOptions = ['Fixed time slot', 'Flexible booking', 'Custom scheduling'];
  
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdate({ ...component.data, type: e.target.value });
  };

  return (
    <div className="bg-white rounded-md p-4">
      <label className="block text-sm font-medium text-gray-600 mb-2">Package Flexibility</label>
      <div className="space-y-2">
        <select
          value={component.data.type || ''}
          onChange={handleTypeChange}
          className="w-full bg-blue-100 text-blue-700 px-3 py-2 rounded-md text-sm border-0 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Select flexibility type...</option>
          {flexibilityOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        
        <div className="flex space-x-2">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm">Rule</span>
          <input
            type="text"
            placeholder="Enter rule..."
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm border-0 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        <input
          type="text"
          placeholder="Additional flexibility options..."
          className="w-full bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm border-0 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
    </div>
  );
} 