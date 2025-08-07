import React, { useState, useRef, useEffect } from 'react';

interface ComponentOption {
  type: string;
  label: string;
  mandatory?: boolean;
}

interface AddComponentButtonProps {
  availableComponents: ComponentOption[];
  existingComponents: any[];
  onAddComponent: (componentType: string) => void;
}

export function AddComponentButton({ 
  availableComponents, 
  existingComponents, 
  onAddComponent 
}: AddComponentButtonProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const filteredComponents = availableComponents.filter(comp => 
    !comp.mandatory || !existingComponents.some(ec => ec.type === comp.type)
  );

  const handleAddComponent = (componentType: string) => {
    onAddComponent(componentType);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <div className="rounded-md bg-white p-4 text-center">
        <button 
          onClick={toggleMenu}
          className="bg-[#F4F2F0] text-gray-500 text-2xl mb-2 w-8 h-8 rounded-md hover:bg-gray-200 transition-colors"
        >
          +
        </button>
        <p className="text-sm text-gray-500 mb-3">Add component</p>
        
        {isMenuOpen && filteredComponents.length > 0 && (
          <div className="absolute top-15 left-1/2 transform -translate-x-4 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <div className="p-2 space-y-1">
              {filteredComponents.map(comp => (
                <button
                  key={comp.type}
                  onClick={() => handleAddComponent(comp.type)}
                  className="w-full px-3 py-2 text-left text-sm bg-[#f4f2f0] rounded-md hover:bg-blue-200 transition-colors"
                >
                  {comp.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 