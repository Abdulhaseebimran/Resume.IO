"use client";

export function Corporate({ data, color }: any) {
    return (
        <div className="w-full h-full bg-white text-slate-900 font-serif leading-normal p-12">
            <div className="flex border-b-4 border-slate-900 pb-6 mb-8 items-end justify-between">
                <div>
                    <h1 className="text-4xl font-black tracking-tight">{data?.personalInfo?.fullName || "Your Name"}</h1>
                    <p className="text-lg font-bold text-slate-600 mt-1 uppercase tracking-widest">{data?.title || "Professional Role"}</p>
                </div>
                <div className="text-right text-xs space-y-1 font-sans">
                    <p>{data?.personalInfo?.location}</p>
                    <p className="font-bold">{data?.personalInfo?.phone}</p>
                    <p className="underline">{data?.personalInfo?.email}</p>
                </div>
            </div>

            <div className="space-y-8 font-sans">
                {/* Summary */}
                {data?.summary && (
                    <section>
                        <h2 className="text-sm font-black uppercase border-b-2 border-slate-200 mb-3 tracking-widest">Executive Summary</h2>
                        <p className="text-[13px] text-slate-800 leading-relaxed text-justify">
                            {data.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {data?.experience?.length > 0 && (
                    <section>
                        <h2 className="text-sm font-black uppercase border-b-2 border-slate-200 mb-4 tracking-widest">Professional Experience</h2>
                        <div className="space-y-6">
                            {data.experience.map((exp: any, i: number) => (
                                <div key={i}>
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-bold text-sm tracking-tight">{exp.company}</h3>
                                        <span className="text-[11px] font-bold text-slate-600">{exp.startDate} — {exp.current ? "Present" : exp.endDate}</span>
                                    </div>
                                    <p className="text-[12px] font-bold text-blue-800 mb-2 italic">{exp.title}</p>
                                    <p className="text-[12px] text-slate-700 leading-normal whitespace-pre-line pl-4 border-l-2 border-slate-100 italic">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills & Education Grid */}
                <div className="grid grid-cols-2 gap-12">
                    {/* Education */}
                    {data?.education?.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black uppercase border-b-2 border-slate-200 mb-3 tracking-widest">Education</h2>
                            <div className="space-y-3">
                                {data.education.map((edu: any, i: number) => (
                                    <div key={i}>
                                        <h3 className="font-bold text-[12px]">{edu.institution}</h3>
                                        <p className="text-[11px] text-slate-600 font-medium">{edu.degree}</p>
                                        <p className="text-[10px] text-slate-400 font-bold">{edu.graduationDate}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    <section>
                        <h2 className="text-sm font-black uppercase border-b-2 border-slate-200 mb-3 tracking-widest">Expertise</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <h3 className="text-[11px] font-bold text-slate-400 uppercase mb-2">Technical</h3>
                                <p className="text-[12px] text-slate-700 leading-relaxed">
                                    {data?.skills?.technical?.join(" • ")}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-[11px] font-bold text-slate-400 uppercase mb-2">Soft Skills</h3>
                                <p className="text-[12px] text-slate-700 leading-relaxed">
                                    {data?.skills?.soft?.join(" • ")}
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
