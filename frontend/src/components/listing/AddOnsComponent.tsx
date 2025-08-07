import React from 'react';
import { ComponentData } from '@/app/provider/my-storefront/create-listing/page';

interface AddOnsComponentProps {
  component: ComponentData;
  onUpdate: (data: any) => void;
  onRemove: () => void;
}

export function AddOnsComponent({ component, onUpdate }: AddOnsComponentProps) {
  const items = component.data.items || [{ name: '', price: '' }];
  
  const updateItem = (index: number, field: 'name' | 'price', value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    onUpdate({ ...component.data, items: newItems });
  };

  const addItem = () => {
    const newItems = [...items, { name: '', price: '' }];
    onUpdate({ ...component.data, items: newItems });
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      const newItems = items.filter((_: any, i: number) => i !== index);
      onUpdate({ ...component.data, items: newItems });
    }
  };

  return (
    <div className="bg-white rounded-md p-4">
      <label className="block text-sm font-medium text-gray-600 mb-2">Add-ons</label>
      <div className="space-y-2">
        {items.map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-2 rounded-md">
            <input
              type="text"
              value={item.name || ''}
              onChange={(e) => updateItem(index, 'name', e.target.value)}
              className="flex-1 bg-transparent border-0 focus:outline-none placeholder-blue-500"
              placeholder="Add-on name..."
            />
            <span className="text-blue-700">$</span>
            <input
              type="number"
              value={item.price || ''}
              onChange={(e) => updateItem(index, 'price', e.target.value)}
              className="w-16 bg-transparent border-0 focus:outline-none text-right placeholder-blue-500"
              placeholder="0"
              min="0"
              step="0.01"
            />
            {items.length > 1 && (
              <button
                onClick={() => removeItem(index)}
                className="text-red-500 hover:text-red-700 text-sm px-1 ml-1"
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addItem}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          + Add add-on
        </button>
      </div>
    </div>
  );
} 