interface SaveButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export const SaveButton = ({ onClick, disabled = false, loading = false }: SaveButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="inline-flex items-center justify-center w-full sm:w-auto min-w-[120px] h-11 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none transition-colors"
    >
      {loading ? 'Saving…' : 'Save'}
    </button>
  );
}; 