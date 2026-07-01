import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Sun, Moon, Home, LogIn, Mail, Lock, EyeOff } from 'lucide-react';

export default function Login() {
    const [isDark, setIsDark] = useState(() => {
        const stored = localStorage.getItem('theme');
        return stored ? stored === 'dark' : true;
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
    const borderNav = isDark ? 'border-neutral-800' : 'border-neutral-200/80';

    return (
        <div className={`flex min-h-screen flex-col items-center justify-center transition-colors duration-500 p-4 relative ${t('bg-[#f0f4f8]', 'bg-[#0a0a0a]')}`}>
            
            {/* Dekorasi Background Biar Efek Blur-nya Kelihatan (Opsional) */}
            <div className={`absolute top-1/4 left-1/4 h-64 w-64 rounded-full mix-blend-multiply filter blur-3xl opacity-30 ${isDark ? 'bg-neutral-800' : 'bg-blue-100'}`}></div>
            <div className={`absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full mix-blend-multiply filter blur-3xl opacity-30 ${isDark ? 'bg-neutral-900' : 'bg-purple-100'}`}></div>

            {/* Floating Navbar */}
            <nav className={`fixed top-6 left-1/2 z-50 -translate-x-1/2 ${isDark ? 'bg-[#121212]/80' : 'bg-white/80'} border ${borderNav} backdrop-blur-md rounded-full shadow-sm`}>
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

            {/* Login UI Box - Mengikuti Style Navbar (Glassmorphism) */}
            <div className={`w-full max-w-[420px] z-10 flex flex-col items-center mt-12 p-8 sm:p-10 rounded-3xl border ${borderNav} ${isDark ? 'bg-[#121212]/80' : 'bg-white/80'} backdrop-blur-md shadow-xl transition-colors duration-500`}>
                
                {/* Logo Icon (Pintu masuk) */}
                <div className={`flex h-[72px] w-[72px] items-center justify-center rounded-[1.5rem] shadow-sm mb-6 ${isDark ? 'bg-[#0a0a0a] border border-neutral-800 text-white' : 'bg-white border border-neutral-200 text-neutral-800'}`}>
                    <LogIn className="h-8 w-8" strokeWidth={2} />
                </div>

                <h1 className={`text-2xl font-bold tracking-tight ${t('text-neutral-900', 'text-white')}`}>
                    Sign in with email
                </h1>
                <p className={`mt-2.5 text-center text-[13px] leading-relaxed ${t('text-neutral-500', 'text-neutral-400')}`}>
                    Enter your credentials to access the admin dashboard securely.
                </p>

                <form onSubmit={handleSubmit} className="w-full mt-8 space-y-3">
                    
                    {/* Input Email */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Mail className={`h-[18px] w-[18px] ${t('text-neutral-400', 'text-neutral-500')}`} strokeWidth={2.5} />
                        </div>
                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoFocus
                            className={`w-full rounded-[14px] py-3.5 pl-10 pr-4 text-[15px] font-medium outline-none transition-all focus:ring-2 focus:ring-offset-2 ${
                                isDark
                                    ? 'bg-[#0a0a0a] border-none text-white placeholder-neutral-500 focus:ring-neutral-700 focus:ring-offset-[#121212]'
                                    : 'bg-neutral-100/80 border-none text-black placeholder-neutral-400 focus:ring-neutral-300 focus:ring-offset-white'
                            }`}
                            placeholder="Email"
                        />
                    </div>
                    {errors.email && (
                        <p className="mt-1 px-2 text-xs text-red-500">{errors.email}</p>
                    )}

                    {/* Input Password */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Lock className={`h-[18px] w-[18px] ${t('text-neutral-400', 'text-neutral-500')}`} strokeWidth={2.5} />
                        </div>
                        <input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                            className={`w-full rounded-[14px] py-3.5 pl-10 pr-10 text-[15px] font-medium outline-none transition-all focus:ring-2 focus:ring-offset-2 ${
                                isDark
                                    ? 'bg-[#0a0a0a] border-none text-white placeholder-neutral-500 focus:ring-neutral-700 focus:ring-offset-[#121212]'
                                    : 'bg-neutral-100/80 border-none text-black placeholder-neutral-400 focus:ring-neutral-300 focus:ring-offset-white'
                            }`}
                            placeholder="Password"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                            <EyeOff className={`h-4 w-4 ${t('text-neutral-400', 'text-neutral-500')}`} />
                        </div>
                    </div>
                    {errors.password && (
                        <p className="mt-1 px-2 text-xs text-red-500">{errors.password}</p>
                    )}

                    {/* Forgot Password */}
                    <div className="flex justify-end pt-1 pb-3">
                        <a href="#" className={`text-[13px] font-medium ${t('text-neutral-600 hover:text-black', 'text-neutral-400 hover:text-white')}`}>
                            Forgot password?
                        </a>
                    </div>

                    {/* Button Get Started */}
                    <button
                        type="submit"
                        disabled={processing}
                        className={`w-full rounded-[14px] py-3.5 text-[15px] font-semibold transition-all shadow-sm disabled:opacity-50 ${
                            isDark
                                ? 'bg-white text-black hover:bg-neutral-200'
                                : 'bg-[#1c1c1e] text-white hover:bg-black'
                        }`}
                    >
                        {processing ? 'Signing in...' : 'Get Started'}
                    </button>
                </form>
            </div>
        </div>
    );
}