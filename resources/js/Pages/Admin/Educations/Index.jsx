import React from 'react';
import AdminLayout from '@/Components/AdminLayout';
import { Link, useForm } from '@inertiajs/react';

export default function EducationsIndex({ educations }) {
    const { delete: destroy } = useForm({});

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this education record?')) {
            destroy('/admin/educations/' + id);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-5xl">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                        Education
                    </h1>
                    <Link
                        href="/admin/educations/create"
                        className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black transition-all hover:bg-neutral-200"
                    >
                        Add New
                    </Link>
                </div>

                <div className="border border-neutral-800 rounded-xl overflow-hidden">
                    <table className="w-full">
                        <thead className="border-b border-neutral-800 bg-neutral-900/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Institution</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Degree</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Period</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            {educations.map((edu) => (
                                <tr key={edu.id} className="hover:bg-neutral-900/30 transition-colors">
                                    <td className="px-6 py-4 text-sm text-neutral-200">{edu.institution}</td>
                                    <td className="px-6 py-4 text-sm text-neutral-400">{edu.degree}</td>
                                    <td className="px-6 py-4 text-sm text-neutral-400">
                                        {edu.start_year}{edu.end_year ? ` - ${edu.end_year}` : ' - Present'}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <Link
                                            href={`/admin/educations/${edu.id}/edit`}
                                            className="text-xs font-medium text-white hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(edu.id)}
                                            className="text-xs font-medium text-red-400 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {(!educations || educations.length === 0) && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-sm text-neutral-600">
                                        No education records found.
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