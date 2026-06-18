import React from 'react';
import AdminLayout from '@/Components/AdminLayout';

export default function Dashboard({ stats }) {
    const statCards = [
        { label: 'Total Skills', value: stats?.total_skills ?? 0, key: 'total_skills' },
        { label: 'Total Projects', value: stats?.total_projects ?? 0, key: 'total_projects' },
        { label: 'Total Educations', value: stats?.total_educations ?? 0, key: 'total_educations' },
        { label: 'Total Experiences', value: stats?.total_experiences ?? 0, key: 'total_experiences' },
    ];

    return (
        <AdminLayout>
            <div className="max-w-5xl">
                <h1 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-8">
                    Dashboard
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {statCards.map((stat) => (
                        <div
                            key={stat.key}
                            className="border border-neutral-800 rounded-xl p-6 bg-neutral-900/30"
                        >
                            <p className="text-3xl font-bold text-white">{stat.value}</p>
                            <p className="text-xs text-neutral-500 mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}