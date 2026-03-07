"use client";

import { useResumeStore } from "@/lib/store";
import { Wrench, Plus, X, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export function SkillsEditor() {
    const { resume, updateNestedField } = useResumeStore();
    const technicalSkills = resume?.skills?.technical || [];
    const softSkills = resume?.skills?.soft || [];

    const [techInput, setTechInput] = useState("");
    const [softInput, setSoftInput] = useState("");
    const [suggesting, setSuggesting] = useState(false);

    const addSkill = (type: "technical" | "soft", skill: string) => {
        if (!skill.trim()) return;
        const current = type === "technical" ? technicalSkills : softSkills;
        if (current.includes(skill.trim())) return;

        updateNestedField("skills", type, [...current, skill.trim()]);
        if (type === "technical") setTechInput("");
        else setSoftInput("");
    };

    const removeSkill = (type: "technical" | "soft", index: number) => {
        const current = type === "technical" ? technicalSkills : softSkills;
        const updated = current.filter((_: any, i: number) => i !== index);
        updateNestedField("skills", type, updated);
    };

    const suggestSkills = async () => {
        setSuggesting(true);
        try {
            const prompt = `Suggest 5-8 relevant skills for a ${resume?.title || 'Professional'} role.
            Current skills: ${technicalSkills.concat(softSkills).join(", ")}.
            
            STRICT RULE: Return ONLY a valid JSON object. NO conversational text, NO markdown code blocks, NO advice.
            Format: {"technical": ["Skill1", "Skill2"], "soft": ["SkillA", "SkillB"]}`;

            const { data } = await axios.post("/api/ai/generate", { prompt });
            // In a real app we'd parse the JSON from Claude. For now, let's assume Claude returns clean JSON.
            // We'll use a safer parsing logic in the real implementation.
            try {
                const cleanedText = data.text.replace(/```json|```/g, "").trim();
                const suggestions = JSON.parse(cleanedText);

                if (suggestions.technical) {
                    updateNestedField("skills", "technical", [...new Set([...technicalSkills, ...suggestions.technical])]);
                }
                if (suggestions.soft) {
                    updateNestedField("skills", "soft", [...new Set([...softSkills, ...suggestions.soft])]);
                }
            } catch (e) {
                console.error("Failed to parse skills JSON");
            }
        } catch (err: any) {
            const msg = err.response?.data?.error || err.message;
            toast.error("AI Suggestion Failed", {
                description: msg,
            });
            console.error("AI Error:", msg);
        } finally {
            setSuggesting(false);
        }
    };

    return (
        <div className="bg-card-bg rounded-2xl border border-border-custom p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                    <Wrench className="text-accent" size={20} />
                    Skills
                </h2>
                <button
                    onClick={suggestSkills}
                    disabled={suggesting}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider hover:bg-accent hover:text-white transition-all disabled:opacity-50"
                >
                    {suggesting ? <Loader2 className="animate-spin" size={14} /> : <Sparkles size={14} />}
                    AI Suggest
                </button>
            </div>

            <div className="space-y-6">
                {/* Technical Skills */}
                <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">Technical Skills</label>
                    <div className="flex gap-2">
                        <input
                            value={techInput}
                            onChange={(e) => setTechInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addSkill("technical", techInput)}
                            className="flex-1 bg-primary-bg border border-border-custom rounded-lg px-4 py-2 focus:ring-2 focus:ring-accent outline-none transition-all text-text-primary text-sm"
                            placeholder="React, Node.js, AWS..."
                        />
                        <button
                            onClick={() => addSkill("technical", techInput)}
                            className="p-2 bg-secondary-bg hover:bg-accent hover:text-white rounded-lg border border-border-custom transition-all"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                        {technicalSkills.map((skill: string, i: number) => (
                            <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20">
                                {skill}
                                <button onClick={() => removeSkill("technical", i)} className="hover:text-red-500 transition-colors">
                                    <X size={14} />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Soft Skills */}
                <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">Soft Skills</label>
                    <div className="flex gap-2">
                        <input
                            value={softInput}
                            onChange={(e) => setSoftInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addSkill("soft", softInput)}
                            className="flex-1 bg-primary-bg border border-border-custom rounded-lg px-4 py-2 focus:ring-2 focus:ring-accent outline-none transition-all text-text-primary text-sm"
                            placeholder="Leadership, Public Speaking..."
                        />
                        <button
                            onClick={() => addSkill("soft", softInput)}
                            className="p-2 bg-secondary-bg hover:bg-accent hover:text-white rounded-lg border border-border-custom transition-all"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                        {softSkills.map((skill: string, i: number) => (
                            <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-sm font-medium border border-emerald-500/20">
                                {skill}
                                <button onClick={() => removeSkill("soft", i)} className="hover:text-red-500 transition-colors">
                                    <X size={14} />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
