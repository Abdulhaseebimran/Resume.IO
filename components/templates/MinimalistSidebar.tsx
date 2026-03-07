"use client";

import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

export function MinimalistSidebar({ data }: any) {
    const accentColor = data?.accentColor || "#111"; // Black/Dark accent

    return (
        <div className="w-full min-h-[1056px] bg-white text-slate-800 font-sans p-0 shadow-lg flex">
            {/* Minimal Left Sidebar */}
            <div className="w-12 bg-slate-900 flex-shrink-0 flex items-center justify-center">
                <div className="h-full w-[2px] bg-accent/30" />
            </div>

            <div className="flex-1">
                {/* Header Content (Main Section) */}
                <div className="px-12 pt-20 pb-12">
                    <h1 className="text-6xl font-black text-slate-900 tracking-[-0.04em] mb-4">
                        {data?.personalInfo?.fullName || "Your Name"}
                    </h1>
                    <p className="text-2xl font-bold text-accent tracking-tighter uppercase mb-6">
                        {data?.title || "Professional Role"}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm font-bold text-slate-400 uppercase tracking-widest border-b-[1px] border-slate-100 pb-12">
                        {data?.personalInfo?.location && <span>{data.personalInfo.location}</span>}
                        {data?.personalInfo?.email && <span>• {data.personalInfo.email}</span>}
                        {data?.personalInfo?.phone && <span>• {data.personalInfo.phone}</span>}
                    </div>
                </div>

                <div className="grid grid-cols-12 px-12 gap-16">
                    {/* Right Content (Primary) */}
                    <div className="col-span-8 space-y-12 pr-4">
                        {/* Summary */}
                        {data?.summary && (
                            <section className="space-y-4">
                                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-4">
                                    <div className="w-8 h-1 bg-accent" />
                                    <span>Overview</span>
                                </h2>
                                <p className="text-[14px] leading-relaxed text-slate-600 font-medium opacity-90 pl-12 text-justify">
                                    {data.summary}
                                </p>
                            </section>
                        )}

                        {/* Experience */}
                        {data?.experience?.length > 0 && (
                            <section className="space-y-6">
                                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-4">
                                    <div className="w-8 h-1 bg-accent" />
                                    <span>Career History</span>
                                </h2>
                                <div className="space-y-10 pl-12">
                                    {data.experience.map((exp: any, i: number) => (
                                        <div key={i} className="space-y-2 group transition-all">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter group-hover:text-accent transition-colors underline decoration-slate-100 underline-offset-4 decoration-2">{exp.title}</h3>
                                                <span className="text-[11px] font-black text-slate-400 whitespace-nowrap">
                                                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                                                </span>
                                            </div>
                                            <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-3 italic">
                                                {exp.company}
                                            </p>
                                            <p className="text-[13px] leading-relaxed text-slate-600 font-medium whitespace-pre-line text-justify opacity-80">
                                                {exp.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Sidebar Content */}
                    <div className="col-span-4 space-y-12">
                        {/* Skills */}
                        {data?.skills?.technical?.length > 0 && (
                            <section className="space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">Key Skills</h2>
                                <div className="flex flex-wrap gap-2">
                                    {data.skills.technical.map((s: string, i: number) => (
                                        <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase text-slate-600 shadow-sm hover:border-accent hover:text-accent transition-all">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Education */}
                        {data?.education?.length > 0 && (
                            <section className="space-y-6 pr-4">
                                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">Education</h2>
                                <div className="space-y-8">
                                    {data.education.map((edu: any, i: number) => (
                                        <div key={i} className="space-y-2">
                                            <h3 className="text-[13px] font-black text-slate-900 uppercase leading-tight">{edu.degree}</h3>
                                            <p className="text-[11px] font-bold text-slate-500 italic opacity-80">{edu.institution}</p>
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
