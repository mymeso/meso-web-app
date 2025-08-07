import React from 'react';
import { ComponentData } from '@/app/provider/my-storefront/create-listing/page';

interface LessonCountComponentProps {
  component: ComponentData;
  onUpdate: (data: any) => void;
  onRemove: () => void;
}

export function LessonCountComponent({ component, onUpdate }: LessonCountComponentProps) {
  const values = component.data.values || [];
  
  const updateValue = (index: number, value: string) => {
    const newValues = [...values];
    const numValue = parseInt(value) || 0;
    newValues[index] = numValue;
    onUpdate({ ...component.data, values: newValues });
  };

  const addValue = () => {
    const newValues = [...values, 1];
    onUpdate({ ...component.data, values: newValues });
  };

  const removeValue = (index: number) => {
    if (values.length > 1) {
      const newValues = values.filter((_: any, i: number) => i !== index);
      onUpdate({ ...component.data, values: newValues });
    }
  };

  return (
    <div className="bg-white rounded-md p-4">
      <label className="block text-sm font-medium text-gray-600 mb-2">Number of Lessons</label>
      <div className="space-y-2">
        {values.length === 0 ? (
          <button
            onClick={addValue}
            className="w-full text-gray-500 border-2 border-dashed border-gray-300 px-3 py-2 rounded-md text-sm hover:border-gray-400"
          >
            + Add lesson count option
          </button>
        ) : (
          <>
            {values.map((value: number, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="number"
                  value={value || ''}
                  onChange={(e) => updateValue(index, e.target.value)}
                  className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded-md text-lg border-0 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="1"
                  min="1"
                />
                {values.length > 1 && (
                  <button
                    onClick={() => removeValue(index)}
                    className="text-red-500 hover:text-red-700 text-sm px-1"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addValue}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              + Add option
            </button>
          </>
        )}
      </div>
    </div>
  );
} 