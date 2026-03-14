"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { FileText, LogOut, User, LayoutDashboard, Settings } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function DashboardHeader() {
    const { data: session } = useSession();

    return (
        <header className="fixed top-0 w-full z-50 bg-primary-bg/80 backdrop-blur-md border-b border-border-custom px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                            <FileText className="text-white" size={20} />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-blue-400">
                            ResumeAI Pro
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/dashboard" className="text-sm font-medium text-text-primary flex items-center gap-2 hover:text-accent transition-colors">
                            <LayoutDashboard size={16} />
                            Dashboard
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <ThemeToggle />

                    <div className="flex items-center gap-3 pl-4 border-l border-border-custom">
                        <div className="hidden sm:block text-right">
                            <p className="text-sm font-semibold text-text-primary leading-none">{session?.user?.name}</p>
                            <p className="text-xs text-text-secondary mt-1">{session?.user?.email}</p>
                        </div>

                        {/* User Avatar */}
                        <div className="w-10 h-10 rounded-full border border-border-custom bg-secondary-bg overflow-hidden flex items-center justify-center relative group">
                            {session?.user?.image ? (
                                <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
                            ) : (
                                <User size={20} className="text-text-secondary" />
                            )}
                        </div>

                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="p-2 mr-2 rounded-lg bg-secondary-bg border border-border-custom text-text-secondary hover:text-red-500 hover:bg-red-500/10 transition-all duration-300"
                            title="Logout"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
