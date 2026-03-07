"use client";

import { useResumeStore } from "@/lib/store";
import { User, Phone, Mail, MapPin, Linkedin, Globe } from "lucide-react";

export function PersonalInfo() {
    const { resume, updateNestedField } = useResumeStore();
    const info = resume?.personalInfo || {};

    const handleChange = (field: string, value: string) => {
        updateNestedField("personalInfo", field, value);
    };

    return (
        <div className="bg-card-bg rounded-2xl border border-border-custom p-6 shadow-sm">
            <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                <User className="text-accent" size={20} />
                Personal Information
            </h2>
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
