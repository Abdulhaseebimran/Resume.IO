"use client";

export function ModernMinimal({ data, color }: any) {
    return (
        <div className="w-full h-full bg-white p-12 text-slate-800 font-sans shadow-inner">
            {/* Header */}
            <div className="border-b-2 border-slate-100 pb-8 mb-8 text-center">
                <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900 mb-2">
                    {data?.personalInfo?.fullName || "Your Name"}
                </h1>
                <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-500">
                    {data?.personalInfo?.email && <span>{data.personalInfo.email}</span>}
                    {data?.personalInfo?.phone && <span>• {data.personalInfo.phone}</span>}
                    {data?.personalInfo?.location && <span>• {data.personalInfo.location}</span>}
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Left Column: Experience & Education */}
                <div className="col-span-8 space-y-10">
                    {/* Summary */}
                    {data?.summary && (
                        <section className="space-y-3 resume-section">
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 border-b border-slate-100 pb-1">
                                Profile
                            </h2>
                            <p className="text-sm leading-relaxed text-slate-700">
                                {data.summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {data?.experience?.length > 0 && (
                        <section className="space-y-6">
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 border-b border-slate-100 pb-1">
                                Experience
                            </h2>
                            <div className="space-y-8">
                                {data.experience.map((exp: any, i: number) => (
                                    <div key={i} className="space-y-2 resume-section">
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="font-bold text-slate-900 text-lg">{exp.title}</h3>
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                                {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                                            </span>
                                        </div>
                                        <p className="text-sm font-bold text-slate-600 italic">
                                            {exp.company}{exp.location && `, ${exp.location}`}
                                        </p>
                                        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column: Skills & Education */}
                <div className="col-span-4 space-y-10">
                    {/* Education */}
                    {data?.education?.length > 0 && (
                        <section className="space-y-4">
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 border-b border-slate-100 pb-1">
                                Education
                            </h2>
                            <div className="space-y-4">
                                {data.education.map((edu: any, i: number) => (
                                    <div key={i} className="space-y-1">
                                        <h3 className="font-bold text-slate-900 text-sm">{edu.degree}</h3>
                                        <p className="text-xs text-slate-600">{edu.institution}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">{edu.graduationDate}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {data?.skills?.technical?.length > 0 && (
                        <section className="space-y-3">
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 border-b border-slate-100 pb-1">
                                Technical
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.technical.map((skill: string, i: number) => (
                                    <span key={i} className="text-[10px] font-bold px-2 py-1 bg-slate-50 border border-slate-100 rounded text-slate-700 uppercase tracking-wider">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {data?.skills?.soft?.length > 0 && (
                        <section className="space-y-3">
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 border-b border-slate-100 pb-1">
                                Soft Skills
                            </h2>
                            <ul className="space-y-1 text-xs text-slate-700">
                                {data.skills.soft.map((skill: string, i: number) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <div className="w-1 h-1 bg-blue-600 rounded-full" />
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
