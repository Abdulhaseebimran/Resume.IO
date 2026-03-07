"use client";

import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Plus, FileText, Clock, ChevronRight, Loader2, Edit3, Layout, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";

export default function Dashboard() {
    const router = useRouter();
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);

    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const { data } = await axios.get("/api/resumes");
            setResumes(data);
        } catch (error) {
            console.error("Failed to fetch resumes");
        } finally {
            setLoading(false);
        }
    };

    const createResume = async () => {
        setCreating(true);
        try {
            const { data } = await axios.post("/api/resumes", { title: "New Resume" });
            router.push(`/editor/${data._id}`);
        } catch (error) {
            console.error("Failed to create resume");
        } finally {
            setCreating(false);
        }
    };

    const deleteResume = async () => {
        if (!deletingId) return;
        setIsDeleting(true);
        try {
            await axios.delete(`/api/resumes/${deletingId}`);
            setResumes(resumes.filter((r: any) => r._id !== deletingId));
            setDeletingId(null);
        } catch (error) {
            console.error("Failed to delete resume");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="min-h-screen bg-primary-bg">
            <DashboardHeader />

            <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Welcome Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-text-primary">Your Resumes</h1>
                        <p className="text-text-secondary mt-1">Create and manage your professional resumes</p>
                    </div>

                    <button
                        onClick={createResume}
                        disabled={creating}
                        className="btn-gradient px-6 py-3 flex items-center gap-2"
                    >
                        {creating ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
                        Create New Resume
                    </button>
                </div>

                {/* Dashboard Content */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="animate-spin text-accent mb-4" size={40} />
                        <p className="text-text-secondary">Loading resumes...</p>
                    </div>
                ) : resumes.length === 0 ? (
                    <div className="text-center py-20 bg-secondary-bg/50 border-2 border-dashed border-border-custom rounded-3xl">
                        <div className="w-16 h-16 bg-primary-bg rounded-2xl flex items-center justify-center mx-auto mb-6 text-text-secondary">
                            <FileText size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-text-primary mb-2">No resumes yet</h3>
                        <p className="text-text-secondary max-w-sm mx-auto mb-8">
                            Success starts with a great resume. Build yours in minutes with our AI-powered editor.
                        </p>
                        <button
                            onClick={createResume}
                            className="btn-gradient px-8"
                        >
                            Start Building
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resumes.map((resume: any) => (
                            <div
                                key={resume._id}
                                className="group relative bg-card-bg border border-border-custom rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-accent/30 transition-all duration-300"
                            >
                                <div
                                    className="aspect-[3/4] bg-slate-100 dark:bg-slate-800 flex justify-center cursor-pointer overflow-hidden relative group/preview border-b border-border-custom"
                                    onClick={() => router.push(`/editor/${resume._id}`)}
                                >
                                    {/* High-Fidelity Design Preview (Same to Same) */}
                                    <div className="w-[800px] h-[1132px] bg-white text-slate-900 origin-top transform scale-[0.415] absolute top-0 pointer-events-none select-none shadow-2xl transition-all duration-500 group-hover/preview:scale-[0.43]">
                                        <TemplateRenderer
                                            templateId={resume.template || "modern-minimal"}
                                            data={resume}
                                        />
                                    </div>

                                    {/* Hover Action Overlay */}
                                    <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover/preview:opacity-100 transition-all flex items-center justify-center backdrop-blur-[2px]">
                                        <div className="bg-accent px-5 py-2.5 rounded-full shadow-2xl border border-white/20 flex items-center gap-3 transform translate-y-4 group-hover/preview:translate-y-0 transition-all duration-300">
                                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                                <Edit3 size={18} className="text-white" />
                                            </div>
                                            <span className="text-xs font-bold text-white uppercase tracking-widest">Edit Design</span>
                                        </div>
                                    </div>

                                    {/* Actions Overlays */}
                                    <div className="absolute top-4 left-4 flex gap-2 invisible group-hover:visible animate-in fade-in slide-in-from-left-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setDeletingId(resume._id);
                                            }}
                                            className="w-10 h-10 bg-red-500/10 hover:bg-red-500 backdrop-blur-md border border-red-500/20 text-red-500 hover:text-white rounded-xl flex items-center justify-center transition-all shadow-lg"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    {/* Template Type Indicator */}
                                    <div className="absolute bottom-4 right-4 group-hover/preview:opacity-0 transition-opacity">
                                        <span className="text-[10px] font-black px-2.5 py-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-accent rounded-lg border border-accent/20 shadow-sm uppercase tracking-widest">
                                            {resume.template?.split('-')[0] || "Standard"} Design
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 flex items-center justify-between bg-primary-bg">
                                    <div>
                                        <h3 className="font-bold text-text-primary group-hover:text-accent transition-colors truncate max-w-[150px]">
                                            {resume.title}
                                        </h3>
                                        <div className="flex items-center gap-3 text-[10px] font-bold text-text-secondary mt-1 uppercase tracking-widest leading-none">
                                            <div className="flex items-center gap-1">
                                                <Clock size={10} className="text-accent/60" />
                                                <span>{new Date(resume.updatedAt).toLocaleDateString()}</span>
                                            </div>
                                            <div className="w-1 h-1 rounded-full bg-border-custom" />
                                            <div className="flex items-center gap-1">
                                                <Eye size={10} className="text-accent/60" />
                                                <span className="text-accent">{resume.views || 0} Views</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/editor/${resume._id}`}
                                        className="p-2 rounded-xl bg-secondary-bg hover:bg-accent group/btn transition-all border border-border-custom hover:border-accent"
                                    >
                                        <ChevronRight size={18} className="text-text-secondary group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-all" />
                                    </Link>
                                </div>
                            </div>
                        ))}

                        {/* Create New Card (Mini) */}
                        <button
                            onClick={createResume}
                            className="group border-2 border-dashed border-border-custom rounded-2xl flex flex-col items-center justify-center p-8 hover:bg-accent/5 hover:border-accent/40 transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-full bg-secondary-bg flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-all">
                                <Plus size={24} />
                            </div>
                            <span className="font-bold text-text-secondary group-hover:text-accent">Create New</span>
                        </button>
                    </div>
                )}
            </main>

            {/* Premium Delete Confirmation Modal */}
            {deletingId && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => !isDeleting && setDeletingId(null)} />
                    <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in slide-in-from-bottom-4 duration-300">
                        <div className="w-16 h-16 bg-red-100 dark:bg-red-500/10 rounded-2xl flex items-center justify-center mb-6">
                            <Trash2 size={32} className="text-red-500" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Delete Resume?</h2>
                        <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-8">
                            This action cannot be undone. All data and analytics for this resume will be permanently removed.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setDeletingId(null)}
                                disabled={isDeleting}
                                className="flex-1 px-6 py-3 rounded-2xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200/50 dark:border-slate-700/50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deleteResume}
                                disabled={isDeleting}
                                className="flex-1 px-6 py-3 rounded-2xl font-bold bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/25 transition-all flex items-center justify-center gap-2"
                            >
                                {isDeleting ? <Loader2 size={18} className="animate-spin" /> : 'Confirm Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
