"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";
import { Loader2, Download, Printer, Share2, Sparkles, Building2, User } from "lucide-react";
import axios from "axios";

export default function PublicSharePage() {
    const { id } = useParams();
    const [resume, setResume] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPublicResume = async () => {
            try {
                const { data } = await axios.get(`/api/resumes/share/${id}`);
                setResume(data);
            } catch (err) {
                console.error("Public fetch failed", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchPublicResume();
    }, [id]);

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
        );
    }

    if (!resume) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 text-red-600">
                    <Building2 size={32} />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Resume Not Found</h1>
                <p className="text-slate-600 max-w-sm">This link might be broken or the resume has been deleted by the owner.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100/50 print:bg-white pb-20">
            {/* Premium Public Navigation */}
            <nav className="h-16 bg-primary-bg/80 backdrop-blur-md border-b border-border-custom sticky top-0 z-50 transition-all no-print print:hidden">
                <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
                            <Sparkles className="text-white" size={20} />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-blue-400">
                            ResumeAI Pro
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 active:scale-95"
                        >
                            <Printer size={14} />
                            Print / PDF
                        </button>
                        <div className="h-6 w-px bg-border-custom"></div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary-bg border border-border-custom rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
                            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Public View</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Resume Content Container */}
            <main className="max-w-[850px] mx-auto pt-10 px-4 print:pt-0 print:px-0 print:max-w-none">
                <div className="bg-white shadow-2xl shadow-slate-200 rounded-xl overflow-hidden print:shadow-none print:rounded-none">
                    <TemplateRenderer
                        templateId={resume.template || "modern-minimal"}
                        data={resume}
                    />
                </div>

                {/* Branding Footer */}
                <div className="mt-10 text-center space-y-2 opacity-40 hover:opacity-100 transition-opacity print:hidden">
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Powered by ResumeAI Pro</p>
                    <p className="text-[10px] text-slate-400">Create your own professional AI resume today</p>
                </div>
            </main>
        </div>
    );
}
