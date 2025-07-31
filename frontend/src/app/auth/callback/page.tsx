"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { shopsApi } from '@/lib/api/shops';

export default function CallbackPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const checkUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_provider')
        .eq('id', userId)
        .single();

      if (error && error.code === 'PGRST116') {
        return { exists: false, isProvider: false };
      }
      
      if (error) {
        console.error('Error checking profile:', error);
        return { exists: false, isProvider: false };
      }

      return { exists: !!data, isProvider: data.is_provider };
    } catch (err) {
      console.error('Unexpected error checking profile:', err);
      return { exists: false, isProvider: false };
    }
  };

  const checkIfShopExists = async (userId: string) => {
    try {
      const shop = await shopsApi.getShopByProviderId(userId);
      return !!shop;
    } catch (error) {
      console.error('Failed to fetch user shop:', error);
      return false;
    }
  };

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { exists, isProvider } = await checkUserProfile(user.id);
          if (exists) {
            if (isProvider) {
              const shopExists = await checkIfShopExists(user.id);
              if (shopExists) {
                router.push('/provider/dashboard');
              } else {
                router.push('/provider/setup');
              }
            } else {
              router.push('/'); 
            }
          } else {
            router.push('/auth/additional-info');
          }
        } else {
          router.push('/auth/login');
        }
      } catch (err) {
        console.error('Unexpected error in auth callback:', err);
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    handleAuthCallback();
  }, [router]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ color: '#6b7280', fontSize: '1rem' }}>
            Setting up your account...
          </p>
        </div>
      </div>
    );
  }

  return null;
} 