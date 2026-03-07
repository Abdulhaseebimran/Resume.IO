"use client";

import { User, Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

export function ProfessionalTwoColumn({ data }: any) {
    const accentColor = data?.accentColor || "#2563eb";

    return (
        <div className="w-full min-h-[1056px] bg-white text-slate-800 font-sans p-0 shadow-lg">
            {/* Header Section */}
            <div className="bg-slate-100 p-10 flex justify-between items-center relative overflow-hidden">
                <div className="z-10">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2 uppercase">
                        {data?.personalInfo?.fullName || "Your Name"}
                    </h1>
                    <p className="text-lg font-bold text-slate-600 uppercase tracking-[0.2em]">
                        {data?.title || "Professional Role"}
                    </p>
                </div>

                {/* Circular Photo */}
                <div className="z-10">
                    <div className="w-36 h-36 rounded-full border-8 border-white shadow-xl overflow-hidden bg-white flex items-center justify-center">
                        {data?.personalInfo?.image ? (
                            <img src={data.personalInfo.image} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <User size={64} className="text-slate-200" />
                        )}
                    </div>
                </div>

                {/* Subtle Decorative Element */}
                <div className="absolute top-0 right-0 w-32 h-full bg-slate-200/50 -skew-x-12 transform origin-top translate-x-10" />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 min-h-[800px]">
                {/* Left Column (35%) */}
                <div className="col-span-4 bg-white p-10 space-y-10 border-r border-slate-100">
                    {/* Contact Info */}
                    <section className="space-y-4">
                        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 border-b-2 border-slate-100 pb-2">
                            Contact
                        </h2>
                        <div className="space-y-3 text-[12px] text-slate-600 font-medium">
                            {data?.personalInfo?.phone && (
                                <div className="flex items-center gap-3">
                                    <Phone size={14} className="text-slate-400" />
                                    <span>{data.personalInfo.phone}</span>
                                </div>
                            )}
                            {data?.personalInfo?.email && (
                                <div className="flex items-center gap-3">
                                    <Mail size={14} className="text-slate-400" />
                                    <span className="truncate">{data.personalInfo.email}</span>
                                </div>
                            )}
                            {data?.personalInfo?.location && (
                                <div className="flex items-center gap-3">
                                    <MapPin size={14} className="text-slate-400" />
                                    <span>{data.personalInfo.location}</span>
                                </div>
                            )}
                            {data?.personalInfo?.github && (
                                <div className="flex items-center gap-3">
                                    <Github size={14} className="text-slate-400" />
                                    <span>{data.personalInfo.github}</span>
                                </div>
                            )}
                            {data?.personalInfo?.linkedin && (
                                <div className="flex items-center gap-3">
                                    <Linkedin size={14} className="text-slate-400" />
                                    <span>{data.personalInfo.linkedin}</span>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Skills */}
                    {data?.skills?.technical?.length > 0 && (
                        <section className="space-y-4">
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 border-b-2 border-slate-100 pb-2">
                                Skills
                            </h2>
                            <ul className="space-y-2 text-[12px] text-slate-600">
                                {data.skills.technical.map((s: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-slate-300 mt-1">•</span>
                                        <span className="font-semibold leading-tight">{s}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Education */}
                    {data?.education?.length > 0 && (
                        <section className="space-y-4">
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 border-b-2 border-slate-100 pb-2">
                                Education
                            </h2>
                            <div className="space-y-6">
                                {data.education.map((edu: any, i: number) => (
                                    <div key={i} className="space-y-1">
                                        <p className="text-[12px] font-black text-slate-900 uppercase">
                                            {edu.institution}
                                        </p>
                                        <p className="text-[11px] font-bold text-slate-500">
                                            {edu.degree}
                                        </p>
                                        <p className="text-[10px] font-bold text-slate-400">
                                            {edu.graduationDate}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column (65%) */}
                <div className="col-span-8 p-10 space-y-10">
                    {/* Profile Section */}
                    {data?.summary && (
                        <section className="space-y-4">
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900">
                                Profile
                            </h2>
                            <p className="text-[13px] leading-relaxed text-slate-600 text-justify">
                                {data.summary}
                            </p>
                        </section>
                    )}

                    {/* Experience/Projects Section */}
                    {data?.experience?.length > 0 && (
                        <section className="space-y-6">
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900">
                                Experience
                            </h2>
                            <div className="space-y-8">
                                {data.experience.map((exp: any, i: number) => (
                                    <div key={i} className="space-y-2 relative pb-2 border-b border-slate-50 last:border-0">
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                                                {exp.title}
                                            </h3>
                                        </div>
                                        <div className="flex justify-between items-center text-[11px] font-bold text-slate-500 mb-2">
                                            <span className="italic">{exp.company}</span>
                                            <span className="uppercase tracking-widest">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                                        </div>
                                        <p className="text-[12px] leading-relaxed text-slate-600 whitespace-pre-line text-justify">
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>

            {/* Subtle Footer Accent */}
            <div className="h-2 bg-slate-900 w-full" />
        </div>
    );
}
