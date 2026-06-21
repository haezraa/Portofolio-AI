import React from 'react';
import AdminLayout from '@/Components/AdminLayout';
import { useForm } from '@inertiajs/react';

export default function ProjectsEdit({ project }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: project.title || '',
        thumbnail: null,
        description_id: project.description_id || '',
        description_en: project.description_en || '',
        technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
        project_url: project.project_url || '',
        github_url: project.github_url || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/admin/projects/${project.id}`, {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout>
            <div className="max-w-2xl">
                <h1 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-8">
                    Edit Project
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                    <div>
                        <label htmlFor="title" className="block text-xs text-neutral-400 mb-2">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            required
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-200 focus:border-white focus:outline-none"
                            placeholder="AI-Powered Portfolio Website"
                        />
                        {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
                    </div>

                    {project.thumbnail && (
                        <div>
                            <p className="text-xs text-neutral-400 mb-2">Current Thumbnail:</p>
                            <img src={`/storage/${project.thumbnail}`} alt={project.title} className="h-20 w-20 rounded object-cover" />
                        </div>
                    )}

                    <div>
                        <label htmlFor="thumbnail" className="block text-xs text-neutral-400 mb-2">
                            Replace Thumbnail Image (optional)
                        </label>
                        <input
                            id="thumbnail"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('thumbnail', e.target.files[0])}
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm text-neutral-400 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black hover:file:bg-neutral-200"
                        />
                        {errors.thumbnail && <p className="mt-1 text-xs text-red-400">{errors.thumbnail}</p>}
                    </div>

                    <div>
                        <label htmlFor="technologies" className="block text-xs text-neutral-400 mb-2">
                            Technologies (comma-separated)
                        </label>
                        <input
                            id="technologies"
                            type="text"
                            value={data.technologies}
                            onChange={(e) => setData('technologies', e.target.value)}
                            required
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-200 focus:border-white focus:outline-none"
                            placeholder="Laravel, React, Inertia.js, Tailwind CSS"
                        />
                        {errors.technologies && <p className="mt-1 text-xs text-red-400">{errors.technologies}</p>}
                    </div>

                    <div>
                        <label htmlFor="description_id" className="block text-xs text-neutral-400 mb-2">
                            Description (Indonesian)
                        </label>
                        <textarea
                            id="description_id"
                            value={data.description_id}
                            onChange={(e) => setData('description_id', e.target.value)}
                            rows="3"
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-200 focus:border-white focus:outline-none"
                            placeholder="Deskripsi proyek..."
                        />
                    </div>

                    <div>
                        <label htmlFor="description_en" className="block text-xs text-neutral-400 mb-2">
                            Description (English)
                        </label>
                        <textarea
                            id="description_en"
                            value={data.description_en}
                            onChange={(e) => setData('description_en', e.target.value)}
                            rows="3"
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-200 focus:border-white focus:outline-none"
                            placeholder="Project description..."
                        />
                    </div>

                    <div>
                        <label htmlFor="project_url" className="block text-xs text-neutral-400 mb-2">
                            Project URL
                        </label>
                        <input
                            id="project_url"
                            type="text"
                            value={data.project_url}
                            onChange={(e) => setData('project_url', e.target.value)}
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-200 focus:border-white focus:outline-none"
                            placeholder="https://project.example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="github_url" className="block text-xs text-neutral-400 mb-2">
                            GitHub URL
                        </label>
                        <input
                            id="github_url"
                            type="text"
                            value={data.github_url}
                            onChange={(e) => setData('github_url', e.target.value)}
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-200 focus:border-white focus:outline-none"
                            placeholder="https://github.com/user/project"
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-black transition-all hover:bg-neutral-200 disabled:opacity-50"
                        >
                            {processing ? 'Updating...' : 'Update'}
                        </button>
                        <a
                            href="/admin/projects"
                            className="rounded-full border border-neutral-800 px-6 py-2 text-sm font-semibold text-neutral-400 transition-all hover:border-neutral-700"
                        >
                            Cancel
                        </a>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}