import React from 'react';
import { ComponentData } from '@/app/provider/my-storefront/create-listing/page';

interface WhatsIncludedComponentProps {
  component: ComponentData;
  onUpdate: (data: any) => void;
  onRemove: () => void;
}

export function WhatsIncludedComponent({ component, onUpdate }: WhatsIncludedComponentProps) {
  // Ensure we always have exactly 5 items, padding with empty strings if needed
  const items = component.data.items || [''];
  const paddedItems = [...items];
  while (paddedItems.length < 5) {
    paddedItems.push('');
  }
  // Trim to exactly 5 items if there are more
  const displayItems = paddedItems.slice(0, 5);
  
  const updateItem = (index: number, value: string) => {
    const newItems = [...displayItems];
    newItems[index] = value;
    // Filter out empty items from the end for storage, but keep at least one
    const filteredItems = newItems.filter(item => item.trim() !== '');
    if (filteredItems.length === 0) {
      filteredItems.push('');
    }
    onUpdate({ ...component.data, items: filteredItems });
  };

  const clearItem = (index: number) => {
    const newItems = [...displayItems];
    newItems[index] = '';
    // Filter out empty items from the end for storage, but keep at least one
    const filteredItems = newItems.filter(item => item.trim() !== '');
    if (filteredItems.length === 0) {
      filteredItems.push('');
    }
    onUpdate({ ...component.data, items: filteredItems });
  };
  
  return (
    <div>
      <div className="bg-white rounded-md p-3 focus-within:ring-1 focus-within:ring-blue-500">
        <div>
          {displayItems.map((item: string, index: number) => (
            <div key={index} className="flex items-center gap-0.5">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateItem(index, e.target.value)}
                  className="w-full !pl-5 pr-2 !py-1 !border-0 !bg-white text-sm focus:outline-none"
                  placeholder={index === 0 ? "Input summary of what's included here" : ""}
                />
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none">•  </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 