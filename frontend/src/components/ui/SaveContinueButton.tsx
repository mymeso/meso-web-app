import { ChevronRight } from "lucide-react";

interface SaveContinueButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export const SaveContinueButton = ({ 
  onClick, 
  disabled = false, 
  loading = false 
}: SaveContinueButtonProps) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled || loading}
      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-w-[200px] h-12 px-6 py-3 bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 disabled:pointer-events-none rounded-2xl font-semibold text-base transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Saving...
        </>
      ) : (
        <>
          Save & Continue
          <ChevronRight className="w-4 h-4" />
        </>
      )}
    </button>
  );
};