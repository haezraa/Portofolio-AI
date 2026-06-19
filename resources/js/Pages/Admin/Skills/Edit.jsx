import React from 'react';
import AdminLayout from '@/Components/AdminLayout';
import { useForm } from '@inertiajs/react';

export default function Edit({ skill }) {
    const { data, setData, put, processing, errors } = useForm({
        name: skill.name || '',
        category: skill.category || '',
        level: skill.level || '',
        logo: skill.logo || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put('/admin/skills/' + skill.id);
    };

    return (
        <AdminLayout>
            <div className="max-w-2xl">
                <h1 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-8">
                    Edit Skill
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-xs text-neutral-400 mb-2">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            className="w-full rounded-lg border border-neutral-800 bg-transparent px-4 py-2.5 text-sm text-white focus:border-white focus:outline-none"
                            placeholder="Laravel"
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-xs text-neutral-400 mb-2">
                            Category
                        </label>
                        <select
                            id="category"
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            required
                            className="w-full rounded-lg border border-neutral-800 bg-transparent px-4 py-2.5 text-sm text-white focus:border-white focus:outline-none"
                        >
                            <option value="" className="bg-neutral-900">Select category</option>
                            <option value="Backend" className="bg-neutral-900">Backend</option>
                            <option value="Frontend" className="bg-neutral-900">Frontend</option>
                            <option value="AI/ML" className="bg-neutral-900">AI/ML</option>
                            <option value="Database" className="bg-neutral-900">Database</option>
                            <option value="DevOps" className="bg-neutral-900">DevOps</option>
                            <option value="Other" className="bg-neutral-900">Other</option>
                        </select>
                        {errors.category && <p className="mt-1 text-xs text-red-400">{errors.category}</p>}
                    </div>

                    <div>
                        <label htmlFor="level" className="block text-xs text-neutral-400 mb-2">
                            Level (1-10)
                        </label>
                        <input
                            id="level"
                            type="number"
                            min="1"
                            max="10"
                            value={data.level}
                            onChange={(e) => setData('level', e.target.value)}
                            className="w-full rounded-lg border border-neutral-800 bg-transparent px-4 py-2.5 text-sm text-white focus:border-white focus:outline-none"
                            placeholder="5"
                        />
                        {errors.level && <p className="mt-1 text-xs text-red-400">{errors.level}</p>}
                    </div>

                    <div>
                        <label htmlFor="logo" className="block text-xs text-neutral-400 mb-2">
                            Logo URL (optional)
                        </label>
                        <input
                            id="logo"
                            type="text"
                            value={data.logo}
                            onChange={(e) => setData('logo', e.target.value)}
                            className="w-full rounded-lg border border-neutral-800 bg-transparent px-4 py-2.5 text-sm text-white focus:border-white focus:outline-none"
                            placeholder="https://example.com/logo.png"
                        />
                        {errors.logo && <p className="mt-1 text-xs text-red-400">{errors.logo}</p>}
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
                            href="/admin/skills"
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