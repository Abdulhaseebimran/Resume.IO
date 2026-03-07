"use client";

export function ATS({ data }: any) {
    return (
        <div className="w-full h-full bg-white text-black font-serif p-10 leading-snug tracking-tight">
            <div className="border-b-2 border-black pb-4 mb-6 text-center">
                <h1 className="text-3xl font-bold uppercase mb-1">{data?.personalInfo?.fullName || "Your Name"}</h1>
                <div className="text-xs space-x-2">
                    <span>{data?.personalInfo?.location}</span>
                    <span>|</span>
                    <span>{data?.personalInfo?.phone}</span>
                    <span>|</span>
                    <span>{data?.personalInfo?.email}</span>
                </div>
            </div>

            <div className="space-y-6">
                {data.summary && (
                    <section>
                        <h2 className="text-xs font-bold uppercase border-b border-black mb-2 pb-0.5">Professional Summary</h2>
                        <p className="text-[12px]">{data.summary}</p>
                    </section>
                )}

                {data.experience?.length > 0 && (
                    <section>
                        <h2 className="text-xs font-bold uppercase border-b border-black mb-3 pb-0.5">Professional Experience</h2>
                        <div className="space-y-4">
                            {data.experience.map((exp: any, i: number) => (
                                <div key={i}>
                                    <div className="flex justify-between font-bold text-[12px]">
                                        <span>{exp.company}</span>
                                        <span>{exp.startDate} – {exp.current ? "Present" : exp.endDate}</span>
                                    </div>
                                    <div className="flex justify-between italic text-[12px] mb-1">
                                        <span>{exp.title}</span>
                                        <span>{exp.location}</span>
                                    </div>
                                    <p className="text-[12px] whitespace-pre-line">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {data.education?.length > 0 && (
                    <section>
                        <h2 className="text-xs font-bold uppercase border-b border-black mb-2 pb-0.5">Education</h2>
                        <div className="space-y-2">
                            {data.education.map((edu: any, i: number) => (
                                <div key={i} className="flex justify-between items-baseline text-[12px]">
                                    <div>
                                        <span className="font-bold">{edu.institution}</span>, <span>{edu.degree}</span>
                                    </div>
                                    <span className="font-bold">{edu.graduationDate}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <section>
                    <h2 className="text-xs font-bold uppercase border-b border-black mb-2 pb-0.5">Skills</h2>
                    <div className="text-[12px]">
                        <p><span className="font-bold">Technical:</span> {data?.skills?.technical?.join(", ")}</p>
                        <p><span className="font-bold">Soft Skills:</span> {data?.skills?.soft?.join(", ")}</p>
                    </div>
                </section>
            </div>
        </div>
    );
}
