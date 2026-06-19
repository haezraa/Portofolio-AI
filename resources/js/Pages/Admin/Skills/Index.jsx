import React from 'react';
import AdminLayout from '@/Components/AdminLayout';
import { Link, useForm } from '@inertiajs/react';

export default function Index({ skills }) {
    const { delete: destroy } = useForm({});

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this skill?')) {
            destroy('/admin/skills/' + id);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-5xl">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                        Skills
                    </h1>
                    <Link
                        href="/admin/skills/create"
                        className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black transition-all hover:bg-neutral-200"
                    >
                        Add New
                    </Link>
                </div>

                <div className="border border-neutral-800 rounded-xl overflow-hidden">
                    <table className="w-full">
                        <thead className="border-b border-neutral-800 bg-neutral-900/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Level</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            {skills.map((skill) => (
                                <tr key={skill.id} className="hover:bg-neutral-900/30 transition-colors">
                                    <td className="px-6 py-4 text-sm text-neutral-200">{skill.name}</td>
                                    <td className="px-6 py-4 text-sm text-neutral-400">{skill.category}</td>
                                    <td className="px-6 py-4 text-sm text-neutral-400">{skill.level || '-'}</td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <Link
                                            href={"/admin/skills/" + skill.id + "/edit"}
                                            className="text-xs font-medium text-white hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(skill.id)}
                                            className="text-xs font-medium text-red-400 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {skills.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-sm text-neutral-600">
                                        No skills found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}