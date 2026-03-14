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
                    <div className="flex items-center gap-2 shrink-0">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
                            <Sparkles className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <span className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-blue-400 hidden xs:block sm:block truncate max-w-[120px] sm:max-w-none">
                            ResumeAI Pro
                        </span>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-accent text-white rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 active:scale-95 shrink-0"
                        >
                            <Printer size={14} className="w-3.5 h-3.5 sm:w-3.5 sm:h-3.5" />
                            <span className="hidden sm:inline">Print / PDF</span>
                            <span className="sm:hidden">Print</span>
                        </button>
                        <div className="h-6 w-px bg-border-custom"></div>
                        <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-secondary-bg border border-border-custom rounded-full shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
                            <span className="text-[8px] sm:text-[10px] font-bold text-text-secondary uppercase tracking-widest whitespace-nowrap">Public View</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Resume Content Container */}
            <main className="max-w-[850px] mx-auto pt-6 sm:pt-10 px-0 sm:px-4 print:pt-0 print:px-0 print:max-w-none overflow-x-auto pb-6">
                <div id="resume-preview-container" className="bg-white sm:shadow-2xl sm:shadow-slate-200 sm:rounded-xl overflow-hidden print:shadow-none print:rounded-none min-w-[700px] sm:min-w-[800px] mx-auto w-fit">
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
