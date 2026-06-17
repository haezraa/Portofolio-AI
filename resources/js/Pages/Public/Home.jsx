import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function Home({
    skills,
    educations,
    experiences,
    projects,
    settings = {},
}) {
    const avatarPlaceholder = 'data:image/svg+xml;base64,' + btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="49" fill="none" stroke="#333" stroke-width="1" stroke-dasharray="2 2"/>
            <circle cx="50" cy="50" r="50" fill="#111" />
            <circle cx="50" cy="40" r="16" fill="#1a1a1a" />
            <path d="M50 58 C 30 58, 14 82, 14 90 L86 90 C86 82, 70 58, 50 58 Z" fill="#1a1a1a" />
        </svg>
    `);

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('chat_session_token');
        const savedMessages = localStorage.getItem('chat_messages');
        if (savedToken) {
            // Load existing session messages
        }
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = { sender: 'user', content: input.trim() };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const response = await axios.post('/api/chat', {
                message: input.trim(),
                session_token: localStorage.getItem('chat_session_token'),
            });

            localStorage.setItem('chat_session_token', response.data.session_token);
            const aiMessage = { sender: 'assistant', content: response.data.message };
            const updatedMessages = [...newMessages, aiMessage];
            setMessages(updatedMessages);
            localStorage.setItem('chat_messages', JSON.stringify(updatedMessages));
        } catch (error) {
            console.error(error);
            setMessages([...newMessages, { sender: 'assistant', content: 'Error: Could not get response.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 antialiased selection:bg-white selection:text-black">
            {/* Navbar */}
            <nav className="backdrop-blur-md bg-[#0a0a0a]/70 border-b border-neutral-900 sticky top-0 z-50">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                    <span className="text-sm font-medium tracking-widest text-neutral-300 uppercase">
                        {settings.site_name || 'Portfolio'}
                    </span>
                    <a
                        href="#contact"
                        className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-neutral-200"
                    >
                        Get in touch
                    </a>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative mx-auto max-w-5xl px-6 pt-28 pb-24 text-center">
                <div className="relative mx-auto mb-10 flex justify-center">
                    <div className="rounded-full border border-neutral-800 p-1">
                        <img
                            src={avatarPlaceholder}
                            alt="Profile"
                            className="h-28 w-28 rounded-full bg-[#121212] object-cover"
                        />
                    </div>
                </div>
                <h1 className="text-4xl font-bold tracking-tighter text-neutral-100 md:text-6xl lg:text-7xl">
                    Muhammad Akbar Hezra
                </h1>
                <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg">
                    Software Engineer specializing in Fullstack Web Development & AI Integration.
                </p>
                <div className="mt-10 flex justify-center gap-4">
                    <a
                        href="#projects"
                        className="rounded-full bg-white px-7 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-neutral-200"
                    >
                        View Projects
                    </a>
                    <a
                        href="#contact"
                        className="rounded-full border border-neutral-800 bg-transparent px-7 py-2.5 text-sm font-semibold text-neutral-300 transition-all duration-300 hover:scale-[1.02] hover:border-neutral-700 hover:bg-neutral-900"
                    >
                        Contact Me
                    </a>
                </div>
            </section>

            {/* About */}
            {settings.about_me_id && (
                <section className="border-t border-neutral-900">
                    <div className="mx-auto max-w-3xl px-6 py-24">
                        <h2 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-8">
                            About Me
                        </h2>
                        <p className="leading-relaxed text-neutral-300 text-lg">
                            {settings.about_me_id}
                        </p>
                    </div>
                </section>
            )}

            {/* Skills */}
            <section className="border-t border-neutral-900">
                <div className="mx-auto max-w-5xl px-6 py-24">
                    <h2 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-8">
                        Skills
                    </h2>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                        {skills.map((skill) => (
                            <div
                                key={skill.name}
                                className="border border-neutral-900 bg-[#121212]/50 p-4 rounded-lg transition-colors hover:border-neutral-700"
                            >
                                <p className="text-sm font-medium text-neutral-200">{skill.name}</p>
                                {skill.category && (
                                    <p className="mt-1 text-xs text-neutral-600">{skill.category}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience */}
            <section className="border-t border-neutral-900">
                <div className="mx-auto max-w-5xl px-6 py-24">
                    <h2 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-12">
                        Experience
                    </h2>
                    <div className="relative ml-3 space-y-12">
                        <div className="absolute left-0 top-3 h-[calc(100%-0.75rem)] w-[1px] bg-neutral-800" />
                        {experiences.map((item) => (
                            <div key={item.id} className="relative pl-10">
                                <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full border border-neutral-700 bg-[#0a0a0a]" />
                                <p className="text-xs text-neutral-600 tracking-wide">
                                    {new Date(item.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                                    {item.end_date
                                        ? ` — ${new Date(item.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}`
                                        : ' — Present'}
                                </p>
                                <h3 className="mt-1.5 text-base font-semibold text-neutral-100">{item.position}</h3>
                                <p className="mt-1 text-sm text-neutral-500">{item.company_or_organization}</p>
                                {item.description_id && (
                                    <div
                                        className="prose prose-invert mt-4 text-sm text-neutral-400"
                                        dangerouslySetInnerHTML={{ __html: item.description_id }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Education */}
            <section className="border-t border-neutral-900">
                <div className="mx-auto max-w-5xl px-6 py-24">
                    <h2 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-12">
                        Education
                    </h2>
                    <div className="relative ml-3 space-y-10">
                        <div className="absolute left-0 top-3 h-[calc(100%-0.75rem)] w-[1px] bg-neutral-800" />
                        {educations.map((edu) => (
                            <div key={edu.id} className="relative pl-10">
                                <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full border border-neutral-700 bg-[#0a0a0a]" />
                                <p className="text-xs text-neutral-600 tracking-wide">
                                    {edu.start_year}
                                    {edu.end_year ? ` — ${edu.end_year}` : ' — Present'}
                                </p>
                                <h3 className="mt-1.5 text-base font-semibold text-neutral-100">{edu.degree}</h3>
                                <p className="mt-1 text-sm text-neutral-500">{edu.institution}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects */}
            <section id="projects" className="border-t border-neutral-900">
                <div className="mx-auto max-w-5xl px-6 py-24">
                    <h2 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-10">
                        Projects
                    </h2>
                    <div className="grid gap-5 md:grid-cols-2">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="group rounded-xl border border-neutral-900 bg-[#121212]/40 transition-all duration-300 hover:border-neutral-700"
                            >
                                <div className="overflow-hidden rounded-t-xl border-b border-neutral-900 bg-[#161616]">
                                    <div className="aspect-video w-full overflow-hidden">
                                        <div className="flex h-full w-full items-center justify-center bg-[#121212] transition-transform duration-500 group-hover:scale-[1.02]">
                                            <svg className="h-8 w-8 text-neutral-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-base font-semibold text-neutral-100">{project.title}</h3>
                                    {Array.isArray(project.technologies) && (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {project.technologies.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="rounded-full border border-neutral-900 bg-[#0a0a0a] px-3 py-1 text-xs text-neutral-500 transition-colors group-hover:border-neutral-800"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <div className="mt-4 flex gap-4">
                                        {project.project_url && (
                                            <a
                                                href={project.project_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-xs font-medium text-neutral-500 transition-colors hover:text-white"
                                            >
                                                Live Preview
                                            </a>
                                        )}
                                        {project.github_url && (
                                            <a
                                                href={project.github_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-xs font-medium text-neutral-500 transition-colors hover:text-white"
                                            >
                                                View Code
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
            <section id="contact" className="border-t border-neutral-900">
                <div className="mx-auto max-w-5xl px-6 py-24 text-center">
                    <h2 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-6">
                        Contact
                    </h2>
                    {settings.contact_email && (
                        <a
                            href={`mailto:${settings.contact_email}`}
                            className="inline-block text-lg font-medium text-neutral-300 transition-colors hover:text-white"
                        >
                            {settings.contact_email}
                        </a>
                    )}
                    <p className="mt-10 text-xs text-neutral-700">
                        © {new Date().getFullYear()} {settings.site_name || 'Portfolio'}. All rights reserved.
                    </p>
                </div>
            </section>

            {/* Floating Chat Button */}
            <button
                onClick={() => setIsChatOpen(true)}
                className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-all duration-300 hover:scale-105"
                aria-label="Open chat"
            >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.41-4.03 8-9 8a9.86 9.86 0 01-4-.8l-4.2 1.1 1.2-4.2A8.03 8.03 0 013 12c0-4.41 4.03-8 9-8s9 3.59 9 8z" />
                </svg>
            </button>

            {/* Chat Window */}
            {isChatOpen && (
                <div className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[380px] flex-col rounded-2xl border border-neutral-800 bg-[#0a0a0a] shadow-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-neutral-800 px-5 py-4">
                        <h3 className="text-xs font-semibold tracking-widest text-neutral-400 uppercase">AI Assistant</h3>
                        <button
                            onClick={() => setIsChatOpen(false)}
                            className="text-neutral-600 transition-colors hover:text-white"
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-5 py-4">
                        {messages.length === 0 ? (
                            <p className="text-center text-xs text-neutral-600">Ask me anything about my portfolio!</p>
                        ) : (
                            <div className="space-y-4">
                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm ${
                                                msg.sender === 'user'
                                                    ? 'bg-white text-black'
                                                    : 'border border-neutral-800 bg-neutral-900 text-neutral-200'
                                            }`}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                                {loading && (
                                    <div className="text-xs text-neutral-600">AI is thinking...</div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} className="border-t border-neutral-800 p-3">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type a message..."
                                disabled={loading}
                                className="flex-1 rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-white disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={loading || !input.trim()}
                                className="rounded-md bg-white px-3.5 py-2 text-xs font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}