"use client";

import { useResumeStore } from "@/lib/store";
import { Briefcase, Plus, Trash2, Sparkles, Loader2, Building2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export function ExperienceEditor() {
    const { resume, addItem, updateItem, deleteItem } = useResumeStore();
    const experiences = resume?.experience || [];
    const [enhancingIndex, setEnhancingIndex] = useState<number | null>(null);
    const [optimizingIndex, setOptimizingIndex] = useState<number | null>(null);

    const addNewExperience = () => {
        addItem("experience", {
            title: "",
            company: "",
            location: "",
            startDate: "",
            endDate: "",
            current: false,
            description: "",
        });
    };

    const handleChange = (index: number, field: string, value: any) => {
        const updated = { ...experiences[index], [field]: value };
        updateItem("experience", index, updated);
    };

    const enhanceDescription = async (index: number) => {
        const exp = experiences[index];
        setEnhancingIndex(index);
        try {
            const prompt = `Write a professional achievement-focused job description for a ${exp.title} at ${exp.company}. 
            Current context: ${exp.description || 'General duties'}
            
            STRICT RULE: Return ONLY the improved description text itself. NO preamble.`;

            const { data } = await axios.post("/api/ai/generate", { prompt });
            handleChange(index, "description", data.text);
        } catch (err: any) {
            const msg = err.response?.data?.error || err.message;
            toast.error("AI Enhancement Failed", {
                description: msg,
            });
            console.error("AI Error:", msg);
        } finally {
            setEnhancingIndex(null);
        }
    };

    const optimizeTone = async (index: number) => {
        const exp = experiences[index];
        if (!exp.description) return;
        setOptimizingIndex(index);
        try {
            const prompt = `Fix grammar, improve professional tone, and add action verbs to this job description without changing its core responsibilities.
            
            Current: ${exp.description}
            
            STRICT RULE: Return ONLY the improved text itself. NO preamble.`;

            const { data } = await axios.post("/api/ai/generate", { prompt });
            handleChange(index, "description", data.text);
        } catch (err: any) {
            const msg = err.response?.data?.error || err.message;
            toast.error("Optimization Failed", {
                description: msg,
            });
            console.error("AI Optimization Error:", msg);
        } finally {
            setOptimizingIndex(null);
        }
    };

    return (
        <div className="bg-card-bg rounded-2xl border border-border-custom p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                    <Briefcase className="text-accent" size={20} />
                    Work Experience
                </h2>
                <button
                    onClick={addNewExperience}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider hover:bg-accent hover:text-white transition-all"
                >
                    <Plus size={14} />
                    Add Experience
                </button>
            </div>

            <div className="space-y-6">
                {experiences.map((exp: any, index: number) => (
                    <div key={index} className="p-4 rounded-xl border border-border-custom bg-secondary-bg/30 space-y-4 relative group">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Experience #{index + 1}</span>
                            <button
                                onClick={() => deleteItem("experience", index)}
                                className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">Job Title</label>
                                <input
                                    value={exp.title}
                                    onChange={(e) => handleChange(index, "title", e.target.value)}
                                    className="w-full bg-primary-bg border border-border-custom rounded-lg px-4 py-2 focus:ring-2 focus:ring-accent outline-none transition-all text-text-primary text-sm"
                                    placeholder="Senior Software Engineer"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">Company</label>
                                <input
                                    value={exp.company}
                                    onChange={(e) => handleChange(index, "company", e.target.value)}
                                    className="w-full bg-primary-bg border border-border-custom rounded-lg px-4 py-2 focus:ring-2 focus:ring-accent outline-none transition-all text-text-primary text-sm"
                                    placeholder="Tech Solutions Inc."
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">Description</label>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => optimizeTone(index)}
                                        disabled={optimizingIndex === index || !exp.description}
                                        className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-text-secondary hover:text-accent disabled:opacity-50"
                                    >
                                        {optimizingIndex === index ? <Loader2 className="animate-spin" size={10} /> : <Sparkles size={10} />}
                                        Fix Grammar & Tone
                                    </button>
                                    <button
                                        onClick={() => enhanceDescription(index)}
                                        disabled={enhancingIndex === index}
                                        className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-accent hover:underline disabled:opacity-50"
                                    >
                                        {enhancingIndex === index ? <Loader2 className="animate-spin" size={12} /> : <Sparkles size={12} />}
                                        AI Enhance
                                    </button>
                                </div>
                            </div>
                            <textarea
                                value={exp.description}
                                onChange={(e) => handleChange(index, "description", e.target.value)}
                                rows={4}
                                className="w-full bg-primary-bg border border-border-custom rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent outline-none transition-all text-text-primary text-sm resize-none"
                                placeholder="Describe your responsibilities and achievements..."
                            />
                        </div>
                    </div>
                ))}

                {experiences.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed border-border-custom rounded-xl">
                        <p className="text-text-secondary text-sm">No experience added yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
