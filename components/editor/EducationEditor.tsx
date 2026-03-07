"use client";

import { useResumeStore } from "@/lib/store";
import { GraduationCap, Plus, Trash2 } from "lucide-react";

export function EducationEditor() {
    const { resume, addItem, updateItem, deleteItem } = useResumeStore();
    const education = resume?.education || [];

    const addNewEducation = () => {
        addItem("education", {
            degree: "",
            institution: "",
            location: "",
            graduationDate: "",
            gpa: "",
        });
    };

    const handleChange = (index: number, field: string, value: any) => {
        const updated = { ...education[index], [field]: value };
        updateItem("education", index, updated);
    };

    return (
        <div className="bg-card-bg rounded-2xl border border-border-custom p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                    <GraduationCap className="text-accent" size={20} />
                    Education
                </h2>
                <button
                    onClick={addNewEducation}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider hover:bg-accent hover:text-white transition-all"
                >
                    <Plus size={14} />
                    Add Education
                </button>
            </div>

            <div className="space-y-6">
                {education.map((edu: any, index: number) => (
                    <div key={index} className="p-4 rounded-xl border border-border-custom bg-secondary-bg/30 space-y-4 relative group">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Education #{index + 1}</span>
                            <button
                                onClick={() => deleteItem("education", index)}
                                className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">Degree / Major</label>
                                <input
                                    value={edu.degree}
                                    onChange={(e) => handleChange(index, "degree", e.target.value)}
                                    className="w-full bg-primary-bg border border-border-custom rounded-lg px-4 py-2 focus:ring-2 focus:ring-accent outline-none transition-all text-text-primary text-sm"
                                    placeholder="B.S. in Computer Science"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">Institution</label>
                                <input
                                    value={edu.institution}
                                    onChange={(e) => handleChange(index, "institution", e.target.value)}
                                    className="w-full bg-primary-bg border border-border-custom rounded-lg px-4 py-2 focus:ring-2 focus:ring-accent outline-none transition-all text-text-primary text-sm"
                                    placeholder="Stanford University"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">Graduation Date</label>
                                <input
                                    value={edu.graduationDate}
                                    onChange={(e) => handleChange(index, "graduationDate", e.target.value)}
                                    className="w-full bg-primary-bg border border-border-custom rounded-lg px-4 py-2 focus:ring-2 focus:ring-accent outline-none transition-all text-text-primary text-sm"
                                    placeholder="May 2021"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">GPA (Optional)</label>
                                <input
                                    value={edu.gpa}
                                    onChange={(e) => handleChange(index, "gpa", e.target.value)}
                                    className="w-full bg-primary-bg border border-border-custom rounded-lg px-4 py-2 focus:ring-2 focus:ring-accent outline-none transition-all text-text-primary text-sm"
                                    placeholder="3.8 / 4.0"
                                />
                            </div>
                        </div>
                    </div>
                ))}

                {education.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed border-border-custom rounded-xl">
                        <p className="text-text-secondary text-sm">No education added yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
