import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Resume from "@/models/Resume";
import User from "@/models/User";
import mongoose from "mongoose";

// GET all resumes for the logged-in user
export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const dbUser = await User.findOne({ email: session.user.email });
        if (!dbUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const resumes = await Resume.find({ userId: dbUser._id }).sort({ updatedAt: -1 });

        return NextResponse.json(resumes);
    } catch (error) {
        console.error("Fetch Resumes Error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

// POST create a new resume
export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { title, template } = await req.json();

        await dbConnect();

        // Ensure we use the correct MongoDB ID
        const dbUser = await User.findOne({ email: session.user.email });
        if (!dbUser) {
            return NextResponse.json({ message: "User not found in database" }, { status: 404 });
        }

        const newResume = await Resume.create({
            userId: dbUser._id,
            title: title || "Untitled Resume",
            template: template || "modern-minimal",
            personalInfo: {
                fullName: session.user.name || "",
                email: session.user.email || "",
            },
        });

        return NextResponse.json(newResume, { status: 201 });
    } catch (error) {
        console.error("Create Resume Error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
