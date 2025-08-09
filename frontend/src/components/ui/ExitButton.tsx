import { useRouter } from 'next/navigation';

interface ExitButtonProps {
  href?: string; // optional override
  disabled?: boolean;
}

export const ExitButton = ({ href = '/provider/my-storefront', disabled = false }: ExitButtonProps) => {
  const router = useRouter();
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => router.push(href)}
      className="inline-flex items-center justify-center w-full sm:w-auto min-w-[120px] h-11 px-5 py-2.5 border border-gray-300 text-gray-700 bg-white rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none transition-colors"
    >
      Exit
    </button>
  );
}; 