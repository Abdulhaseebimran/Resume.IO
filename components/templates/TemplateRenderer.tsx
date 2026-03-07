"use client";

import { ModernMinimal } from "./ModernMinimal";
import { Corporate } from "./Corporate";
import { Creative } from "./Creative";
import { TechDeveloper } from "./TechDeveloper";
import { ATS } from "./ATS";
import { Executive } from "./Executive";
import { ProfessionalTwoColumn } from "./ProfessionalTwoColumn";
import { ModernElegant } from "./ModernElegant";
import { MinimalistSidebar } from "./MinimalistSidebar";
import { CreativePortfolio } from "./CreativePortfolio";

export function TemplateRenderer({ templateId, data }: { templateId: string, data: any }) {
    switch (templateId) {
        case "modern-minimal":
            return <ModernMinimal data={data} />;
        case "professional-two-column":
            return <ProfessionalTwoColumn data={data} />;
        case "modern-elegant":
            return <ModernElegant data={data} />;
        case "minimalist-sidebar":
            return <MinimalistSidebar data={data} />;
        case "creative-portfolio":
            return <CreativePortfolio data={data} />;
        case "corporate-professional":
            return <Corporate data={data} />;
        case "creative-designer":
            return <Creative data={data} />;
        case "tech-developer":
            return <TechDeveloper data={data} />;
        case "ats-optimized":
            return <ATS data={data} />;
        case "executive-suite":
            return <Executive data={data} />;
        default:
            return <ModernMinimal data={data} />;
    }
}
