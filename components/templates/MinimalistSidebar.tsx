"use client";

import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

export function MinimalistSidebar({ data }: any) {
    const accentColor = data?.accentColor || "#111"; // Black/Dark accent

    return (
        <div className="w-full min-h-full bg-white text-slate-800 font-sans p-0 shadow-lg flex">
            {/* Subtle Left Accent Bar */}
            <div className="w-1.5 bg-slate-900 flex-shrink-0" />

            <div className="flex-1 flex flex-col">
                {/* Clean Professional Header */}
                <div className="px-12 pt-16 pb-12 border-b border-slate-100 mb-10">
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-2">
                                {data?.personalInfo?.fullName || "Your Name"}
                            </h1>
                            <p className="text-xl font-bold text-accent uppercase tracking-widest mb-8">
                                {data?.title || "Professional Role"}
                            </p>

                            <div className="flex flex-wrap gap-y-3 gap-x-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                {data?.personalInfo?.email && (
                                    <div className="flex items-center gap-2">
                                        <Mail size={14} className="text-slate-400" />
                                        <span>{data.personalInfo.email}</span>
                                    </div>
                                )}
                                {data?.personalInfo?.phone && (
                                    <div className="flex items-center gap-2">
                                        <Phone size={14} className="text-slate-400" />
                                        <span>{data.personalInfo.phone}</span>
                                    </div>
                                )}
                                {data?.personalInfo?.location && (
                                    <div className="flex items-center gap-2">
                                        <MapPin size={14} className="text-slate-400" />
                                        <span>{data.personalInfo.location}</span>
                                    </div>
                                )}
                                {data?.personalInfo?.linkedin && (
                                    <div className="flex items-center gap-2">
                                        <Linkedin size={14} className="text-slate-400" />
                                        <span>LinkedIn</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Professional Photo */}
                        {data?.personalInfo?.profileImage && (
                            <div className="w-36 h-36 rounded-2xl overflow-hidden border border-slate-200 shadow-lg flex-shrink-0 ml-8 bg-slate-50 relative group">
                                <img
                                    src={data.personalInfo.profileImage}
                                    alt="Profile"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 border-4 border-white pointer-events-none rounded-2xl" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-12 px-12 gap-12 pb-20">
                    {/* Primary Content Column */}
                    <div className="col-span-8 space-y-12">
                        {/* Executive Summary */}
                        {data?.summary && (
                            <section className="space-y-4">
                                <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-4">
                                    <span className="text-accent">01.</span> Profile
                                </h2>
                                <p className="text-[14px] leading-relaxed text-slate-600 font-medium text-justify opacity-90 pl-10">
                                    {data.summary}
                                </p>
                            </section>
                        )}

                        {/* Professional Experience */}
                        {data?.experience?.length > 0 && (
                            <section className="space-y-8">
                                <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-4">
                                    <span className="text-accent">02.</span> Experience
                                </h2>
                                <div className="space-y-10 pl-10">
                                    {data.experience.map((exp: any, i: number) => (
                                        <div key={i} className="space-y-3 group resume-section">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter group-hover:text-accent transition-colors underline decoration-slate-100 underline-offset-4 decoration-2">
                                                    {exp.title}
                                                </h3>
                                                <span className="text-[10px] font-black text-slate-400 whitespace-nowrap bg-slate-50 px-2 py-0.5 rounded border border-slate-200 uppercase tracking-widest">
                                                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                                                </span>
                                            </div>
                                            <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest italic flex items-center gap-2">
                                                <Globe size={12} className="text-slate-300" />
                                                {exp.company}
                                            </p>
                                            <p className="text-[13px] leading-relaxed text-slate-600 font-medium whitespace-pre-line text-justify opacity-85">
                                                {exp.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Secondary Information Sidebar */}
                    <div className="col-span-4 space-y-12">
                        {/* Technical Expertise */}
                        {data?.skills?.technical?.length > 0 && (
                            <section className="space-y-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                                <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-4">
                                    <span className="text-accent">03.</span> Skills
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {data.skills.technical.map((s: string, i: number) => (
                                        <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase text-slate-600 shadow-sm hover:border-accent hover:text-accent transition-all">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Academic Background */}
                        {data?.education?.length > 0 && (
                            <section className="space-y-6">
                                <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-4">
                                    <span className="text-accent">04.</span> Education
                                </h2>
                                <div className="space-y-8 pl-10">
                                    {data.education.map((edu: any, i: number) => (
                                        <div key={i} className="space-y-2 resume-section">
                                            <h3 className="text-[13px] font-black text-slate-900 uppercase leading-snug">{edu.degree}</h3>
                                            <p className="text-[11px] font-bold text-slate-500 italic opacity-85">{edu.institution}</p>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{edu.graduationDate}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
