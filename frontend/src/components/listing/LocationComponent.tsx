import React from 'react';
import { ComponentData } from '@/app/provider/my-storefront/create-listing/page';

interface LocationComponentProps {
  component: ComponentData;
  onUpdate: (data: any) => void;
  onRemove: () => void;
}

export function LocationComponent({ component, onUpdate }: LocationComponentProps) {
  const locations = component.data.locations || [''];
  
  const updateLocation = (index: number, value: string) => {
    const newLocations = [...locations];
    newLocations[index] = value;
    onUpdate({ ...component.data, locations: newLocations });
  };

  const addLocation = () => {
    const newLocations = [...locations, ''];
    onUpdate({ ...component.data, locations: newLocations });
  };

  const removeLocation = (index: number) => {
    if (locations.length > 1) {
      const newLocations = locations.filter((_: any, i: number) => i !== index);
      onUpdate({ ...component.data, locations: newLocations });
    }
  };

  return (
    <div className="bg-white rounded-md p-4">
      <label className="block text-sm font-medium text-gray-600 mb-2">Location</label>
      <div className="space-y-2">
        {locations.map((location: string, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
            <input
              type="text"
              value={location}
              onChange={(e) => updateLocation(index, e.target.value)}
              className="flex-1 text-gray-700 border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-2 py-1"
              placeholder="Enter location..."
            />
            {locations.length > 1 && (
              <button
                onClick={() => removeLocation(index)}
                className="text-red-500 hover:text-red-700 text-sm px-1"
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addLocation}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          + Add location
        </button>
      </div>
    </div>
  );
} 