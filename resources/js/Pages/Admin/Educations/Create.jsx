import React from 'react';
import AdminLayout from '@/Components/AdminLayout';
import { useForm } from '@inertiajs/react';

export default function EducationsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        institution: '',
        degree: '',
        start_year: '',
        end_year: '',
        description_id: '',
        description_en: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/educations');
    };

    return (
        <AdminLayout>
            <div className="max-w-2xl">
                <h1 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-8">
                    Add New Education
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="institution" className="block text-xs text-neutral-400 mb-2">
                            Institution
                        </label>
                        <input
                            id="institution"
                            type="text"
                            value={data.institution}
                            onChange={(e) => setData('institution', e.target.value)}
                            required
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-200 focus:border-white focus:outline-none"
                            placeholder="Universitas Indonesia"
                        />
                        {errors.institution && <p className="mt-1 text-xs text-red-400">{errors.institution}</p>}
                    </div>

                    <div>
                        <label htmlFor="degree" className="block text-xs text-neutral-400 mb-2">
                            Degree
                        </label>
                        <input
                            id="degree"
                            type="text"
                            value={data.degree}
                            onChange={(e) => setData('degree', e.target.value)}
                            required
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-200 focus:border-white focus:outline-none"
                            placeholder="Teknik Informatika"
                        />
                        {errors.degree && <p className="mt-1 text-xs text-red-400">{errors.degree}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="start_year" className="block text-xs text-neutral-400 mb-2">
                                Start Year
                            </label>
                            <input
                                id="start_year"
                                type="number"
                                value={data.start_year}
                                onChange={(e) => setData('start_year', e.target.value)}
                                required
                                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-200 focus:border-white focus:outline-none"
                                placeholder="2024"
                            />
                            {errors.start_year && <p className="mt-1 text-xs text-red-400">{errors.start_year}</p>}
                        </div>
                        <div>
                            <label htmlFor="end_year" className="block text-xs text-neutral-400 mb-2">
                                End Year (optional)
                            </label>
                            <input
                                id="end_year"
                                type="number"
                                value={data.end_year}
                                onChange={(e) => setData('end_year', e.target.value)}
                                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-200 focus:border-white focus:outline-none"
                                placeholder="2028"
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
                            rows="3"
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-200 focus:border-white focus:outline-none"
                            placeholder="Deskripsi pendidikan..."
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
                            placeholder="Education description..."
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-black transition-all hover:bg-neutral-200 disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save'}
                        </button>
                        <a
                            href="/admin/educations"
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