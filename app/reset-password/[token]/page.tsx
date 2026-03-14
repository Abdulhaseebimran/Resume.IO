"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileText, Loader2, Lock, CheckCircle2, ArrowRight, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function ResetPasswordPage({ params }: { params: Promise<{ token: string }> }) {
    const { token } = use(params);
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess(true);
            } else {
                toast.error(data.message || "Failed to reset password");
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
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
                    <h2 className="mt-6 text-xl font-semibold text-text-primary">Create New Password</h2>
                    <p className="text-text-secondary">Please enter your new strong password below.</p>
                </div>

                <div className="bg-card-bg p-8 rounded-2xl border border-border-custom shadow-xl">
                    {success ? (
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
                                <CheckCircle2 className="text-green-500" size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-text-primary">Password Reset Successful!</h3>
                            <p className="text-sm text-text-secondary">
                                Your account is secure now. You can log in with your new password.
                            </p>
                            <div className="pt-4">
                                <Link
                                    href="/login"
                                    className="w-full btn-gradient py-3 flex items-center justify-center gap-2"
                                >
                                    Login Now
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-primary">New Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-10 pr-12 py-3 bg-secondary-bg border border-border-custom rounded-xl focus:ring-2 focus:ring-accent transition-all outline-none text-text-primary"
                                            placeholder="••••••••"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-accent transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-primary">Confirm Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full pl-10 pr-12 py-3 bg-secondary-bg border border-border-custom rounded-xl focus:ring-2 focus:ring-accent transition-all outline-none text-text-primary"
                                            placeholder="••••••••"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-accent transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-gradient py-3 flex items-center justify-center gap-2 group"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : "Update Password"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
