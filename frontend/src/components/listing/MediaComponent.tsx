import React from 'react';
import { ComponentData } from '@/app/provider/my-storefront/create-listing/page';

interface MediaComponentProps {
  component: ComponentData;
  onUpdate: (data: any) => void;
  onRemove: () => void;
}

export function MediaComponent({ component, onUpdate }: MediaComponentProps) {
  return (
    <div className="rounded-md p-2 text-center bg-white h-81 items-center">
      <div className="text-4xl text-gray-400 mt-30">+</div>
      <p className="text-sm text-gray-500">Add video or image</p>
    </div>
  );
} 