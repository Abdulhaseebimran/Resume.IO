"use client";

import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

export function ModernElegant({ data }: any) {
    const accentColor = data?.accentColor || "#c2a35d"; // Gold accent

    return (
        <div className="w-full min-h-[1056px] bg-[#fdfdfd] text-[#1a1a1a] font-serif p-0 shadow-lg border-t-[12px]" style={{ borderTopColor: accentColor }}>
            {/* Header */}
            <div className="pt-16 pb-12 px-16 text-center border-b border-slate-100">
                <h1 className="text-5xl font-light tracking-[0.2em] uppercase mb-4 text-[#111]">
                    {data?.personalInfo?.fullName || "Your Name"}
                </h1>
                <p className="text-sm font-bold tracking-[0.3em] uppercase text-slate-500 mb-8">
                    {data?.title || "Executive Role"}
                </p>
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    {data?.personalInfo?.location && <span className="flex items-center gap-2 underline decoration-slate-200 underline-offset-4">{data.personalInfo.location}</span>}
                    {data?.personalInfo?.email && <span className="flex items-center gap-2 underline decoration-slate-200 underline-offset-4">{data.personalInfo.email}</span>}
                    {data?.personalInfo?.phone && <span className="flex items-center gap-2 underline decoration-slate-200 underline-offset-4">{data.personalInfo.phone}</span>}
                </div>
            </div>

            <div className="grid grid-cols-12 px-16 py-12 gap-12">
                {/* Main Content (Wide) */}
                <div className="col-span-8 space-y-16">
                    {/* Summary */}
                    {data?.summary && (
                        <section className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-900 flex items-center gap-4">
                                <span>Profile</span>
                                <div className="h-[1px] bg-slate-100 flex-1" />
                            </h2>
                            <p className="text-[14px] leading-relaxed text-slate-600 font-sans italic opacity-90">
                                "{data.summary}"
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {data?.experience?.length > 0 && (
                        <section className="space-y-8">
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-900 flex items-center gap-4">
                                <span>Experience</span>
                                <div className="h-[1px] bg-slate-100 flex-1" />
                            </h2>
                            <div className="space-y-10">
                                {data.experience.map((exp: any, i: number) => (
                                    <div key={i} className="space-y-3">
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="text-lg font-bold text-[#111]">{exp.title}</h3>
                                            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                                                {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                                            </span>
                                        </div>
                                        <p className="text-xs font-black text-slate-500 tracking-widest uppercase italic">
                                            {exp.company}
                                        </p>
                                        <p className="text-[13px] leading-relaxed text-slate-600 font-sans whitespace-pre-line border-l-2 border-slate-50 pl-6">
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar (Narrow) */}
                <div className="col-span-4 space-y-16 pl-4">
                    {/* Skills */}
                    {data?.skills?.technical?.length > 0 && (
                        <section className="space-y-6">
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-900">Expertise</h2>
                            <div className="space-y-4">
                                {data.skills.technical.map((s: string, i: number) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                            <span>{s}</span>
                                        </div>
                                        <div className="h-[2px] bg-slate-100 w-full overflow-hidden">
                                            <div className="h-full bg-[#111] w-[85%]" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {data?.education?.length > 0 && (
                        <section className="space-y-6">
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-900">Academic</h2>
                            <div className="space-y-8">
                                {data.education.map((edu: any, i: number) => (
                                    <div key={i} className="space-y-2">
                                        <h3 className="text-xs font-bold text-[#111] uppercase tracking-wider">{edu.degree}</h3>
                                        <p className="text-[11px] text-slate-500 italic font-sans">{edu.institution}</p>
                                        <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">{edu.graduationDate}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>

            {/* Simple Decorative Footer */}
            <div className="mt-auto py-8 text-center border-t border-slate-50">
                <p className="text-[8px] uppercase tracking-[0.5em] text-slate-300 font-bold">
                    ResumeAI Executive Document
                </p>
            </div>
        </div>
    );
}
