"use client";

import { Mail, Phone, MapPin, Globe, Linkedin, Github, Sparkles, Star } from "lucide-react";

export function CreativePortfolio({ data }: any) {
    const accentColor = data?.accentColor || "#ff4d4d"; // Vibrant Red/Orange accent

    return (
        <div className="w-full min-h-[1056px] bg-[#f9fafc] text-slate-900 font-sans p-0 shadow-lg relative overflow-hidden">
            {/* Top Wave/Accent */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent opacity-5 rounded-bl-[100%] z-0" />
            <div className="absolute top-10 right-10 flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-accent/20 text-accent font-bold text-[10px] uppercase shadow-lg z-10">
                <Sparkles size={12} />
                <span>Featured Talent</span>
            </div>

            {/* Header Content */}
            <div className="relative z-10 px-16 pt-24 pb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-200 bg-white/50 backdrop-blur-sm">
                <div className="space-y-4">
                    <h1 className="text-7xl font-black tracking-tighter text-slate-900 leading-[0.85] uppercase decoration-accent decoration-offset-4 decoration-8 underline">
                        {data?.personalInfo?.fullName || "Your Name"}
                    </h1>
                    <p className="text-xl font-bold text-accent tracking-widest uppercase">
                        {data?.title || "Creative Professional"}
                    </p>
                </div>
                <div className="flex flex-col gap-3 text-[11px] font-black uppercase text-slate-500 tracking-wider">
                    {data?.personalInfo?.email && <p className="flex items-center gap-2"><Mail size={14} className="text-accent" />{data.personalInfo.email}</p>}
                    {data?.personalInfo?.phone && <p className="flex items-center gap-2"><Phone size={14} className="text-accent" />{data.personalInfo.phone}</p>}
                    {data?.personalInfo?.location && <p className="flex items-center gap-2"><MapPin size={14} className="text-accent" />{data.personalInfo.location}</p>}
                </div>
            </div>

            <div className="grid grid-cols-12 px-16 py-12 gap-12 relative z-10 transition-all">
                {/* Left Column (Main Section) */}
                <div className="col-span-8 space-y-12">
                    {/* Summary */}
                    {data?.summary && (
                        <section className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-accent flex items-center gap-3">
                                <Star fill="currentColor" size={14} />
                                <span>Vision Statement</span>
                            </h2>
                            <p className="text-[15px] leading-relaxed text-slate-700 font-medium opacity-90 pl-6 border-l-4 border-slate-100 italic select-none">
                                {data.summary}
                            </p>
                        </section>
                    )}

                    {/* Experience (Projects Style) */}
                    {data?.experience?.length > 0 && (
                        <section className="space-y-8">
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-accent flex items-center gap-3">
                                <Star fill="currentColor" size={14} />
                                <span>Core Achievements</span>
                            </h2>
                            <div className="grid grid-cols-2 gap-6 pl-6">
                                {data.experience.map((exp: any, i: number) => (
                                    <div key={i} className="p-6 bg-white border-2 border-slate-50 rounded-3xl hover:border-accent/40 shadow-sm hover:shadow-xl transition-all duration-300 group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="h-2 w-12 bg-accent rounded-full mb-4 opacity-30 group-hover:opacity-100 transition-all" />
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mt-1">
                                                {exp.startDate} - {exp.endDate || "PRESENT"}
                                            </span>
                                        </div>
                                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-tighter mb-1 line-clamp-1">{exp.title}</h3>
                                        <p className="text-xs font-bold text-accent italic mb-4">{exp.company}</p>
                                        <p className="text-[11px] leading-relaxed text-slate-600 font-medium opacity-80 line-clamp-4">
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column (Sidebar Style) */}
                <div className="col-span-4 space-y-12 pr-4">
                    {/* Skills (Bubble Style) */}
                    {data?.skills?.technical?.length > 0 && (
                        <section className="space-y-6">
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-accent">Strategic Toolkit</h2>
                            <div className="grid grid-cols-2 gap-2">
                                {data.skills.technical.map((s: string, i: number) => (
                                    <div key={i} className="px-4 py-3 bg-white border border-slate-100 rounded-2xl flex flex-col gap-1 items-center justify-center text-center shadow-sm hover:scale-105 transition-all">
                                        <span className="text-[10px] font-black uppercase text-slate-800 tracking-tighter">{s}</span>
                                        <div className="h-1 w-8 bg-accent/20 rounded-full" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {data?.education?.length > 0 && (
                        <section className="space-y-6">
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-accent">Academic Context</h2>
                            <div className="space-y-2">
                                {data.education.map((edu: any, i: number) => (
                                    <div key={i} className="p-5 bg-[#f3f6ff]/30 backdrop-blur-md border border-white rounded-[2rem] shadow-inner">
                                        <h3 className="text-xs font-black text-slate-900 uppercase mb-1">{edu.degree}</h3>
                                        <p className="text-[11px] font-bold text-slate-500 italic opacity-80 mb-2 leading-tight">{edu.institution}</p>
                                        <span className="text-[9px] font-black text-accent uppercase tracking-widest">{edu.graduationDate}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>

            {/* Aesthetic Bottom Accent */}
            <div className="absolute bottom-0 left-0 w-full h-[8px] bg-gradient-to-r from-accent to-blue-400" />
        </div>
    );
}
