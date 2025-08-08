import React from 'react';

interface PolicyButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const PolicyButton: React.FC<PolicyButtonProps> = ({ label, isActive, onClick }) => {
  const base = 'px-5 py-2 rounded-lg text-sm font-semibold transition-colors';
  const active = 'bg-[#5B85CC] text-white';
  const inactive = 'bg-transparent text-[#5B85CC] hover:bg-[#e8efff]';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${isActive ? active : inactive}`}
    >
      {label}
    </button>
  );
}; 