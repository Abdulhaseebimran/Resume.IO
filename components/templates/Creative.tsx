"use client";

export function Creative({ data }: any) {
    return (
        <div className="w-full h-full bg-white flex text-slate-800 font-sans">
            {/* Sidebar */}
            <div className="w-[35%] bg-slate-900 p-8 text-white space-y-8">
                <div className="space-y-4">
                    <div className="w-24 h-24 bg-gradient-to-tr from-accent to-purple-500 rounded-2xl mx-auto shadow-lg" />
                    <div className="text-center">
                        <h1 className="text-xl font-black uppercase tracking-tight leading-tight">
                            {data?.personalInfo?.fullName?.split(' ')[0]}<br />
                            <span className="text-accent">{data?.personalInfo?.fullName?.split(' ')[1] || ""}</span>
                        </h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{data?.title || "Creative Mind"}</p>
                    </div>
                </div>

                <div className="space-y-6 pt-6 border-t border-slate-800 text-[11px]">
                    <div className="space-y-3">
                        <h2 className="text-[10px] font-black uppercase tracking-widest text-accent">Contact</h2>
                        <div className="space-y-2 text-slate-400">
                            <p className="flex items-center gap-2 truncate">{data?.personalInfo?.email}</p>
                            <p>{data?.personalInfo?.phone}</p>
                            <p>{data?.personalInfo?.location}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-[10px] font-black uppercase tracking-widest text-accent">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {data?.skills?.technical?.map((s: string, i: number) => (
                                <span key={i} className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-[9px] font-bold transition-all hover:border-accent">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-10 space-y-8">
                {data?.summary && (
                    <section className="space-y-2">
                        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 border-l-4 border-accent pl-4">About Me</h2>
                        <p className="text-[12px] text-slate-600 leading-relaxed pl-5">
                            {data.summary}
                        </p>
                    </section>
                )}

                {data?.experience?.length > 0 && (
                    <section className="space-y-6">
                        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 border-l-4 border-accent pl-4">Experience</h2>
                        <div className="space-y-6 pl-5">
                            {data.experience.map((exp: any, i: number) => (
                                <div key={i} className="relative pb-6 border-l border-slate-100 pl-6 last:pb-0">
                                    <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-accent border-2 border-white shadow-sm" />
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-sm text-slate-900">{exp.title}</h3>
                                        <span className="text-[10px] font-bold text-slate-400">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                                    </div>
                                    <p className="text-[11px] font-bold text-accent italic mb-2">{exp.company}</p>
                                    <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-3">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {data?.education?.length > 0 && (
                    <section className="space-y-4">
                        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 border-l-4 border-accent pl-4">Education</h2>
                        <div className="grid grid-cols-2 gap-4 pl-5">
                            {data.education.map((edu: any, i: number) => (
                                <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <h3 className="font-bold text-[11px] text-slate-900">{edu.degree}</h3>
                                    <p className="text-[10px] text-slate-500">{edu.institution}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
