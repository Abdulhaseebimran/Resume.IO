"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, Loader2, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess(true);
            } else {
                setError(data.message || "Failed to send reset link");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-primary-bg flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-500">
                {/* Logo */}
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 group">
                        <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <FileText className="text-white" size={28} />
                        </div>
                        <span className="text-3xl font-bold text-text-primary">ResumeAI Pro</span>
                    </Link>
                    <h2 className="mt-6 text-xl font-semibold text-text-primary">Reset Your Password</h2>
                    <p className="text-text-secondary">We'll email you a secure link to reset it.</p>
                </div>

                <div className="bg-card-bg p-6 sm:p-8 rounded-2xl border border-border-custom shadow-xl">
                    {success ? (
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
                                <CheckCircle2 className="text-green-500" size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-text-primary">Check Your Email</h3>
                            <p className="text-sm text-text-secondary">
                                If an account exists with <span className="text-text-primary font-medium">{email}</span>, we've sent a password reset link.
                            </p>
                            <div className="pt-4">
                                <Link
                                    href="/login"
                                    className="text-accent text-sm font-semibold hover:underline flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft size={16} />
                                    Back to Login
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg flex items-center gap-2 animate-in slide-in-from-top-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-primary">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-secondary-bg border border-border-custom rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none text-text-primary"
                                        placeholder="name@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-gradient py-3 flex items-center justify-center gap-2 group"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : "Send Reset Link"}
                            </button>

                            <div className="text-center pt-2">
                                <Link
                                    href="/login"
                                    className="text-text-secondary text-sm hover:text-accent transition-colors flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft size={16} />
                                    Back to Login
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
