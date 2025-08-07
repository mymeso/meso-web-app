import React from 'react';
import { ComponentData } from '@/app/provider/my-storefront/create-listing/page';

interface PersonnelComponentProps {
  component: ComponentData;
  onUpdate: (data: any) => void;
  onRemove: () => void;
}

export function PersonnelComponent({ component, onUpdate }: PersonnelComponentProps) {
  const staff = component.data.staff || [''];
  
  const updateStaff = (index: number, value: string) => {
    const newStaff = [...staff];
    newStaff[index] = value;
    onUpdate({ ...component.data, staff: newStaff });
  };

  const addStaff = () => {
    const newStaff = [...staff, ''];
    onUpdate({ ...component.data, staff: newStaff });
  };

  const removeStaff = (index: number) => {
    if (staff.length > 1) {
      const newStaff = staff.filter((_: any, i: number) => i !== index);
      onUpdate({ ...component.data, staff: newStaff });
    }
  };

  return (
    <div className="bg-white rounded-md p-4">
      <label className="block text-sm font-medium text-gray-600 mb-2">Personnel</label>
      <div className="space-y-2">
        {staff.map((person: string, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={person}
              onChange={(e) => updateStaff(index, e.target.value)}
              className={`flex-1 px-3 py-2 rounded-md border-0 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                index === 0 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
              }`}
              placeholder="Enter staff member name..."
            />
            {staff.length > 1 && (
              <button
                onClick={() => removeStaff(index)}
                className="text-red-500 hover:text-red-700 text-sm px-1"
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addStaff}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          + Add staff member
        </button>
      </div>
    </div>
  );
} 