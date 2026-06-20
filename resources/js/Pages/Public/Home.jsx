import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home({
    skills,
    educations,
    experiences,
    projects,
    settings = {},
}) {
    const [isDark, setIsDark] = useState(() => {
        const stored = localStorage.getItem('theme');
        return stored ? stored === 'dark' : false;
    });

    const avatarPlaceholder = 'data:image/svg+xml;base64,' + btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="49" fill="none" stroke="#e5e5e5" stroke-width="1"/>
            <circle cx="50" cy="50" r="50" fill="#fafafa" />
            <circle cx="50" cy="40" r="16" fill="#e5e5e5" />
            <path d="M50 58 C 30 58, 14 82, 14 90 L86 90 C86 82, 70 58, 50 58 Z" fill="#e5e5e5" />
        </svg>
    `);

    useEffect(() => {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const t = (light, dark) => (isDark ? dark : light);
    const border = isDark ? 'border-neutral-800' : 'border-neutral-200';
    const borderLight = isDark ? 'border-neutral-900' : 'border-neutral-100';
    const bgCard = isDark ? 'bg-neutral-900' : 'bg-white';
    const bgAlt = isDark ? 'bg-[#0a0a0a]' : 'bg-neutral-50';

    const skillsByCategory = skills.reduce((acc, skill) => {
        const cat = skill.category || 'Other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill);
        return acc;
    }, {});

    const categoryOrder = ['Programming Languages', 'Frameworks', 'Libraries & Tools', 'Operating Systems', 'Languages', 'Other Skills'];
    const orderedCategories = Object.keys(skillsByCategory).sort((a, b) => {
        const idxA = categoryOrder.findIndex(c => a.toLowerCase().includes(c.toLowerCase()));
        const idxB = categoryOrder.findIndex(c => b.toLowerCase().includes(c.toLowerCase()));
        if (idxA === -1 && idxB === -1) return 0;
        if (idxA === -1) return 1;
        if (idxB === -1) return -1;
        return idxA - idxB;
    });

    return (
        <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-[#0a0a0a] text-neutral-100' : 'bg-white text-neutral-900'} antialiased`}>
            {/* Floating Navbar */}
            <nav className={`fixed top-6 left-1/2 z-50 -translate-x-1/2 ${isDark ? 'bg-[#121212]/80 border-neutral-800' : 'bg-white/80 border-neutral-200/80'} border backdrop-blur-md rounded-full shadow-lg`}>
                <div className="flex items-center gap-1 px-2 py-1.5">
                    <a href="#overview" className={`px-5 py-2 rounded-full text-sm font-medium ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                        Overview
                    </a>
                    <a href="#about" className={`px-4 py-2 rounded-full text-sm ${t('text-neutral-500', 'text-neutral-400')} ${t('hover:text-black', 'hover:text-neutral-200')} transition-colors`}>
                        About
                    </a>
                    <a href="#skills" className={`px-4 py-2 rounded-full text-sm ${t('text-neutral-500', 'text-neutral-400')} ${t('hover:text-black', 'hover:text-neutral-200')} transition-colors`}>
                        Skills
                    </a>
                    <a href="#experience" className={`px-4 py-2 rounded-full text-sm ${t('text-neutral-500', 'text-neutral-400')} ${t('hover:text-black', 'hover:text-neutral-200')} transition-colors`}>
                        Experience
                    </a>
                    <a href="#projects" className={`px-4 py-2 rounded-full text-sm ${t('text-neutral-500', 'text-neutral-400')} ${t('hover:text-black', 'hover:text-neutral-200')} transition-colors`}>
                        Projects
                    </a>
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className={`ml-2 p-2 rounded-full border ${border} ${t('hover:text-black', 'hover:text-neutral-200')} transition-all`}
                        aria-label="Toggle theme"
                    >
                        {isDark ? (
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="overview" className={`relative pt-32 pb-20 transition-colors duration-500 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
                <div className="mx-auto max-w-6xl px-6">
                    <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between">
                        {/* Left Side - Text */}
                        <div className="max-w-xl">
                            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                                Hi, I'm <span className={t('text-neutral-900', 'text-white')}>FullStack</span> <span className={t('text-neutral-900', 'text-white')}>Developer.</span>
                            </h1>
                            <p className={`mt-6 text-base leading-relaxed md:text-lg ${t('text-neutral-600', 'text-neutral-400')}`}>
                                A Full-Stack Developer based in Tangerang with a strong focus on clean architecture and modern web technologies. Specialized in building exceptional digital experiences with Laravel, React, and AI integration.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <a
                                    href="#projects"
                                    className="rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-neutral-800"
                                >
                                    View Projects ↗
                                </a>
                                <a
                                    href="#contact"
                                    className={`rounded-full border px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] ${border} ${t('text-neutral-900 hover:bg-neutral-50', 'text-neutral-300 hover:bg-neutral-900')}`}
                                >
                                    Contact Me ✉
                                </a>
                            </div>
                        </div>

                        {/* Right Side - Avatar with organic mask */}
                        <div className="relative">
                            <div className={`relative h-64 w-64 md:h-80 md:w-80 ${isDark ? 'bg-neutral-900' : 'bg-neutral-50'} overflow-hidden rounded-[3rem] rotate-3 border ${border}`}>
                                <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gradient-to-br from-neutral-200 to-transparent opacity-40 blur-2xl" />
                                <img
                                    src={avatarPlaceholder}
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />
                                <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-[#0a0a0a]/60' : 'bg-gradient-to-t from-white/40'} to-transparent`} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Me */}
            {settings.about_me_id && (
                <section id="about" className={`border-t ${borderLight} ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'} transition-colors duration-500`}>
                    <div className="mx-auto max-w-3xl px-6 py-24">
                        <div className="text-center">
                            <h2 className={`text-xs font-semibold tracking-widest ${t('text-neutral-500', 'text-neutral-400')} uppercase mb-4`}>
                                About Me
                            </h2>
                            <p className={`leading-relaxed text-lg md:text-xl ${t('text-neutral-700', 'text-neutral-300')}`}>
                                {settings.about_me_id}
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {/* Skills & Expertise */}
            <section id="skills" className={`border-t ${borderLight} ${bgAlt} transition-colors duration-500 py-24`}>
                <div className="mx-auto max-w-6xl px-6">
                    <div className="mb-16 text-center">
                        <h2 className={`text-3xl font-bold tracking-tight ${t('text-neutral-900', 'text-white')} md:text-4xl`}>
                            Skills & Expertise
                        </h2>
                        <p className={`mx-auto mt-4 max-w-2xl ${t('text-neutral-500', 'text-neutral-400')}`}>
                            A comprehensive overview of my technical skills, tools, and languages
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {orderedCategories.map((category) => (
                            <div
                                key={category}
                                className={`rounded-2xl border ${border} p-6 ${bgCard}`}
                            >
                                <h3 className={`mb-4 text-sm font-semibold uppercase tracking-wider ${t('text-neutral-900', 'text-neutral-300')}`}>
                                    {category}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {skillsByCategory[category].map((skill) => (
                                        <span
                                            key={skill.name}
                                            className={`rounded-full px-3 py-1 text-sm font-medium ${isDark ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-100 text-neutral-800'}`}
                                        >
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience */}
            <section id="experience" className={`border-t ${borderLight} ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'} transition-colors duration-500`}>
                <div className="mx-auto max-w-4xl px-6 py-24">
                    <div className="mb-16 text-center">
                        <h2 className={`text-3xl font-bold tracking-tight ${t('text-neutral-900', 'text-white')} md:text-4xl`}>
                            My Experiences
                        </h2>
                    </div>

                    <div className="relative ml-4 space-y-12">
                        <div className={`absolute left-0 top-3 h-[calc(100%-0.75rem)] w-[1px] ${isDark ? 'bg-neutral-800' : 'bg-neutral-200'}`} />

                        {experiences.map((exp) => (
                            <div key={exp.id} className="relative pl-10">
                                {/* Bullet point */}
                                <span className={`absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 ${isDark ? 'border-neutral-600 bg-[#0a0a0a]' : 'border-neutral-400 bg-white'}`} />

                                {/* Company Icon Placeholder */}
                                <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg ${isDark ? 'bg-neutral-800' : 'bg-neutral-100'} border ${border}`}>
                                    <svg className={`h-5 w-5 ${t('text-neutral-900', 'text-neutral-300')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>

                                <h3 className={`text-lg font-semibold ${t('text-neutral-900', 'text-white')}`}>
                                    {exp.company_or_organization}
                                </h3>
                                <p className={`text-base font-medium ${t('text-neutral-700', 'text-neutral-300')}`}>
                                    {exp.position}
                                </p>
                                <p className={`mt-1 text-sm ${t('text-neutral-500', 'text-neutral-500')}`}>
                                    {new Date(exp.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                                    {exp.end_date
                                        ? ` - ${new Date(exp.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}`
                                        : ' - Present'}
                                </p>

                                {exp.description_id && (
                                    <div
                                        className={`prose prose-sm mt-4 max-w-none ${isDark ? 'prose-invert text-neutral-400' : 'text-neutral-600'}`}
                                        dangerouslySetInnerHTML={{ __html: exp.description_id }}
                                    />
                                )}

                                {/* Tech Tags used during role */}
                                <div className={`mt-4 flex flex-wrap gap-2`}>
                                    {['Laravel', 'React', 'Tailwind CSS', 'AI Integration'].map((tech) => (
                                        <span
                                            key={tech}
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${isDark ? 'border border-neutral-800 bg-neutral-900 text-neutral-400' : 'border border-neutral-200 bg-neutral-50 text-neutral-600'}`}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects */}
            <section id="projects" className={`border-t ${borderLight} ${bgAlt} transition-colors duration-500 py-24`}>
                <div className="mx-auto max-w-6xl px-6">
                    <div className="mb-16 text-center">
                        <h2 className={`text-3xl font-bold tracking-tight ${t('text-neutral-900', 'text-white')} md:text-4xl`}>
                            Featured Projects
                        </h2>
                        <p className={`mx-auto mt-4 max-w-2xl ${t('text-neutral-500', 'text-neutral-400')}`}>
                            A selection of recent work showcasing full-stack development and AI integration.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className={`group rounded-2xl border ${border} ${bgCard} transition-all duration-300 hover:border-neutral-400`}
                            >
                                <div className="overflow-hidden rounded-t-2xl border-b border-neutral-100">
                                    <div className="aspect-video w-full overflow-hidden">
                                        <div className={`flex h-full w-full items-center justify-center transition-transform duration-500 group-hover:scale-[1.02] ${isDark ? 'bg-[#121212]' : 'bg-neutral-50'}`}>
                                            <svg className={`h-10 w-10 ${isDark ? 'text-neutral-800' : 'text-neutral-200'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className={`text-lg font-semibold ${t('text-neutral-900', 'text-white')}`}>{project.title}</h3>
                                    {Array.isArray(project.technologies) && (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {project.technologies.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className={`rounded-full border px-3 py-1 text-xs font-medium ${isDark ? 'border-neutral-800 bg-neutral-900 text-neutral-400' : 'border-neutral-200 bg-neutral-50 text-neutral-600'}`}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <div className={`mt-4 flex gap-4 text-sm font-medium`}>
                                        {project.project_url && (
                                            <a
                                                href={project.project_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className={`flex items-center gap-1 transition-colors ${t('text-neutral-900 hover:text-neutral-600', 'text-neutral-300 hover:text-white')}`}
                                            >
                                                Live Preview <span>↗</span>
                                            </a>
                                        )}
                                        {project.github_url && (
                                            <a
                                                href={project.github_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className={`flex items-center gap-1 transition-colors ${t('text-neutral-900 hover:text-neutral-600', 'text-neutral-300 hover:text-white')}`}
                                            >
                                                View Code <span>↗</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className={`border-t ${borderLight} ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'} transition-colors duration-500`}>
                <div className="mx-auto max-w-5xl px-6 py-24">
                    <div className="mb-16 text-center">
                        <h2 className={`text-3xl font-bold tracking-tight ${t('text-neutral-900', 'text-white')} md:text-4xl`}>
                            Let's Create Something<br />Amazing Together
                        </h2>
                        <p className={`mx-auto mt-4 max-w-xl ${t('text-neutral-500', 'text-neutral-400')}`}>
                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {/* Email */}
                        <a
                            href={`mailto:${settings.contact_email}`}
                            className={`group flex items-center gap-4 rounded-2xl border ${border} ${bgCard} p-6 transition-all duration-300 hover:border-neutral-400`}
                        >
                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${isDark ? 'bg-neutral-800' : 'bg-neutral-100'} border ${border}`}>
                                <svg className={`h-5 w-5 ${t('text-neutral-900', 'text-neutral-300')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className={`text-sm font-medium ${t('text-neutral-500', 'text-neutral-400')}`}>Email</p>
                                <p className={`mt-0.5 text-sm font-semibold ${t('text-neutral-900', 'text-white')}`}>{settings.contact_email || 'akbarhezra@example.com'}</p>
                            </div>
                            <span className={`text-lg transition-colors ${t('text-neutral-900 group-hover:text-neutral-600', 'text-neutral-300 group-hover:text-white')}`}>↗</span>
                        </a>

                        {/* WhatsApp */}
                        <a
                            href="https://wa.me/6281234567890"
                            target="_blank"
                            rel="noreferrer"
                            className={`group flex items-center gap-4 rounded-2xl border ${border} ${bgCard} p-6 transition-all duration-300 hover:border-neutral-400`}
                        >
                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${isDark ? 'bg-neutral-800' : 'bg-neutral-100'} border ${border}`}>
                                <svg className={`h-5 w-5 ${t('text-neutral-900', 'text-neutral-300')}`} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className={`text-sm font-medium ${t('text-neutral-500', 'text-neutral-400')}`}>WhatsApp</p>
                                <p className={`mt-0.5 text-sm font-semibold ${t('text-neutral-900', 'text-white')}`}>+62 812-3456-7890</p>
                            </div>
                            <span className={`text-lg transition-colors ${t('text-neutral-900 group-hover:text-neutral-600', 'text-neutral-300 group-hover:text-white')}`}>↗</span>
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="https://linkedin.com/in/akbarhezra"
                            target="_blank"
                            rel="noreferrer"
                            className={`group flex items-center gap-4 rounded-2xl border ${border} ${bgCard} p-6 transition-all duration-300 hover:border-neutral-400`}
                        >
                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${isDark ? 'bg-neutral-800' : 'bg-neutral-100'} border ${border}`}>
                                <svg className={`h-5 w-5 ${t('text-neutral-900', 'text-neutral-300')}`} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className={`text-sm font-medium ${t('text-neutral-500', 'text-neutral-400')}`}>LinkedIn</p>
                                <p className={`mt-0.5 text-sm font-semibold ${t('text-neutral-900', 'text-white')}`}>in/akbarhezra</p>
                            </div>
                            <span className={`text-lg transition-colors ${t('text-neutral-900 group-hover:text-neutral-600', 'text-neutral-300 group-hover:text-white')}`}>↗</span>
                        </a>

                        {/* GitHub */}
                        <a
                            href="https://github.com/akbarhezra"
                            target="_blank"
                            rel="noreferrer"
                            className={`group flex items-center gap-4 rounded-2xl border ${border} ${bgCard} p-6 transition-all duration-300 hover:border-neutral-400`}
                        >
                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${isDark ? 'bg-neutral-800' : 'bg-neutral-100'} border ${border}`}>
                                <svg className={`h-5 w-5 ${t('text-neutral-900', 'text-neutral-300')}`} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className={`text-sm font-medium ${t('text-neutral-500', 'text-neutral-400')}`}>GitHub</p>
                                <p className={`mt-0.5 text-sm font-semibold ${t('text-neutral-900', 'text-white')}`}>@akbarhezra</p>
                            </div>
                            <span className={`text-lg transition-colors ${t('text-neutral-900 group-hover:text-neutral-600', 'text-neutral-300 group-hover:text-white')}`}>↗</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className={`border-t ${borderLight} ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'} transition-colors duration-500`}>
                <div className="mx-auto max-w-5xl px-6 py-12 text-center">
                    <p className={`text-xs ${t('text-neutral-400', 'text-neutral-600')}`}>
                        © {new Date().getFullYear()} {settings.site_name || 'Muhammad Akbar Hezra'}. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}