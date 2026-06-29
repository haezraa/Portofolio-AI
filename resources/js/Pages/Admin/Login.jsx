import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Sun, Moon, Home } from 'lucide-react';

export default function Login() {
    const [isDark, setIsDark] = useState(() => {
        const stored = localStorage.getItem('theme');
        return stored ? stored === 'dark' : true; // Default ke dark mode
    });

    useEffect(() => {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/login');
    };

    const t = (light, dark) => (isDark ? dark : light);
    const border = isDark ? 'border-neutral-800' : 'border-neutral-200';

    return (
        <div className={`flex min-h-screen items-center justify-center transition-colors duration-500 p-4 ${t('bg-neutral-50', 'bg-[#0a0a0a]')}`}>
            
            {/* Floating Navbar Full */}
            <nav className={`fixed top-6 left-1/2 z-50 -translate-x-1/2 ${isDark ? 'bg-[#121212]/80 border-neutral-800' : 'bg-white/80 border-neutral-200/80'} border backdrop-blur-md rounded-full shadow-lg`}>
                <div className="flex items-center gap-1 px-2 py-1.5">
                    <a href="/#overview" className={`px-4 py-2 rounded-full text-sm font-medium ${t('text-neutral-500 hover:text-black', 'text-neutral-400 hover:text-white')} transition-colors`}>Overview</a>
                    <a href="/#about" className={`px-4 py-2 rounded-full text-sm font-medium ${t('text-neutral-500 hover:text-black', 'text-neutral-400 hover:text-white')} transition-colors`}>About</a>
                    <a href="/#skills" className={`px-4 py-2 rounded-full text-sm font-medium ${t('text-neutral-500 hover:text-black', 'text-neutral-400 hover:text-white')} transition-colors`}>Skills</a>
                    <a href="/#experience" className={`px-4 py-2 rounded-full text-sm font-medium ${t('text-neutral-500 hover:text-black', 'text-neutral-400 hover:text-white')} transition-colors`}>Timeline</a>
                    <a href="/#projects" className={`px-4 py-2 rounded-full text-sm font-medium ${t('text-neutral-500 hover:text-black', 'text-neutral-400 hover:text-white')} transition-colors`}>Projects</a>
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className={`ml-2 p-2 rounded-full border ${border} ${t('text-neutral-600 hover:text-black', 'text-neutral-400 hover:text-white')} transition-all`}
                    >
                        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </button>
                    <a
                        href="/"
                        className={`ml-1 flex items-center gap-1.5 rounded-full border ${border} px-3 py-1.5 text-xs font-medium ${t('text-neutral-600 hover:text-black', 'text-neutral-400 hover:text-white')} transition-all`}
                    >
                        <Home className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Home</span>
                    </a>
                </div>
            </nav>

            {/* Login Card */}
            <div className="w-full max-w-sm mt-16">
                <div className={`border rounded-2xl p-8 transition-colors duration-500 ${isDark ? 'border-neutral-800 bg-neutral-900/50' : 'border-neutral-200 bg-white shadow-xl'}`}>
                    <h1 className={`text-2xl font-bold mb-2 text-center ${t('text-neutral-900', 'text-white')}`}>Sign In</h1>
                    <p className={`text-xs text-center mb-8 ${t('text-neutral-500', 'text-neutral-500')}`}>Admin Dashboard Access</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="email" className={`text-xs mb-2 block font-medium ${t('text-neutral-600', 'text-neutral-400')}`}>
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none transition-colors ${
                                    isDark 
                                        ? 'border-neutral-700 bg-transparent text-white placeholder-neutral-600 focus:border-white' 
                                        : 'border-neutral-300 bg-neutral-50 text-black placeholder-neutral-400 focus:border-black'
                                }`}
                                placeholder="admin@example.com"
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className={`text-xs mb-2 block font-medium ${t('text-neutral-600', 'text-neutral-400')}`}>
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none transition-colors ${
                                    isDark 
                                        ? 'border-neutral-700 bg-transparent text-white placeholder-neutral-600 focus:border-white' 
                                        : 'border-neutral-300 bg-neutral-50 text-black placeholder-neutral-400 focus:border-black'
                                }`}
                                placeholder="••••••••"
                            />
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className={`w-full rounded-lg py-2.5 text-sm font-semibold transition-all disabled:opacity-50 ${
                                isDark
                                    ? 'bg-white text-black hover:bg-neutral-200'
                                    : 'bg-black text-white hover:bg-neutral-800'
                            }`}
                        >
                            {processing ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}