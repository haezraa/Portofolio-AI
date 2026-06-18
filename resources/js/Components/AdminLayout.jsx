import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ children }) {
    const { url } = usePage();

    const navItems = [
        { href: '/admin/dashboard', label: 'Dashboard' },
        { href: '/admin/skills', label: 'Skills' },
        { href: '/admin/educations', label: 'Education' },
        { href: '/admin/experiences', label: 'Experience' },
        { href: '/admin/projects', label: 'Projects' },
        { href: '/admin/settings', label: 'Settings' },
    ];

    return (
        <div className="flex h-screen bg-[#0a0a0a]">
            {/* Sidebar */}
            <aside className="w-60 border-r border-neutral-900 flex flex-col">
                <div className="p-6">
                    <span className="text-xs font-semibold tracking-widest text-neutral-400 uppercase">Admin Panel</span>
                </div>
                <nav className="flex-1 px-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`block rounded-md px-4 py-2 text-sm transition-colors ${
                                url === item.href
                                    ? 'bg-white text-black'
                                    : 'text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-neutral-900">
                    <Link
                        href="/admin/logout"
                        method="post"
                        as="button"
                        className="w-full rounded-md border border-neutral-800 px-4 py-2 text-sm text-neutral-400 transition-all hover:border-neutral-700 hover:bg-neutral-900"
                    >
                        Logout
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}