import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Components/AdminLayout';
import { 
    Code, Briefcase, FolderGit2, GraduationCap, 
    TrendingUp, Plus, Activity, Clock, ArrowRight, Zap 
} from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Dashboard({ stats }) {
    // Sinkronisasi tema real-time dengan tombol navbar
    const [isDark, setIsDark] = useState(() => {
        const stored = localStorage.getItem('theme');
        return stored ? stored === 'dark' : true;
    });

    useEffect(() => {
        const handleThemeChange = () => {
            const currentTheme = localStorage.getItem('theme');
            setIsDark(currentTheme === 'dark');
        };
        // Menangkap event klik secara global untuk mengupdate tema di konten
        window.addEventListener('click', handleThemeChange);
        return () => window.removeEventListener('click', handleThemeChange);
    }, []);

    const t = (light, dark) => (isDark ? dark : light);
    const border = isDark ? 'border-neutral-800' : 'border-neutral-200';
    const bgCard = isDark ? 'bg-[#121212]/80' : 'bg-white';
    const bgHover = isDark ? 'hover:bg-neutral-800/50' : 'hover:bg-neutral-50';

    const statCards = [
        { label: 'Total Skills', value: stats?.total_skills ?? 0, icon: Code, trend: '+2 this month' },
        { label: 'Total Projects', value: stats?.total_projects ?? 0, icon: FolderGit2, trend: '+1 recently' },
        { label: 'Study History', value: stats?.total_educations ?? 0, icon: GraduationCap, trend: 'Up to date' },
        { label: 'Experiences', value: stats?.total_experiences ?? 0, icon: Briefcase, trend: 'Active' },
    ];

    // Mock data untuk Activity Chart (Grafik Batang)
    const chartBars = [40, 25, 60, 30, 85, 45, 75, 50, 90, 65, 30, 55];

    return (
        <AdminLayout>
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
                
                {/* Header Greeting */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <p className={`text-sm font-medium mb-1 ${t('text-neutral-500', 'text-neutral-400')}`}>
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        <h1 className={`text-3xl font-bold tracking-tight ${t('text-neutral-900', 'text-white')}`}>
                            Welcome back, Admin
                        </h1>
                    </div>
                    <Link
                        href="/admin/projects/create"
                        className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all shadow-sm ${
                            isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'
                        }`}
                    >
                        <Plus className="h-4 w-4" />
                        New Project
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {statCards.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={idx}
                                className={`flex flex-col justify-between p-5 rounded-2xl border ${border} ${bgCard} shadow-sm transition-all duration-300 hover:border-neutral-400`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-2 rounded-xl border ${border} ${isDark ? 'bg-neutral-900/50' : 'bg-neutral-50'}`}>
                                        <Icon className={`h-5 w-5 ${t('text-neutral-700', 'text-neutral-300')}`} />
                                    </div>
                                    <span className={`flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-full border ${border} ${t('text-neutral-600', 'text-neutral-400')}`}>
                                        <TrendingUp className="h-3 w-3" />
                                        {stat.trend}
                                    </span>
                                </div>
                                <div>
                                    <h3 className={`text-3xl font-bold ${t('text-neutral-900', 'text-white')}`}>
                                        {stat.value}
                                    </h3>
                                    <p className={`text-sm font-medium mt-1 ${t('text-neutral-500', 'text-neutral-400')}`}>
                                        {stat.label}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Main Content Area (Chart & Quick Actions) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Left Col: Activity Chart (Mock) */}
                    <div className={`lg:col-span-2 rounded-2xl border ${border} ${bgCard} shadow-sm p-6`}>
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className={`text-lg font-bold ${t('text-neutral-900', 'text-white')}`}>Activity Overview</h2>
                                <p className={`text-sm ${t('text-neutral-500', 'text-neutral-400')}`}>Portfolio visits and interactions this year</p>
                            </div>
                            <Activity className={`h-5 w-5 ${t('text-neutral-400', 'text-neutral-500')}`} />
                        </div>
                        
                        {/* CSS-based Bar Chart */}
                        <div className="h-48 flex items-end justify-between gap-2 pb-2">
                            {chartBars.map((height, i) => (
                                <div key={i} className="w-full flex flex-col items-center gap-2 group relative">
                                    {/* Tooltip on hover */}
                                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-black text-white text-[10px] py-1 px-2 rounded transition-opacity">
                                        {height * 12}
                                    </div>
                                    <div 
                                        className={`w-full rounded-sm transition-all duration-500 group-hover:opacity-80 ${isDark ? 'bg-white' : 'bg-black'}`}
                                        style={{ height: `${height}%` }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                        <div className={`flex justify-between mt-2 pt-4 border-t ${border} text-xs font-medium ${t('text-neutral-400', 'text-neutral-500')}`}>
                            <span>Jan</span>
                            <span>Apr</span>
                            <span>Jul</span>
                            <span>Oct</span>
                            <span>Dec</span>
                        </div>
                    </div>

                    {/* Right Col: Quick Actions & Recent Updates */}
                    <div className="space-y-6">
                        
                        {/* Quick Actions */}
                        <div className={`rounded-2xl border ${border} ${bgCard} shadow-sm p-6`}>
                            <h2 className={`text-sm font-bold tracking-wide uppercase mb-4 ${t('text-neutral-900', 'text-white')}`}>
                                Quick Actions
                            </h2>
                            <div className="space-y-2">
                                {[
                                    { label: 'Manage Settings', href: '/admin/settings', icon: Zap },
                                    { label: 'Update Experiences', href: '/admin/experiences', icon: Briefcase },
                                    { label: 'Add New Skill', href: '/admin/skills', icon: Code },
                                ].map((action, i) => (
                                    <Link
                                        key={i}
                                        href={action.href}
                                        className={`flex items-center justify-between p-3 rounded-xl border ${border} ${bgHover} transition-all group`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <action.icon className={`h-4 w-4 ${t('text-neutral-500', 'text-neutral-400')}`} />
                                            <span className={`text-sm font-medium ${t('text-neutral-700', 'text-neutral-300')}`}>
                                                {action.label}
                                            </span>
                                        </div>
                                        <ArrowRight className={`h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 ${t('text-neutral-900', 'text-white')}`} />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity (Mock) */}
                        <div className={`rounded-2xl border ${border} ${bgCard} shadow-sm p-6`}>
                            <div className="flex items-center gap-2 mb-4">
                                <Clock className={`h-4 w-4 ${t('text-neutral-400', 'text-neutral-500')}`} />
                                <h2 className={`text-sm font-bold tracking-wide uppercase ${t('text-neutral-900', 'text-white')}`}>
                                    System Log
                                </h2>
                            </div>
                            <div className="relative pl-4 space-y-4 border-l border-neutral-200 dark:border-neutral-800 ml-2">
                                {[
                                    { text: 'Portfolio system initialized', time: 'Just now' },
                                    { text: 'Skills updated', time: '2 hours ago' },
                                    { text: 'Admin logged in', time: 'Today' },
                                ].map((log, i) => (
                                    <div key={i} className="relative">
                                        <span className={`absolute -left-[21px] top-1.5 h-2 w-2 rounded-full ring-2 ${isDark ? 'bg-white ring-[#121212]' : 'bg-black ring-white'}`}></span>
                                        <p className={`text-sm font-medium ${t('text-neutral-700', 'text-neutral-300')}`}>{log.text}</p>
                                        <p className={`text-xs mt-0.5 ${t('text-neutral-500', 'text-neutral-500')}`}>{log.time}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}