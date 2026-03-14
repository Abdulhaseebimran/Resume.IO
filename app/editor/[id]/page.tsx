"use client";

import { useEffect, useState, useCallback } from "react";
import { useResumeStore } from "@/lib/store";
import { DashboardHeader } from "@/components/DashboardHeader";
import {
    FileText, Save, Download, Sparkles, Layout, ChevronLeft, Loader2,
    Edit3, Share2, LogOut, User as UserIcon, ChevronDown, ChevronUp,
    Trash2, Plus, Check, Copy, MoreVertical, Settings, Eye, Printer, Building2, Gauge
} from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { PersonalInfo } from "@/components/editor/PersonalInfo";
import { SummaryEditor } from "@/components/editor/SummaryEditor";
import { ExperienceEditor } from "@/components/editor/ExperienceEditor";
import { EducationEditor } from "@/components/editor/EducationEditor";
import { SkillsEditor } from "@/components/editor/SkillsEditor";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";
import { ATSScanner } from "@/components/editor/ATSScanner";

export default function ResumeEditor() {
    const { id } = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const {
        resume, setResume, updateSection, updateNestedField,
        addItem, updateItem, deleteItem, loading, setLoading
    } = useResumeStore();

    const [activeTab, setActiveTab] = useState("content"); // content | design
    const [activeSection, setActiveSection] = useState("personal");
    const [saving, setSaving] = useState(false);
    const [progress, setProgress] = useState(0);

    // Calculate Completion Progress
    useEffect(() => {
        if (!resume) return;
        let total = 0;
        if (resume.personalInfo?.fullName) total += 20;
        if (resume.summary) total += 20;
        if (resume.experience?.length > 0) total += 20;
        if (resume.education?.length > 0) total += 20;
        if (resume.skills?.technical?.length > 0) total += 20;
        setProgress(total);
    }, [resume]);

    const sections = [
        { id: "personal", label: "Identity", icon: <UserIcon size={14} /> },
        { id: "summary", label: "Objective", icon: <FileText size={14} /> },
        { id: "experience", label: "Work", icon: <Building2 size={14} /> },
        { id: "education", label: "Education", icon: <Layout size={14} /> },
        { id: "skills", label: "Expertise", icon: <Sparkles size={14} /> },
        { id: "ats", label: "ATS Score", icon: <Gauge size={14} /> },
    ];

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const { data } = await axios.get(`/api/resumes/${id}`);
                setResume(data);
            } catch (err) {
                console.error("Failed to load resume");
                router.push("/dashboard");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchResume();
    }, [id, setResume, setLoading, router]);

    const handleSave = useCallback(async () => {
        if (!resume || saving) return;
        setSaving(true);
        try {
            await axios.put(`/api/resumes/${id}`, resume);
        } catch (err) {
            console.error("Failed to save resume");
        } finally {
            setSaving(false);
        }
    }, [resume, id, saving]);

    // AUTO-SAVE LOGIC
    useEffect(() => {
        if (!resume || loading) return;

        const timer = setTimeout(() => {
            handleSave();
        }, 1500); // 1.5 seconds debounce

        return () => clearTimeout(timer);
    }, [resume, handleSave, loading]);

    const handleDownload = () => {
        if (!resume) return;

        // Use the native print system which is now perfectly optimized for A4 in globals.css
        toast.info("Opening Optimized Print System...", {
            description: "Please select 'Save as PDF' in the next window for the best quality.",
            duration: 4000
        });

        // Small delay to ensure the toast message fully transitions
        setTimeout(() => {
            window.print();
        }, 800);
    };

    const handleShare = () => {
        const url = `${window.location.origin}/share/${id}`;
        navigator.clipboard.writeText(url);
        toast.success("Ready to share!", {
            description: "Public link has been copied to your clipboard.",
            duration: 5000,
        });
    };

    // Prevent accidental refresh/close when saving
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (saving) {
                e.preventDefault();
                e.returnValue = "";
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [saving]);

    if (loading) {
        return (
            <div className="min-h-screen bg-primary-bg flex items-center justify-center">
                <Loader2 className="animate-spin text-accent" size={40} />
            </div>
        );
    }

    return (
        <div className="h-screen bg-primary-bg flex flex-col overflow-hidden">
            <header className="bg-card-bg/95 backdrop-blur-md border-b border-border-custom z-[100] sticky top-0 shadow-sm no-print">
                <div className="h-16 flex items-center justify-between px-6 border-b border-border-custom/30">
                    <div className="flex items-center gap-4 flex-1">
                        <Link
                            href="/dashboard"
                            className="p-2 hover:bg-secondary-bg rounded-lg transition-all text-text-secondary hover:text-accent border border-border-custom hover:border-accent/30 flex items-center justify-center shrink-0"
                        >
                            <ChevronLeft size={18} />
                        </Link>
                        <div className="h-4 w-px bg-border-custom"></div>
                        <div className="flex flex-col min-w-0">
                            <input
                                value={resume?.title || ""}
                                onChange={(e) => updateSection("title", e.target.value)}
                                className="bg-transparent font-bold text-sm text-text-primary outline-none focus:text-accent truncate w-full max-w-[150px]"
                                placeholder="Untitled Resume"
                            />
                            <div className="flex items-center gap-1.5 leading-tight">
                                {saving ? (
                                    <span className="text-[9px] uppercase tracking-widest font-bold text-accent animate-pulse flex items-center gap-1">
                                        <Loader2 size={8} className="animate-spin" />
                                        Saving
                                    </span>
                                ) : (
                                    <span className="text-[9px] uppercase tracking-widest font-bold text-emerald-500/80 flex items-center gap-1">
                                        <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                        Ready
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center justify-center flex-1">
                        <div className="flex p-0.5 bg-secondary-bg border border-border-custom rounded-lg shadow-inner w-fit">
                            <button
                                onClick={() => setActiveTab("content")}
                                className={`flex items-center gap-2 px-6 py-1.5 rounded-md text-[11px] font-bold transition-all ${activeTab === "content"
                                    ? "bg-primary-bg text-accent shadow-sm border border-border-custom/50"
                                    : "text-text-secondary hover:text-text-primary"
                                    }`}
                            >
                                <Edit3 size={12} />
                                CONTENT
                            </button>
                            <button
                                onClick={() => setActiveTab("design")}
                                className={`flex items-center gap-2 px-6 py-1.5 rounded-md text-[11px] font-bold transition-all ${activeTab === "design"
                                    ? "bg-primary-bg text-accent shadow-sm border border-border-custom/50"
                                    : "text-text-secondary hover:text-text-primary"
                                    }`}
                            >
                                <Layout size={12} />
                                DESIGN
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 flex-1">
                        <button
                            type="button"
                            onClick={handleShare}
                            className="p-2 rounded-lg bg-secondary-bg hover:bg-accent/10 text-text-secondary hover:text-accent border border-border-custom transition-all"
                            title="Share Public Link"
                        >
                            <Share2 size={16} />
                        </button>

                        <button
                            type="button"
                            onClick={handleDownload}
                            className="btn-gradient px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg shadow-accent/20 active:scale-95 transition-all"
                        >
                            <Download size={16} />
                            <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Download</span>
                        </button>

                        <div className="h-8 w-px bg-border-custom hidden sm:block"></div>

                        <div className="flex items-center gap-2 pl-1">
                            <div className="w-8 h-8 rounded-full border border-accent/30 p-0.5 bg-gradient-to-tr from-accent to-purple-500 overflow-hidden">
                                {session?.user?.image ? (
                                    <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-secondary-bg flex items-center justify-center">
                                        <UserIcon size={14} className="text-accent" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {activeTab === "content" && (
                    <div className="h-12 flex items-center px-6 gap-8 overflow-x-auto no-scrollbar scroll-smooth">
                        {sections.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => setActiveSection(s.id)}
                                className={`flex items-center gap-2 h-full border-b-2 transition-all shrink-0 px-2 ${activeSection === s.id
                                    ? "border-accent text-accent font-bold"
                                    : "border-transparent text-text-secondary hover:text-text-primary hover:border-border-custom"
                                    }`}
                            >
                                <span className={activeSection === s.id ? "text-accent" : "text-text-secondary"}>
                                    {s.icon}
                                </span>
                                <span className="text-[11px] uppercase tracking-wider">{s.label}</span>
                            </button>
                        ))}
                    </div>
                )}

                <div className="absolute bottom-[-1px] left-0 h-[2px] bg-secondary-bg w-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-accent via-purple-500 to-accent bg-[length:200%_100%] animate-shimmer transition-all duration-700 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </header>

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                <div className="w-full lg:w-1/2 h-1/2 lg:h-auto overflow-y-auto bg-secondary-bg/30 border-b lg:border-b-0 lg:border-r border-border-custom custom-scrollbar no-print relative relative-z-10 shadow-lg lg:shadow-none">
                    <div className="p-4 sm:p-8 max-w-2xl mx-auto pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {activeTab === "content" ? (
                            <div key={activeSection}>
                                {activeSection === "personal" && <PersonalInfo />}
                                {activeSection === "summary" && <SummaryEditor />}
                                {activeSection === "experience" && <ExperienceEditor />}
                                {activeSection === "education" && <EducationEditor />}
                                {activeSection === "skills" && <SkillsEditor />}
                                {activeSection === "ats" && <ATSScanner />}
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
                                    <Layout className="text-accent" />
                                    Template Design
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[
                                        { id: "professional-two-column", name: "Premium Corporate", description: "Abdul Haseeb Layout" },
                                        { id: "modern-elegant", name: "Modern Elegant", description: "Gold & Luxury Serif" },
                                        { id: "minimalist-sidebar", name: "Minimalist Sidebar", description: "Bold High-Contrast" },
                                        { id: "creative-portfolio", name: "Creative Vision", description: "Modern Card Style" },
                                        { id: "modern-minimal", name: "Modern Minimal", description: "Clean & standard" },
                                        { id: "corporate-professional", name: "Corporate Pro", description: "Traditional serif" },
                                        { id: "creative-designer", name: "Creative Designer", description: "Sidebar & colorful" },
                                        { id: "tech-developer", name: "Tech Developer", description: "Monospace & code" },
                                        { id: "ats-optimized", name: "ATS Optimized", description: "Basic & reliable" },
                                        { id: "executive-suite", name: "Executive Suite", description: "Luxury & elegant" }
                                    ].map((t) => (
                                        <button
                                            key={t.id}
                                            onClick={() => updateSection("template", t.id)}
                                            className={`group p-3 rounded-2xl border-2 text-left transition-all duration-300 relative overflow-hidden flex flex-col ${resume?.template === t.id
                                                ? "border-accent bg-accent/5 ring-4 ring-accent/10"
                                                : "border-border-custom hover:border-accent/40 bg-card-bg shadow-sm"
                                                }`}
                                        >
                                            <div className="w-full aspect-[1/1.414] rounded-xl mb-3 border-border-custom/50 border overflow-hidden relative bg-white shadow-inner transition-transform duration-500 group-hover:scale-[1.02]">
                                                {/* High-Fidelity Preview Box */}
                                                <div className="w-[800px] h-[1132px] absolute top-0 left-0 origin-top-left transform scale-[0.22] pointer-events-none select-none bg-white">
                                                    <TemplateRenderer
                                                        templateId={t.id}
                                                        data={resume || {}}
                                                    />
                                                </div>

                                                {/* Overlay to prevent interaction and add selection indicator */}
                                                {resume?.template === t.id && (
                                                    <div className="absolute inset-0 bg-accent/10 flex items-center justify-center backdrop-blur-[1px]">
                                                        <div className="bg-accent px-3 py-1.5 rounded-full shadow-lg border border-white/20 flex items-center gap-2 transform animate-in zoom-in duration-300 pointer-events-none">
                                                            <Sparkles size={10} className="text-white" />
                                                            <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Selected</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="px-1">
                                                <p className="font-black text-text-primary text-[13px] tracking-tight leading-none mb-1">{t.name}</p>
                                                <p className="text-[9px] text-text-secondary font-black uppercase tracking-widest opacity-60 leading-none">{t.description}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-full lg:w-1/2 flex-1 bg-slate-100 dark:bg-slate-900 overflow-y-auto h-1/2 lg:h-auto p-4 sm:p-12 flex justify-center custom-scrollbar relative">
                    <div id="resume-preview-container" className="w-[800px] bg-white shadow-2xl rounded-lg h-fit transition-all origin-top scale-[0.42] sm:scale-[0.6] lg:scale-[0.8] xl:scale-[0.9] print:scale-100 print:shadow-none print:rounded-none a4-page-guide absolute top-4 sm:top-12 lg:relative lg:top-auto">
                        <TemplateRenderer
                            templateId={resume?.template || "modern-minimal"}
                            data={resume}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function TemplateSkeleton({ id }: { id: string }) {
    return (
        <div className="w-full h-full flex flex-col gap-2 animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-2/3 mb-4" />
            <div className="flex gap-2">
                <div className="flex-1">
                    <div className="h-2 bg-slate-100 rounded mb-2" />
                    <div className="h-2 bg-slate-100 rounded mb-2 w-5/6" />
                    <div className="h-2 bg-slate-100 rounded mb-2 w-4/6" />
                </div>
                {id === "creative-designer" && <div className="w-1/3 bg-slate-50 rounded h-20" />}
            </div>
            <div className="mt-4 space-y-2">
                <div className="h-3 bg-slate-200 rounded w-1/4" />
                <div className="h-26 bg-slate-100 rounded" />
            </div>
        </div>
    );
}
