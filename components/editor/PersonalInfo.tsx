"use client";

import { useResumeStore } from "@/lib/store";
import { User, Phone, Mail, MapPin, Linkedin, Globe, Camera, Loader2, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export function PersonalInfo() {
    const { resume, updateNestedField } = useResumeStore();
    const info = resume?.personalInfo || {};
    const [uploading, setUploading] = useState(false);

    const handleChange = (field: string, value: string) => {
        updateNestedField("personalInfo", field, value);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.url) {
                handleChange("profileImage", data.url);
            }
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-card-bg rounded-2xl border border-border-custom p-6 shadow-sm">
            <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                <User className="text-accent" size={20} />
                Personal Information
            </h2>

            {/* Profile Image Upload */}
            <div className="flex flex-col items-center mb-8 pb-8 border-b border-border-custom">
                <div className="relative group">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden bg-secondary-bg border-2 border-dashed border-border-custom flex items-center justify-center transition-all group-hover:border-accent">
                        {info.profileImage ? (
                            <>
                                <Image
                                    src={info.profileImage}
                                    alt="Profile"
                                    width={128}
                                    height={128}
                                    unoptimized
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    onClick={() => handleChange("profileImage", "")}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={14} />
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col items-center gap-1 text-text-secondary group-hover:text-accent">
                                <Camera size={24} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Add Photo</span>
                            </div>
                        )}

                        {uploading && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl backdrop-blur-sm">
                                <Loader2 className="animate-spin text-white" size={24} />
                            </div>
                        )}
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                        disabled={uploading}
                    />
                </div>
                <p className="mt-3 text-[11px] text-text-secondary italic">Professional photo improves resume chances by 40%</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    label="Full Name"
                    value={info.fullName}
                    icon={<User size={16} />}
                    onChange={(v: string) => handleChange("fullName", v)}
                    placeholder="John Doe"
                />
                <InputField
                    label="Professional Email"
                    value={info.email}
                    icon={<Mail size={16} />}
                    onChange={(v: string) => handleChange("email", v)}
                    placeholder="john@example.com"
                />
                <InputField
                    label="Phone Number"
                    value={info.phone}
                    icon={<Phone size={16} />}
                    onChange={(v: string) => handleChange("phone", v)}
                    placeholder="+1 234 567 890"
                />
                <InputField
                    label="Location"
                    value={info.location}
                    icon={<MapPin size={16} />}
                    onChange={(v: string) => handleChange("location", v)}
                    placeholder="New York, USA"
                />
                <InputField
                    label="LinkedIn Profile"
                    value={info.linkedIn}
                    icon={<Linkedin size={16} />}
                    onChange={(v: string) => handleChange("linkedIn", v)}
                    placeholder="linkedin.com/in/johndoe"
                />
                <InputField
                    label="Portfolio / Website"
                    value={info.portfolio}
                    icon={<Globe size={16} />}
                    onChange={(v: string) => handleChange("portfolio", v)}
                    placeholder="johndoe.com"
                />
            </div>
        </div>
    );
}

function InputField({ label, value, icon, onChange, placeholder }: any) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-text-secondary flex items-center gap-2">
                {icon}
                {label}
            </label>
            <input
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-primary-bg border border-border-custom rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-accent outline-none transition-all text-text-primary"
                placeholder={placeholder}
            />
        </div>
    );
}
