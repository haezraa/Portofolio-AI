import React from 'react';
import AdminLayout from '@/Components/AdminLayout';
import { useForm } from '@inertiajs/react';

export default function SettingsIndex({ settings }) {
    const { data, setData, post, processing, errors } = useForm({
        site_name: settings?.site_name || '',
        about_me_id: settings?.about_me_id || '',
        about_me_en: settings?.about_me_en || '',
        contact_email: settings?.contact_email || '',
        whatsapp: settings?.whatsapp || '',
        linkedin: settings?.linkedin || '',
        github: settings?.github || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/settings');
    };

    return (
        <AdminLayout>
            <div className="max-w-2xl">
                <h1 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-8">
                    Site Settings
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="site_name" className="block text-xs text-neutral-400 mb-2">
                            Site Name
                        </label>
                        <input
                            id="site_name"
                            type="text"
                            value={data.site_name}
                            onChange={(e) => setData('site_name', e.target.value)}
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-200 focus:border-white focus:outline-none"
                            placeholder="Muhammad Akbar Hezra - AI Portfolio"
                        />
                    </div>

                    <div>
                        <label htmlFor="about_me_id" className="block text-xs text-neutral-400 mb-2">
                            About Me (Indonesian)
                        </label>
                        <textarea
                            id="about_me_id"
                            value={data.about_me_id}
                            onChange={(e) => setData('about_me_id', e.target.value)}
                            rows="4"
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-200 focus:border-white focus:outline-none"
                            placeholder="Deskripsi tentang saya..."
                        />
                    </div>

                    <div>
                        <label htmlFor="about_me_en" className="block text-xs text-neutral-400 mb-2">
                            About Me (English)
                        </label>
                        <textarea
                            id="about_me_en"
                            value={data.about_me_en}
                            onChange={(e) => setData('about_me_en', e.target.value)}
                            rows="4"
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-200 focus:border-white focus:outline-none"
                            placeholder="About me description..."
                        />
                    </div>

                    <div>
                        <label htmlFor="contact_email" className="block text-xs text-neutral-400 mb-2">
                            Contact Email
                        </label>
                        <input
                            id="contact_email"
                            type="email"
                            value={data.contact_email}
                            onChange={(e) => setData('contact_email', e.target.value)}
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-200 focus:border-white focus:outline-none"
                            placeholder="contact@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="whatsapp" className="block text-xs text-neutral-400 mb-2">
                            WhatsApp Number
                        </label>
                        <input
                            id="whatsapp"
                            type="text"
                            value={data.whatsapp}
                            onChange={(e) => setData('whatsapp', e.target.value)}
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-200 focus:border-white focus:outline-none"
                            placeholder="+62 812-3456-7890"
                        />
                    </div>

                    <div>
                        <label htmlFor="linkedin" className="block text-xs text-neutral-400 mb-2">
                            LinkedIn URL
                        </label>
                        <input
                            id="linkedin"
                            type="text"
                            value={data.linkedin}
                            onChange={(e) => setData('linkedin', e.target.value)}
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-200 focus:border-white focus:outline-none"
                            placeholder="https://linkedin.com/in/username"
                        />
                    </div>

                    <div>
                        <label htmlFor="github" className="block text-xs text-neutral-400 mb-2">
                            GitHub URL
                        </label>
                        <input
                            id="github"
                            type="text"
                            value={data.github}
                            onChange={(e) => setData('github', e.target.value)}
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-200 focus:border-white focus:outline-none"
                            placeholder="https://github.com/username"
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-black transition-all hover:bg-neutral-200 disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save Settings'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}