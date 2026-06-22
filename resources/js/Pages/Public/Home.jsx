import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
    Mail,
    MessageSquare,
    Briefcase,
    GraduationCap,
    Code,
    Layers,
    Monitor,
    Sun,
    Moon,
    LogIn,
    Send,
    User,
    Bot,
} from 'lucide-react';

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

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const [chatLoading, setChatLoading] = useState(false);
    const messagesEndRef = useRef(null);

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
    const bgInput = isDark ? 'bg-neutral-900' : 'bg-white';
    const hoverText = isDark ? 'hover:text-neutral-200' : 'hover:text-black';

    useEffect(() => {
        const saved = localStorage.getItem('chat_messages');
        if (saved) setChatMessages(JSON.parse(saved));
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages, chatLoading]);

    const handleChatSend = async (e) => {
        e.preventDefault();
        if (!chatInput.trim() || chatLoading) return;

        const userMsg = { sender: 'user', content: chatInput.trim() };
        const updated = [...chatMessages, userMsg];
        setChatMessages(updated);
        setChatInput('');
        setChatLoading(true);

        try {
            const res = await axios.post('/api/chat', {
                message: userMsg.content,
                session_token: localStorage.getItem('chat_session_token'),
            });
            localStorage.setItem('chat_session_token', res.data.session_token);
            const aiMsg = { sender: 'assistant', content: res.data.message };
            const finalMessages = [...updated, aiMsg];
            setChatMessages(finalMessages);
            localStorage.setItem('chat_messages', JSON.stringify(finalMessages));
        } catch (err) {
            const errorMsg = { sender: 'assistant', content: 'Sorry, something went wrong. Please try again.' };
            setChatMessages([...updated, errorMsg]);
        } finally {
            setChatLoading(false);
        }
    };

    const sectionTitle = (label, icon) => (
        <div className="mb-16 text-center">
            <h2 className={`text-3xl font-bold tracking-tight md:text-4xl ${t('text-neutral-900', 'text-white')}`}>
                {label}
            </h2>
        </div>
    );

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
                    <a href="#about" className={`px-4 py-2 rounded-full text-sm ${t('text-neutral-500', 'text-neutral-400')} transition-colors`}>
                        About
                    </a>
                    <a href="#skills" className={`px-4 py-2 rounded-full text-sm ${t('text-neutral-500', 'text-neutral-400')} transition-colors`}>
                        Skills
                    </a>
                    <a href="#experience" className={`px-4 py-2 rounded-full text-sm ${t('text-neutral-500', 'text-neutral-400')} transition-colors`}>
                        Experience
                    </a>
                    <a href="#projects" className={`px-4 py-2 rounded-full text-sm ${t('text-neutral-500', 'text-neutral-400')} transition-colors`}>
                        Projects
                    </a>
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className={`ml-2 p-2 rounded-full border ${border} ${hoverText} transition-all`}
                        aria-label="Toggle theme"
                    >
                        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </button>
                    <a
                        href="/admin/login"
                        className={`ml-1 flex items-center gap-1.5 rounded-full border ${border} px-3 py-1.5 text-xs font-medium ${hoverText} transition-all`}
                    >
                        <LogIn className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Login</span>
                    </a>
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
                    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
                        <h2 className={`text-3xl font-bold tracking-tight md:text-4xl mb-8 ${t('text-neutral-900', 'text-white')}`}>
                            About Me
                        </h2>
                        <p className={`leading-relaxed text-lg md:text-xl ${t('text-neutral-700', 'text-neutral-300')}`}>
                            {settings.about_me_id}
                        </p>
                    </div>
                </section>
            )}

            {/* Skills & Expertise */}
            <section id="skills" className={`border-t ${borderLight} ${bgAlt} transition-colors duration-500 py-24`}>
                <div className="mx-auto max-w-6xl px-6">
                    {sectionTitle('Skills & Expertise')}
                    <p className={`mx-auto mb-16 max-w-2xl text-center ${t('text-neutral-500', 'text-neutral-400')}`}>
                        A comprehensive overview of my technical skills, tools, and languages
                    </p>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {orderedCategories.map((category) => {
                            const IconComponent = category === 'Programming Languages' ? Code
                                : category === 'Frameworks' ? Layers
                                : category === 'Libraries & Tools' ? Layers
                                : category === 'Operating Systems' ? Monitor
                                : category === 'Languages' ? GraduationCap
                                : Code;

                            return (
                                <div key={category} className={`rounded-2xl border ${border} p-6 ${bgCard}`}>
                                    <div className="mb-4 flex items-center gap-2">
                                        <IconComponent className={`h-5 w-5 ${t('text-neutral-900', 'text-neutral-300')}`} />
                                        <h3 className={`text-sm font-semibold uppercase tracking-wider ${t('text-neutral-900', 'text-neutral-300')}`}>
                                            {category}
                                        </h3>
                                    </div>
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
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Experience */}
            <section id="experience" className={`border-t ${borderLight} ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'} transition-colors duration-500`}>
                <div className="mx-auto max-w-4xl px-6 py-24">
                    {sectionTitle('My Experiences')}

                    <div className="relative ml-4 space-y-12">
                        <div className={`absolute left-0 top-3 h-[calc(100%-0.75rem)] w-[1px] ${isDark ? 'bg-neutral-800' : 'bg-neutral-200'}`} />

                        {experiences.map((exp) => (
                            <div key={exp.id} className="relative pl-10">
                                {/* Bullet point */}
                                <span className={`absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 ${isDark ? 'border-neutral-600 bg-[#0a0a0a]' : 'border-neutral-400 bg-white'}`} />

                                {/* Company Icon */}
                                <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg ${isDark ? 'bg-neutral-800' : 'bg-neutral-100'} border ${border}`}>
                                    <Briefcase className={`h-5 w-5 ${t('text-neutral-900', 'text-neutral-300')}`} />
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

                                {/* Tech Tags */}
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
                    {sectionTitle('Featured Projects')}
                    <p className={`mx-auto mb-16 max-w-2xl text-center ${t('text-neutral-500', 'text-neutral-400')}`}>
                        A selection of recent work showcasing full-stack development and AI integration.
                    </p>

                    <div className="grid gap-6 md:grid-cols-2">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className={`group rounded-2xl border ${border} ${bgCard} transition-all duration-300 hover:border-neutral-400`}
                            >
                                <div className="overflow-hidden rounded-t-2xl border-b border-neutral-100">
                                    <div className="aspect-video w-full overflow-hidden">
                                        {/* FIX: Cek apakah ada thumbnail, kalau ada tampilkan gambarnya */}
                                        {project.thumbnail ? (
                                            <img 
                                                src={`/storage/${project.thumbnail}`} 
                                                alt={project.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                            />
                                        ) : (
                                            <div className={`flex h-full w-full items-center justify-center transition-transform duration-500 group-hover:scale-[1.02] ${isDark ? 'bg-[#121212]' : 'bg-neutral-50'}`}>
                                                <svg className={`h-10 w-10 ${isDark ? 'text-neutral-800' : 'text-neutral-200'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
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
                    {sectionTitle("Let's Create Something Amazing Together")}
                    <p className={`mx-auto mt-4 max-w-xl text-center ${t('text-neutral-500', 'text-neutral-400')}`}>
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                    </p>

                    <div className="mt-16 grid gap-4 md:grid-cols-2">
                        {/* Email */}
                        <a
                            href={`mailto:${settings.contact_email}`}
                            className={`group flex items-center gap-4 rounded-2xl border ${border} ${bgCard} p-6 transition-all duration-300 hover:border-neutral-400`}
                        >
                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${isDark ? 'bg-neutral-800' : 'bg-neutral-100'} border ${border}`}>
                                <Mail className={`h-5 w-5 ${t('text-neutral-900', 'text-neutral-300')}`} />
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
                                <MessageSquare className={`h-5 w-5 ${t('text-neutral-900', 'text-neutral-300')}`} />
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

            {/* Floating Chat Widget */}
            {!isDark && (
                <>
                    <button
                        onClick={() => setIsChatOpen(true)}
                        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition-all duration-300 hover:scale-105"
                        aria-label="Open chat"
                    >
                        <MessageSquare className="h-5 w-5" />
                    </button>

                    {isChatOpen && (
                        <div className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[380px] flex-col rounded-2xl border border-neutral-200 bg-white shadow-2xl">
                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
                                <div className="flex items-center gap-2">
                                    <Bot className="h-4 w-4 text-neutral-900" />
                                    <h3 className="text-xs font-semibold tracking-widest text-neutral-900 uppercase">AI Assistant</h3>
                                </div>
                                <button
                                    onClick={() => setIsChatOpen(false)}
                                    className="text-neutral-400 transition-colors hover:text-neutral-900"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto px-5 py-4">
                                {chatMessages.length === 0 ? (
                                    <div className="flex h-full items-center justify-center">
                                        <p className="text-center text-xs text-neutral-400">Ask me anything about my portfolio!</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {chatMessages.map((msg, idx) => (
                                            <div
                                                key={idx}
                                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div className={`flex items-start gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                                    <div className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${msg.sender === 'user' ? 'bg-neutral-900' : 'bg-neutral-200'}`}>
                                                        {msg.sender === 'user' ? (
                                                            <User className="h-3.5 w-3.5 text-white" />
                                                        ) : (
                                                            <Bot className="h-3.5 w-3.5 text-neutral-900" />
                                                        )}
                                                    </div>
                                                    <div
                                                        className={`rounded-lg px-3.5 py-2.5 text-sm ${
                                                            msg.sender === 'user'
                                                                ? 'bg-neutral-900 text-white'
                                                                : 'border border-neutral-200 bg-neutral-50 text-neutral-800'
                                                        }`}
                                                    >
                                                        {msg.content}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {chatLoading && (
                                            <div className="flex items-center gap-2 text-xs text-neutral-400">
                                                <Bot className="h-4 w-4" />
                                                <span>AI is thinking...</span>
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>
                                )}
                            </div>

                            {/* Input */}
                            <form onSubmit={handleChatSend} className="border-t border-neutral-200 p-3">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        placeholder="Type a message..."
                                        disabled={chatLoading}
                                        className="flex-1 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none disabled:opacity-50"
                                    />
                                    <button
                                        type="submit"
                                        disabled={chatLoading || !chatInput.trim()}
                                        className="rounded-lg bg-black px-3.5 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                                    >
                                        <Send className="h-4 w-4" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </>
            )}

            {/* Dark Mode Chat Widget */}
            {isDark && (
                <>
                    <button
                        onClick={() => setIsChatOpen(true)}
                        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-all duration-300 hover:scale-105"
                        aria-label="Open chat"
                    >
                        <MessageSquare className="h-5 w-5" />
                    </button>

                    {isChatOpen && (
                        <div className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[380px] flex-col rounded-2xl border border-neutral-800 bg-[#121212] shadow-2xl">
                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-neutral-800 px-5 py-4">
                                <div className="flex items-center gap-2">
                                    <Bot className="h-4 w-4 text-neutral-300" />
                                    <h3 className="text-xs font-semibold tracking-widest text-neutral-300 uppercase">AI Assistant</h3>
                                </div>
                                <button
                                    onClick={() => setIsChatOpen(false)}
                                    className="text-neutral-600 transition-colors hover:text-neutral-300"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto px-5 py-4">
                                {chatMessages.length === 0 ? (
                                    <div className="flex h-full items-center justify-center">
                                        <p className="text-center text-xs text-neutral-600">Ask me anything about my portfolio!</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {chatMessages.map((msg, idx) => (
                                            <div
                                                key={idx}
                                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div className={`flex items-start gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                                    <div className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${msg.sender === 'user' ? 'bg-white text-black' : 'border border-neutral-700 bg-[#0a0a0a]'}`}>
                                                        {msg.sender === 'user' ? (
                                                            <User className="h-3.5 w-3.5 text-black" />
                                                        ) : (
                                                            <Bot className="h-3.5 w-3.5 text-neutral-300" />
                                                        )}
                                                    </div>
                                                    <div
                                                        className={`rounded-lg px-3.5 py-2.5 text-sm ${
                                                            msg.sender === 'user'
                                                                ? 'bg-white text-black'
                                                                : 'border border-neutral-800 bg-neutral-900 text-neutral-300'
                                                        }`}
                                                    >
                                                        {msg.content}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {chatLoading && (
                                            <div className="flex items-center gap-2 text-xs text-neutral-600">
                                                <Bot className="h-4 w-4" />
                                                <span>AI is thinking...</span>
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>
                                )}
                            </div>

                            {/* Input */}
                            <form onSubmit={handleChatSend} className="border-t border-neutral-800 p-3">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        placeholder="Type a message..."
                                        disabled={chatLoading}
                                        className="flex-1 rounded-lg border border-neutral-800 bg-[#0a0a0a] px-3 py-2 text-sm text-neutral-200 placeholder:text-neutral-600 focus:border-neutral-600 focus:outline-none disabled:opacity-50"
                                    />
                                    <button
                                        type="submit"
                                        disabled={chatLoading || !chatInput.trim()}
                                        className="rounded-lg bg-white px-3.5 py-2 text-xs font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
                                    >
                                        <Send className="h-4 w-4" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}