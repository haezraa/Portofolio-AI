import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] p-4">
            <div className="w-full max-w-sm">
                <div className="border border-neutral-800 rounded-2xl p-8 bg-neutral-900/50">
                    <h1 className="text-2xl font-bold text-white mb-2 text-center">Sign In</h1>
                    <p className="text-xs text-neutral-500 text-center mb-8">Admin Dashboard Access</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="text-xs text-neutral-400 mb-2 block">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                className="w-full rounded-lg border border-neutral-700 bg-transparent px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-white focus:outline-none"
                                placeholder="admin@example.com"
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="text-xs text-neutral-400 mb-2 block">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                className="w-full rounded-lg border border-neutral-700 bg-transparent px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-white focus:outline-none"
                                placeholder="••••••••"
                            />
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-400">{errors.password}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-white py-2.5 text-sm font-semibold text-black transition-all hover:bg-neutral-200 disabled:opacity-50"
                        >
                            {processing ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}