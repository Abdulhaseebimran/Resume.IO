import { useResumeStore } from "@/lib/store";
import { Gauge, CheckCircle2, AlertCircle, Info, Sparkles, Loader2, Target, Send } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

export function ATSScanner() {
    const { resume } = useResumeStore();
    const [score, setScore] = useState(0);
    const [analysis, setAnalysis] = useState<any[]>([]);
    const [scanning, setScanning] = useState(false);
    const [jobDescription, setJobDescription] = useState("");
    const [showJDInput, setShowJDInput] = useState(false);

    const scanResume = async () => {
        if (!resume) return;
        setScanning(true);

        try {
            const { data } = await axios.post("/api/ai/ats-scan", {
                resumeData: resume,
                jobDescription: jobDescription || "General Professional Review"
            });

            if (data.score !== undefined && data.analysis) {
                setScore(data.score);
                setAnalysis(data.analysis);
                toast.success("AI Analysis Complete!");
            }
        } catch (error) {
            console.error("ATS Scan Failed:", error);
            toast.error("AI Analysis failed. Please try again.");

            // Fallback to basic score if AI fails
            setScore(70);
            setAnalysis([{ text: "AI is currently busy. Try again for a deeper scan.", type: "warning", points: 0 }]);
        } finally {
            setScanning(false);
        }
    };

    useEffect(() => {
        if (resume && !scanning && score === 0) scanResume();
    }, [resume]);

    const getScoreColor = () => {
        if (score >= 80) return "text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
        if (score >= 50) return "text-amber-500";
        return "text-red-500";
    };

    return (
        <div className="bg-card-bg rounded-2xl border border-border-custom overflow-hidden shadow-sm transition-all duration-300">
            <div className="bg-secondary-bg/50 p-5 border-b border-border-custom flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent animate-pulse">
                        <Gauge size={22} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-text-primary">AI ATS Expert</h2>
                        <p className="text-[10px] uppercase font-black tracking-widest text-text-secondary opacity-60">High-Fidelity Analysis</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowJDInput(!showJDInput)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${showJDInput ? 'bg-accent text-white border-accent' : 'bg-primary-bg text-text-secondary border-border-custom hover:border-accent hover:text-accent'}`}
                >
                    <Target size={14} />
                    {showJDInput ? "Close Target" : "Target Job"}
                </button>
            </div>

            <div className="p-6">
                {/* Job Description Input */}
                {showJDInput && (
                    <div className="mb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
                        <div className="flex items-center justify-between px-1">
                            <span className="text-[11px] font-black uppercase tracking-widest text-text-secondary">Job Description Keywords</span>
                            <span className="text-[10px] text-accent font-bold">Paste JD here for better score</span>
                        </div>
                        <div className="relative">
                            <textarea
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                placeholder="Paste the job requirements here (e.g., 'Requires 3 years React experience...')"
                                className="w-full h-24 p-4 text-xs bg-secondary-bg border border-border-custom rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all resize-none text-text-primary placeholder:text-text-secondary/50 placeholder:italic font-medium"
                            />
                            <button
                                onClick={scanResume}
                                disabled={scanning}
                                className="absolute bottom-3 right-3 p-2 bg-accent text-white rounded-lg hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent/20"
                            >
                                {scanning ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex flex-col items-center">
                    {/* Score Circle */}
                    <div className="relative w-28 h-28 flex items-center justify-center mb-6">
                        <svg className="w-full h-full transform -rotate-90 drop-shadow-sm">
                            <circle
                                cx="56"
                                cy="56"
                                r="52"
                                stroke="currentColor"
                                strokeWidth="6"
                                fill="transparent"
                                className="text-border-custom"
                            />
                            <circle
                                cx="56"
                                cy="56"
                                r="52"
                                stroke="currentColor"
                                strokeWidth="6"
                                fill="transparent"
                                strokeDasharray={326.7}
                                strokeDashoffset={326.7 - (score / 100) * 326.7}
                                className={`transition-all duration-1000 ease-out stroke-round ${getScoreColor()}`}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-3xl font-black ${getScoreColor()}`}>{score}</span>
                            <span className="text-[8px] uppercase tracking-tighter font-black text-text-secondary">ATS SCORE</span>
                        </div>
                    </div>

                    {/* Analysis List */}
                    <div className="w-full space-y-2.5">
                        {analysis.length > 0 ? (
                            analysis.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-secondary-bg/30 border border-border-custom group hover:border-accent/20 transition-all duration-300">
                                    <div className={`p-1.5 rounded-lg ${item.type === "success" ? 'bg-emerald-500/10 text-emerald-500' :
                                            item.type === "warning" ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'
                                        }`}>
                                        {item.type === "success" ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                                    </div>
                                    <span className="flex-1 text-[11px] font-bold text-text-primary leading-tight line-clamp-2">
                                        {item.text}
                                    </span>
                                    {item.points > 0 && (
                                        <span className={`text-[10px] font-black ${item.type === "success" ? 'text-emerald-500' : 'text-text-secondary'}`}>
                                            +{item.points}
                                        </span>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-4 text-text-secondary/50 animate-pulse text-xs font-medium">
                                Preparing Analysis...
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex flex-col gap-2 w-full">
                        <div className="p-3 bg-accent/5 rounded-xl border border-accent/10 flex items-start gap-2.5">
                            <Info size={14} className="text-accent shrink-0 mt-0.5" />
                            <p className="text-[10px] text-text-secondary leading-normal font-medium italic">
                                AI Tip: Resumes with {jobDescription ? 'target keywords' : 'impact metrics'} score <span className="font-extrabold text-accent">25% higher</span> in real recruiter ATS systems.
                            </p>
                        </div>
                        <button
                            onClick={scanResume}
                            disabled={scanning}
                            className="w-full py-2 bg-secondary-bg hover:bg-accent/10 border border-border-custom hover:border-accent text-[11px] font-black uppercase tracking-widest text-text-secondary hover:text-accent transition-all rounded-lg flex items-center justify-center gap-2"
                        >
                            {scanning ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                            {scanning ? "AI Scanning..." : "Run AI Scan Again"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
