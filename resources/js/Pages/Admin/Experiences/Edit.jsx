import React from 'react';
import AdminLayout from '@/Components/AdminLayout';
import { useForm } from '@inertiajs/react';

export default function ExperiencesEdit({ experience }) {
    const { data, setData, put, processing, errors } = useForm({
        company_or_organization: experience.company_or_organization || '',
        position: experience.position || '',
        start_date: experience.start_date || '',
        end_date: experience.end_date || '',
        description_id: experience.description_id || '',
        description_en: experience.description_en || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/experiences/${experience.id}`);
    };

    return (
        <AdminLayout>
            <div className="max-w-2xl">
                <h1 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-8">
                    Edit Experience
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="company_or_organization" className="block text-xs text-neutral-400 mb-2">
                            Company/Organization
                        </label>
                        <input
                            id="company_or_organization"
                            type="text"
                            value={data.company_or_organization}
                            onChange={(e) => setData('company_or_organization', e.target.value)}
                            required
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-200 focus:border-white focus:outline-none"
                            placeholder="PT. Tech Innovate Indonesia"
                        />
                        {errors.company_or_organization && <p className="mt-1 text-xs text-red-400">{errors.company_or_organization}</p>}
                    </div>

                    <div>
                        <label htmlFor="position" className="block text-xs text-neutral-400 mb-2">
                            Position
                        </label>
                        <input
                            id="position"
                            type="text"
                            value={data.position}
                            onChange={(e) => setData('position', e.target.value)}
                            required
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-200 focus:border-white focus:outline-none"
                            placeholder="Fullstack Developer Intern"
                        />
                        {errors.position && <p className="mt-1 text-xs text-red-400">{errors.position}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="start_date" className="block text-xs text-neutral-400 mb-2">
                                Start Date
                            </label>
                            <input
                                id="start_date"
                                type="date"
                                value={data.start_date}
                                onChange={(e) => setData('start_date', e.target.value)}
                                required
                                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-200 focus:border-white focus:outline-none"
                            />
                            {errors.start_date && <p className="mt-1 text-xs text-red-400">{errors.start_date}</p>}
                        </div>
                        <div>
                            <label htmlFor="end_date" className="block text-xs text-neutral-400 mb-2">
                                End Date (optional)
                            </label>
                            <input
                                id="end_date"
                                type="date"
                                value={data.end_date}
                                onChange={(e) => setData('end_date', e.target.value)}
                                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-200 focus:border-white focus:outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description_id" className="block text-xs text-neutral-400 mb-2">
                            Description (Indonesian)
                        </label>
                        <textarea
                            id="description_id"
                            value={data.description_id}
                            onChange={(e) => setData('description_id', e.target.value)}
                            rows="4"
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-200 focus:border-white focus:outline-none"
                            placeholder="Deskripsi pengalaman kerja..."
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
                            rows="4"
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-200 focus:border-white focus:outline-none"
                            placeholder="Work experience description..."
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
                            href="/admin/experiences"
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