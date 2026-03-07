import mongoose, { Schema, model, models } from "mongoose";

const ResumeSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, default: "Untitled Resume" },
        personalInfo: {
            fullName: String,
            email: String,
            phone: String,
            location: String,
            linkedIn: String,
            portfolio: String,
        },
        summary: { type: String },
        experience: [
            {
                title: String,
                company: String,
                location: String,
                startDate: String,
                endDate: String,
                current: Boolean,
                description: String,
            },
        ],
        education: [
            {
                degree: String,
                institution: String,
                location: String,
                graduationDate: String,
                gpa: String,
            },
        ],
        skills: {
            technical: [String],
            soft: [String],
        },
        projects: [
            {
                name: String,
                description: String,
                technologies: [String],
                link: String,
            },
        ],
        certifications: [
            {
                name: String,
                issuer: String,
                date: String,
            },
        ],
        languages: [
            {
                language: String,
                proficiency: String,
            },
        ],
        template: { type: String, default: "modern-minimal" },
        colorScheme: { type: String, default: "#3b82f6" },
        font: { type: String, default: "inter" },
        views: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Resume = models.Resume || model("Resume", ResumeSchema);
export default Resume;
