import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { shopsApi } from '@/lib/api/shops';
import { supabase } from '@/lib/supabase/client';

export function useRedirectIfShopNotSetup() {
  const router = useRouter();

  useEffect(() => {
    const checkShopStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          // Not logged in, no need to redirect
          return;
        }
        await shopsApi.getShopByProviderId(user.id);
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          router.push('/provider/setup');
        } else {
          console.error("Failed to fetch user shop:", error);
        }
      }
    };

    checkShopStatus();
  }, [router]);
} 