import React from 'react';
import { ComponentData } from '@/app/provider/my-storefront/create-listing/page';

interface PricingDescriptionComponentProps {
  component: ComponentData;
  onUpdate: (data: any) => void;
  onRemove: () => void;
}

export function PricingDescriptionComponent({ component, onUpdate }: PricingDescriptionComponentProps) {
  return (
    <div>
      <textarea
        value={component.data.value || ''}
        onChange={(e) => onUpdate({ ...component.data, value: e.target.value })}
        className="w-full px-3 py-3 !border-0 rounded-md !bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 text-sm"
        placeholder="Describe your pricing..."
      />
    </div>
  );
} 