"use client";

export function Executive({ data }: any) {
    return (
        <div className="w-full h-full bg-[#fdfcfb] text-[#2d2a26] font-serif p-14 border-[12px] border-[#e5e7eb]">
            <header className="mb-12 text-center relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#c5a059]" />
                <h1 className="text-4xl font-medium tracking-[0.1em] uppercase mb-3 mt-4">{data?.personalInfo?.fullName}</h1>
                <p className="text-[#c5a059] text-xs font-bold uppercase tracking-[0.3em] mb-4">{data?.title || "Strategic Leader"}</p>
                <div className="flex justify-center items-center gap-4 text-[10px] font-sans text-[#7a746e] tracking-widest uppercase">
                    <span>{data?.personalInfo?.location}</span>
                    <span className="w-1 h-1 bg-[#c5a059] rounded-full" />
                    <span>{data?.personalInfo?.phone}</span>
                    <span className="w-1 h-1 bg-[#c5a059] rounded-full" />
                    <span>{data?.personalInfo?.email}</span>
                </div>
            </header>

            <div className="space-y-10">
                {data.summary && (
                    <section className="text-center max-w-2xl mx-auto italic text-[14px] leading-relaxed text-[#5a544e]">
                        "{data.summary}"
                    </section>
                )}

                <div className="h-px bg-gradient-to-r from-transparent via-[#c5a059]/30 to-transparent" />

                <div className="grid grid-cols-12 gap-10">
                    <div className="col-span-8 space-y-10">
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-4">
                                Experience
                                <div className="flex-1 h-px bg-[#e5e1da]" />
                            </h2>
                            <div className="space-y-10">
                                {data.experience?.map((exp: any, i: number) => (
                                    <div key={i} className="space-y-3">
                                        <div className="flex justify-between items-end">
                                            <h3 className="text-lg font-bold italic text-[#1a1816]">{exp.title}</h3>
                                            <span className="text-[10px] uppercase font-bold text-[#c5a059]">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</span>
                                        </div>
                                        <p className="text-[11px] font-bold uppercase tracking-widest text-[#7a746e]">{exp.company}</p>
                                        <p className="text-[13px] leading-relaxed text-[#5a544e] pl-6 border-l-2 border-[#e5e1da]">
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="col-span-4 space-y-10">
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4">Competencies</h2>
                            <div className="space-y-2">
                                {[...(data.skills?.technical || []), ...(data.skills?.soft || [])].map((s: string, i: number) => (
                                    <div key={i} className="flex items-center gap-3 text-[12px] group">
                                        <div className="w-1 h-1 bg-[#c5a059] rotate-45" />
                                        <span className="group-hover:text-[#c5a059] transition-colors">{s}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-[#7a746e]">Education</h2>
                            <div className="space-y-4">
                                {data.education?.map((edu: any, i: number) => (
                                    <div key={i} className="space-y-1">
                                        <p className="font-bold text-[12px]">{edu.institution}</p>
                                        <p className="italic text-[11px] text-[#7a746e]">{edu.degree}</p>
                                        <p className="text-[10px] font-bold text-[#c5a059]">{edu.graduationDate}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
