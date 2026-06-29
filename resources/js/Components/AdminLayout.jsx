import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Sun, Moon, Home } from 'lucide-react';

export default function AdminLayout({ children }) {
    const { url } = usePage();

    const [isDark, setIsDark] = useState(() => {
        const stored = localStorage.getItem('theme');
        return stored ? stored === 'dark' : true;
    });

    useEffect(() => {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const navItems = [
        { href: '/admin/dashboard', label: 'Dashboard' },
        { href: '/admin/skills', label: 'Skills' },
        { href: '/admin/experiences', label: 'Experience' },
        { href: '/admin/projects', label: 'Projects' },
        { href: '/admin/settings', label: 'Settings' },
    ];

    const t = (light, dark) => (isDark ? dark : light);
    const bgPage = isDark ? 'bg-[#0a0a0a]' : 'bg-neutral-50';
    const sidebarBg = isDark ? 'bg-[#0a0a0a]' : 'bg-white';
    const border = isDark ? 'border-neutral-900' : 'border-neutral-200';
    const borderNav = isDark ? 'border-neutral-800' : 'border-neutral-200';

    return (
        <div className={`flex h-screen transition-colors duration-500 ${bgPage}`}>
            
            {/* Floating Navbar Full (Fixed at Top) */}
            <nav className={`fixed top-6 left-1/2 z-50 -translate-x-1/2 ${isDark ? 'bg-[#121212]/80' : 'bg-white/80'} border ${borderNav} backdrop-blur-md rounded-full shadow-lg`}>
                <div className="flex items-center gap-1 px-2 py-1.5">
                    <a href="/#overview" className={`px-4 py-2 rounded-full text-sm font-medium ${t('text-neutral-500 hover:text-black', 'text-neutral-400 hover:text-white')} transition-colors`}>Overview</a>
                    <a href="/#about" className={`px-4 py-2 rounded-full text-sm font-medium ${t('text-neutral-500 hover:text-black', 'text-neutral-400 hover:text-white')} transition-colors`}>About</a>
                    <a href="/#skills" className={`px-4 py-2 rounded-full text-sm font-medium ${t('text-neutral-500 hover:text-black', 'text-neutral-400 hover:text-white')} transition-colors`}>Skills</a>
                    <a href="/#experience" className={`px-4 py-2 rounded-full text-sm font-medium ${t('text-neutral-500 hover:text-black', 'text-neutral-400 hover:text-white')} transition-colors`}>Timeline</a>
                    <a href="/#projects" className={`px-4 py-2 rounded-full text-sm font-medium ${t('text-neutral-500 hover:text-black', 'text-neutral-400 hover:text-white')} transition-colors`}>Projects</a>
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className={`ml-2 p-2 rounded-full border ${borderNav} ${t('text-neutral-600 hover:text-black', 'text-neutral-400 hover:text-white')} transition-all`}
                    >
                        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </button>
                    <a
                        href="/"
                        className={`ml-1 flex items-center gap-1.5 rounded-full border ${borderNav} px-3 py-1.5 text-xs font-medium ${t('text-neutral-600 hover:text-black', 'text-neutral-400 hover:text-white')} transition-all`}
                    >
                        <Home className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Home</span>
                    </a>
                </div>
            </nav>

            {/* Sidebar */}
            <aside className={`w-60 border-r ${border} ${sidebarBg} flex flex-col pt-24 transition-colors duration-500 z-40`}>
                <div className="px-6 pb-4">
                    <span className={`text-xs font-semibold tracking-widest uppercase ${t('text-neutral-500', 'text-neutral-400')}`}>Admin Panel</span>
                </div>
                <nav className="flex-1 px-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`block rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                                url.startsWith(item.href)
                                    ? (isDark ? 'bg-white text-black' : 'bg-black text-white')
                                    : `${t('text-neutral-600 hover:bg-neutral-100 hover:text-black', 'text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200')}`
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className={`p-4 border-t ${border}`}>
                    <Link
                        href="/admin/logout"
                        method="post"
                        as="button"
                        className={`w-full rounded-md border px-4 py-2 text-sm transition-all ${
                            isDark
                                ? 'border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:bg-neutral-900'
                                : 'border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50'
                        }`}
                    >
                        Logout
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 overflow-y-auto p-8 pt-28 transition-colors duration-500 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                {children}
            </main>
        </div>
    );
}