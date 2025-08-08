import React from 'react';

interface RadioOption {
  value: string;
  label: string;
  expandedContent?: React.ReactNode;
}

interface RadioSelectProps {
  options: RadioOption[];
  selected: string;
  onChange: (value: string) => void;
  allowExpansion?: boolean;
}

export const RadioSelect: React.FC<RadioSelectProps> = ({
  options,
  selected,
  onChange,
  allowExpansion = false,
}) => {
  const handleOptionClick = (value: string) => {
    onChange(value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {options.map(option => {
        const isSelected = selected === option.value;
        const isExpanded = allowExpansion && isSelected && option.expandedContent;
        
        return (
          <div key={option.value}>
            <div
              onClick={() => handleOptionClick(option.value)}
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: '16px',
                borderRadius: isExpanded ? '12px 12px 0 0' : 12,
                border: 'none',
                backgroundColor: isSelected ? '#E8EEFF' : 'white',
                cursor: 'pointer',
                boxShadow: isSelected ? '0 1px 2px 0 rgb(0 0 0 / 0.05)' : 'none',
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <span style={{ fontWeight: isSelected ? 600 : 500, color: '#1f2937' }}>{option.label}</span>
            </div>
            
            {isExpanded && (
              <div
                style={{
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderBottom: 'none',
                  borderRadius: '0 0 12px 12px',
                  backgroundColor: 'white',
                }}
              >
                <div style={{ padding: '16px' }}>
                  {option.expandedContent}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}; 