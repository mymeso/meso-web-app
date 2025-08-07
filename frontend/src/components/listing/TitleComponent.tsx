import React from 'react';
import { ComponentData } from '@/app/provider/my-storefront/create-listing/page';

interface TitleComponentProps {
  component: ComponentData;
  onUpdate: (data: any) => void;
  onRemove: () => void;
}

export function TitleComponent({ component, onUpdate }: TitleComponentProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={component.data.value || ''}
        onChange={(e) => onUpdate({ ...component.data, value: e.target.value })}
        className="w-full !border-0 rounded-md !bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Title"
      />
    </div>
  );
} 