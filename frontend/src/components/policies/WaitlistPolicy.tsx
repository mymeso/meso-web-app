import React from 'react';

interface WaitlistPolicyProps {
  onDataChange: (data: any) => void;
}

export const WaitlistPolicy: React.FC<WaitlistPolicyProps> = () => {
  return (
    <div className="bg-[#F4F2F0] p-6 rounded-xl border border-[#EAE8E6]">
      <h3 className="text-xl font-semibold mb-4">Waitlist</h3>
      <p className="text-gray-600 text-sm">Configure your waitlist preferences here. (Coming soon)</p>
    </div>
  );
}; 