"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthProvider';

// A generic Icon component that can be replaced with a proper library
const Icon = ({ src, alt }: { src: string; alt: string }) => (
    <Image src={src} alt={alt} width={20} height={20} />
);

const NavItem = ({ href, iconSrc, label, active, onClick }: { href: string; iconSrc: string; label: string; active?: boolean; onClick?: () => void }) => {
    if (onClick) {
        return (
            <button
                onClick={onClick}
                className="flex items-center gap-3 p-3 rounded-lg bg-transparent text-gray-700 font-medium border-none cursor-pointer w-full text-left hover:bg-gray-100 transition-colors"
            >
                <Icon src={iconSrc} alt={label} />
                <span>{label}</span>
            </button>
        );
    }

    return (
        <Link href={href}>
            <div className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                active 
                    ? 'bg-blue-50 text-indigo-600 font-semibold' 
                    : 'bg-transparent text-gray-700 font-medium hover:bg-gray-100'
            }`}>
                <Icon src={iconSrc} alt={label} />
                <span>{label}</span>
            </div>
        </Link>
    );
};


export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, signOut } = useAuth();

    const handleSignOut = async () => {
        await signOut();
        router.push('/auth/login');
    };

    return (
        <aside className="w-[240px] bg-gray-50 p-6 flex flex-col justify-between border-r border-gray-200 flex-shrink-0">
            <div>
                <div className="px-4 mb-6">
                    <h1 className="text-3xl font-bold m-0">meso</h1>
                </div>
                <nav className="flex flex-col gap-2">
                    <NavItem href="/provider/dashboard" iconSrc="/window.svg" label="Dashboard" active={pathname === '/provider/dashboard'} />
                    <NavItem href="/provider/bookings" iconSrc="/file.svg" label="Bookings" active={pathname === '/provider/bookings'} />
                    <NavItem href="/provider/calendar" iconSrc="/globe.svg" label="Calendar" active={pathname === '/provider/calendar'} />
                    <NavItem href="/provider/my-storefront" iconSrc="/window.svg" label="My Storefront" active={pathname.startsWith('/provider/my-storefront')} />
                    <NavItem href="/provider/payments" iconSrc="/file.svg" label="Payments" active={pathname === '/provider/payments'} />
                </nav>
            </div>
            <div>
                {/* User info */}
                {user && (
                    <div className="p-3 border-t border-gray-200 mb-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                                {user.user_metadata?.full_name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-800 truncate">
                                    {user.user_metadata?.full_name || 'User'}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                <NavItem href="#" iconSrc="/globe.svg" label="Settings" />
                <NavItem href="#" iconSrc="/home.svg" label="Sign Out" onClick={handleSignOut} />
            </div>
        </aside>
    );
} 