import React from 'react';

export default function Home({
    skills,
    educations,
    experiences,
    projects,
    settings = {},
}) {
    const avatarPlaceholder = 'data:image/svg+xml;base64,' + btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" fill="#222" />
            <circle cx="50" cy="40" r="20" fill="#555" />
            <path d="M50 65 C 25 65, 10 90, 10 95 L90 95 C90 90, 75 65, 50 65 Z" fill="#555" />
        </svg>
    `);

    return (
        <div className="min-h-screen bg-black text-gray-100 antialiased selection:bg-white selection:text-black">
            {/* Navbar */}
            <nav className="border-b border-gray-800">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                    <span className="text-lg font-bold tracking-tight text-white">
                        {settings.site_name || 'Portfolio'}
                    </span>
                    <a
                        href="#"
                        className="rounded-full border border-gray-700 px-4 py-1.5 text-sm transition hover:bg-white hover:text-black"
                    >
                        Get in touch
                    </a>
                </div>
            </nav>

            {/* Hero */}
            <section className="mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
                <div className="mb-8 flex justify-center">
                    <img
                        src={avatarPlaceholder}
                        alt="Profile"
                        className="h-28 w-28 rounded-full border border-gray-700 object-cover"
                    />
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
                    Muhammad Akbar Hezra
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
                    Software Engineer specializing in Fullstack Web Development & AI Integration.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <a
                        href="#projects"
                        className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition hover:bg-gray-200"
                    >
                        View Projects
                    </a>
                    <a
                        href="#contact"
                        className="rounded-full border border-gray-700 px-6 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-gray-900 hover:text-white"
                    >
                        Contact Me
                    </a>
                </div>
            </section>

            {/* About */}
            {settings.about_me_id && (
                <section className="border-t border-gray-800 bg-black">
                    <div className="mx-auto max-w-3xl px-6 py-20">
                        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white">About Me</h2>
                        <p className="leading-relaxed text-gray-400">{settings.about_me_id}</p>
                    </div>
                </section>
            )}

            {/* Skills */}
            <section className="border-t border-gray-800 bg-black">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <h2 className="mb-8 text-2xl font-semibold tracking-tight text-white">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                            <span
                                key={skill.name}
                                className="rounded-full border border-gray-800 bg-gray-950 px-4 py-1.5 text-sm text-gray-300"
                            >
                                {skill.name}
                                {skill.category && (
                                    <span className="ml-2 text-xs text-gray-600">· {skill.category}</span>
                                )}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience */}
            <section className="border-t border-gray-800 bg-black">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <h2 className="mb-8 text-2xl font-semibold tracking-tight text-white">Experience</h2>
                    <div className="space-y-8">
                        {experiences.map((item) => (
                            <div key={item.id} className="border-l border-gray-800 pl-6">
                                <p className="text-sm text-gray-500">
                                    {new Date(item.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                                    {item.end_date
                                        ? ` — ${new Date(item.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}`
                                        : ' — Present'}
                                </p>
                                <h3 className="mt-1 text-lg font-medium text-white">{item.position}</h3>
                                <p className="mt-0.5 text-sm text-gray-400">{item.company_or_organization}</p>
                                {item.description_id && (
                                    <div
                                        className="prose prose-invert mt-3 text-sm text-gray-500"
                                        dangerouslySetInnerHTML={{ __html: item.description_id }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Education */}
            <section className="border-t border-gray-800 bg-black">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <h2 className="mb-8 text-2xl font-semibold tracking-tight text-white">Education</h2>
                    <div className="space-y-6">
                        {educations.map((edu) => (
                            <div key={edu.id} className="border-l border-gray-800 pl-6">
                                <p className="text-sm text-gray-500">
                                    {edu.start_year}
                                    {edu.end_year ? ` — ${edu.end_year}` : ' — Present'}
                                </p>
                                <h3 className="mt-1 text-lg font-medium text-white">{edu.degree}</h3>
                                <p className="mt-0.5 text-sm text-gray-400">{edu.institution}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects */}
            <section id="projects" className="border-t border-gray-800 bg-black">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <h2 className="mb-8 text-2xl font-semibold tracking-tight text-white">Projects</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="rounded-2xl border border-gray-900 bg-gray-950 p-5 transition hover:border-gray-700"
                            >
                                <h3 className="text-lg font-medium text-white">{project.title}</h3>
                                {Array.isArray(project.technologies) && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="rounded-full border border-gray-800 px-3 py-1 text-xs text-gray-400"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <div className="mt-4 flex gap-3">
                                    {project.project_url && (
                                        <a
                                            href={project.project_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-xs text-gray-400 transition hover:text-white"
                                        >
                                            Live Preview
                                        </a>
                                    )}
                                    {project.github_url && (
                                        <a
                                            href={project.github_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-xs text-gray-400 transition hover:text-white"
                                        >
                                            View Code
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="border-t border-gray-800 bg-black">
                <div className="mx-auto max-w-5xl px-6 py-20 text-center">
                    <h2 className="text-2xl font-semibold tracking-tight text-white">Contact</h2>
                    {settings.contact_email && (
                        <a
                            href={`mailto:${settings.contact_email}`}
                            className="mt-4 inline-block text-gray-400 transition hover:text-white"
                        >
                            {settings.contact_email}
                        </a>
                    )}
                    <p className="mt-6 text-xs text-gray-700">
                        © {new Date().getFullYear()} {settings.site_name || 'Portfolio'}. All rights reserved.
                    </p>
                </div>
            </section>
        </div>
    );
}