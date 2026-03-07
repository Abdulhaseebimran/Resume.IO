"use client";

import { DashboardHeader } from "@/components/DashboardHeader";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FileText, Check, Layout, Sparkles, ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const TEMPLATES = [
    {
        id: "modern-minimal",
        name: "Modern Minimal",
        desc: "Clean, minimalist design with subtle colors. Perfect for startups and modern companies.",
        color: "bg-blue-500",
        image: "/templates/minimal.png", // Placeholders for now
    },
    {
        id: "corporate-professional",
        name: "Corporate Professional",
        desc: "Traditional, formal layout for corporate jobs. Ideal for banking, law, and management.",
        color: "bg-slate-800",
        image: "/templates/corporate.png",
    },
    {
        id: "creative-designer",
        name: "Creative Designer",
        desc: "Visually striking design for creative professionals. Highlight your portfolio and style.",
        color: "bg-purple-500",
        image: "/templates/creative.png",
    },
    {
        id: "tech-developer",
        name: "Tech Developer",
        desc: "Code-friendly layout with technical sections and GitHub integration focus.",
        color: "bg-emerald-500",
        image: "/templates/tech.png",
    },
    {
        id: "ats-optimized",
        name: "ATS-Optimized",
        desc: "Simple, highly readable format designed to pass through all screening software.",
        color: "bg-amber-500",
        image: "/templates/ats.png",
    }
];

export default function TemplatesPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState<string | null>(null);

    const handleSelectTemplate = async (templateId: string) => {
        if (!session) {
            router.push(`/signup?template=${templateId}`);
            return;
        }

        setLoading(templateId);
        try {
            const { data } = await axios.post("/api/resumes", {
                title: `My ${templateId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`,
                template: templateId
            });
            router.push(`/editor/${data._id}`);
        } catch (error) {
            console.error("Failed to create resume from template");
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-primary-bg">
            {/* Dynamic Header based on session */}
            {session ? (
                <DashboardHeader />
            ) : (
                <nav className="fixed top-0 w-full z-50 bg-primary-bg/80 backdrop-blur-md border-b border-border-custom h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                            <FileText className="text-white" size={18} />
                        </div>
                        <span className="text-xl font-bold text-text-primary uppercase tracking-tight">ResumeAI Pro</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Link href="/login" className="text-sm font-medium text-text-secondary hover:text-accent">Sign In</Link>
                        <Link href="/signup" className="btn-gradient px-4 py-2 text-sm">Join Now</Link>
                    </div>
                </nav>
            )}

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center space-y-4 mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider">
                        <Layout size={14} />
                        <span>Professional Templates</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight">
                        Choose a <span className="text-accent underline decoration-accent/30 underline-offset-4">Template</span> to Start
                    </h1>
                    <p className="text-text-secondary max-w-2xl mx-auto text-lg leading-relaxed">
                        All templates are expertly crafted to be ATS-friendly and visually stunning across all industries.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {TEMPLATES.map((template) => (
                        <div
                            key={template.id}
                            className="group relative flex flex-col bg-card-bg border border-border-custom rounded-[2rem] overflow-hidden hover:shadow-2xl hover:border-accent/30 transition-all duration-500"
                        >
                            <div className="aspect-[3/4] bg-secondary-bg p-6 overflow-hidden relative">
                                {/* Real Mockup Style */}
                                <div className="w-full h-full bg-white rounded-lg shadow-xl p-6 flex flex-col gap-4 transform group-hover:scale-105 transition-transform duration-700">
                                    <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-4">
                                        <div className={`w-8 h-8 ${template.color} rounded-full`}></div>
                                        <div className="flex-1 space-y-1.5">
                                            <div className="h-2.5 bg-slate-100 rounded w-1/2"></div>
                                            <div className="h-2 bg-slate-50 rounded w-1/3"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-4 pt-2">
                                        <div className="h-2 bg-slate-50 rounded w-full"></div>
                                        <div className="h-2 bg-slate-50 rounded w-full"></div>
                                        <div className="h-2 bg-slate-50 rounded w-5/6"></div>
                                        <div className="grid grid-cols-2 gap-4 mt-8">
                                            <div className="h-20 bg-slate-50 rounded-md"></div>
                                            <div className="h-20 bg-slate-50 rounded-md"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500 pointer-events-none"></div>

                                {/* Badge for ATS */}
                                {template.id === 'ats-optimized' && (
                                    <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                        <Check size={10} />
                                        High ATS Score
                                    </div>
                                )}
                            </div>

                            <div className="p-8 space-y-4 flex-1 flex flex-col">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-text-primary group-hover:text-accent transition-colors">{template.name}</h3>
                                    <p className="text-text-secondary text-sm leading-relaxed">{template.desc}</p>
                                </div>

                                <div className="mt-auto pt-4">
                                    <button
                                        onClick={() => handleSelectTemplate(template.id)}
                                        disabled={loading === template.id}
                                        className="w-full py-3 rounded-xl border border-border-custom flex items-center justify-center gap-2 font-bold text-sm bg-primary-bg hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 group/btn"
                                    >
                                        {loading === template.id ? (
                                            <Sparkles className="animate-spin text-accent" size={18} />
                                        ) : (
                                            <>
                                                Use This Template
                                                <ArrowRight className="group-hover/btn:translate-x-1 transition-transform" size={16} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-32 p-12 bg-secondary-bg border border-border-custom rounded-[3rem] text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                    <div className="relative z-10 space-y-6">
                        <h2 className="text-3xl font-bold text-text-primary">Not sure which one to choose?</h2>
                        <p className="text-text-secondary max-w-xl mx-auto">
                            Don't worry, you can easily change your template inside the editor anytime without losing your content!
                        </p>
                        <Link href="/signup" className="inline-flex items-center gap-2 btn-gradient px-8 py-4">
                            Get Started for Free
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer (Simplified) */}
            <footer className="border-t border-border-custom py-12 px-4 sm:px-6 lg:px-8 bg-primary-bg">
                <div className="max-w-7xl mx-auto text-center space-y-4 text-text-secondary text-sm">
                    <p>© 2026 ResumeAI Pro. All professional designs are protected.</p>
                </div>
            </footer>
        </div>
    );
}
