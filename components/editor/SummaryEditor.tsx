"use client";

import { useResumeStore } from "@/lib/store";
import { Sparkles, Loader2, AlignLeft } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export function SummaryEditor() {
    const { resume, updateSection } = useResumeStore();
    const [generating, setGenerating] = useState(false);
    const [optimizing, setOptimizing] = useState(false);

    const generateSummary = async () => {
        setGenerating(true);
        try {
            const prompt = `Write a professional 2-3 sentence resume summary for internal use.
            Details:
            - Name: ${resume?.personalInfo?.fullName || 'Professional'}
            - Field: ${resume?.title || 'General'}
            - Key Skills: ${resume?.skills?.technical?.join(", ") || 'General professional skills'}
            
            STRICT RULE: Return ONLY the summary text itself. NO greetings, NO chat-style advice. Just one paragraph of professional text.`;

            const { data } = await axios.post("/api/ai/generate", { prompt });
            updateSection("summary", data.text);
        } catch (err: any) {
            const msg = err.response?.data?.error || err.message;
            toast.error("Generation Failed", {
                description: msg,
            });
            console.error("AI Error:", msg);
        } finally {
            setGenerating(false);
        }
    };

    const optimizeTone = async () => {
        if (!resume?.summary) return;
        setOptimizing(true);
        try {
            const prompt = `Improve the grammar, tone, and professional impact of this resume summary without changing its core meaning. 
            Make it more compelling and ATS-optimized.
            
            Current: ${resume.summary}
            
            STRICT RULE: Return ONLY the improved summary text itself. NO preamble.`;

            const { data } = await axios.post("/api/ai/generate", { prompt });
            updateSection("summary", data.text);
        } catch (err: any) {
            const msg = err.response?.data?.error || err.message;
            toast.error("Optimization Failed", {
                description: msg,
            });
            console.error("AI Optimization Error:", msg);
        } finally {
            setOptimizing(false);
        }
    };

    return (
        <div className="bg-card-bg rounded-2xl border border-border-custom p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                    <AlignLeft className="text-accent" size={20} />
                    Professional Summary
                </h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={optimizeTone}
                        disabled={optimizing || !resume?.summary}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary-bg border border-border-custom text-text-secondary text-[10px] font-bold uppercase tracking-wider hover:text-accent hover:border-accent/30 transition-all disabled:opacity-50"
                        title="Optimize Grammar & Tone"
                    >
                        {optimizing ? <Loader2 className="animate-spin" size={12} /> : <Sparkles size={12} />}
                        Optimize Tone
                    </button>
                    <button
                        onClick={generateSummary}
                        disabled={generating}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-wider hover:bg-accent hover:text-white transition-all disabled:opacity-50"
                    >
                        {generating ? <Loader2 className="animate-spin" size={12} /> : <Sparkles size={12} />}
                        AI Generate
                    </button>
                </div>
            </div>

            <textarea
                value={resume?.summary || ""}
                onChange={(e) => updateSection("summary", e.target.value)}
                rows={5}
                className="w-full bg-primary-bg border border-border-custom rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent outline-none transition-all text-text-primary resize-none leading-relaxed"
                placeholder="Briefly describe your professional background and key achievements..."
            />
            <p className="mt-3 text-xs text-text-secondary">
                Tip: Aim for 3-5 sentences that highlight your expertise and value.
            </p>
        </div>
    );
}
