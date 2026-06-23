import React from 'react';
import AdminLayout from '@/Components/AdminLayout';
import { Link, useForm } from '@inertiajs/react';

export default function ProjectsIndex({ projects }) {
    const { delete: destroy } = useForm({});

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this project?')) {
            destroy('/admin/projects/' + id);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-6xl">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                        Projects
                    </h1>
                    <Link
                        href="/admin/projects/create"
                        className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black transition-all hover:bg-neutral-200"
                    >
                        Add New
                    </Link>
                </div>

                <div className="border border-neutral-800 rounded-xl overflow-hidden">
                    <table className="w-full">
                        <thead className="border-b border-neutral-800 bg-neutral-900/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Thumbnail</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Technologies</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            {projects && projects.length > 0 ? (
                                projects.map((project) => (
                                    <tr key={project.id} className="hover:bg-neutral-900/30 transition-colors">
                                        <td className="px-6 py-4">
                                            {project.thumbnail ? (
                                                <img src={`/storage/${project.thumbnail}`} alt={project.title} className="h-12 w-12 rounded object-cover border border-neutral-800" />
                                            ) : (
                                                <div className="h-12 w-12 rounded bg-neutral-800 flex items-center justify-center text-xs text-neutral-500">
                                                    No Image
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-neutral-200">{project.title}</td>
                                        <td className="px-6 py-4 text-sm text-neutral-400">
                                            {/* Safeguard: Cek apakah array, string, atau kosong */}
                                            {Array.isArray(project.technologies) 
                                                ? project.technologies.join(', ') 
                                                : (typeof project.technologies === 'string' ? project.technologies : '-')}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-4">
                                            <Link
                                                href={`/admin/projects/${project.id}/edit`}
                                                className="text-xs font-medium text-white hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(project.id)}
                                                className="text-xs font-medium text-red-400 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-sm text-neutral-600">
                                        No projects found. Try adding a new one!
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