"use client";

export function TechDeveloper({ data }: any) {
    return (
        <div className="w-full h-full bg-[#0f172a] text-slate-300 font-mono p-12 overflow-hidden">
            {/* Header */}
            <header className="border-b border-slate-700 pb-8 mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight mb-2 flex items-center gap-2">
                        <span className="text-blue-500 font-normal">{`{`}</span>
                        {data?.personalInfo?.fullName || "Developer"}
                        <span className="text-blue-500 font-normal">{`}`}</span>
                    </h1>
                    <p className="text-blue-400 font-bold text-sm uppercase tracking-widest">{data?.title || "Full Stack Engineer"}</p>
                </div>
                <div className="text-right text-[10px] space-y-1">
                    <p className="text-slate-500">// contact_info</p>
                    <p className="text-emerald-400">{data?.personalInfo?.email}</p>
                    <p>{data?.personalInfo?.phone}</p>
                    <p className="text-purple-400">{data?.personalInfo?.location}</p>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-10">
                <div className="col-span-8 space-y-8">
                    <section>
                        <h2 className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            main_profile
                        </h2>
                        <p className="text-[12px] leading-relaxed text-slate-400 border-l border-slate-700 pl-4 italic">
                            {data.summary}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xs font-bold text-slate-500 uppercase mb-6 tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            experience_history[]
                        </h2>
                        <div className="space-y-8">
                            {data.experience?.map((exp: any, i: number) => (
                                <div key={i} className="group transition-all">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-white font-bold text-sm group-hover:text-blue-400 transition-colors">
                                            {exp.title} <span className="text-slate-600 font-normal">@</span> {exp.company}
                                        </h3>
                                        <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                                            {exp.startDate} - {exp.current ? "now" : exp.endDate}
                                        </span>
                                    </div>
                                    <p className="text-[11px] leading-relaxed pl-4 border-l border-slate-800 group-hover:border-blue-500 transition-colors">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="col-span-4 space-y-8">
                    <section>
                        <h2 className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500" />
                            tech_stack
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills?.technical?.map((skill: string, i: number) => (
                                <span key={i} className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-[10px] text-blue-400">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                            education: Object
                        </h2>
                        <div className="space-y-4">
                            {data.education?.map((edu: any, i: number) => (
                                <div key={i} className="text-[11px] space-y-1">
                                    <p className="text-white font-bold">{edu.degree}</p>
                                    <p className="text-slate-500 italic">{edu.institution}</p>
                                    <p className="text-[9px] text-slate-600 tracking-tighter uppercase">{edu.graduationDate}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
